import { db } from './drizzle';
import { state, city } from './schema';

const statesData = [
  { id: 'state_up', name: 'Uttar Pradesh', code: 'UP', type: 'state' },
  { id: 'state_mh', name: 'Maharashtra', code: 'MH', type: 'state' },
  { id: 'state_br', name: 'Bihar', code: 'BR', type: 'state' },
  { id: 'state_wb', name: 'West Bengal', code: 'WB', type: 'state' },
  { id: 'state_mp', name: 'Madhya Pradesh', code: 'MP', type: 'state' },
  { id: 'state_tn', name: 'Tamil Nadu', code: 'TN', type: 'state' },
  { id: 'state_rj', name: 'Rajasthan', code: 'RJ', type: 'state' },
  { id: 'state_ka', name: 'Karnataka', code: 'KA', type: 'state' },
  { id: 'state_gj', name: 'Gujarat', code: 'GJ', type: 'state' },
  { id: 'state_ap', name: 'Andhra Pradesh', code: 'AP', type: 'state' },
  { id: 'state_or', name: 'Odisha', code: 'OR', type: 'state' },
  { id: 'state_tg', name: 'Telangana', code: 'TG', type: 'state' },
  { id: 'state_kl', name: 'Kerala', code: 'KL', type: 'state' },
  { id: 'state_jh', name: 'Jharkhand', code: 'JH', type: 'state' },
  { id: 'state_as', name: 'Assam', code: 'AS', type: 'state' },
  { id: 'state_pb', name: 'Punjab', code: 'PB', type: 'state' },
  { id: 'state_cg', name: 'Chhattisgarh', code: 'CG', type: 'state' },
  { id: 'state_hr', name: 'Haryana', code: 'HR', type: 'state' },
  { id: 'state_hp', name: 'Himachal Pradesh', code: 'HP', type: 'state' },
  { id: 'state_uk', name: 'Uttarakhand', code: 'UK', type: 'state' },
  { id: 'state_ga', name: 'Goa', code: 'GA', type: 'state' },
  { id: 'state_tr', name: 'Tripura', code: 'TR', type: 'state' },
  { id: 'state_ml', name: 'Meghalaya', code: 'ML', type: 'state' },
  { id: 'state_mn', name: 'Manipur', code: 'MN', type: 'state' },
  { id: 'state_nl', name: 'Nagaland', code: 'NL', type: 'state' },
  { id: 'state_ar', name: 'Arunachal Pradesh', code: 'AR', type: 'state' },
  { id: 'state_mz', name: 'Mizoram', code: 'MZ', type: 'state' },
  { id: 'state_sk', name: 'Sikkim', code: 'SK', type: 'state' },
  
  // Union Territories
  { id: 'ut_dl', name: 'Delhi', code: 'DL', type: 'union_territory' },
  { id: 'ut_ch', name: 'Chandigarh', code: 'CH', type: 'union_territory' },
  { id: 'ut_py', name: 'Puducherry', code: 'PY', type: 'union_territory' },
  { id: 'ut_jk', name: 'Jammu and Kashmir', code: 'JK', type: 'union_territory' },
  { id: 'ut_la', name: 'Ladakh', code: 'LA', type: 'union_territory' },
  { id: 'ut_an', name: 'Andaman and Nicobar Islands', code: 'AN', type: 'union_territory' },
  { id: 'ut_dn', name: 'Dadra and Nagar Haveli and Daman and Diu', code: 'DN', type: 'union_territory' },
  { id: 'ut_ld', name: 'Lakshadweep', code: 'LD', type: 'union_territory' },
];

