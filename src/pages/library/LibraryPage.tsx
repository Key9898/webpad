import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Bookmark,
  Clock,
  Heart,
  Grid3X3,
  List,
  Search,
  Filter,
  SortAsc,
  Trash2,
  Play,
  MoreVertical,
} from 'lucide-react'
import { useTranslation } from 'react-i18next'
import Button from '../../components/Button'
import Card from '../../components/Card'
import { mockWebtoons } from '../../demo/mocks/data'

type TabType = 'bookmarks' | 'history' | 'likes'
type ViewMode = 'grid' | 'list'

interface LibraryItem {
  id: string
  webtoonId: string
  title: { mm: string; en: string }
  coverImage?: string
  coverColor: string
  lastReadEpisode?: number
  totalEpisodes: number
  lastReadAt?: string
  addedAt: string
  progress: number
}

const mockLibraryItems: LibraryItem[] = mockWebtoons.slice(0, 6).map((w, i) => ({
  id: `lib-${i}`,
  webtoonId: w.id,
  title: w.title,
  coverImage: w.coverImage,
  coverColor: w.coverColor,
  lastReadEpisode: Math.floor(Math.random() * w.episodeCount),
  totalEpisodes: w.episodeCount,
  lastReadAt: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString(),
  addedAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
  progress: Math.floor(Math.random() * 100),
}))

const mockHistoryItems: LibraryItem[] = mockWebtoons.slice(2, 8).map((w, i) => ({
  id: `hist-${i}`,
  webtoonId: w.id,
  title: w.title,
  coverImage: w.coverImage,
  coverColor: w.coverColor,
  lastReadEpisode: Math.floor(Math.random() * w.episodeCount),
  totalEpisodes: w.episodeCount,
  lastReadAt: new Date(Date.now() - Math.random() * 3 * 24 * 60 * 60 * 1000).toISOString(),
  addedAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
  progress: Math.floor(Math.random() * 100),
}))

const progressWidthClasses: Record<number, string> = {
  0: 'w-0',
  10: 'w-[10%]',
  20: 'w-[20%]',
  30: 'w-[30%]',
  40: 'w-[40%]',
  50: 'w-1/2',
  60: 'w-[60%]',
  70: 'w-[70%]',
  80: 'w-[80%]',
  90: 'w-[90%]',
  100: 'w-full',
}

const getProgressWidthClass = (progress: number): string => {
  const roundedProgress = Math.round(progress / 10) * 10
  return progressWidthClasses[roundedProgress] || `w-[${progress}%]`
}

