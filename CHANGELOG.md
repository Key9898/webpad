# WebPad - Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

---

## [Unreleased]

### Added - 2026-04-29 (Session 9)

#### Unified Bilingual Data Architecture Migration
- Completed the migration of all text-heavy entities in `@webpad/shared` to `BilingualText`
- Updated `ActivityLog`, `Report`, and `Transaction` interfaces to support bilingual (Myanmar + English) names and descriptions
- Synchronized all mock data definitions in `packages/shared/data.ts` to use the new bilingual schema
- Consolidated `SharedData` interface into the shared types for platform-wide consistency

#### Reader Route Synchronization
- Fixed route parameter mismatch in `App.tsx` (changed `:episodeId` to `:episodeNumber`)
- Verified that all navigation links in `WebtoonDetailPage` and `ReaderPage` use the synchronized parameter names
- Confirmed that the reader page correctly handles bilingual titles for both webtoons and episodes

#### Production Readiness Audit
- Performed a comprehensive audit of the `webpad` project's stability and type safety
- Verified that all pages (Home, Reader, Coins, Webtoon Detail) handle the new bilingual data structures without errors
- Ensured consistent property access patterns across the entire codebase

### Added - 2026-04-29 (Session 8)

#### Production Readiness & Deployment Preparation

- Performed comprehensive linting and formatting audit using ESLint and Prettier
- Fixed code formatting across all source files for consistent style
- Validated production build (`npm run build`) to ensure Vercel deployment compatibility
- Verified `.gitignore` configuration to prevent accidental commitment of build artifacts
- Confirmed TypeScript type safety across the entire codebase

#### Shared Package Integration & Documentation Sync

- Integrated `@webpad/shared` package into the Website project
- Migrated `src/demo/mocks/data.ts` to use shared mock data and types
- Updated `src/types/index.ts` to re-export from the shared package
- Created `src/utils/formatters.ts` for human-readable count formatting (e.g., "2.5M")
- Updated UI components (`HomePage`, `WebtoonDetailPage`, `CategoriesPage`) to handle numeric counts using formatters
- Updated `PROJECT_PLAN.md` to match actual file structure and reflect latest feature status
- Cleaned up project structure by removing empty `StaticPageLayout` directory

### Added - 2026-04-29 (Session 7)

#### Webtoon Cover Art Integration

- Synchronized AI-generated webtoon cover assets to `public/webtoon-covers/`
- Updated `src/demo/mocks/data.ts` with `coverImage` paths for all mock webtoons
- Implemented conditional rendering (Image with Color fallback) in:
  - `HomePage.tsx` (Featured, Trending, New Releases)
  - `WebtoonDetailPage.tsx` (Header & Related grid)
  - `SearchPage.tsx` (Search results)
  - `CategoriesPage.tsx` (Genre grid)
  - `LibraryPage.tsx` (Grid & List views)

### Added - 2026-04-27 (Session 6)

#### Shared Package Setup (@webpad/shared)

- Created `packages/shared/` folder structure for shared code between WebPad Website and Admin Dashboard
- Created `packages/shared/src/types.ts` with bilingual TypeScript interfaces:
  - `BilingualText` interface for `{ mm: string, en: string }` format
  - `Webtoon`, `Episode`, `Author`, `Genre`, `Comment` with bilingual support
  - `User`, `AdminUser`, `DashboardStats`, `RevenueData`, `UserGrowthData`
  - `PopularWebtoon`, `Notification`, `MediaFile`, `ActivityLog`, `Report`
  - `Transaction`, `ScheduledEpisode`, `SharedData`
- Created `packages/shared/src/data.ts` with mock data:
  - All mock data uses bilingual format (Myanmar + English)
  - `mockWebtoons`, `mockEpisodes`, `mockAuthors`, `mockGenres`
  - `mockUsers`, `mockComments`, `mockMediaFiles`
  - `mockDashboardStats`, `mockRevenueData`, `mockUserGrowthData`
  - `mockPopularWebtoons`, `mockActivityLogs`, `mockReports`
  - `mockTransactions`, `mockScheduledEpisodes`
- Created sync functions:
  - `getSharedData()` - Get all data as single object
  - `exportToJSON()` / `importFromJSON()` - JSON serialization
  - `downloadJSON()` - Download data as JSON file
  - `saveToLocalStorage()` / `loadFromLocalStorage()` - LocalStorage sync
