
// app/api/contact/route.ts
import { NextResponse } from 'next/server'
import { z } from 'zod'
import nodemailer from 'nodemailer'

// API-Schema wiederverwenden oder separat definieren
const contactSchemaApi = z.object({
    name: z.string().min(1),
    email: z.string().email(),
    phone: z.string().optional(),
    honeypot: z.string().optional(),
})

export async function POST(request: Request) {
    const json = await request.json()
    const data = contactSchemaApi.parse(json)

    // Spam-Check
    if (data.honeypot) {
        return NextResponse.json({ ok: true }, { status: 200 })
    }

    // SMTP-Transport per Umgebungsvariablen konfigurieren
    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT),
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
        },
    })

    await transporter.sendMail({
        from: `Kontaktformular <${process.env.SMTP_USER}>`,
        to: process.env.CONTACT_EMAIL,
        subject: `Neue Kontaktanfrage von ${data.name}`,
        text: `Name: ${data.name}\nEmail: ${data.email}\nTelefon: ${data.phone || '-'}\n\nNachricht gesendet via Next.js`,
    })

    return NextResponse.json({ ok: true })
}
