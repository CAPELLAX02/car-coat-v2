import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
});

export async function POST(req: NextRequest) {
    const { name, email, phone, message } = await req.json();

    const templatePath = path.join(process.cwd(), 'public/email-template.html');
    let html = fs.readFileSync(templatePath, 'utf8');

    html = html
        .replace(/{{name}}/g, name)
        .replace(/{{email}}/g, email)
        .replace(/{{phone}}/g, phone || '-')
        .replace(/{{message}}/g, message)
        .replace(/{{recipientName}}/g, 'Metallic Garage');

    await transporter.sendMail({
        from: `"${name}" <${email}>`,
        to: process.env.SMTP_USER,
        subject: 'Metallic Garage | Yeni İletişim Mesajı',
        html,
    });

    return NextResponse.json({ message: 'Mesaj alındı, yakında dönüş yapılacak.' }, { status: 202 });
}
