import { NextResponse } from 'next/server';
import { db } from '@/db/drizzle';
import { category } from '@/db/schema';
import { eq } from 'drizzle-orm';

// GET /api/categories - Fetch all active categories
export async function GET() {
  try {
    const categories = await db
      .select({
        id: category.id,
        name: category.name,
        description: category.description,
        color: category.color,
        icon: category.icon,
        isActive: category.isActive,
      })
      .from(category)
      .where(eq(category.isActive, true));

    return NextResponse.json(categories);
  } catch (error) {
    console.error('Error fetching categories:', error);
    return NextResponse.json({ error: 'Failed to fetch categories' }, { status: 500 });
  }
}
