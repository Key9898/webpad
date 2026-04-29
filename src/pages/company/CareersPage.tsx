import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ArrowLeft, MapPin, Clock, Briefcase, Heart } from 'lucide-react'
import Button from '../../components/Button'

const CareersPage = () => {
  const { t } = useTranslation()

  const jobs = [
    {
      title: 'Senior Frontend Developer',
      department: 'Engineering',
      location: 'Remote',
      type: 'Full-time',
    },
    {
      title: 'Backend Developer',
      department: 'Engineering',
      location: 'Yangon, Myanmar',
      type: 'Full-time',
    },
    {
      title: 'UI/UX Designer',
      department: 'Design',
      location: 'Remote',
      type: 'Full-time',
    },
    {
      title: 'Content Moderator',
      department: 'Operations',
      location: 'Yangon, Myanmar',
      type: 'Part-time',
    },
  ]

  const benefits = [
    { icon: Heart, title: t('careers.health'), desc: t('careers.healthDesc') },
    { icon: Clock, title: t('careers.flexible'), desc: t('careers.flexibleDesc') },
    { icon: Briefcase, title: t('careers.growth'), desc: t('careers.growthDesc') },
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
            {t('static.careersTitle')}
          </h1>

          <p className="text-lg text-gray-600 mb-8">{t('careers.intro')}</p>

          <div className="prose prose-gray max-w-none">
            <h2>{t('careers.openPositions')}</h2>
          </div>

          <div className="space-y-4 mb-8">
            {jobs.map((job) => (
              <div
                key={job.title}
                className="border border-gray-200 rounded-xl p-4 hover:border-primary-300 transition-colors"
              >
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <h3 className="font-semibold text-gray-900">{job.title}</h3>
                    <div className="flex flex-wrap gap-2 mt-2 text-sm text-gray-500">
                      <span>{job.department}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {job.location}
                      </span>
                      <span>•</span>
                      <span>{job.type}</span>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    {t('careers.apply')}
                  </Button>
                </div>
              </div>
            ))}
          </div>

          <div className="prose prose-gray max-w-none">
            <h2>{t('careers.benefits')}</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            {benefits.map((benefit) => (
              <div key={benefit.title} className="p-4 bg-gray-50 rounded-xl">
                <benefit.icon className="w-8 h-8 text-primary-600 mb-2" />
                <h3 className="font-semibold text-gray-900">{benefit.title}</h3>
                <p className="text-sm text-gray-500 mt-1">{benefit.desc}</p>
              </div>
            ))}
          </div>

          <div className="prose prose-gray max-w-none">
            <h2>{t('careers.culture')}</h2>
            <p>{t('careers.cultureDesc')}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CareersPage
