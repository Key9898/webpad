import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ArrowLeft, Users, BookOpen, Globe, Heart } from 'lucide-react'

const AboutPage = () => {
  const { t } = useTranslation()

  const stats = [
    { icon: Users, value: '1M+', label: t('about.readers') },
    { icon: BookOpen, value: '10K+', label: t('about.webtoons') },
    { icon: Globe, value: '50+', label: t('about.countries') },
    { icon: Heart, value: '5M+', label: t('about.likes') },
  ]

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
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">
            {t('static.aboutTitle')}
          </h1>

          <p className="text-lg text-gray-600 mb-8">{t('about.mission')}</p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center p-4 bg-gray-50 rounded-xl">
                <stat.icon className="w-8 h-8 mx-auto text-primary-600 mb-2" />
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                <p className="text-sm text-gray-500">{stat.label}</p>
              </div>
            ))}
          </div>

          <div className="prose prose-gray max-w-none">
            <h2>{t('about.ourStory')}</h2>
            <p>{t('about.ourStoryDesc')}</p>

            <h2>{t('about.ourMission')}</h2>
            <p>{t('about.ourMissionDesc')}</p>

            <h2>{t('about.ourValues')}</h2>
            <ul>
              <li>{t('about.valueQuality')}</li>
              <li>{t('about.valueCommunity')}</li>
              <li>{t('about.valueCreators')}</li>
              <li>{t('about.valueInnovation')}</li>
            </ul>

            <h2>{t('about.joinUs')}</h2>
            <p>{t('about.joinUsDesc')}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AboutPage
