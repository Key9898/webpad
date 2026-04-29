import { useState, useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ChevronLeft,
  ChevronRight,
  List,
  Settings,
  Sun,
  Moon,
  Type,
  X,
  Heart,
  MessageCircle,
  Bookmark,
  Lock,
} from 'lucide-react'
import { useTranslation } from 'react-i18next'
import Button from '../../components/Button'
import Modal from '../../components/Modal'
import { mockWebtoons, mockEpisodes } from '../../demo/mocks/data'

const ReaderPage = () => {
  const { t, i18n } = useTranslation()
  const lang = i18n.language as 'mm' | 'en'
  const { webtoonId, episodeNumber } = useParams()
  const navigate = useNavigate()

  const [showHeader, setShowHeader] = useState(true)
  const [showSettings, setShowSettings] = useState(false)
  const [darkMode, setDarkMode] = useState(false)
  const [fontSize, setFontSize] = useState<'sm' | 'md' | 'lg'>('md')
  const [showComments, setShowComments] = useState(false)
  const [isLiked, setIsLiked] = useState(false)
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [readingProgress, setReadingProgress] = useState(0)

  const webtoon = mockWebtoons.find((w) => w.id === webtoonId) || mockWebtoons[0]
  const currentEpisode =
    mockEpisodes.find(
      (e) => e.webtoonId === webtoonId && e.episodeNumber === Number(episodeNumber)
    ) || mockEpisodes[0]

  const totalEpisodes = mockEpisodes.filter((e) => e.webtoonId === webtoonId).length
  const hasPrev = Number(episodeNumber) > 1
  const hasNext = Number(episodeNumber) < totalEpisodes

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = (scrollTop / docHeight) * 100
      setReadingProgress(Math.min(progress, 100))
      setShowHeader(scrollTop < 100)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const goToEpisode = (num: number) => {
    navigate(`/read/${webtoonId}/${num}`)
  }

  const bgClass = darkMode ? 'bg-gray-900' : 'bg-white'
  const textClass = darkMode ? 'text-gray-100' : 'text-gray-900'

  return (
    <div className={`min-h-screen ${bgClass} ${textClass} transition-colors duration-300`}>
      <AnimatePresence>
        {showHeader && (
          <motion.header
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            className={`fixed top-0 left-0 right-0 z-50 ${
              darkMode ? 'bg-gray-800' : 'bg-white'
            } border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'} transition-colors`}
          >
            <div className="max-w-4xl mx-auto px-4 py-3 relative">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Link
                    to={`/webtoon/${webtoonId}`}
                    title={t('readerPage.closeReader')}
                    aria-label={t('readerPage.closeReader')}
                    className={`p-2 rounded-lg transition ${
                      darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                    }`}
                  >
                    <X className="w-5 h-5" />
                  </Link>
                  <div>
                    <h1 className="font-semibold text-sm sm:text-base truncate max-w-[200px] sm:max-w-none">
                      {currentEpisode.title[lang]}
                    </h1>
                    <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      {webtoon.title[lang]} - Ep. {episodeNumber}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1 sm:gap-2">
                  <button
                    type="button"
                    title={t('readerPage.settings')}
                    aria-label={t('readerPage.settings')}
                    onClick={() => setShowSettings(!showSettings)}
                    className={`p-2 rounded-lg transition ${
                      darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                    }`}
                  >
                    <Settings className="w-5 h-5" />
                  </button>
                  <button
                    type="button"
                    title={t('readerPage.comments')}
                    aria-label={t('readerPage.comments')}
                    onClick={() => setShowComments(true)}
                    className={`p-2 rounded-lg transition ${
                      darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                    }`}
                  >
                    <MessageCircle className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div
                className="absolute bottom-0 left-0 h-1 bg-primary-600 progress-bar"
                role="progressbar"
                aria-label={`${t('reader.readingProgress')}: ${Math.round(readingProgress)}%`}
              />
            </div>
          </motion.header>
        )}
      </AnimatePresence>

      <div className="pt-20 pb-24">
        <div className="max-w-4xl mx-auto px-4">
          {currentEpisode.isPremium ? (
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
              <div
                className={`w-20 h-20 rounded-full flex items-center justify-center mb-6 ${
                  darkMode ? 'bg-gray-800' : 'bg-gray-100'
                }`}
              >
                <Lock className="w-10 h-10 text-primary-500" />
              </div>
              <h2 className="text-xl font-bold mb-2">{t('readerPage.premiumEpisode')}</h2>
              <p className={`mb-6 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                {t('readerPage.unlockFor', { coins: currentEpisode.coinPrice })}
              </p>
              <Button>{t('readerPage.unlockWithCoins')}</Button>
            </div>
          ) : (
            <div className="space-y-4">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                <div
                  key={i}
                  className={`aspect-[3/4] sm:aspect-[4/3] rounded-lg flex items-center justify-center ${
                    darkMode ? 'bg-gray-800' : 'bg-gray-100'
                  }`}
                >
                  <span className={darkMode ? 'text-gray-600' : 'text-gray-400'}>
                    {t('readerPage.panel')} {i}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <motion.div
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        className={`fixed bottom-0 left-0 right-0 z-50 ${
          darkMode ? 'bg-gray-800' : 'bg-white'
        } border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'} transition-colors`}
      >
        <div className="max-w-4xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <button
              type="button"
              title={t('reader.previousEpisode')}
              aria-label={t('reader.previousEpisode')}
              onClick={() => goToEpisode(Number(episodeNumber) - 1)}
              disabled={!hasPrev}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition ${
                hasPrev
                  ? darkMode
                    ? 'hover:bg-gray-700'
                    : 'hover:bg-gray-100'
                  : 'opacity-50 cursor-not-allowed'
              }`}
            >
              <ChevronLeft className="w-5 h-5" />
              <span className="hidden sm:inline">{t('readerPage.prevEpisode')}</span>
            </button>

            <div className="flex items-center gap-4">
              <button
                type="button"
                title={isLiked ? t('webtoon.likes') : t('webtoon.likes')}
                aria-label={isLiked ? t('webtoon.likes') : t('webtoon.likes')}
                onClick={() => setIsLiked(!isLiked)}
                className={`flex items-center gap-1 px-3 py-2 rounded-lg transition ${
                  darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                } ${isLiked ? 'text-red-500' : ''}`}
              >
                <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
              </button>

              <button
                type="button"
                title={isBookmarked ? t('webtoonDetail.saved') : t('webtoonDetail.save')}
                aria-label={isBookmarked ? t('webtoonDetail.saved') : t('webtoonDetail.save')}
                onClick={() => setIsBookmarked(!isBookmarked)}
                className={`flex items-center gap-1 px-3 py-2 rounded-lg transition ${
                  darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                } ${isBookmarked ? 'text-primary-500' : ''}`}
              >
                <Bookmark className={`w-5 h-5 ${isBookmarked ? 'fill-current' : ''}`} />
              </button>

              <Link
                to={`/webtoon/${webtoonId}`}
                title={t('readerPage.episodeList')}
                aria-label={t('readerPage.episodeList')}
                className={`flex items-center gap-1 px-3 py-2 rounded-lg transition ${
                  darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                }`}
              >
                <List className="w-5 h-5" />
              </Link>
            </div>

            <button
              type="button"
              title={t('reader.nextEpisode')}
              aria-label={t('reader.nextEpisode')}
              onClick={() => goToEpisode(Number(episodeNumber) + 1)}
              disabled={!hasNext}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition ${
                hasNext
                  ? darkMode
                    ? 'hover:bg-gray-700'
                    : 'hover:bg-gray-100'
                  : 'opacity-50 cursor-not-allowed'
              }`}
            >
              <span className="hidden sm:inline">{t('readerPage.nextEpisode')}</span>
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </motion.div>

      <Modal
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
        title={t('readerPage.settings')}
        size="sm"
      >
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              {t('profilePage.preferences')}
            </label>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setDarkMode(false)}
                className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg border-2 transition ${
                  !darkMode
                    ? 'border-primary-500 bg-primary-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <Sun className="w-5 h-5" />
                {t('reader.lightMode')}
              </button>
              <button
                type="button"
                onClick={() => setDarkMode(true)}
                className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg border-2 transition ${
                  darkMode
                    ? 'border-primary-500 bg-primary-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <Moon className="w-5 h-5" />
                {t('reader.darkMode')}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              {t('reader.fontSize')}
            </label>
            <div className="flex gap-3">
              {(['sm', 'md', 'lg'] as const).map((size) => (
                <button
                  type="button"
                  key={size}
                  onClick={() => setFontSize(size)}
                  className={`flex-1 px-4 py-3 rounded-lg border-2 transition ${
                    fontSize === size
                      ? 'border-primary-500 bg-primary-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <Type className="w-5 h-5 mx-auto" />
                  <span className="text-xs mt-1 block">
                    {size === 'sm' ? t('categories.all') : size === 'md' ? 'Medium' : 'Large'}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </Modal>

      <Modal
        isOpen={showComments}
        onClose={() => setShowComments(false)}
        title={t('readerPage.comments')}
        size="md"
      >
        <div className="space-y-4">
          <div className="flex gap-3">
            <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center flex-shrink-0">
              <span className="text-primary-700 font-bold text-sm">U</span>
            </div>
            <div className="flex-1">
              <textarea
                placeholder={t('comments.placeholder')}
                aria-label={t('comments.placeholder')}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 resize-none"
                rows={3}
              />
              <div className="flex justify-end mt-2">
                <Button size="sm">{t('comments.post')}</Button>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-4 space-y-4">
            <div className="flex gap-3">
              <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                <span className="text-gray-600 font-bold text-sm">B</span>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-medium text-gray-900">Book Lover</span>
                  <span className="text-xs text-gray-400">2 {t('notificationsPage.hoursAgo')}</span>
                </div>
                <p className="text-gray-600 text-sm">This is amazing! I love the story so far.</p>
                <button type="button" className="text-xs text-gray-500 mt-1 hover:text-primary-600">
                  {t('comments.reply')}
                </button>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                <span className="text-gray-600 font-bold text-sm">W</span>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-medium text-gray-900">Webtoon Fan</span>
                  <span className="text-xs text-gray-400">5 {t('notificationsPage.hoursAgo')}</span>
                </div>
                <p className="text-gray-600 text-sm">The art style is incredible!</p>
                <button type="button" className="text-xs text-gray-500 mt-1 hover:text-primary-600">
                  {t('comments.reply')}
                </button>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default ReaderPage
