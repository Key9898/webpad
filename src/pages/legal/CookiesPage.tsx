import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ArrowLeft } from 'lucide-react'

const CookiesPage = () => {
  const { t } = useTranslation()

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-primary-600 transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          {t('common.back')}
        </Link>

        <div className="bg-white rounded-2xl shadow-sm p-6 sm:p-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
            {t('static.cookiesTitle')}
          </h1>
          <p className="text-sm text-gray-500 mb-6">{t('static.lastUpdated')}: January 1, 2026</p>

          <div className="prose prose-gray max-w-none">
            <h2>{t('static.whatAreCookies')}</h2>
            <p>{t('static.whatAreCookiesDesc')}</p>

            <h2>{t('static.howWeUseCookies')}</h2>
            <p>{t('static.howWeUseCookiesDesc')}</p>

            <h3>{t('static.essentialCookies')}</h3>
            <p>{t('static.essentialCookiesDesc')}</p>

            <h3>{t('static.analyticsCookies')}</h3>
            <p>{t('static.analyticsCookiesDesc')}</p>

            <h3>{t('static.functionalCookies')}</h3>
            <p>{t('static.functionalCookiesDesc')}</p>

            <h3>{t('static.marketingCookies')}</h3>
            <p>{t('static.marketingCookiesDesc')}</p>

            <h2>{t('static.managingCookies')}</h2>
            <p>{t('static.managingCookiesDesc')}</p>

            <h2>{t('static.thirdPartyCookies')}</h2>
            <p>{t('static.thirdPartyCookiesDesc')}</p>

            <h2>{t('static.updatesPolicy')}</h2>
            <p>{t('static.updatesPolicyDesc')}</p>

            <h2>{t('static.contactUs')}</h2>
            <p>{t('static.contactUsDesc')}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CookiesPage
