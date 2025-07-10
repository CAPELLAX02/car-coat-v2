import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/firebase-admin';

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const kod = searchParams.get('kod');

    if (!kod) {
        return NextResponse.json({ message: 'Kod parametresi eksik' }, { status: 400 });
    }

    const snapshot = await db.ref(`kodlar/${kod}`).once('value');

    if (!snapshot.exists()) {
        return NextResponse.json({ message: 'Kod bulunamadı' }, { status: 404 });
    }

    return NextResponse.json(snapshot.val());
}
