import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './hooks/useAuth'
import ProtectedRoute from './components/ProtectedRoute'

import MainLayout from './layouts/MainLayout'
import AuthLayout from './layouts/AuthLayout'
import ReaderLayout from './layouts/ReaderLayout'

import HomePage from './pages/home/HomePage'
import CategoriesPage from './pages/categories/CategoriesPage'
import SearchPage from './pages/search/SearchPage'
import WebtoonDetailPage from './pages/webtoon/WebtoonDetailPage'
import ReaderPage from './pages/reader/ReaderPage'

import LoginPage from './pages/auth/LoginPage'
import RegisterPage from './pages/auth/RegisterPage'
import ForgotPasswordPage from './pages/auth/ForgotPasswordPage'
import ResetPasswordPage from './pages/auth/ResetPasswordPage'

import ProfilePage from './pages/profile/ProfilePage'
import LibraryPage from './pages/library/LibraryPage'
import NotificationsPage from './pages/notifications/NotificationsPage'
import CoinsPage from './pages/coins/CoinsPage'

import PrivacyPage from './pages/legal/PrivacyPage'
import TermsPage from './pages/legal/TermsPage'
import CookiesPage from './pages/legal/CookiesPage'

import AboutPage from './pages/company/AboutPage'
import CareersPage from './pages/company/CareersPage'
import PressPage from './pages/company/PressPage'

import HelpPage from './pages/support/HelpPage'
import ContactPage from './pages/support/ContactPage'
import FAQPage from './pages/support/FAQPage'

function App() {
  return (
    <AuthProvider>
      <BrowserRouter
        future={{
          v7_startTransition: true,
          v7_relativeSplatPath: true,
        }}
      >
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/categories" element={<CategoriesPage />} />
            <Route path="/categories/:slug" element={<CategoriesPage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/webtoon/:id" element={<WebtoonDetailPage />} />

            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <ProfilePage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/library"
              element={
                <ProtectedRoute>
                  <LibraryPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/notifications"
              element={
                <ProtectedRoute>
                  <NotificationsPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/coins"
              element={
                <ProtectedRoute>
                  <CoinsPage />
                </ProtectedRoute>
              }
            />

            <Route path="/about" element={<AboutPage />} />
            <Route path="/careers" element={<CareersPage />} />
            <Route path="/press" element={<PressPage />} />

            <Route path="/help" element={<HelpPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/faq" element={<FAQPage />} />

            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="/terms" element={<TermsPage />} />
            <Route path="/cookies" element={<CookiesPage />} />
          </Route>

          <Route element={<ReaderLayout />}>
            <Route path="/read/:webtoonId/:episodeNumber" element={<ReaderPage />} />
          </Route>

          <Route element={<AuthLayout />}>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/reset-password/:token?" element={<ResetPasswordPage />} />
          </Route>

          <Route
            path="*"
            element={
              <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                  <h1 className="text-6xl font-bold text-gray-200">404</h1>
                  <p className="text-gray-500 mt-4">Page not found</p>
                  <a
                    href="/"
                    className="inline-block mt-6 px-6 py-2 bg-primary-600 text-white rounded-full hover:bg-primary-700 transition-colors"
                  >
                    Go Home
                  </a>
                </div>
              </div>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
