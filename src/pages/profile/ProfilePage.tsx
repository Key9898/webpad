import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  User as UserIcon,
  Mail,
  Lock,
  Bell,
  Palette,
  Shield,
  LogOut,
  Camera,
  Edit3,
  ChevronRight,
} from 'lucide-react'
import { useTranslation } from 'react-i18next'
import Button from '../../components/Button'
import Input from '../../components/Input'

interface UserProfile {
  id: string
  email: string
  username: string
  displayName: string
  avatar?: string
  bio?: string
  coinBalance: number
  stats: {
    webtoonsRead: number
    episodesRead: number
    bookmarksCount: number
    likesCount: number
  }
  createdAt: string
}

const mockUser: UserProfile = {
  id: '1',
  email: 'user@example.com',
  username: 'webtoon_lover',
  displayName: 'Webtoon Lover',
  bio: 'Webtoon enthusiast from Myanmar. Love reading action and romance genres!',
  coinBalance: 150,
  stats: {
    webtoonsRead: 45,
    episodesRead: 328,
    bookmarksCount: 12,
    likesCount: 89,
  },
  createdAt: '2024-01-15',
}

type TabType = 'profile' | 'settings' | 'preferences' | 'security'

const ProfilePage = () => {
  const { t } = useTranslation()
  const [activeTab, setActiveTab] = useState<TabType>('profile')
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    displayName: mockUser.displayName,
    bio: mockUser.bio || '',
    email: mockUser.email,
  })

  const tabs = [
    { id: 'profile' as TabType, label: t('profilePage.profileInformation'), icon: UserIcon },
    { id: 'settings' as TabType, label: t('profilePage.settings'), icon: Bell },
    { id: 'preferences' as TabType, label: t('profilePage.preferences'), icon: Palette },
    { id: 'security' as TabType, label: t('profilePage.security'), icon: Shield },
  ]

  const handleSave = () => {
    setIsEditing(false)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm p-6 sticky top-6">
              <div className="flex flex-col items-center text-center">
                <div className="relative">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center">
                    {mockUser.avatar ? (
                      <img
                        src={mockUser.avatar}
                        alt={mockUser.displayName}
                        className="w-24 h-24 rounded-full object-cover"
                      />
                    ) : (
                      <span className="text-3xl font-bold text-white">
                        {mockUser.displayName.charAt(0).toUpperCase()}
                      </span>
                    )}
                  </div>
                  <button
                    type="button"
                    title={t('profilePage.changeAvatar')}
                    aria-label={t('profilePage.changeAvatar')}
                    className="absolute bottom-0 right-0 w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center text-white hover:bg-primary-700 transition-colors"
                  >
                    <Camera className="w-4 h-4" />
                  </button>
                </div>
                <h2 className="mt-4 text-xl font-bold text-gray-900">{mockUser.displayName}</h2>
                <p className="text-sm text-gray-500">@{mockUser.username}</p>
                <div className="mt-3 flex items-center gap-2">
                  <div className="flex items-center gap-1 px-3 py-1 bg-primary-100 rounded-full">
                    <span className="text-primary-600 font-semibold">{mockUser.coinBalance}</span>
                    <span className="text-xs text-primary-600">{t('profilePage.coins')}</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-gray-50 rounded-xl">
                  <p className="text-2xl font-bold text-gray-900">{mockUser.stats.webtoonsRead}</p>
                  <p className="text-xs text-gray-500">{t('profilePage.webtoons')}</p>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-xl">
                  <p className="text-2xl font-bold text-gray-900">{mockUser.stats.episodesRead}</p>
                  <p className="text-xs text-gray-500">{t('profilePage.episodes')}</p>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-xl">
                  <p className="text-2xl font-bold text-gray-900">
                    {mockUser.stats.bookmarksCount}
                  </p>
                  <p className="text-xs text-gray-500">{t('profilePage.bookmarks')}</p>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-xl">
                  <p className="text-2xl font-bold text-gray-900">{mockUser.stats.likesCount}</p>
                  <p className="text-xs text-gray-500">{t('profilePage.likes')}</p>
                </div>
              </div>

              <nav className="mt-6 space-y-1">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                      activeTab === tab.id
                        ? 'bg-primary-100 text-primary-600'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <tab.icon className="w-5 h-5" />
                    <span className="font-medium">{tab.label}</span>
                    <ChevronRight className="w-4 h-4 ml-auto" />
                  </button>
                ))}
                <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-600 hover:bg-red-50 transition-colors">
                  <LogOut className="w-5 h-5" />
                  <span className="font-medium">{t('profilePage.logout')}</span>
                </button>
              </nav>
            </div>
          </div>

          <div className="lg:col-span-3">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
            >
              {activeTab === 'profile' && (
                <div className="bg-white rounded-2xl shadow-sm p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold text-gray-900">
                      {t('profilePage.profileInformation')}
                    </h3>
                    <Button
                      variant={isEditing ? 'primary' : 'outline'}
                      onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
                    >
                      {isEditing ? (
                        t('profilePage.saveChanges')
                      ) : (
                        <>
                          <Edit3 className="w-4 h-4 mr-2" />
                          {t('profilePage.editProfile')}
                        </>
                      )}
                    </Button>
                  </div>

                  <div className="space-y-6">
                    <Input
                      label={t('profilePage.displayName')}
                      value={formData.displayName}
                      onChange={(e) => setFormData({ ...formData, displayName: e.target.value })}
                      disabled={!isEditing}
                      leftIcon={<UserIcon className="w-5 h-5" />}
                    />

                    <Input
                      label={t('profilePage.email')}
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      disabled={!isEditing}
                      leftIcon={<Mail className="w-5 h-5" />}
                    />

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {t('profilePage.bio')}
                      </label>
                      <textarea
                        value={formData.bio}
                        onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                        disabled={!isEditing}
                        rows={4}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none disabled:bg-gray-50 disabled:text-gray-500"
                        placeholder={t('comments.placeholder')}
                      />
                    </div>

                    <div className="pt-4 border-t border-gray-100">
                      <p className="text-sm text-gray-500">
                        {new Date(mockUser.createdAt).toLocaleDateString('en-US', {
                          month: 'long',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'settings' && (
                <div className="space-y-6">
                  <div className="bg-white rounded-2xl shadow-sm p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-6">
                      {t('notifications.title')}
                    </h3>
                    <div className="space-y-4">
                      {[
                        {
                          title: t('notifications.newEpisode'),
                          description: t('notifications.newEpisode'),
                        },
                        {
                          title: t('notifications.commentReply'),
                          description: t('notifications.commentReply'),
                        },
                        {
                          title: t('notifications.promotion'),
                          description: t('notifications.promotion'),
                        },
                        {
                          title: t('notifications.system'),
                          description: t('notifications.system'),
                        },
                      ].map((setting, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between py-4 border-b border-gray-100 last:border-0"
                        >
                          <div>
                            <p className="font-medium text-gray-900">{setting.title}</p>
                            <p className="text-sm text-gray-500">{setting.description}</p>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              defaultChecked={index < 2}
                              className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-100 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'preferences' && (
                <div className="space-y-6">
                  <div className="bg-white rounded-2xl shadow-sm p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-6">
                      {t('profilePage.preferences')}
                    </h3>
                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-3">
                          {t('reader.fontSize')}
                        </label>
                        <div className="flex items-center gap-4">
                          <input
                            type="range"
                            min="12"
                            max="24"
                            defaultValue="16"
                            aria-label={t('reader.fontSize')}
                            className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary-600"
                          />
                          <span className="text-sm font-medium text-gray-600 w-12 text-center">
                            16px
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between py-4 border-t border-gray-100">
                        <div>
                          <p className="font-medium text-gray-900">{t('reader.darkMode')}</p>
                          <p className="text-sm text-gray-500">{t('reader.darkMode')}</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-100 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'security' && (
                <div className="space-y-6">
                  <div className="bg-white rounded-2xl shadow-sm p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-6">
                      {t('profile.changePassword')}
                    </h3>
                    <div className="space-y-4 max-w-md">
                      <Input
                        label={t('profile.currentPassword')}
                        type="password"
                        placeholder={t('profile.currentPassword')}
                        leftIcon={<Lock className="w-5 h-5" />}
                      />
                      <Input
                        label={t('profile.newPassword')}
                        type="password"
                        placeholder={t('auth.passwordPlaceholder')}
                        leftIcon={<Lock className="w-5 h-5" />}
                      />
                      <Input
                        label={t('profile.confirmNewPassword')}
                        type="password"
                        placeholder={t('auth.confirmPasswordPlaceholder')}
                        leftIcon={<Lock className="w-5 h-5" />}
                      />
                      <Button variant="primary" className="mt-4">
                        {t('profile.changePassword')}
                      </Button>
                    </div>
                  </div>

                  <div className="bg-red-50 rounded-2xl p-6">
                    <h3 className="text-lg font-bold text-red-600 mb-2">
                      {t('profile.deleteAccount')}
                    </h3>
                    <p className="text-sm text-red-500 mb-4">{t('profile.deleteAccountWarning')}</p>
                    <Button variant="danger">{t('profile.deleteAccount')}</Button>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage
