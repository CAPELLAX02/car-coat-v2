import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/firebase-admin';

export async function GET(_: NextRequest) {
    const snapshot = await db.ref('kodlar').once('value');
    return NextResponse.json(snapshot.val() || {});
}
