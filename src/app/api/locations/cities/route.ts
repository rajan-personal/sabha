import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db/drizzle';
import { city, state } from '@/db/schema';
import { eq, and } from 'drizzle-orm';

// GET /api/locations/cities - Fetch cities by state
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const stateId = searchParams.get('stateId');

    if (!stateId) {
      return NextResponse.json({ error: 'State ID is required' }, { status: 400 });
    }

    const cities = await db
      .select({
        id: city.id,
        name: city.name,
        type: city.type,
        isCapital: city.isCapital,
        stateName: state.name,
      })
      .from(city)
      .leftJoin(state, eq(city.stateId, state.id))
      .where(and(
        eq(city.stateId, stateId),
        eq(city.isActive, true)
      ))
      .orderBy(city.name);

    return NextResponse.json(cities);
  } catch (error) {
    console.error('Error fetching cities:', error);
    return NextResponse.json({ error: 'Failed to fetch cities' }, { status: 500 });
  }
}
