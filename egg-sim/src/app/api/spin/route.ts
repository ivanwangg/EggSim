
import { NextResponse } from 'next/server';

const items = ['Knife', 'AK-47', 'AWP', 'Pistol', 'Gloves', 'SMG', 'Grenade'];

export async function GET() {
  const winner = items[Math.floor(Math.random() * items.length)];
  return NextResponse.json({ winner });
}
