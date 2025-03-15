// components/Footer.jsx
import React from 'react'
import { Mail, Phone, MapPin } from 'lucide-react'
import { SocialIcon } from 'react-social-icons'
import SealsSection from './SealsSection'

const Footer = () => {
  return (
    <footer className="">
      <SealsSection />
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Oberer Bereich mit mehreren Spalten */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo & Kurzinfo */}
          <div>
            <h3 className="text-2xl font-bold mb-4">Markus Kaluza Premium Personal Training + Team</h3>
            <p className="text-sm">
              Dein Personal Trainer Team aus Hannover
            </p>
            <div className="mt-4 flex space-x-3">
              <SocialIcon url="https://www.facebook.com/markuskaluzafitness" fgColor="#fff" style={{ height: 35, width: 35 }} />
              <SocialIcon url="https://www.instagram.com/kaluza_personal_training" fgColor="#fff" style={{ height: 35, width: 35 }} />
              <SocialIcon url="https://www.youtube.com/@markuskaluza" fgColor="#fff" style={{ height: 35, width: 35 }} />
              <SocialIcon url="https://www.xing.com/profile/Markus_Kaluza" fgColor="#fff" style={{ height: 35, width: 35 }} />
            </div>
          </div>

          {/* Unternehmen */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Unternehmen</h4>
            <ul className="space-y-2 text-sm ">
              <li>
                <a href="#" className="hover:text-blue-600">Über uns</a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-600">Team</a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-600">Karriere</a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-600">Blog</a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:text-blue-600">FAQ</a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-600">Kontakt</a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-600">Hilfe-Center</a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-600">Dokumentation</a>
              </li>
            </ul>
          </div>

          {/* Kontakt */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Kontakt</h4>
            <ul className="space-y-3 text-sm ">
              <li className="flex items-center">
                <Mail size={16} className="mr-2" />
                <span>info@personaltrainer-hannover.de</span>
              </li>
              <li className="flex items-center">
                <Phone size={16} className="mr-2" />
                <span>+491744010440</span>
              </li>
              <li className="flex items-center">
                <MapPin size={16} className="mr-2" />
                <span>Hannoversche Str. 82, 30916 Isernhagen</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Unterer Bereich mit Copyright */}
        <div className="mt-12 border-t border-gray-300 pt-6 text-center text-sm">
          &copy; {new Date().getFullYear()} Markus Kaluza - Premium Personal Training + Team. Alle Rechte vorbehalten.
        </div>
      </div>
    </footer>
  )
}

export default Footer
