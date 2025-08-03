import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db/drizzle';
import { officialTag } from '@/db/schema';
import { eq, desc, and, ilike } from 'drizzle-orm';
import { auth } from '@/lib/auth';

// GET /api/officials - Search and list government officials
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search');
    const governanceLevel = searchParams.get('governance');
    const location = searchParams.get('location');
    const isVerified = searchParams.get('verified');
    
    const query = db
      .select({
        id: officialTag.id,
        name: officialTag.name,
        title: officialTag.title,
        organization: officialTag.organization,
        governanceLevel: officialTag.governanceLevel,
        location: officialTag.location,
        twitterHandle: officialTag.twitterHandle,
        isVerified: officialTag.isVerified,
        verifiedAt: officialTag.verifiedAt,
        createdAt: officialTag.createdAt,
      })
      .from(officialTag)
      .orderBy(desc(officialTag.isVerified), desc(officialTag.createdAt));

    // Build where conditions
    const conditions = [];
    
    if (search) {
      conditions.push(ilike(officialTag.name, `%${search}%`));
    }
    
    if (governanceLevel) {
      conditions.push(eq(officialTag.governanceLevel, governanceLevel as 'national' | 'state' | 'local'));
    }
    
    if (location) {
      conditions.push(eq(officialTag.location, location));
    }
    
    if (isVerified !== null && isVerified !== undefined) {
      conditions.push(eq(officialTag.isVerified, isVerified === 'true'));
    }

    // Apply filters if any
    const officials = conditions.length > 0
      ? await query.where(and(...conditions))
      : await query;

    return NextResponse.json(officials);
  } catch (error) {
    console.error('Error fetching officials:', error);
    return NextResponse.json({ error: 'Failed to fetch officials' }, { status: 500 });
  }
}

// POST /api/officials - Create a new official tag
export async function POST(request: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: request.headers
    });

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { 
      name, 
      title, 
      organization, 
      governanceLevel, 
      location,
      twitterHandle,
      email,
      phone
    } = body;

    // Validation
    if (!name || !title || !organization || !governanceLevel) {
      return NextResponse.json({ 
        error: 'Name, title, organization, and governance level are required' 
      }, { status: 400 });
    }

    if (!['national', 'state', 'local'].includes(governanceLevel)) {
      return NextResponse.json({ error: 'Invalid governance level' }, { status: 400 });
    }

    // For local officials, location is required
    if (governanceLevel === 'local' && !location) {
      return NextResponse.json({ 
        error: 'Location is required for local officials' 
      }, { status: 400 });
    }

    // Create the official tag
    const newOfficial = await db.insert(officialTag).values({
      id: crypto.randomUUID(),
      name,
      title,
      organization,
      governanceLevel: governanceLevel as 'national' | 'state' | 'local',
      location,
      twitterHandle,
      email,
      phone,
      isVerified: false, // New officials start unverified
      verifiedAt: null,
      verifiedBy: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    }).returning();

    return NextResponse.json(newOfficial[0], { status: 201 });
  } catch (error) {
    console.error('Error creating official:', error);
    return NextResponse.json({ error: 'Failed to create official' }, { status: 500 });
  }
}
