import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ArrowLeft } from 'lucide-react'

const TermsPage = () => {
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
            {t('static.termsTitle')}
          </h1>
          <p className="text-sm text-gray-500 mb-6">{t('static.lastUpdated')}: January 1, 2026</p>

          <div className="prose prose-gray max-w-none">
            <h2>{t('static.acceptanceTerms')}</h2>
            <p>{t('static.acceptanceTermsDesc')}</p>

            <h2>{t('static.useLicense')}</h2>
            <p>{t('static.useLicenseDesc')}</p>

            <h3>{t('static.permitted')}</h3>
            <ul>
              <li>{t('static.permittedAccess')}</li>
              <li>{t('static.permittedPersonal')}</li>
              <li>{t('static.permittedDownload')}</li>
            </ul>

            <h3>{t('static.prohibited')}</h3>
            <ul>
              <li>{t('static.prohibitedModify')}</li>
              <li>{t('static.prohibitedCommercial')}</li>
              <li>{t('static.prohibitedReverse')}</li>
              <li>{t('static.prohibitedTransfer')}</li>
            </ul>

            <h2>{t('static.userAccounts')}</h2>
            <p>{t('static.userAccountsDesc')}</p>

            <h2>{t('static.intellectualProperty')}</h2>
            <p>{t('static.intellectualPropertyDesc')}</p>

            <h2>{t('static.premiumContent')}</h2>
            <p>{t('static.premiumContentDesc')}</p>

            <h2>{t('static.termination')}</h2>
            <p>{t('static.terminationDesc')}</p>

            <h2>{t('static.limitation')}</h2>
            <p>{t('static.limitationDesc')}</p>

            <h2>{t('static.governingLaw')}</h2>
            <p>{t('static.governingLawDesc')}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TermsPage
