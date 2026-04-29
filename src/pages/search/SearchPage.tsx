import { useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Search, X, TrendingUp, Clock } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import Card from '../../components/Card'
import { mockWebtoons, mockGenres } from '../../demo/mocks/data'

const SearchPage = () => {
  const { t, i18n } = useTranslation()
  const lang = i18n.language as 'mm' | 'en'
  const [searchParams, setSearchParams] = useSearchParams()
  const query = searchParams.get('q') || ''
  const [searchQuery, setSearchQuery] = useState(query)

  const trendingSearches = mockGenres.slice(1, 6).map((g) => g.name[lang])
  const recentSearches = mockWebtoons.slice(0, 3).map((w) => w.title[lang])

  const searchResults = mockWebtoons.filter(
    (webtoon) =>
      webtoon.title[lang].toLowerCase().includes(searchQuery.toLowerCase()) ||
      webtoon.author.name[lang].toLowerCase().includes(searchQuery.toLowerCase()) ||
      webtoon.genres.some((g) => g.toLowerCase().includes(searchQuery.toLowerCase()))
  )

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      setSearchParams({ q: searchQuery })
    }
  }

  const clearSearch = () => {
    setSearchQuery('')
    setSearchParams({})
  }

  return (
    <>
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <form onSubmit={handleSearch} className="relative max-w-2xl mx-auto">
            <input
              type="text"
              placeholder={t('search.placeholder')}
              aria-label={t('search.placeholder')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-12 py-4 rounded-2xl bg-gray-100 border-none focus:ring-2 focus:ring-primary-500 focus:bg-white transition text-lg"
            />
            <Search className="w-6 h-6 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
            {searchQuery && (
              <button
                type="button"
                title={t('common.close')}
                aria-label={t('common.close')}
                onClick={clearSearch}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600 transition"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </form>
        </div>
      </section>

      {!searchQuery ? (
        <section className="py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <TrendingUp className="w-5 h-5 text-primary-600" />
                  <h2 className="text-lg font-semibold text-gray-900">
                    {t('search.trendingSearches')}
                  </h2>
                </div>
                <div className="flex flex-wrap gap-2">
                  {trendingSearches.map((term) => (
                    <button
                      type="button"
                      key={term}
                      onClick={() => {
                        setSearchQuery(term)
                        setSearchParams({ q: term })
                      }}
                      className="px-4 py-2 bg-primary-50 text-primary-700 rounded-full text-sm font-medium hover:bg-primary-100 transition"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Clock className="w-5 h-5 text-gray-500" />
                  <h2 className="text-lg font-semibold text-gray-900">
                    {t('search.recentSearches')}
                  </h2>
                </div>
                <div className="flex flex-wrap gap-2">
                  {recentSearches.map((term) => (
                    <button
                      type="button"
                      key={term}
                      onClick={() => {
                        setSearchQuery(term)
                        setSearchParams({ q: term })
                      }}
                      className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm font-medium hover:bg-gray-200 transition"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <section className="py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">
              {searchResults.length} {t('search.resultsFor', { query: searchQuery })}
            </h2>

            {searchResults.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-6">
                {searchResults.map((webtoon, index) => (
                  <motion.div
                    key={webtoon.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.03 }}
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
                        </div>
                      </Card>
                    </Link>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500 mb-4">
                  {t('search.noResults')} &quot;{searchQuery}&quot;
                </p>
                <p className="text-sm text-gray-400">{t('categories.noWebtoons')}</p>
              </div>
            )}
          </div>
        </section>
      )}
    </>
  )
}

export default SearchPage