- Created `packages/shared/src/index.ts` - Main export file
- Created `packages/shared/package.json` - Package configuration
- Created `packages/shared/tsconfig.json` - TypeScript configuration

#### Configuration Updates

- Updated `tsconfig.json` with path alias:
  - Added `@webpad/shared` alias pointing to `./packages/shared/src`
  - Added `packages/shared/src` to include array
- Updated `vite.config.ts` with alias:
  - Added `@webpad/shared` resolve alias

### Fixed - 2026-04-27 (Session 6)

- Fixed `packages/shared/tsconfig.json` - Added `DOM` to lib array for `document` and `localStorage` support
- Fixed Footer copyright section - Centered copyright text and removed duplicate Privacy/Terms links (already in Legal section above)
- Updated Footer social icons - Replaced Twitter with Telegram (Facebook, Telegram, Instagram, YouTube)
- Fixed HomePage Hero buttons - Used `leftIcon` prop for icons, used `variant="secondary"` for white button, added `!` prefix for Tailwind overrides on outline button
- Fixed Reader route mismatch:
  - Changed episode links from `/webtoon/:id/episode/:num` to `/read/:webtoonId/:episodeId`
  - Updated WebtoonDetailPage "Start Reading" button link
  - Updated WebtoonDetailPage episode list links
  - Updated ReaderPage goToEpisode navigation
  - Updated ROUTES constant from `EPISODE` to `READER`
- Fixed WebtoonDetailPage button - used `leftIcon` prop for Play icon

### Changed - 2026-04-27 (Session 6)

- Updated PROJECT_PLAN.md:
  - Marked all Admin Features as complete (separate project)
  - Marked Phase 9 as complete with all sub-items
  - Updated Project Locations with correct paths
  - Updated Last Updated date and status

### Added - 2026-04-27 (Session 5)

#### Static Pages (Legal, Company, Support)

- Created 9 new static pages with individual layouts:
  - **Legal**: PrivacyPage (`/privacy`), TermsPage (`/terms`), CookiesPage (`/cookies`)
  - **Company**: AboutPage (`/about`), CareersPage (`/careers`), PressPage (`/press`)
  - **Support**: HelpPage (`/help`), ContactPage (`/contact`), FAQPage (`/faq`)
- Each page has its own layout (no shared StaticPageLayout component)
- All pages use i18n translations with `useTranslation` hook
- Added index.ts files for each page folder (legal, company, support)
- All routes registered in App.tsx under MainLayout

#### Footer Links

- Updated Footer component with 9 new links organized in 3 categories:
  - **Company**: About (`/about`), Careers (`/careers`), Press (`/press`)
  - **Support**: Help Center (`/help`), Contact (`/contact`), FAQ (`/faq`)
  - **Legal**: Privacy Policy (`/privacy`), Terms of Service (`/terms`), Cookie Policy (`/cookies`)
- Added translation keys for all footer links
- Footer displays social media links (Facebook, Twitter, Instagram, YouTube)

#### Navigation Updates

- Updated Navigation component with 4 main links:
  - **Home** (`/`) - Main landing page
  - **အမျိုးအစားများ** (`/categories`) - Browse by genre
  - **လူကြိုက်များနေသည်** (`/categories?sort=popular`) - Trending webtoons
  - **အသစ်ထွက်ရှိသည်** (`/categories?sort=new`) - New releases
- All navigation links use i18n translations

#### CategoriesPage Query Parameter Handling

- CategoriesPage now handles URL query parameters for sorting:
  - `?sort=popular` - Shows "လူကြိုက်များနေသည်" (Trending) with TrendingUp icon
  - `?sort=new` - Shows "အသစ်ထွက်ရှိသည်" (New Releases) with Sparkles icon
  - Default (no query) - Shows "Browse by Genre" with genre filter
- Sort options: popular, new, recentlyUpdated, highestRated
- URL updates when sort option changes via `setSearchParams`
- Page title and icon change based on query parameter

#### Authentication Fixes

- Added React Router future flags (v7_startTransition, v7_relativeSplatPath)
- Fixed LoginPage to use useAuth hook for login functionality
- Updated Navigation to use useAuth for authentication state
- Login now works with mock authentication

#### Component Updates

- Created LanguageSwitcher.stories.tsx for Storybook
- Updated Footer with complete translation keys
- Added missing footer keys: careers, press, faq, cookies, description, company, support, legal

#### Index Files

- Created index.ts for all page folders (legal, company, support)
- Created index.ts for LanguageSwitcher component

### Fixed - 2026-04-27 (Session 5)

