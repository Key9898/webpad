const API_BASE_URL = 'http://localhost:3001/api'

export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  FORGOT_PASSWORD: '/forgot-password',
  RESET_PASSWORD: '/reset-password',
  PROFILE: '/profile',
  SETTINGS: '/settings',
  LIBRARY: '/library',
  SEARCH: '/search',
  WEBTOON: '/webtoon/:id',
  READER: '/read/:webtoonId/:episodeId',
  CATEGORY: '/category/:slug',
} as const

export const STORAGE_KEYS = {
  AUTH_TOKEN: 'webpad_auth_token',
  USER_PREFERENCES: 'webpad_user_preferences',
  READING_PROGRESS: 'webpad_reading_progress',
  THEME: 'webpad_theme',
} as const

export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
} as const

export { API_BASE_URL }
