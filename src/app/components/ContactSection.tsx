// components/ContactSection.tsx
'use client'

import React from 'react'
import {useForm} from 'react-hook-form'
import {zodResolver} from '@hookform/resolvers/zod'
import {z} from 'zod'
import {toast} from 'react-hot-toast'
import {SocialIcon} from 'react-social-icons'

// Validierungsschema mit Zod
const contactSchema = z.object({
    name: z.string().min(1, 'Name ist erforderlich'),
    email: z.string().email('Ungültige E-Mail-Adresse'),
    phone: z.string().min(1, 'Telefonnummer ist erforderlich'),
    message: z.string().min(1, 'Nachricht ist erforderlich'),
    honeypot: z.string().optional(),
})

type ContactFormData = z.infer<typeof contactSchema>

export default function ContactSection({ id }: { id?: string }) {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting }
    } = useForm<ContactFormData>({
        resolver: zodResolver(contactSchema),
    })

    const onSubmit = async (data: ContactFormData) => {
        // Honeypot-Feld gegen Spam
        if (data.honeypot) return

        try {
            const res = await fetch('/api/contact', {
                method: 'POST',
                body: JSON.stringify(data),
                headers: { 'Content-Type': 'application/json' },
            });
            if (res.ok) {
                toast.success('Vielen Dank! Wir melden uns umgehend.');
                reset()
            } else {
                toast.error('Es ist ein Fehler aufgetreten. Bitte versuche es erneut oder kontaktiere uns alternativ über WhatsApp, Social Media oder telefonisch.');;
            }
        } catch (e) {
            if (process.env.NODE_ENV === "development") {
                console.error(e);
            }
            toast.error('Es ist ein Fehler aufgetreten. Bitte versuche es erneut oder kontaktiere uns alternativ über WhatsApp, Social Media oder telefonisch.');
        }
    }

    return (
        <section
            id={id}
            className="relative h-[960px] flex items-center justify-center bg-center bg-cover bg-no-repeat text-3xl"
            style={{ backgroundImage: "url('/contact.webp')" }}
        >
            {/* Formular-Container */}
            <div className="relative z-10 p-4 sm:p-8 rounded shadow max-w-lg w-full mx-4 bg-[var(--contact-bg-color)]">
                <h2 className="text-3xl font-bold mb-4">Starte dein Training jetzt</h2>
                <p className="mb-6">Sichere dir dein unverbindliches Erstgespräch – wir melden uns umgehend.</p>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
                    {/* Honeypot-Feld unsichtbar */}
                    <input type="text" {...register('honeypot')} className="hidden" />

                    <div>
                        <label htmlFor="name" className="block text-sm font-medium mb-1">Name</label>
                        <input
                            id="name"
                            {...register('name')}
                            placeholder="Dein Name"
                            className="w-full p-3 rounded focus:outline-none"
                        />
                        {errors.name && <p className="text-red-600 text-sm mt-1">{errors.name.message}</p>}
                    </div>

                    <div>
                        <label htmlFor="phone" className="block text-sm font-medium mb-1">Telefon</label>
                        <input
                            id="phone"
                            type="tel"
                            {...register('phone')}
                            placeholder="Deine Telefonnummer"
                            className="w-full p-3 rounded focus:outline-none"
                        />
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-sm font-medium mb-1">E-Mail</label>
                        <input
                            id="email"
                            type="email"
                            {...register('email')}
                            placeholder="Deine E-Mail-Adresse"
                            className="w-full p-3 rounded focus:outline-none"
                        />
                        {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>}
                    </div>

                    <div>
                        <label htmlFor="message" className="block text-sm font-medium mb-1">Nachricht</label>
                        <textarea
                            id="message"
                            {...register('message')}
                            placeholder="Deine Nachricht"
                            className="w-full p-3 rounded focus:outline-none h-32 resize-none"
                        />
                        {errors.message && <p className="text-red-600 text-sm mt-1">{errors.message.message}</p>}
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="contact-button w-full py-3"
                    >
                        {isSubmitting ? 'Sende...' : 'Absenden'}
                    </button>

                    {/* WhatsApp Alternative */}
                    <div className="mt-6 text-center">
                        <p className="mb-2 text-base">Schreibe uns alternativ über WhatsApp!</p>
                        <div className="flex justify-center">
                            <SocialIcon
                                network="whatsapp"
                                url="https://api.whatsapp.com/send?phone=%2B491744010440"
                                target="_blank"
                                fgColor="white"
                                bgColor="green"
                                className="!w-12 !h-12"
                            />
                        </div>
                    </div>
                </form>
            </div>
        </section>
    )
}