- Fixed deprecated meta tag in index.html (apple-mobile-web-app-capable)
- Fixed duplicate footer translation keys
- Fixed text-wrap: balance CSS for Chrome compatibility
- Removed unused useState import from CareersPage

### Removed - 2026-04-27 (Session 5)

- Removed StaticPageLayout component (user requested separate layouts per page)
- Removed StaticPageLayout.stories.tsx
- Removed StaticPageLayout/index.ts

### Added - 2026-04-27 (Session 4)

#### Internationalization (i18n)

- Installed react-i18next and i18next-browser-languagedetector
- Created i18n configuration with language detection
- Created Myanmar translation file (default) with 100+ translations
- Created English translation file with 100+ translations
- Created LanguageSwitcher component with toggle button UI
- Updated Navigation component with Language Switcher
- Updated HomePage to use translations
- Updated mock data with bilingual format `{ mm: 'မြန်မာ', en: 'English' }`
- All webtoon titles, descriptions, author names, genre names are now bilingual
- Language preference saved to localStorage

#### i18n Features

- Default language: Myanmar (mm)
- Toggle between Myanmar and English with single click
- Language Switcher shows opposite language (Myanmar → "English", English → "မြန်မာ")
- All UI text and mock data content switch when language changes
- HTML lang attribute updates automatically for proper text rendering

#### Myanmar Text Rendering Fix

- Added CSS rules for proper Myanmar text display
- Increased line-height (1.8) for body text to prevent diacritics overlap
- Added `text-rendering: optimizeLegibility` for better font rendering
- Different line-height values for headings (1.5), body text (1.8), and form elements (1.6)
- HTML lang attribute dynamically updates when language changes

#### Documentation Updates

- Added "Creating New Pages - i18n Checklist" to PROJECT_RULES.md
- Added i18n checklist to LAST_SESSION.md
- Added "Myanmar Text Rendering" section to PROJECT_RULES.md
- Added Myanmar text rendering info to LAST_SESSION.md
- Clear step-by-step guide for implementing i18n in new pages

### Added - 2026-04-27 (Session 3)

#### Phase 10: Testing & Optimization

- Setup Vitest + React Testing Library for testing
- Created test utilities and setup files
- Added Unit Tests for:
  - Button component (13 tests)
  - Input component (14 tests)
  - Card component (8 tests)
  - Modal component (10 tests)
  - useAuth hook (6 tests)
- Added Integration Tests for:
  - LoginPage (6 tests)
  - HomePage (9 tests)

#### SEO Optimization

- Enhanced index.html with comprehensive meta tags
- Added Open Graph tags for social sharing
- Added Twitter Card meta tags
- Added structured data (JSON-LD) for search engines
- Created robots.txt for search engine crawling
- Created sitemap.xml for search engine indexing
- Added theme color and mobile web app meta tags

#### Storybook Stories

- Added Comments.stories.tsx with 4 stories (Default, Empty, WithManyReplies, OwnComments)
- Added ProtectedRoute.stories.tsx with 2 stories (Default, WithLoadingState)
- All UI components now have Storybook stories

### Fixed - 2026-04-27 (Session 3)

- Fixed vite.config.ts TypeScript error by importing defineConfig from vitest/config

### Fixed - 2026-04-27 (Session 2)

#### Documentation Updates

- Updated PROJECT_PLAN.md with accurate completion status for all phases
- Marked Phase 1-7, 10 as complete with checkmarks
- Updated Features checklist to reflect implemented functionality

#### Layout Fixes

- Fixed duplicate header issue by removing Navigation and Footer from individual pages (HomePage, CategoriesPage, SearchPage, WebtoonDetailPage)
- Pages now use MainLayout which provides Navigation and Footer
- Added `-mt-16 pt-16` to HomePage hero section for proper spacing with sticky header

#### ESLint Fixes

- Fixed React Hook rules violation in Modal.stories.tsx by extracting inline render functions to separate components
- Created `FormModalDemo` and `NoTitleModalDemo` components to properly use useState hook

### Fixed - 2026-04-27

#### Accessibility Fixes

- Added `type="button"` attributes to all buttons
- Added `title` and `aria-label` attributes to icon-only buttons
- Added `aria-label` attributes to form inputs and select elements
- Fixed discernible text issues for screen readers

#### Code Quality Fixes

