import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import {
  ArrowLeft,
  Search,
  BookOpen,
  CreditCard,
  Shield,
  Settings,
  ChevronRight,
} from 'lucide-react'
import Input from '../../components/Input'

const HelpPage = () => {
  const { t } = useTranslation()
  const [searchQuery, setSearchQuery] = useState('')

  const categories = [
    { icon: BookOpen, title: t('help.gettingStarted'), articles: 12 },
    { icon: CreditCard, title: t('help.payments'), articles: 8 },
    { icon: Shield, title: t('help.accountSecurity'), articles: 6 },
    { icon: Settings, title: t('help.appSettings'), articles: 10 },
  ]

  const popularArticles = [
    { title: t('help.article1'), category: t('help.gettingStarted') },
    { title: t('help.article2'), category: t('help.payments') },
    { title: t('help.article3'), category: t('help.accountSecurity') },
    { title: t('help.article4'), category: t('help.gettingStarted') },
    { title: t('help.article5'), category: t('help.appSettings') },
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
            {t('static.helpTitle')}
          </h1>

          <div className="mb-8">
            <Input
              placeholder={t('help.searchPlaceholder')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              leftIcon={<Search className="w-5 h-5" />}
            />
          </div>

          <div className="prose prose-gray max-w-none">
            <h2>{t('help.browseByCategory')}</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {categories.map((cat) => (
              <div
                key={cat.title}
                className="p-4 border border-gray-200 rounded-xl hover:border-primary-300 hover:bg-primary-50/50 transition-colors cursor-pointer"
              >
                <cat.icon className="w-8 h-8 text-primary-600 mb-2" />
                <h3 className="font-semibold text-gray-900">{cat.title}</h3>
                <p className="text-sm text-gray-500">
                  {cat.articles} {t('help.articles')}
                </p>
              </div>
            ))}
          </div>

          <div className="prose prose-gray max-w-none">
            <h2>{t('help.popularArticles')}</h2>
          </div>

          <div className="space-y-2 mb-8">
            {popularArticles.map((article, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 border border-gray-200 rounded-xl hover:border-primary-300 transition-colors cursor-pointer"
              >
                <div>
                  <h3 className="font-medium text-gray-900">{article.title}</h3>
                  <p className="text-sm text-gray-500">{article.category}</p>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </div>
            ))}
          </div>

          <div className="prose prose-gray max-w-none">
            <h2>{t('help.needMore')}</h2>
            <p>{t('help.needMoreDesc')}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HelpPage