const LibraryPage = () => {
  const { t, i18n } = useTranslation()
  const lang = i18n.language as 'mm' | 'en'
  const [activeTab, setActiveTab] = useState<TabType>('bookmarks')
  const [viewMode, setViewMode] = useState<ViewMode>('grid')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedItems, setSelectedItems] = useState<string[]>([])

  const tabs = [
    { id: 'bookmarks' as TabType, label: t('libraryPage.bookmarks'), icon: Bookmark, count: 12 },
    { id: 'history' as TabType, label: t('libraryPage.history'), icon: Clock, count: 45 },
    { id: 'likes' as TabType, label: t('libraryPage.likes'), icon: Heart, count: 89 },
  ]

  const getItems = () => {
    switch (activeTab) {
      case 'bookmarks':
        return mockLibraryItems
      case 'history':
        return mockHistoryItems
      case 'likes':
        return mockLibraryItems.slice(0, 4)
      default:
        return []
    }
  }

  const items = getItems().filter((item) =>
    item.title[lang].toLowerCase().includes(searchQuery.toLowerCase())
  )

  const toggleSelect = (id: string) => {
    setSelectedItems((prev) => (prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]))
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))

    if (diffDays === 0) return t('libraryPage.today')
    if (diffDays === 1) return t('libraryPage.yesterday')
    if (diffDays < 7) return `${diffDays} ${t('libraryPage.daysAgo')}`
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
              {t('libraryPage.title')}
            </h1>
            <p className="text-gray-500 mt-1">{t('libraryPage.subtitle')}</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" className="gap-2">
              <Filter className="w-4 h-4" />
              <span className="hidden sm:inline">{t('libraryPage.filter')}</span>
            </Button>
            <Button variant="outline" className="gap-2">
              <SortAsc className="w-4 h-4" />
              <span className="hidden sm:inline">{t('libraryPage.sort')}</span>
            </Button>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center border-b border-gray-100">
            <div className="flex overflow-x-auto">
              {tabs.map((tab) => (
                <button
                  type="button"
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-6 py-4 border-b-2 transition-colors whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'border-primary-600 text-primary-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <tab.icon className="w-5 h-5" />
                  <span className="font-medium">{tab.label}</span>
                  <span className="px-2 py-0.5 bg-gray-100 rounded-full text-xs">{tab.count}</span>
                </button>
              ))}
            </div>
            <div className="flex items-center gap-2 px-4 py-2 sm:ml-auto">
              <button
                type="button"
                title="Grid view"
                aria-label="Grid view"
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'grid'
                    ? 'bg-primary-100 text-primary-600'
                    : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                <Grid3X3 className="w-5 h-5" />
              </button>
              <button
                type="button"
                title="List view"
                aria-label="List view"
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'list'
                    ? 'bg-primary-100 text-primary-600'
                    : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="p-4 border-b border-gray-100">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder={t('libraryPage.searchPlaceholder')}
                aria-label={t('libraryPage.searchPlaceholder')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
          </div>

          {selectedItems.length > 0 && (
            <div className="flex items-center justify-between px-4 py-3 bg-primary-50 border-b border-primary-100">
              <span className="text-sm text-primary-600">
                {selectedItems.length} {t('notificationsPage.unread')}
              </span>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm" className="text-red-600">
                  <Trash2 className="w-4 h-4 mr-1" />
                  {t('common.delete')}
                </Button>
                <Button variant="ghost" size="sm" onClick={() => setSelectedItems([])}>
                  {t('common.cancel')}
                </Button>
              </div>
            </div>
          )}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab + viewMode}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
          >
            {viewMode === 'grid' ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                {items.map((item) => (
                  <Card
                    key={item.id}
                    variant="interactive"
                    className={`group cursor-pointer ${
                      selectedItems.includes(item.id) ? 'ring-2 ring-primary-600' : ''
                    }`}
                    onClick={() => toggleSelect(item.id)}
                  >
                    <div className="relative aspect-[3/4] rounded-t-xl overflow-hidden">
                      <div
                        className={`absolute inset-0 ${item.coverColor} flex items-center justify-center`}
                      >
                        {item.coverImage ? (
                          <img
                            src={item.coverImage}
                            alt={item.title[lang]}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <span className="text-white text-4xl font-bold opacity-50">
                            {item.title[lang].charAt(0)}
                          </span>
                        )}
                      </div>
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          type="button"
                          title={t('common.edit')}
                          aria-label={t('common.edit')}
                          className="p-1.5 bg-white/90 rounded-full hover:bg-white transition-colors"
                        >
                          <MoreVertical className="w-4 h-4 text-gray-600" />
                        </button>
                      </div>
                      {item.progress > 0 && (
                        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-200">
                          <div
                            className={`h-full bg-primary-600 ${getProgressWidthClass(item.progress)}`}
                          />
                        </div>
                      )}
                    </div>
                    <div className="p-3">
                      <h3 className="font-semibold text-gray-900 truncate text-sm">
                        {item.title[lang]}
                      </h3>
                      <div className="flex items-center justify-between mt-1">
                        <p className="text-xs text-gray-500">
                          Ep. {item.lastReadEpisode || 0}/{item.totalEpisodes}
                        </p>
                        {item.lastReadAt && (
                          <p className="text-xs text-gray-400">{formatDate(item.lastReadAt)}</p>
                        )}
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="space-y-3">
                {items.map((item) => (
                  <Card
                    key={item.id}
                    variant="interactive"
                    className={`flex items-center gap-4 p-4 ${
                      selectedItems.includes(item.id) ? 'ring-2 ring-primary-600' : ''
                    }`}
                    onClick={() => toggleSelect(item.id)}
                  >
                    <div
                      className={`w-16 h-20 sm:w-20 sm:h-28 rounded-lg flex-shrink-0 ${item.coverColor} flex items-center justify-center overflow-hidden`}
                    >
                      {item.coverImage ? (
                        <img
                          src={item.coverImage}
                          alt={item.title[lang]}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span className="text-white text-2xl font-bold opacity-50">
                          {item.title[lang].charAt(0)}
                        </span>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-900 truncate">{item.title[lang]}</h3>
                      <p className="text-sm text-gray-500 mt-1">
                        {t('webtoon.episodes')} {item.lastReadEpisode || 0} of {item.totalEpisodes}
                      </p>
                      <div className="flex items-center gap-4 mt-2">
                        {item.progress > 0 && (
                          <div className="flex-1 max-w-xs">
                            <div className="h-1.5 bg-gray-200 rounded-full">
                              <div
                                className={`h-full bg-primary-600 rounded-full ${getProgressWidthClass(item.progress)}`}
                              />
                            </div>
                          </div>
                        )}
                        {item.lastReadAt && (
                          <span className="text-xs text-gray-400">
                            {formatDate(item.lastReadAt)}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="primary" size="sm" className="hidden sm:flex gap-1">
                        <Play className="w-4 h-4" />
                        {t('libraryPage.continueReading')}
                      </Button>
                      <button
                        type="button"
                        title={t('common.edit')}
                        aria-label={t('common.edit')}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                      >
                        <MoreVertical className="w-5 h-5 text-gray-400" />
                      </button>
                    </div>
                  </Card>
                ))}
              </div>
            )}

            {items.length === 0 && (
              <div className="text-center py-16">
                <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                  {activeTab === 'bookmarks' && <Bookmark className="w-8 h-8 text-gray-400" />}
                  {activeTab === 'history' && <Clock className="w-8 h-8 text-gray-400" />}
                  {activeTab === 'likes' && <Heart className="w-8 h-8 text-gray-400" />}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {t('libraryPage.noItems')}
                </h3>
                <p className="text-gray-500 mb-6">{t('libraryPage.noItems')}</p>
                <Button variant="primary">{t('categories.webtoons')}</Button>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}

export default LibraryPage