// Comprehensive city data for each state
const citiesData = {
  'state_up': [
    { id: 'city_up_lucknow', name: 'Lucknow', type: 'city', isCapital: true },
    { id: 'city_up_kanpur', name: 'Kanpur', type: 'city' },
    { id: 'city_up_agra', name: 'Agra', type: 'city' },
    { id: 'city_up_varanasi', name: 'Varanasi', type: 'city' },
    { id: 'city_up_meerut', name: 'Meerut', type: 'city' },
    { id: 'city_up_allahabad', name: 'Allahabad', type: 'city' },
    { id: 'city_up_bareilly', name: 'Bareilly', type: 'city' },
    { id: 'city_up_aligarh', name: 'Aligarh', type: 'city' },
    { id: 'city_up_moradabad', name: 'Moradabad', type: 'city' },
    { id: 'city_up_saharanpur', name: 'Saharanpur', type: 'city' },
    { id: 'city_up_gorakhpur', name: 'Gorakhpur', type: 'city' },
    { id: 'city_up_firozabad', name: 'Firozabad', type: 'city' },
    { id: 'city_up_jhansi', name: 'Jhansi', type: 'city' },
    { id: 'city_up_muzaffarnagar', name: 'Muzaffarnagar', type: 'city' },
    { id: 'city_up_mathura', name: 'Mathura', type: 'city' },
    { id: 'city_up_rampur', name: 'Rampur', type: 'city' },
    { id: 'city_up_shahjahanpur', name: 'Shahjahanpur', type: 'city' },
    { id: 'city_up_farrukhabad', name: 'Farrukhabad', type: 'city' },
    { id: 'city_up_mau', name: 'Mau', type: 'city' },
    { id: 'city_up_hapur', name: 'Hapur', type: 'city' },
    { id: 'city_up_noida', name: 'Noida', type: 'city' },
    { id: 'city_up_etawah', name: 'Etawah', type: 'district' },
    { id: 'city_up_mirzapur', name: 'Mirzapur', type: 'district' },
    { id: 'city_up_bulandshahr', name: 'Bulandshahr', type: 'district' },
    { id: 'city_up_sambhal', name: 'Sambhal', type: 'district' },
    { id: 'city_up_amroha', name: 'Amroha', type: 'district' },
    { id: 'city_up_hardoi', name: 'Hardoi', type: 'district' },
    { id: 'city_up_fatehpur', name: 'Fatehpur', type: 'district' },
    { id: 'city_up_raebareli', name: 'Raebareli', type: 'district' },
    { id: 'city_up_orai', name: 'Orai', type: 'district' },
    { id: 'city_up_sitapur', name: 'Sitapur', type: 'district' },
    { id: 'city_up_bahraich', name: 'Bahraich', type: 'district' },
    { id: 'city_up_modinagar', name: 'Modinagar', type: 'town' },
    { id: 'city_up_unnao', name: 'Unnao', type: 'district' },
    { id: 'city_up_jaunpur', name: 'Jaunpur', type: 'district' },
    { id: 'city_up_lakhimpur', name: 'Lakhimpur', type: 'district' },
    { id: 'city_up_hathras', name: 'Hathras', type: 'district' },
    { id: 'city_up_banda', name: 'Banda', type: 'district' },
    { id: 'city_up_pilibhit', name: 'Pilibhit', type: 'district' },
    { id: 'city_up_barabanki', name: 'Barabanki', type: 'district' },
    { id: 'city_up_khurja', name: 'Khurja', type: 'town' },
    { id: 'city_up_gonda', name: 'Gonda', type: 'district' },
    { id: 'city_up_mainpuri', name: 'Mainpuri', type: 'district' },
    { id: 'city_up_lalitpur', name: 'Lalitpur', type: 'district' },
    { id: 'city_up_etah', name: 'Etah', type: 'district' },
    { id: 'city_up_deoria', name: 'Deoria', type: 'district' },
    { id: 'city_up_ujhani', name: 'Ujhani', type: 'town' },
    { id: 'city_up_ghaziabad', name: 'Ghaziabad', type: 'city' },
    { id: 'city_up_sultanpur', name: 'Sultanpur', type: 'district' },
    { id: 'city_up_azamgarh', name: 'Azamgarh', type: 'district' },
    { id: 'city_up_bijnor', name: 'Bijnor', type: 'district' },
    { id: 'city_up_sahaswan', name: 'Sahaswan', type: 'town' },
    { id: 'city_up_basti', name: 'Basti', type: 'district' },
    { id: 'city_up_chandausi', name: 'Chandausi', type: 'town' },
    { id: 'city_up_akbarpur', name: 'Akbarpur', type: 'town' },
    { id: 'city_up_ballia', name: 'Ballia', type: 'district' },
    { id: 'city_up_tanda', name: 'Tanda', type: 'town' },
    { id: 'city_up_greater_noida', name: 'Greater Noida', type: 'city' },
    { id: 'city_up_shikohabad', name: 'Shikohabad', type: 'town' },
    { id: 'city_up_shamli', name: 'Shamli', type: 'district' },
    { id: 'city_up_awagarh', name: 'Awagarh', type: 'town' },
    { id: 'city_up_kasganj', name: 'Kasganj', type: 'district' },
    { id: 'city_up_kannauj', name: 'Kannauj', type: 'district' },
    { id: 'city_up_rae_bareli', name: 'Rae Bareli', type: 'district' },
    { id: 'city_up_vrindavan', name: 'Vrindavan', type: 'town' },
    { id: 'city_up_hamirpur', name: 'Hamirpur', type: 'district' },
    { id: 'city_up_mahoba', name: 'Mahoba', type: 'district' },
    { id: 'city_up_siddharthnagar', name: 'Siddharthnagar', type: 'district' },
    { id: 'city_up_bhadohi', name: 'Bhadohi', type: 'district' },
    { id: 'city_up_chitrakoot', name: 'Chitrakoot', type: 'district' },
    { id: 'city_up_shrawasti', name: 'Shrawasti', type: 'district' },
    { id: 'city_up_kaushambi', name: 'Kaushambi', type: 'district' },
    { id: 'city_up_balrampur', name: 'Balrampur', type: 'district' },
    { id: 'city_up_kushinagar', name: 'Kushinagar', type: 'district' },
    { id: 'city_up_maharajganj', name: 'Maharajganj', type: 'district' },
    { id: 'city_up_sant_kabir_nagar', name: 'Sant Kabir Nagar', type: 'district' },
    { id: 'city_up_ambedkar_nagar', name: 'Ambedkar Nagar', type: 'district' },
    { id: 'city_up_amethi', name: 'Amethi', type: 'district' },
    { id: 'city_up_bagpat', name: 'Bagpat', type: 'district' },
    { id: 'city_up_sonbhadra', name: 'Sonbhadra', type: 'district' },
  ],
  'state_mh': [
    { id: 'city_mh_mumbai', name: 'Mumbai', type: 'metropolitan', isCapital: true },
    { id: 'city_mh_pune', name: 'Pune', type: 'city' },
    { id: 'city_mh_nagpur', name: 'Nagpur', type: 'city' },
    { id: 'city_mh_nashik', name: 'Nashik', type: 'city' },
    { id: 'city_mh_aurangabad', name: 'Aurangabad', type: 'city' },
    { id: 'city_mh_solapur', name: 'Solapur', type: 'city' },
    { id: 'city_mh_thane', name: 'Thane', type: 'city' },
    { id: 'city_mh_amravati', name: 'Amravati', type: 'city' },
    { id: 'city_mh_kolhapur', name: 'Kolhapur', type: 'city' },
    { id: 'city_mh_sangli', name: 'Sangli', type: 'city' },
    { id: 'city_mh_malegaon', name: 'Malegaon', type: 'city' },
    { id: 'city_mh_jalgaon', name: 'Jalgaon', type: 'city' },
    { id: 'city_mh_akola', name: 'Akola', type: 'city' },
    { id: 'city_mh_latur', name: 'Latur', type: 'city' },
    { id: 'city_mh_dhule', name: 'Dhule', type: 'city' },
    { id: 'city_mh_ahmednagar', name: 'Ahmednagar', type: 'city' },
    { id: 'city_mh_chandrapur', name: 'Chandrapur', type: 'city' },
    { id: 'city_mh_parbhani', name: 'Parbhani', type: 'city' },
    { id: 'city_mh_ichalkaranji', name: 'Ichalkaranji', type: 'city' },
    { id: 'city_mh_jalna', name: 'Jalna', type: 'city' },
    { id: 'city_mh_ambernath', name: 'Ambernath', type: 'city' },
    { id: 'city_mh_bhiwandi', name: 'Bhiwandi', type: 'city' },
    { id: 'city_mh_navi_mumbai', name: 'Navi Mumbai', type: 'city' },
    { id: 'city_mh_beed', name: 'Beed', type: 'district' },
    { id: 'city_mh_buldhana', name: 'Buldhana', type: 'district' },
    { id: 'city_mh_gondia', name: 'Gondia', type: 'district' },
    { id: 'city_mh_hingoli', name: 'Hingoli', type: 'district' },
    { id: 'city_mh_nanded', name: 'Nanded', type: 'district' },
    { id: 'city_mh_nandurbar', name: 'Nandurbar', type: 'district' },
    { id: 'city_mh_osmanabad', name: 'Osmanabad', type: 'district' },
    { id: 'city_mh_raigad', name: 'Raigad', type: 'district' },
    { id: 'city_mh_ratnagiri', name: 'Ratnagiri', type: 'district' },
    { id: 'city_mh_satara', name: 'Satara', type: 'district' },
    { id: 'city_mh_sindhudurg', name: 'Sindhudurg', type: 'district' },
    { id: 'city_mh_wardha', name: 'Wardha', type: 'district' },
    { id: 'city_mh_washim', name: 'Washim', type: 'district' },
    { id: 'city_mh_yavatmal', name: 'Yavatmal', type: 'district' },
  ],
  'ut_dl': [
    { id: 'city_dl_new_delhi', name: 'New Delhi', type: 'city', isCapital: true },
    { id: 'city_dl_central_delhi', name: 'Central Delhi', type: 'district' },
    { id: 'city_dl_east_delhi', name: 'East Delhi', type: 'district' },
    { id: 'city_dl_north_delhi', name: 'North Delhi', type: 'district' },
    { id: 'city_dl_north_east_delhi', name: 'North East Delhi', type: 'district' },
    { id: 'city_dl_north_west_delhi', name: 'North West Delhi', type: 'district' },
    { id: 'city_dl_shahdara', name: 'Shahdara', type: 'district' },
    { id: 'city_dl_south_delhi', name: 'South Delhi', type: 'district' },
    { id: 'city_dl_south_east_delhi', name: 'South East Delhi', type: 'district' },
    { id: 'city_dl_south_west_delhi', name: 'South West Delhi', type: 'district' },
    { id: 'city_dl_west_delhi', name: 'West Delhi', type: 'district' },
  ],
  'state_wb': [
    { id: 'city_wb_kolkata', name: 'Kolkata', type: 'metropolitan', isCapital: true },
    { id: 'city_wb_howrah', name: 'Howrah', type: 'city' },
    { id: 'city_wb_durgapur', name: 'Durgapur', type: 'city' },
    { id: 'city_wb_asansol', name: 'Asansol', type: 'city' },
    { id: 'city_wb_siliguri', name: 'Siliguri', type: 'city' },
    { id: 'city_wb_malda', name: 'Malda', type: 'city' },
    { id: 'city_wb_baharampur', name: 'Baharampur', type: 'city' },
    { id: 'city_wb_habra', name: 'Habra', type: 'city' },
    { id: 'city_wb_kharagpur', name: 'Kharagpur', type: 'city' },
    { id: 'city_wb_shantipur', name: 'Shantipur', type: 'city' },
    { id: 'city_wb_dankuni', name: 'Dankuni', type: 'city' },
    { id: 'city_wb_dhulian', name: 'Dhulian', type: 'city' },
    { id: 'city_wb_raniganj', name: 'Raniganj', type: 'city' },
    { id: 'city_wb_haldia', name: 'Haldia', type: 'city' },
    { id: 'city_wb_raiganj', name: 'Raiganj', type: 'city' },
    { id: 'city_wb_krishnanagar', name: 'Krishnanagar', type: 'city' },
    { id: 'city_wb_nabadwip', name: 'Nabadwip', type: 'city' },
    { id: 'city_wb_medinipur', name: 'Medinipur', type: 'city' },
    { id: 'city_wb_jalpaiguri', name: 'Jalpaiguri', type: 'city' },
    { id: 'city_wb_balurghat', name: 'Balurghat', type: 'city' },
    { id: 'city_wb_basirhat', name: 'Basirhat', type: 'city' },
    { id: 'city_wb_bankura', name: 'Bankura', type: 'city' },
    { id: 'city_wb_chakdaha', name: 'Chakdaha', type: 'city' },
    { id: 'city_wb_darjeeling', name: 'Darjeeling', type: 'city' },
    { id: 'city_wb_alipurduar', name: 'Alipurduar', type: 'city' },
    { id: 'city_wb_purulia', name: 'Purulia', type: 'city' },
    { id: 'city_wb_jangipur', name: 'Jangipur', type: 'city' },
    { id: 'city_wb_bolpur', name: 'Bolpur', type: 'city' },
    { id: 'city_wb_bangaon', name: 'Bangaon', type: 'city' },
    { id: 'city_wb_cooch_behar', name: 'Cooch Behar', type: 'city' },
  ]
};

