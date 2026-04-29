import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Play, Bookmark, Share2, Star, Eye, Heart, ChevronRight, Check, Lock } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import Button from '../../components/Button'
import Card from '../../components/Card'
import { mockWebtoons, mockEpisodes } from '../../demo/mocks/data'
import { formatCount } from '../../utils/formatters'

const WebtoonDetailPage = () => {
  const { t, i18n } = useTranslation()
  const lang = i18n.language as 'mm' | 'en'
  const { id } = useParams()
  const [isBookmarked, setIsBookmarked] = useState(false)

  const webtoon = mockWebtoons.find((w) => w.id === id) || mockWebtoons[0]
  const episodes = mockEpisodes.filter((e) => e.webtoonId === webtoon.id)

  const readEpisodes = ['1', '2', '3']

  return (
    <>
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row gap-6 md:gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="flex-shrink-0 mx-auto md:mx-0"
            >
              <div
                className={`w-48 sm:w-56 h-64 sm:h-72 ${webtoon.coverColor} rounded-2xl shadow-xl overflow-hidden flex items-center justify-center`}
              >
                {webtoon.coverImage ? (
                  <img
                    src={webtoon.coverImage}
                    alt={webtoon.title[lang]}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-white/60 text-sm">Cover Image</span>
                )}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="flex-1 text-center md:text-left"
            >
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                {webtoon.title[lang]}
              </h1>
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mb-4">
                <Link
                  to={`/author/${webtoon.author.id}`}
                  className="flex items-center gap-2 hover:opacity-80 transition"
                >
                  <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center">
                    <span className="text-primary-700 font-bold text-sm">
                      {webtoon.author.name[lang].charAt(0)}
                    </span>
                  </div>
                  <span className="font-medium text-gray-700">{webtoon.author.name[lang]}</span>
                </Link>
                <span className="text-gray-300">|</span>
                <span className="text-gray-500">{webtoon.genres.join(', ')}</span>
              </div>

              <p className="text-gray-600 mb-6 leading-relaxed max-w-2xl">
                {webtoon.description[lang]}
              </p>

              <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 sm:gap-6 mb-6">
                <div className="flex items-center gap-2 text-gray-500">
                  <Eye className="w-5 h-5" />
                  <span>
                    {formatCount(webtoon.viewCount)} {t('webtoonDetail.views')}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-gray-500">
                  <Heart className="w-5 h-5" />
                  <span>
                    {formatCount(webtoon.likeCount)} {t('webtoon.likes')}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-gray-500">
                  <span className="font-medium">
                    {webtoon.episodeCount} {t('webtoon.episodes')}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                  <span className="font-medium text-gray-700">{webtoon.rating}</span>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
                <Link to={`/read/${webtoon.id}/1`}>
                  <Button leftIcon={<Play className="w-5 h-5" />}>
                    {t('webtoonDetail.startReading')}
                  </Button>
                </Link>
                <Button
                  variant={isBookmarked ? 'secondary' : 'outline'}
                  onClick={() => setIsBookmarked(!isBookmarked)}
                >
                  {isBookmarked ? <Check className="w-5 h-5" /> : <Bookmark className="w-5 h-5" />}
                  {isBookmarked ? t('webtoonDetail.saved') : t('webtoonDetail.save')}
                </Button>
                <Button variant="ghost" aria-label={t('webtoonDetail.share')}>
                  <Share2 className="w-5 h-5" />
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">{t('webtoonDetail.episodes')}</h2>
            <select
              aria-label={t('categories.sortBy')}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            >
              <option>{t('webtoonDetail.newestFirst')}</option>
              <option>{t('webtoonDetail.oldestFirst')}</option>
            </select>
          </div>

          <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
            {episodes.map((episode, index) => {
              const isRead = readEpisodes.includes(episode.id)
              return (
                <Link key={episode.id} to={`/read/${webtoon.id}/${episode.episodeNumber}`}>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.2, delay: index * 0.05 }}
                    className={`flex items-center justify-between p-4 hover:bg-primary-50 transition cursor-pointer border-b border-gray-100 last:border-b-0 ${
                      isRead ? 'bg-primary-50/30' : ''
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={`w-14 h-14 sm:w-16 sm:h-16 rounded-lg flex items-center justify-center ${
                          isRead
                            ? 'bg-primary-200'
                            : episode.isPremium
                              ? 'bg-gray-100'
                              : 'bg-primary-100'
                        }`}
                      >
                        {isRead ? (
                          <Check className="w-6 h-6 text-primary-600" />
                        ) : episode.isPremium ? (
                          <Lock className="w-5 h-5 text-gray-400" />
                        ) : (
                          <span className="text-primary-700 font-bold">
                            {episode.episodeNumber}
                          </span>
                        )}
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900 text-sm sm:text-base">
                          {episode.title[lang]}
                        </h3>
                        <p className="text-xs sm:text-sm text-gray-500 hidden sm:block">
                          {episode.description?.[lang] || ''}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 sm:gap-4">
                      <span className="text-xs sm:text-sm text-gray-400 hidden sm:block">
                        {formatCount(episode.viewCount)} {t('webtoonDetail.views')}
                      </span>
                      {episode.isPremium && (
                        <span className="px-2 py-1 bg-yellow-100 text-yellow-700 text-xs rounded-full font-medium">
                          {episode.coinPrice} {t('webtoonDetail.coins')}
                        </span>
                      )}
                      {isRead && (
                        <span className="px-2 py-1 bg-primary-200 text-primary-800 text-xs rounded-full font-medium">
                          {t('webtoonDetail.read')}
                        </span>
                      )}
                      <ChevronRight className="w-5 h-5 text-gray-400" />
                    </div>
                  </motion.div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6">{t('home.featured')}</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-6">
            {mockWebtoons.slice(1, 7).map((w, index) => (
              <motion.div
                key={w.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <Link to={`/webtoon/${w.id}`}>
                  <Card variant="interactive" padding="none" className="overflow-hidden">
                    <div
                      className={`aspect-[3/4] ${w.coverColor} flex items-center justify-center`}
                    >
                      {w.coverImage ? (
                        <img
                          src={w.coverImage}
                          alt={w.title[lang]}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span className="text-white/60 text-sm">Cover</span>
                      )}
                    </div>
                    <div className="p-3">
                      <h3 className="font-semibold text-gray-900 truncate text-sm">
                        {w.title[lang]}
                      </h3>
                      <p className="text-xs text-gray-500 truncate">{w.genres[0]}</p>
                    </div>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

export default WebtoonDetailPage