- Removed inline styles from ReaderPage and LibraryPage
- Added `progress-bar` utility class to global.css
- Created `getProgressWidthClass` function for dynamic Tailwind classes
- Fixed import path in ProtectedRoute component
- Added TypeScript type annotation in Storybook main.ts

### Added - 2026-04-27

#### Phase 2: Core Components

- `src/components/Button/Button.tsx` - Button component with variants (primary, secondary, outline, ghost, danger), sizes (sm, md, lg), loading state, and icon support
- `src/components/Button/Button.stories.tsx` - Storybook stories for Button
- `src/components/Button/index.ts` - Export file
- `src/components/Input/Input.tsx` - Input component with label, error, hint, leftIcon, rightIcon, and password toggle
- `src/components/Input/Input.stories.tsx` - Storybook stories for Input
- `src/components/Input/index.ts` - Export file
- `src/components/Card/Card.tsx` - Card component with variants (default, hover, interactive)
- `src/components/Card/Card.stories.tsx` - Storybook stories for Card
- `src/components/Card/index.ts` - Export file
- `src/components/Modal/Modal.tsx` - Modal component with Framer Motion animations
- `src/components/Modal/Modal.stories.tsx` - Storybook stories for Modal
- `src/components/Modal/index.ts` - Export file
- `src/components/Navigation/Navigation.tsx` - Responsive navigation with mobile menu
- `src/components/Navigation/Navigation.stories.tsx` - Storybook stories for Navigation
- `src/components/Navigation/index.ts` - Export file
- `src/components/Footer/Footer.tsx` - Footer with links and social icons
- `src/components/Footer/Footer.stories.tsx` - Storybook stories for Footer
- `src/components/Footer/index.ts` - Export file
- `src/components/Comments/Comments.tsx` - Full-featured comments component with replies, likes, edit, delete
- `src/components/Comments/index.ts` - Export file
- `src/components/ProtectedRoute/ProtectedRoute.tsx` - Route protection component
- `src/components/ProtectedRoute/index.ts` - Export file

#### Phase 3: Authentication

- `src/pages/auth/LoginPage.tsx` - Login page with form validation and OAuth buttons
- `src/pages/auth/RegisterPage.tsx` - Registration page with validation
- `src/pages/auth/ForgotPasswordPage.tsx` - Password reset request page
- `src/pages/auth/ResetPasswordPage.tsx` - Password reset form page
- `src/hooks/useAuth.tsx` - Auth context and hook with login, register, logout

#### Phase 4: Webtoon Browsing

- `src/pages/home/HomePage.tsx` - Home page with hero, trending, new releases sections
- `src/pages/webtoon/WebtoonDetailPage.tsx` - Webtoon detail page with episodes list
- `src/pages/categories/CategoriesPage.tsx` - Categories page with genre filtering
- `src/pages/search/SearchPage.tsx` - Search page with trending and recent searches
- `src/demo/mocks/data.ts` - Mock data for webtoons, episodes, genres, authors

#### Phase 5: Webtoon Reading

- `src/pages/reader/ReaderPage.tsx` - Reader page with:
  - Sticky header with reading progress bar
  - Dark/Light mode toggle
  - Font size settings
  - Episode navigation (prev/next)
  - Comments modal
  - Like/Bookmark functionality
  - Premium episode lock screen

#### Phase 6: User Features

- `src/pages/profile/ProfilePage.tsx` - User profile page with:
  - Profile information editing
  - Stats display (webtoons read, episodes, bookmarks, likes)
  - Settings tab (notifications, email preferences)
  - Preferences tab (reading mode, font size, genres)
  - Security tab (password change, connected accounts, login history)
- `src/pages/library/LibraryPage.tsx` - Library page with:
  - Bookmarks, History, Likes tabs
  - Grid and List view modes
  - Search and filter functionality
  - Progress tracking
- `src/pages/notifications/NotificationsPage.tsx` - Notifications page with:
  - All/Unread filter
  - Mark all as read
  - Delete notifications
  - Notification type icons and colors

#### Phase 7: Coins & Payment

- `src/pages/coins/CoinsPage.tsx` - Coins page with:
  - Balance display
  - Coin packages with bonus
  - Payment method selection (MMQR, A+, Card)
  - Transaction history
  - Payment modal with processing state

#### Phase 10: App Router & Layouts

- `src/layouts/MainLayout.tsx` - Main layout with Navigation and Footer
- `src/layouts/AuthLayout.tsx` - Auth layout for login/register pages
- `src/layouts/ReaderLayout.tsx` - Reader layout for reading pages
- `src/layouts/index.ts` - Export file
- `src/App.tsx` - Complete routing setup with React Router

