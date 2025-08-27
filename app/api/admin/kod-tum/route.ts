import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/firebase-admin';

export async function GET(_: NextRequest) {
  try {
    console.log("[API] GET /api/kodlar → fetching data from Firebase…");
    const snapshot = await db.ref('kodlar').once('value');
    console.log("[API] Firebase snapshot:", snapshot.val());
    return NextResponse.json(snapshot.val() || {});
  } catch (err) {
    console.error("[API] Error in /api/kodlar:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
