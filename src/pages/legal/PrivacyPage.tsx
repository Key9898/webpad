import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ArrowLeft } from 'lucide-react'

const PrivacyPage = () => {
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
            {t('static.privacyTitle')}
          </h1>
          <p className="text-sm text-gray-500 mb-6">{t('static.lastUpdated')}: January 1, 2026</p>

          <div className="prose prose-gray max-w-none">
            <h2>{t('static.informationWeCollect')}</h2>
            <p>{t('static.informationWeCollectDesc')}</p>

            <h3>{t('static.personalInfo')}</h3>
            <p>{t('static.personalInfoDesc')}</p>

            <h3>{t('static.usageData')}</h3>
            <p>{t('static.usageDataDesc')}</p>

            <h2>{t('static.howWeUse')}</h2>
            <p>{t('static.howWeUseDesc')}</p>

            <ul>
              <li>{t('static.useProvide')}</li>
              <li>{t('static.useImprove')}</li>
              <li>{t('static.useCommunicate')}</li>
              <li>{t('static.useSecurity')}</li>
            </ul>

            <h2>{t('static.dataSharing')}</h2>
            <p>{t('static.dataSharingDesc')}</p>

            <h2>{t('static.dataSecurity')}</h2>
            <p>{t('static.dataSecurityDesc')}</p>

            <h2>{t('static.yourRights')}</h2>
            <p>{t('static.yourRightsDesc')}</p>

            <h2>{t('static.contactUs')}</h2>
            <p>{t('static.contactUsDesc')}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PrivacyPage