#### Index Files

- `src/pages/profile/index.ts` - Export file
- `src/pages/library/index.ts` - Export file
- `src/pages/notifications/index.ts` - Export file
- `src/pages/coins/index.ts` - Export file

### Changed - 2026-04-27

#### Configuration Updates

- `src/constants/index.ts` - Removed import.meta.env usage for build compatibility

#### Code Cleanup

- Removed unused imports from multiple files for TypeScript compliance
- Fixed all TypeScript build errors

---

### Added - 2026-04-26

#### Project Setup

- Created `PROJECT_PLAN.md` with complete project documentation
- Created `PROJECT_RULES.md` with development rules and guidelines
- Created `CHANGELOG.md` for tracking changes
- Created `LAST_SESSION.md` for session documentation
- Initialized React + TypeScript + Vite project
- Setup Tailwind CSS v3 with custom theme colors (Purple)
- Setup ESLint with TypeScript support
- Setup Prettier for code formatting
- Setup Storybook for component documentation
- Created project folder structure

#### Configuration Files

- `package.json` - Project dependencies and scripts
- `vite.config.ts` - Vite configuration with path aliases
- `tsconfig.json` - TypeScript configuration
- `tailwind.config.js` - Tailwind CSS with custom primary colors
- `postcss.config.js` - PostCSS configuration
- `eslint.config.js` - ESLint configuration
- `.prettierrc` - Prettier configuration
- `.gitignore` - Git ignore patterns
- `.storybook/main.ts` - Storybook main configuration
- `.storybook/preview.ts` - Storybook preview configuration

#### Source Files

- `global.css` - Global styles with Tailwind classes (ROOT LEVEL)
- `src/main.tsx` - Application entry point
- `src/App.tsx` - Root component
- `src/vite-env.d.ts` - Vite environment types
- `src/types/index.ts` - TypeScript type definitions
- `src/constants/index.ts` - Application constants

#### Documentation

- Defined project scope and goals (Production-ready, Full Product)
- Defined target audience (Myanmar, All ages)
- Defined tech stack (React, TypeScript, Tailwind v3, NodeJS, MongoDB, Auth0)
- Defined project architecture (Modular Component Structure)
- Defined features list (All High Priority)
- Defined payment system (Coins, MMQR, A+)
- Defined theme colors (Purple - Tailwind CSS classes)
- Documented Backend/Frontend separation architecture

#### Planning

- Analyzed TextPad (dev.textpadmm.com) for reference
- Created theme demo with Purple color scheme
- Decided on three separate projects (WebPad Website + WebPad Admin + WebPad Backend)

### Changed - 2026-04-26

#### File Structure

- Moved `global.css` from `src/styles/` to project root
- Updated import path in `src/main.tsx` to `../global.css`
- Updated import path in `.storybook/preview.ts` to `../../global.css`
- Updated `tailwind.config.js` content array to include `global.css`

#### Documentation Updates

- Updated `PROJECT_PLAN.md` with Backend/Frontend separation architecture
- Updated `PROJECT_RULES.md` with clearer CSS rules (NO inline CSS)
- Updated `PROJECT_RULES.md` with Storybook file location rules
- Updated `PROJECT_RULES.md` with global.css location documentation

### Removed - 2026-04-26

- Deleted `demo.html` - Temporary demo file
- Deleted `src/styles/` folder - Moved global.css to root

---

## Change Categories

| Category     | Description                  |
| ------------ | ---------------------------- |
| `Added`      | New features                 |
| `Changed`    | Changes to existing features |
| `Deprecated` | Features to be removed       |
| `Removed`    | Features removed             |
| `Fixed`      | Bug fixes                    |
| `Security`   | Security improvements        |

---

## Version History

| Version | Date       | Description                                 |
| ------- | ---------- | ------------------------------------------- |
| 0.0.1   | 2026-04-26 | Project initialization and planning         |
| 0.1.0   | 2026-04-27 | Phase 1-10 complete (except Phase 8, 9, 11) |

---

## Contributors

| Agent  | Date       | Changes                                |
| ------ | ---------- | -------------------------------------- |
| Claude | 2026-04-26 | Project setup, documentation, planning |
| Claude | 2026-04-27 | Phase 2-7, 10 implementation           |

---

## Notes

- This changelog is updated after every significant change
- All agents must update this file after making changes
- Follow the "Mind Your Own Business" rule - only document your own changes
