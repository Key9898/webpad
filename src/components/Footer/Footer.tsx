import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Facebook, Send, Instagram, Youtube } from 'lucide-react'

const Footer = () => {
  const { t } = useTranslation()

  const footerLinks = {
    company: [
      { name: t('footer.about'), path: '/about' },
      { name: t('footer.careers'), path: '/careers' },
      { name: t('footer.press'), path: '/press' },
    ],
    support: [
      { name: t('footer.help'), path: '/help' },
      { name: t('footer.contact'), path: '/contact' },
      { name: t('footer.faq'), path: '/faq' },
    ],
    legal: [
      { name: t('footer.privacy'), path: '/privacy' },
      { name: t('footer.terms'), path: '/terms' },
      { name: t('footer.cookies'), path: '/cookies' },
    ],
  }

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Send, href: '#', label: 'Telegram' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Youtube, href: '#', label: 'YouTube' },
  ]

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="text-2xl font-bold text-primary-400">
              WebPad
            </Link>
            <p className="mt-4 text-gray-400 text-sm">{t('footer.description')}</p>
            <div className="flex items-center gap-4 mt-6">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="p-2 text-gray-400 hover:text-white transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-4">{t('footer.company')}</h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-4">{t('footer.support')}</h3>
            <ul className="space-y-2">
              {footerLinks.support.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-4">{t('footer.legal')}</h3>
            <ul className="space-y-2">
              {footerLinks.legal.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center">
          <p className="text-gray-500 text-sm">{t('footer.copyright')}</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
