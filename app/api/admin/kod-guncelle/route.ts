import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/firebase-admin';

export async function PUT(req: NextRequest) {
    try {
        const body = await req.json();
        const { kod, ...rest } = body;

        if (!kod) {
            return NextResponse.json({ message: 'Kod eksik' }, { status: 400 });
        }

        const ref = db.ref(`kodlar/${kod}`);
        const snapshot = await ref.once('value');

        if (!snapshot.exists()) {
            return NextResponse.json({ message: 'Kod bulunamadı' }, { status: 404 });
        }

        await ref.update(rest);
        return NextResponse.json({ ok: true });
    } catch (err: any) {
        return NextResponse.json({ message: err.message }, { status: 500 });
    }
}
