import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export async function POST(req: NextRequest) {
    const body = await req.json();
    const { username, password } = body;

    if (
        username !== process.env.ADMIN_USERNAME ||
        password !== process.env.ADMIN_PASSWORD
    ) {
        return NextResponse.json({ message: 'Kullanıcı adı veya şifre hatalı' }, { status: 401 });
    }

    const token = jwt.sign({ username }, process.env.JWT_SECRET!, { expiresIn: '1h' });

    return NextResponse.json({ token });
}
