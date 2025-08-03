'use client';

import { useState, useEffect } from 'react';

interface LocationSelectorProps {
  value: string;
  onChange: (value: string) => void;
  governanceLevel: 'national' | 'state' | 'local' | '';
  disabled?: boolean;
  required?: boolean;
}

interface State {
  id: string;
  name: string;
  code: string;
  type: string;
}

interface City {
  id: string;
  name: string;
  type: string;
  isCapital: boolean;
  stateName: string;
}

export function LocationSelector({ 
  value, 
  onChange, 
  governanceLevel, 
  disabled = false,
  required = false 
}: LocationSelectorProps) {
  const [selectedState, setSelectedState] = useState('');
  const [selectedStateId, setSelectedStateId] = useState('');
  const [states, setStates] = useState<State[]>([]);
  const [cities, setCities] = useState<City[]>([]);
  const [loading, setLoading] = useState(false);

  // Load states on component mount
  useEffect(() => {
    const fetchStates = async () => {
      try {
        const response = await fetch('/api/locations/states');
        if (response.ok) {
          const statesData = await response.json();
          setStates(statesData);
        }
      } catch (error) {
        console.error('Failed to fetch states:', error);
      }
    };

    fetchStates();
  }, []);

  // Load cities when state is selected
  useEffect(() => {
    const fetchCities = async () => {
      if (!selectedStateId) {
        setCities([]);
        return;
      }

      setLoading(true);
      try {
        const response = await fetch(`/api/locations/cities?stateId=${selectedStateId}`);
        if (response.ok) {
          const citiesData = await response.json();
          setCities(citiesData);
        }
      } catch (error) {
        console.error('Failed to fetch cities:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCities();
  }, [selectedStateId]);

  // Parse existing value for local governance (format: "City, State")
  useEffect(() => {
    if (governanceLevel === 'local' && value && value.includes(', ')) {
      const [cityName, stateName] = value.split(', ');
      const state = states.find(s => s.name === stateName);
      if (state && selectedStateId !== state.id) {
        setSelectedState(stateName);
        setSelectedStateId(state.id);
      }
    } else if (governanceLevel === 'state' && value) {
      setSelectedState(value);
    }
  }, [value, states, governanceLevel, selectedStateId]);

  const isRequired = required || governanceLevel === 'local';
  const showField = governanceLevel === 'state' || governanceLevel === 'local';

  if (!showField) {
    return null;
  }

  const handleStateChange = (stateName: string) => {
    const state = states.find(s => s.name === stateName);
    setSelectedState(stateName);
    setSelectedStateId(state?.id || '');
    
    if (governanceLevel === 'state') {
      onChange(stateName);
    } else {
      // Reset city selection when state changes
      onChange('');
    }
  };

  const handleCityChange = (cityName: string) => {
    // For local governance, store as "City, State" format
    onChange(`${cityName}, ${selectedState}`);
  };

  const getCurrentCity = () => {
    if (governanceLevel === 'local' && value && value.includes(', ')) {
      const [cityName] = value.split(', ');
      return cityName;
    }
    return '';
  };

  return (
    <div className="space-y-3">
      {governanceLevel === 'state' ? (
        // State selection only
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
          required={isRequired}
          style={{
            width: '100%',
            padding: 'var(--sabha-spacing-md)',
            borderRadius: 'var(--sabha-radius-md)',
            border: '1px solid var(--sabha-border-primary)',
            backgroundColor: 'var(--sabha-bg-primary)',
            color: 'var(--sabha-text-primary)',
            fontSize: 'var(--sabha-text-base)',
            cursor: disabled ? 'not-allowed' : 'pointer',
            opacity: disabled ? 0.6 : 1,
          }}
        >
          <option value="">Select a state</option>
          {states.map((state) => (
            <option key={state.id} value={state.name}>
              {state.name}
            </option>
          ))}
        </select>
      ) : (
        // Local governance: State + City selection
        <div className="space-y-3">
          {/* State Selection */}
          <select
            value={selectedState}
            onChange={(e) => handleStateChange(e.target.value)}
            disabled={disabled}
            required={isRequired}
            style={{
              width: '100%',
              padding: 'var(--sabha-spacing-md)',
              borderRadius: 'var(--sabha-radius-md)',
              border: '1px solid var(--sabha-border-primary)',
              backgroundColor: 'var(--sabha-bg-primary)',
              color: 'var(--sabha-text-primary)',
              fontSize: 'var(--sabha-text-base)',
              cursor: disabled ? 'not-allowed' : 'pointer',
              opacity: disabled ? 0.6 : 1,
            }}
          >
            <option value="">Select a state</option>
            {states.map((state) => (
              <option key={state.id} value={state.name}>
                {state.name}
              </option>
            ))}
          </select>

          {/* City Selection */}
          {selectedState && (
            <select
              value={getCurrentCity()}
              onChange={(e) => handleCityChange(e.target.value)}
              disabled={disabled || loading}
              required={isRequired}
              style={{
                width: '100%',
                padding: 'var(--sabha-spacing-md)',
                borderRadius: 'var(--sabha-radius-md)',
                border: '1px solid var(--sabha-border-primary)',
                backgroundColor: 'var(--sabha-bg-primary)',
                color: 'var(--sabha-text-primary)',
                fontSize: 'var(--sabha-text-base)',
                cursor: disabled || loading ? 'not-allowed' : 'pointer',
                opacity: disabled || loading ? 0.6 : 1,
              }}
            >
              <option value="">
                {loading ? 'Loading cities...' : 'Select a city'}
              </option>
              {cities.map((city) => (
                <option key={city.id} value={city.name}>
                  {city.name}
                  {city.isCapital && ' (Capital)'}
                </option>
              ))}
            </select>
          )}
        </div>
      )}
    </div>
  );
}
