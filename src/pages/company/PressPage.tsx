import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ArrowLeft, Newspaper, Mic, Mail, Phone } from 'lucide-react'
import Button from '../../components/Button'

const PressPage = () => {
  const { t } = useTranslation()

  const pressReleases = [
    {
      date: 'December 15, 2025',
      title: 'WebPad Reaches 1 Million Active Readers',
      summary: 'WebPad celebrates major milestone with growing community of webtoon enthusiasts.',
    },
    {
      date: 'November 1, 2025',
      title: 'WebPad Launches Creator Support Program',
      summary: 'New initiative provides resources and support for independent webtoon creators.',
    },
    {
      date: 'September 20, 2025',
      title: 'WebPad Expands to Southeast Asia',
      summary: 'Platform now available in Thailand, Vietnam, and Indonesia.',
    },
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
            {t('static.pressTitle')}
          </h1>

          <p className="text-lg text-gray-600 mb-8">{t('press.intro')}</p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            <div className="p-4 bg-gray-50 rounded-xl text-center">
              <Newspaper className="w-8 h-8 mx-auto text-primary-600 mb-2" />
              <p className="text-2xl font-bold text-gray-900">50+</p>
              <p className="text-sm text-gray-500">{t('press.articles')}</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-xl text-center">
              <Mic className="w-8 h-8 mx-auto text-primary-600 mb-2" />
              <p className="text-2xl font-bold text-gray-900">20+</p>
              <p className="text-sm text-gray-500">{t('press.interviews')}</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-xl text-center">
              <Mail className="w-8 h-8 mx-auto text-primary-600 mb-2" />
              <p className="text-2xl font-bold text-gray-900">100+</p>
              <p className="text-sm text-gray-500">{t('press.mentions')}</p>
            </div>
          </div>

          <div className="prose prose-gray max-w-none">
            <h2>{t('press.recentNews')}</h2>
          </div>

          <div className="space-y-4 mb-8">
            {pressReleases.map((release) => (
              <div key={release.title} className="border-l-4 border-primary-500 pl-4 py-2">
                <p className="text-sm text-gray-500">{release.date}</p>
                <h3 className="font-semibold text-gray-900">{release.title}</h3>
                <p className="text-gray-600 mt-1">{release.summary}</p>
              </div>
            ))}
          </div>

          <div className="prose prose-gray max-w-none">
            <h2>{t('press.mediaKit')}</h2>
            <p>{t('press.mediaKitDesc')}</p>
          </div>

          <div className="mt-4 mb-8">
            <Button variant="outline">{t('press.downloadKit')}</Button>
          </div>

          <div className="prose prose-gray max-w-none">
            <h2>{t('press.contact')}</h2>
          </div>

          <div className="flex flex-col gap-2">
            <p className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-gray-500" />
              press@webpad.com
            </p>
            <p className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-gray-500" />
              +95 9 123 456 789
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PressPage
