import './globals.css'
import { Montserrat, Open_Sans } from 'next/font/google'

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400','700'], // nach Bedarf anpassen
  variable: '--font-montserrat'
})

const openSans = Open_Sans({
  subsets: ['latin'],
  weight: ['400','600','700'],
  variable: '--font-open-sans'
})

export const metadata = {
  title: 'Dein Seitentitel',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${montserrat.variable} ${openSans.variable}`}>
      <body>{children}</body>
    </html>
  )
}
