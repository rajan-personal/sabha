import { NextResponse } from 'next/server';
import { db } from '@/db/drizzle';
import { state } from '@/db/schema';
import { eq } from 'drizzle-orm';

// GET /api/locations/states - Fetch all states and UTs
export async function GET() {
  try {
    const states = await db
      .select({
        id: state.id,
        name: state.name,
        code: state.code,
        type: state.type,
      })
      .from(state)
      .where(eq(state.isActive, true))
      .orderBy(state.name);

    return NextResponse.json(states);
  } catch (error) {
    console.error('Error fetching states:', error);
    return NextResponse.json({ error: 'Failed to fetch states' }, { status: 500 });
  }
}
