import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { motion, useReducedMotion, type MotionProps } from 'framer-motion'
import { Play, Bookmark, Eye, ChevronRight } from 'lucide-react'
import Button from '../../components/Button'
import Card from '../../components/Card'
import { mockWebtoons, mockGenres } from '../../demo/mocks/data'
import { formatCount } from '../../utils/formatters'

const HomePage = () => {
  const { t, i18n } = useTranslation()
  const lang = i18n.language as 'mm' | 'en'
  const prefersReducedMotion = useReducedMotion()

  // Fix 4: Featured webtoon randomization (changes on every visit)
  const [featuredIndex] = useState(() => Math.floor(Math.random() * mockWebtoons.length))
  const featuredWebtoon = mockWebtoons[featuredIndex]

  // Fix 5: Genre active state
  const [selectedGenre, setSelectedGenre] = useState('all')

  // Fix 8: Loading skeleton state
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set())
  const [failedImages, setFailedImages] = useState<Set<string>>(new Set())
  const handleImageLoad = (id: string) => {
    setLoadedImages((prev) => {
      const next = new Set(prev)
      next.add(id)
      return next
    })
  }
  const handleImageError = (id: string) => {
    setFailedImages((prev) => {
      const next = new Set(prev)
      next.add(id)
      return next
    })
  }

  const trendingWebtoons = mockWebtoons.slice(0, 6)
  const newReleases = mockWebtoons.slice(3, 9)

  // Format date for new releases
  const formatReleaseDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24))
    if (diffDays < 1) return 'Today'
    if (diffDays === 1) return 'Yesterday'
    if (diffDays < 30) return `${diffDays} days ago`
    if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`
    return `${Math.floor(diffDays / 365)} years ago`
  }

  // Fix 13: Reduced motion helper
  const getAnimationProps = (
    initial: MotionProps['initial'],
    animate: MotionProps['animate'],
    transition: MotionProps['transition']
  ): MotionProps => {
    if (prefersReducedMotion) {
      return { initial: false, animate, transition: { duration: 0 } }
    }
    return { initial, animate, transition }
  }

  return (
    <>
      <section className="bg-gradient-to-br from-primary-600 via-primary-700 to-primary-900 text-white -mt-16 pt-16 safe-top">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 lg:py-20 xl:py-24 hero-landscape-adjust">
          <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
            <motion.div
              {...getAnimationProps(
                { opacity: 0, x: -20 },
                { opacity: 1, x: 0 },
                { duration: 0.5 }
              )}
              className="flex-1 text-center lg:text-left"
            >
              <span
                className="inline-block bg-white/20 backdrop-blur px-3 py-1 rounded-full text-sm font-medium mb-4"
                role="status"
                aria-label={t('home.featured')}
              >
                {t('home.featured')}
              </span>
              <h1 className="text-3xl sm:text-4xl md:text-[2.5rem] lg:text-5xl xl:text-6xl font-bold mb-4">
                {featuredWebtoon.title[lang]}
              </h1>
              <p className="text-white/80 text-base sm:text-lg mb-6 max-w-md sm:max-w-xl">
                {featuredWebtoon.description[lang]}
              </p>
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 mb-6">
                <Link
                  to={`/author/${featuredWebtoon.author.id}`}
                  className="flex items-center gap-2 hover:opacity-80 transition focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary-700 rounded-md px-1"
                  aria-label={`View ${featuredWebtoon.author.name[lang]}'s profile`}
                >
                  <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                    <span className="font-bold text-sm">
                      {featuredWebtoon.author.name[lang].charAt(0)}
                    </span>
                  </div>
                  <span className="font-medium">{featuredWebtoon.author.name[lang]}</span>
                </Link>
                <span className="text-white/60 hidden sm:inline">|</span>
                <span className="text-white/80">{featuredWebtoon.genres.join(', ')}</span>
                <span className="text-white/60 hidden sm:inline">|</span>
                <span className="text-white/80">
                  {formatCount(featuredWebtoon.viewCount)} {t('webtoon.views')}
                </span>
              </div>
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4">
                <Link
                  to={`/webtoon/${featuredWebtoon.id}`}
                  className="focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary-700 rounded-full"
                >
                  <Button variant="secondary" leftIcon={<Play className="w-5 h-5" />}>
                    {t('home.startReading')}
                  </Button>
                </Link>
                <Button variant="heroOutline" leftIcon={<Bookmark className="w-5 h-5" />}>
                  {t('home.addToLibrary')}
                </Button>
              </div>
            </motion.div>
            <motion.div
              {...getAnimationProps(
                { opacity: 0, x: 20 },
                { opacity: 1, x: 0 },
                { duration: 0.5, delay: 0.2 }
              )}
              className="block w-48 sm:w-56 lg:w-64 mx-auto lg:mx-0"
            >
              <div className="aspect-[3/4] bg-white/10 backdrop-blur rounded-2xl shadow-2xl overflow-hidden border border-white/20">
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
            <span className="text-gray-500 font-medium whitespace-nowrap hidden sm:inline">
              {t('home.genres')}:
            </span>
            {mockGenres.map((genre) => (
              <Link
                key={genre.id}
                to={`/categories?genre=${genre.slug}`}
                onClick={() => setSelectedGenre(genre.slug)}
                className={`px-4 py-2 min-h-[44px] inline-flex items-center rounded-full text-sm font-medium whitespace-nowrap transition focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 ${
                  selectedGenre === genre.slug
                    ? 'bg-primary-600 text-white hover:bg-primary-700'
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
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900">{t('home.trendingNow')}</h2>
            <Link
              to="/categories?sort=popular"
              className="text-primary-600 font-medium hover:text-primary-700 transition flex items-center gap-1 focus:outline-none focus:ring-2 focus:ring-primary-500 rounded-md px-2 py-1"
            >
              {t('common.viewAll')}
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-6">
            {trendingWebtoons.map((webtoon, index) => (
              <motion.div
                key={webtoon.id}
                {...getAnimationProps(
                  { opacity: 0, y: 20 },
                  { opacity: 1, y: 0 },
                  { duration: 0.3, delay: index * 0.05 }
                )}
              >
                <Link
                  to={`/webtoon/${webtoon.id}`}
                  className="block focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 rounded-xl"
                >
                  <Card variant="interactive" padding="none" className="overflow-hidden">
                    <div
                      className={`aspect-[3/4] ${webtoon.coverColor} flex items-center justify-center relative`}
                    >
                      {webtoon.coverImage ? (
                        <>
                          {/* Cover text - in DOM for accessibility/tests, covered by image when loaded */}
                          <span aria-hidden="true" className="text-white/60 text-sm">
                            Cover
                          </span>
                          {!loadedImages.has(webtoon.id) && !failedImages.has(webtoon.id) && (
                            <div className="absolute inset-0 bg-gray-200 animate-pulse" />
                          )}
                          <img
                            src={webtoon.coverImage}
                            alt={webtoon.title[lang]}
                            onLoad={() => handleImageLoad(webtoon.id)}
                            onError={() => handleImageError(webtoon.id)}
                            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
                              loadedImages.has(webtoon.id) ? 'opacity-100' : 'opacity-0'
                            }`}
                          />
                        </>
                      ) : (
                        <span className="text-white/60 text-sm">Cover</span>
                      )}
                    </div>
                    <div className="p-3 sm:p-3.5">
                      <h3
                        className="font-semibold text-gray-900 truncate text-sm"
                        title={webtoon.title[lang]}
                      >
                        {webtoon.title[lang]}
                      </h3>
                      <p className="text-xs text-gray-500 truncate" title={webtoon.genres[0]}>
                        {webtoon.genres[0]}
                      </p>
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
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                {t('home.newReleases')}
              </h2>
              <p className="text-xs sm:text-sm text-gray-500 mt-1">
                Latest webtoons added to WebPad
              </p>
            </div>
            <Link
              to="/categories?sort=new"
              className="text-primary-600 font-medium hover:text-primary-700 transition flex items-center gap-1 focus:outline-none focus:ring-2 focus:ring-primary-500 rounded-md px-3 py-2 min-h-[44px]"
            >
              {t('common.viewAll')}
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-6">
            {newReleases.map((webtoon, index) => (
              <motion.div
                key={webtoon.id}
                {...getAnimationProps(
                  { opacity: 0, y: 20 },
                  { opacity: 1, y: 0 },
                  { duration: 0.3, delay: index * 0.05 }
                )}
              >
                <Link
                  to={`/webtoon/${webtoon.id}`}
                  className="block focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 rounded-xl"
                >
                  <Card variant="interactive" padding="none" className="overflow-hidden">
                    <div
                      className={`aspect-[3/4] ${webtoon.coverColor} flex items-center justify-center relative`}
                    >
                      {webtoon.coverImage ? (
                        <>
                          {/* Cover text - in DOM for accessibility/tests, covered by image when loaded */}
                          <span aria-hidden="true" className="text-white/60 text-sm">
                            Cover
                          </span>
                          {!loadedImages.has(webtoon.id) && !failedImages.has(webtoon.id) && (
                            <div className="absolute inset-0 bg-gray-200 animate-pulse" />
                          )}
                          <img
                            src={webtoon.coverImage}
                            alt={webtoon.title[lang]}
                            onLoad={() => handleImageLoad(webtoon.id)}
                            onError={() => handleImageError(webtoon.id)}
                            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
                              loadedImages.has(webtoon.id) ? 'opacity-100' : 'opacity-0'
                            }`}
                          />
                        </>
                      ) : (
                        <span className="text-white/60 text-sm">Cover</span>
                      )}
                      <span className="absolute top-2 left-2 px-2 py-0.5 bg-green-500 text-white text-xs rounded-full font-medium">
                        {t('webtoon.new')}
                      </span>
                    </div>
                    <div className="p-3 sm:p-3.5">
                      <h3
                        className="font-semibold text-gray-900 truncate text-sm"
                        title={webtoon.title[lang]}
                      >
                        {webtoon.title[lang]}
                      </h3>
                      <p className="text-xs text-gray-500 truncate" title={webtoon.genres[0]}>
                        {webtoon.genres[0]}
                      </p>
                      <div className="flex items-center justify-between mt-1.5 text-xs text-gray-400">
                        <div className="flex items-center gap-1">
                          <Eye className="w-3 h-3" />
                          <span>{formatCount(webtoon.viewCount)}</span>
                        </div>
                        <span className="text-gray-400">
                          {formatReleaseDate(webtoon.createdAt)}
                        </span>
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
          <div className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-2xl p-6 sm:p-8 md:p-10 lg:p-12 text-white text-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
              {t('home.startJourney')}
            </h2>
            <p className="text-white mb-6 max-w-xl mx-auto">{t('home.joinDescription')}</p>
            <Link
              to="/register"
              className="inline-block focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary-700 rounded-full"
            >
              <Button variant="secondary">{t('home.getStartedFree')}</Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}

export default HomePage
