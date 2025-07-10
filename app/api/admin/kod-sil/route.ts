import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/firebase-admin';

export async function DELETE(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const kod = searchParams.get('kod');

    if (!kod) {
        return NextResponse.json({ message: 'Kod parametresi eksik' }, { status: 400 });
    }

    await db.ref(`kodlar/${kod}`).remove();
    return NextResponse.json({ ok: true });
}
