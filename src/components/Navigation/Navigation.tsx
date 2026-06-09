import { useState, useMemo } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Menu, X, Search, Bell, User, LogOut } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import Button from '../Button'
import LanguageSwitcher from '../LanguageSwitcher'
import { useAuth } from '../../hooks/useAuth'

const Navigation = () => {
  const { t } = useTranslation()
  const { user, isAuthenticated, logout } = useAuth()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const location = useLocation()

  const navLinks = useMemo(
    () => [
      { name: t('categories.title'), path: '/categories' },
      { name: t('home.trendingNow'), path: '/categories?sort=popular' },
      { name: t('home.newReleases'), path: '/categories?sort=new' },
    ],
    [t]
  )

  const isActive = (path: string) => {
    const [linkPathname, linkSearch] = path.split('?')
    if (location.pathname !== linkPathname) return false

    // For links with query params, check if all params match
    if (linkSearch) {
      const linkParams = new URLSearchParams(linkSearch)
      const currentParams = new URLSearchParams(location.search.replace('?', ''))
      for (const [key, value] of linkParams) {
        if (currentParams.get(key) !== value) return false
      }
      return true
    }

    // For links without query params, only active if NO more specific link matches
    const currentParams = new URLSearchParams(location.search.replace('?', ''))
    const hasMoreSpecificMatch = navLinks.some((otherLink) => {
      if (otherLink.path === path) return false
      const [otherPathname, otherSearch] = otherLink.path.split('?')
      if (otherPathname !== linkPathname || !otherSearch) return false
      const otherParams = new URLSearchParams(otherSearch)
      for (const [key, value] of otherParams) {
        if (currentParams.get(key) === value) return true
      }
      return false
    })

    return !hasMoreSpecificMatch
  }

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-8">
            <Link to="/" className="text-2xl font-bold text-primary-600">
              WebPad
            </Link>

            <div className="hidden md:flex items-center gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`text-sm font-medium transition-colors ${
                    isActive(link.path)
                      ? 'text-primary-600'
                      : 'text-gray-600 hover:text-primary-600'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:block relative">
              <input
                type="text"
                placeholder={t('search.placeholder')}
                aria-label={t('search.placeholder')}
                className="w-64 pl-10 pr-4 py-2 rounded-full bg-gray-100 border-none focus:ring-2 focus:ring-primary-500 focus:bg-white transition-all text-sm"
              />
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            </div>

            <button
              type="button"
              title={t('search.title')}
              aria-label={t('search.title')}
              className="sm:hidden p-2 text-gray-600 hover:text-primary-600 transition"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
            >
              <Search className="w-5 h-5" />
            </button>

            {isAuthenticated && (
              <Link
                to="/notifications"
                title={t('nav.notifications')}
                aria-label={t('nav.notifications')}
                className="p-2 text-gray-600 hover:text-primary-600 transition relative"
              >
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
              </Link>
            )}

            <LanguageSwitcher />

            {isAuthenticated && user ? (
              <div className="hidden sm:flex items-center gap-2">
                <Link
                  to="/profile"
                  className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary-50 hover:bg-primary-100 transition"
                >
                  <div className="w-6 h-6 rounded-full bg-primary-600 flex items-center justify-center">
                    <span className="text-white text-xs font-bold">
                      {user.displayName.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <span className="text-sm font-medium text-primary-700">{user.displayName}</span>
                </Link>
                <button
                  type="button"
                  onClick={logout}
                  className="p-2 text-gray-500 hover:text-red-600 transition"
                  title={t('nav.logout')}
                  aria-label={t('nav.logout')}
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <div className="hidden sm:block">
                <Link to="/login">
                  <Button size="sm">{t('nav.login')}</Button>
                </Link>
              </div>
            )}

            <button
              type="button"
              title={isMenuOpen ? t('common.close') : t('common.viewAll')}
              aria-label={isMenuOpen ? t('common.close') : t('common.viewAll')}
              className="md:hidden p-2 text-gray-600 hover:text-primary-600 transition"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {isSearchOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="sm:hidden overflow-hidden"
            >
              <div className="py-3">
                <div className="relative">
                  <input
                    type="text"
                    placeholder={t('search.placeholder')}
                    aria-label={t('search.placeholder')}
                    className="w-full pl-10 pr-4 py-2 rounded-full bg-gray-100 border-none focus:ring-2 focus:ring-primary-500 focus:bg-white transition-all text-sm"
                  />
                  <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden overflow-hidden bg-white border-t border-gray-200"
          >
            <div className="px-4 py-4 space-y-3">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`block py-2 text-sm font-medium transition-colors ${
                    isActive(link.path)
                      ? 'text-primary-600'
                      : 'text-gray-600 hover:text-primary-600'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              <div className="pt-3 border-t border-gray-200">
                {isAuthenticated && user ? (
                  <>
                    <Link
                      to="/profile"
                      onClick={() => setIsMenuOpen(false)}
                      className="flex items-center gap-2 py-2 text-sm font-medium text-gray-600 hover:text-primary-600"
                    >
                      <User className="w-4 h-4" />
                      {user.displayName}
                    </Link>
                    <Link
                      to="/library"
                      onClick={() => setIsMenuOpen(false)}
                      className="block py-2 text-sm font-medium text-gray-600 hover:text-primary-600"
                    >
                      {t('nav.library')}
                    </Link>
                    <button
                      type="button"
                      onClick={() => {
                        logout()
                        setIsMenuOpen(false)
                      }}
                      className="flex items-center gap-2 py-2 text-sm font-medium text-red-600 hover:text-red-700"
                    >
                      <LogOut className="w-4 h-4" />
                      {t('nav.logout')}
                    </button>
                  </>
                ) : (
                  <Link
                    to="/login"
                    onClick={() => setIsMenuOpen(false)}
                    className="block py-2 text-sm font-medium text-primary-600"
                  >
                    {t('nav.login')}
                  </Link>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}

export default Navigation
