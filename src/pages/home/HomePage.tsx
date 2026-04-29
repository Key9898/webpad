import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { Play, Bookmark, Eye, ChevronRight } from 'lucide-react'
import Button from '../../components/Button'
import Card from '../../components/Card'
import { mockWebtoons, mockGenres } from '../../demo/mocks/data'
import { formatCount } from '../../utils/formatters'

const HomePage = () => {
  const { t, i18n } = useTranslation()
  const lang = i18n.language as 'mm' | 'en'
  const featuredWebtoon = mockWebtoons[0]
  const trendingWebtoons = mockWebtoons.slice(0, 6)
  const newReleases = mockWebtoons.slice(3, 9)

  return (
    <>
      <section className="bg-gradient-to-br from-primary-600 via-primary-700 to-primary-900 text-white -mt-16 pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
          <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="flex-1 text-center lg:text-left"
            >
              <span className="inline-block bg-white/20 backdrop-blur px-3 py-1 rounded-full text-sm font-medium mb-4">
                {t('home.featured')}
              </span>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
                {featuredWebtoon.title[lang]}
              </h1>
              <p className="text-white/80 text-lg mb-6 max-w-xl">
                {featuredWebtoon.description[lang]}
              </p>
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 mb-6">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                    <span className="font-bold text-sm">
                      {featuredWebtoon.author.name[lang].charAt(0)}
                    </span>
                  </div>
                  <span className="font-medium">{featuredWebtoon.author.name[lang]}</span>
                </div>
                <span className="text-white/60">|</span>
                <span className="text-white/80">{featuredWebtoon.genres.join(', ')}</span>
                <span className="text-white/60">|</span>
                <span className="text-white/80">
                  {formatCount(featuredWebtoon.viewCount)} {t('webtoon.views')}
                </span>
              </div>
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4">
                <Link to={`/webtoon/${featuredWebtoon.id}`}>
                  <Button variant="secondary" leftIcon={<Play className="w-5 h-5" />}>
                    {t('home.startReading')}
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  leftIcon={<Bookmark className="w-5 h-5" />}
                  className="!border-white !text-white hover:!bg-white/10"
                >
                  {t('home.addToLibrary')}
                </Button>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="hidden lg:block"
            >
              <div className="w-64 h-80 bg-white/10 backdrop-blur rounded-2xl shadow-2xl overflow-hidden border border-white/20">
                {featuredWebtoon.coverImage ? (
                  <img
                    src={featuredWebtoon.coverImage}
                    alt={featuredWebtoon.title[lang]}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div
                    className={`w-full h-full ${featuredWebtoon.coverColor} flex items-center justify-center`}
                  >
                    <span className="text-white/60 text-sm">Cover Image</span>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-hide">
            <span className="text-gray-500 font-medium whitespace-nowrap">{t('home.genres')}:</span>
            {mockGenres.map((genre, index) => (
              <Link
                key={genre.id}
                to={`/genre/${genre.slug}`}
                className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition ${
                  index === 0
                    ? 'bg-primary-100 text-primary-700 hover:bg-primary-200'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {genre.name[lang]}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-900">{t('home.trendingNow')}</h2>
            <Link
              to="/popular"
              className="text-primary-600 font-medium hover:text-primary-700 transition flex items-center gap-1"
            >
              {t('common.viewAll')}
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-6">
            {trendingWebtoons.map((webtoon, index) => (
              <motion.div
                key={webtoon.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <Link to={`/webtoon/${webtoon.id}`}>
                  <Card variant="interactive" padding="none" className="overflow-hidden">
                    <div
                      className={`aspect-[3/4] ${webtoon.coverColor} flex items-center justify-center`}
                    >
                      {webtoon.coverImage ? (
                        <img
                          src={webtoon.coverImage}
                          alt={webtoon.title[lang]}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span className="text-white/60 text-sm">Cover</span>
                      )}
                    </div>
                    <div className="p-3">
                      <h3 className="font-semibold text-gray-900 truncate text-sm">
                        {webtoon.title[lang]}
                      </h3>
                      <p className="text-xs text-gray-500 truncate">{webtoon.genres[0]}</p>
                      <div className="flex items-center gap-2 mt-1.5 text-xs text-gray-400">
                        <Eye className="w-3 h-3" />
                        <span>{formatCount(webtoon.viewCount)}</span>
                      </div>
                    </div>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-900">{t('home.newReleases')}</h2>
            <Link
              to="/new"
              className="text-primary-600 font-medium hover:text-primary-700 transition flex items-center gap-1"
            >
              {t('common.viewAll')}
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-6">
            {newReleases.map((webtoon, index) => (
              <motion.div
                key={webtoon.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <Link to={`/webtoon/${webtoon.id}`}>
                  <Card variant="interactive" padding="none" className="overflow-hidden">
                    <div
                      className={`aspect-[3/4] ${webtoon.coverColor} flex items-center justify-center relative`}
                    >
                      {webtoon.coverImage ? (
                        <img
                          src={webtoon.coverImage}
                          alt={webtoon.title[lang]}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span className="text-white/60 text-sm">Cover</span>
                      )}
                      <span className="absolute top-2 left-2 px-2 py-0.5 bg-green-500 text-white text-xs rounded-full font-medium">
                        {t('webtoon.new')}
                      </span>
                    </div>
                    <div className="p-3">
                      <h3 className="font-semibold text-gray-900 truncate text-sm">
                        {webtoon.title[lang]}
                      </h3>
                      <p className="text-xs text-gray-500 truncate">{webtoon.genres[0]}</p>
                      <div className="flex items-center gap-2 mt-1.5 text-xs text-gray-400">
                        <Eye className="w-3 h-3" />
                        <span>{webtoon.viewCount}</span>
                      </div>
                    </div>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-2xl p-8 sm:p-12 text-white text-center">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">{t('home.startJourney')}</h2>
            <p className="text-white/80 mb-6 max-w-xl mx-auto">{t('home.joinDescription')}</p>
            <Link to="/register">
              <Button variant="secondary">{t('home.getStartedFree')}</Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}

export default HomePage
