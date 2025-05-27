// app/api/contact/route.ts
import {NextResponse} from 'next/server'
import {z} from 'zod'
import nodemailer from 'nodemailer'
import {RateLimiterMemory} from 'rate-limiter-flexible'

// Rate-Limiter: 3 Anfragen pro 60 Minuten pro IP
const rateLimiter = new RateLimiterMemory({
    points: 3,
    duration: 60 * 60, // 60 Minuten
})

const contactSchemaApi = z.object({
    name: z.string().min(1).max(100),
    email: z.string().email(),
    phone: z.string().optional(),
    message: z.string().min(1).max(2000),
    subject: z.string().optional(),
})

const allowedOrigin = process.env.SITE_URL || 'http://localhost:3000'
const responseHeaders = new Headers({
    'Access-Control-Allow-Origin': allowedOrigin,
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
})

export async function OPTIONS() {
    return new NextResponse(null, {status: 204, headers: responseHeaders})
}

export async function POST(request: Request) {
    try {
        // IP aus Header (ggf. anpassen, je nach Hosting)
        const ip = request.headers.get('x-forwarded-for') || 'unknown'

        // Rate-Limit prüfen
        try {
            await rateLimiter.consume(ip)
        } catch {
            return NextResponse.json(
                {ok: false, error: 'Zu viele Anfragen. Bitte warte eine Stunde.'},
                {status: 429, headers: responseHeaders}
            )
        }

        const origin = request.headers.get('origin')
        if (origin !== allowedOrigin) {
            return NextResponse.json(
                {ok: false, error: 'Origin nicht erlaubt'},
                {status: 403, headers: {'Access-Control-Allow-Origin': allowedOrigin}}
            )
        }
        const json = await request.json()
        const data = contactSchemaApi.parse(json)

        // Spam-Check, subject = honeypot
        if (data.subject) {
            return NextResponse.json({ok: true}, {status: 200, headers: responseHeaders})
        }

        // Einfache Sanitization: keine HTML-Tags erlauben
        const sanitizedMessage = data.message.replace(/<[^>]*>?/gm, '').trim()

        // Links blockieren
        if (/https?:\/\//i.test(sanitizedMessage)) {
            return NextResponse.json(
                {ok: false, error: 'Links sind nicht erlaubt.'},
                {status: 400, headers: responseHeaders}
            )
        }

        // SMTP-Transport per Umgebungsvariablen konfigurieren
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: Number(process.env.SMTP_PORT),
            secure: false, // Port 587 = STARTTLS, daher false
            requireTLS: true, // TLS erzwingen
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
        })

        await transporter.sendMail({
            from: `Kontaktformular <${process.env.SMTP_USER}>`,
            to: process.env.CONTACT_EMAIL,
            subject: `Neue Kontaktanfrage von ${data.name}`,
            text: `Name: ${data.name}\nEmail: ${data.email}\nTelefon: ${data.phone || '-'}\n\nNachricht:\n${sanitizedMessage}`,
        })

        return NextResponse.json({ok: true}, {headers: responseHeaders})
    } catch (error) {
        if (process.env.NODE_ENV === "development") {
            console.error(error);
        }
        return NextResponse.json({ok: false, error: 'Serverfehler'}, {status: 500, headers: responseHeaders})
    }
}