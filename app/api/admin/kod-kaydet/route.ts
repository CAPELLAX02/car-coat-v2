import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/firebase-admin';

export async function POST(req: NextRequest) {
    const body = await req.json();
    const {
        kod,
        plakaNo,
        garantiBaslangic,
        garantiBitis,
        notlar = '',
        islemler,
        custom = false,
    } = body;

    if (!kod || !plakaNo || !garantiBaslangic || !garantiBitis || !Array.isArray(islemler)) {
        return NextResponse.json({ message: 'Eksik veri' }, { status: 400 });
    }

    const ref = db.ref(`kodlar/${kod}`);
    const snapshot = await ref.once('value');

    if (snapshot.exists()) {
        return NextResponse.json({ message: 'Kod zaten kayıtlı' }, { status: 409 });
    }

    await ref.set({
        plakaNo,
        garanti: { baslangic: garantiBaslangic, bitis: garantiBitis },
        notlar,
        islemler,
        tarih: new Date().toISOString(),
        custom,
    });

    return NextResponse.json({ ok: true });
}