async function seedLocations() {
  try {
    console.log('Starting location seeding...');

    // Insert states
    const insertedStates = await db.insert(state).values(statesData).returning();
    console.log(`Inserted ${insertedStates.length} states`);

    // Create state ID mapping for easier reference
    const stateIdMapping: Record<string, string> = {};
    insertedStates.forEach(s => {
      stateIdMapping[s.id] = s.id;
    });

    // Insert cities for each state
    let totalCities = 0;
    for (const [stateId, cities] of Object.entries(citiesData)) {
      if (stateIdMapping[stateId]) {
        const cityValues = cities.map(city => ({
          id: city.id,
          name: city.name,
          type: city.type,
          stateId: stateId,
          isCapital: city.isCapital || false,
        }));
        
        await db.insert(city).values(cityValues);
        totalCities += cityValues.length;
        console.log(`Inserted ${cityValues.length} cities for ${stateId}`);
      }
    }

    console.log(`✅ Successfully seeded ${insertedStates.length} states and ${totalCities} cities`);
  } catch (error) {
    console.error('❌ Error seeding locations:', error);
    throw error;
  }
}

// Run if called directly
if (require.main === module) {
  seedLocations()
    .then(() => {
      console.log('Location seeding completed');
      process.exit(0);
    })
    .catch((error) => {
      console.error('Location seeding failed:', error);
      process.exit(1);
    });
}

export { seedLocations };
