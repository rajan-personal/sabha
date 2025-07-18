import 'dotenv/config';
import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';
import { category } from './schema';

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql);

const categories = [
  {
    id: 'environment',
    name: 'Environment',
    description: 'Environmental issues and solutions',
    color: '#22c55e',
    icon: '🌍',
    isActive: true,
  },
  {
    id: 'policy',
    name: 'Climate Policy',
    description: 'Government policies and regulations',
    color: '#3b82f6',
    icon: '📜',
    isActive: true,
  },
  {
    id: 'technology',
    name: 'Clean Technology',
    description: 'Green technologies and innovations',
    color: '#8b5cf6',
    icon: '⚡',
    isActive: true,
  },
  {
    id: 'energy',
    name: 'Renewable Energy',
    description: 'Solar, wind, and other renewable energy sources',
    color: '#f59e0b',
    icon: '☀️',
    isActive: true,
  },
  {
    id: 'transportation',
    name: 'Transportation',
    description: 'Sustainable transportation and mobility',
    color: '#10b981',
    icon: '🚗',
    isActive: true,
  },
  {
    id: 'action',
    name: 'Climate Action',
    description: 'Individual and community actions',
    color: '#ef4444',
    icon: '🎯',
    isActive: true,
  },
  {
    id: 'issue',
    name: 'Climate Issues',
    description: 'Current climate problems and challenges',
    color: '#dc2626',
    icon: '⚠️',
    isActive: true,
  },
];

async function seed() {
  try {
    console.log('Seeding database...');
    
    // Insert categories
    for (const cat of categories) {
      await db.insert(category).values(cat).onConflictDoNothing();
    }
    
    console.log('Database seeded successfully!');
  } catch (error) {
    console.error('Error seeding database:', error);
  }
}

seed();
