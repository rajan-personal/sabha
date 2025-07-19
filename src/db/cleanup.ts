import 'dotenv/config';
import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';
import { 
  user, 
  session, 
  account, 
  verification, 
  category, 
  topic, 
  comment, 
  vote, 
  userProfile 
} from './schema';

// Database connection
const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql);

// Import categories data from seed file
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
    icon: '🏛️',
    isActive: true,
  },
  {
    id: 'technology',
    name: 'Clean Technology',
    description: 'Renewable energy and green tech',
    color: '#8b5cf6',
    icon: '⚡',
    isActive: true,
  },
  {
    id: 'energy',
    name: 'Renewable Energy',
    description: 'Solar, wind, and sustainable energy',
    color: '#f59e0b',
    icon: '🔋',
    isActive: true,
  },
  {
    id: 'transportation',
    name: 'Transportation',
    description: 'Sustainable mobility and transport',
    color: '#10b981',
    icon: '🚌',
    isActive: true,
  },
  {
    id: 'action',
    name: 'Climate Action',
    description: 'Individual and collective climate actions',
    color: '#ef4444',
    icon: '🌡️',
    isActive: true,
  },
];

async function cleanupDatabase() {
  try {
    console.log('🧹 Starting database cleanup...');

    // Delete in order to respect foreign key constraints
    // Start with dependent tables first
    console.log('🗑️  Deleting votes...');
    await db.delete(vote);
    
    console.log('🗑️  Deleting comments...');
    await db.delete(comment);
    
    console.log('🗑️  Deleting topics...');
    await db.delete(topic);
    
    console.log('🗑️  Deleting user profiles...');
    await db.delete(userProfile);
    
    console.log('🗑️  Deleting categories...');
    await db.delete(category);
    
    console.log('🗑️  Deleting verifications...');
    await db.delete(verification);
    
    console.log('🗑️  Deleting accounts...');
    await db.delete(account);
    
    console.log('🗑️  Deleting sessions...');
    await db.delete(session);
    
    console.log('🗑️  Deleting users...');
    await db.delete(user);

    console.log('✅ Database cleanup completed successfully!');
    
  } catch (error) {
    console.error('❌ Error during database cleanup:', error);
    throw error;
  }
}

async function seedDatabase() {
  try {
    console.log('🌱 Starting database seeding...');
    
    console.log('📝 Inserting categories...');
    await db.insert(category).values(categories);
    
    console.log('✅ Database seeding completed successfully!');
    console.log(`📊 Inserted ${categories.length} categories`);
    
  } catch (error) {
    console.error('❌ Error during database seeding:', error);
    throw error;
  }
}

async function cleanupAndSeed() {
  try {
    await cleanupDatabase();
    await seedDatabase();
    
    console.log('🎉 Database cleanup and seeding completed successfully!');
    
  } catch (error) {
    console.error('💥 Database cleanup and seeding failed:', error);
    throw error;
  }
}

// Run the cleanup and seed if this script is executed directly
if (require.main === module) {
  cleanupAndSeed()
    .then(() => {
      console.log('🎉 Cleanup and seed script finished');
      process.exit(0);
    })
    .catch((error) => {
      console.error('💥 Cleanup and seed script failed:', error);
      process.exit(1);
    });
}

export { cleanupDatabase, seedDatabase, cleanupAndSeed };
