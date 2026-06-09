import { useState, useEffect, useMemo } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { Search, Eye, TrendingUp, Sparkles } from 'lucide-react'
import Card from '../../components/Card'
import { mockWebtoons, mockGenres } from '../../demo/mocks/data'
import { formatCount } from '../../utils/formatters'

type SortOption = 'popular' | 'new' | 'recentlyUpdated' | 'highestRated'

const CategoriesPage = () => {
  const { t, i18n } = useTranslation()
  const lang = i18n.language as 'mm' | 'en'
  const [searchParams, setSearchParams] = useSearchParams()
  const [searchQuery, setSearchQuery] = useState('')

  // Read genre from URL (source of truth)
  const genreFromUrl = searchParams.get('genre') || 'all'
  const selectedGenre = genreFromUrl

  const sortFromUrl = searchParams.get('sort') as SortOption | null
  const [sortBy, setSortBy] = useState<SortOption>(sortFromUrl || 'popular')

  useEffect(() => {
    if (sortFromUrl) {
      setSortBy(sortFromUrl as SortOption)
    }
  }, [sortFromUrl])

  const handleSortChange = (value: SortOption) => {
    setSortBy(value)
    setSearchParams({ sort: value })
  }

  // Get the Myanmar genre name from the selected slug
  const selectedGenreName = useMemo(() => {
    const genre = mockGenres.find((g) => g.slug === selectedGenre)
    return genre?.name[lang] || ''
  }, [selectedGenre, lang])

  const handleGenreChange = (slug: string) => {
    const newParams = new URLSearchParams(searchParams)
    if (slug === 'all') {
      newParams.delete('genre')
    } else {
      newParams.set('genre', slug)
    }
    setSearchParams(newParams)
  }

  const getPageTitle = () => {
    if (sortFromUrl === 'popular') return t('home.trendingNow')
    if (sortFromUrl === 'new') return t('home.newReleases')
    return t('categories.browseByGenre')
  }

  const getPageIcon = () => {
    if (sortFromUrl === 'popular') return TrendingUp
    if (sortFromUrl === 'new') return Sparkles
    return null
  }

  const sortedAndFilteredWebtoons = useMemo(() => {
    let result = mockWebtoons.filter((webtoon) => {
      const matchesGenre = selectedGenre === 'all' || webtoon.genres.includes(selectedGenreName)
      const matchesSearch =
        webtoon.title[lang].toLowerCase().includes(searchQuery.toLowerCase()) ||
        webtoon.author.name[lang].toLowerCase().includes(searchQuery.toLowerCase())
      return matchesGenre && (searchQuery === '' || matchesSearch)
    })

    switch (sortBy) {
      case 'popular':
        result = result.sort((a, b) => b.viewCount - a.viewCount)
        break
      case 'new':
        result = result.sort((a, b) => {
          const dateA = new Date(a.createdAt).getTime()
          const dateB = new Date(b.createdAt).getTime()
          return dateB - dateA
        })
        break
      case 'recentlyUpdated':
        result = result.sort((a, b) => {
          const dateA = new Date(a.updatedAt || a.createdAt).getTime()
          const dateB = new Date(b.updatedAt || b.createdAt).getTime()
          return dateB - dateA
        })
        break
      case 'highestRated':
        result = result.sort((a, b) => b.rating - a.rating)
        break
      default:
        break
    }

    return result
  }, [selectedGenre, selectedGenreName, searchQuery, sortBy, lang])

  const PageIcon = getPageIcon()

  return (
    <>
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center gap-3 mb-6">
            {PageIcon && <PageIcon className="w-8 h-8 text-primary-600" />}
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">{getPageTitle()}</h1>
          </div>

          <div className="relative mb-6">
            <input
              type="text"
              placeholder={t('search.placeholder')}
              aria-label={t('search.placeholder')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-gray-100 border-none focus:ring-2 focus:ring-primary-500 focus:bg-white transition"
            />
            <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          </div>

          <div className="flex flex-wrap gap-2 sm:gap-3">
            {mockGenres.map((genre) => (
              <button
                type="button"
                key={genre.id}
                onClick={() => handleGenreChange(genre.slug)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                  selectedGenre === genre.slug
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {genre.name[lang]}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900">
              {sortedAndFilteredWebtoons.length} {t('categories.webtoons')}
            </h2>
            <select
              value={sortBy}
              onChange={(e) => handleSortChange(e.target.value as SortOption)}
              aria-label={t('categories.sortBy')}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary-500"
            >
              <option value="popular">{t('categories.mostPopular')}</option>
              <option value="new">{t('home.newReleases')}</option>
              <option value="recentlyUpdated">{t('categories.recentlyUpdated')}</option>
              <option value="highestRated">{t('categories.highestRated')}</option>
            </select>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-6">
            {sortedAndFilteredWebtoons.map((webtoon, index) => (
              <motion.div
                key={webtoon.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.03 }}
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
                      {webtoon.isPremium && (
                        <span className="absolute top-2 right-2 px-2 py-0.5 bg-yellow-500 text-white text-xs rounded-full font-medium">
                          {t('webtoon.premium')}
                        </span>
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

          {sortedAndFilteredWebtoons.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">{t('categories.noWebtoons')}</p>
            </div>
          )}
        </div>
      </section>
    </>
  )
}

export default CategoriesPage
