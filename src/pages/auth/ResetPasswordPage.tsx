import { useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Lock, CheckCircle } from 'lucide-react'
import { motion } from 'framer-motion'
import Button from '../../components/Button'
import Input from '../../components/Input'

const ResetPasswordPage = () => {
  const { t } = useTranslation()
  const [searchParams] = useSearchParams()
  const token = searchParams.get('token')

  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: '',
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }))
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    if (!formData.password) {
      newErrors.password = t('auth.passwordRequired')
    } else if (formData.password.length < 8) {
      newErrors.password = t('auth.passwordMinLength8')
    }
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = t('auth.confirmPasswordRequired')
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = t('auth.passwordMismatch')
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) return

    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsLoading(false)
    setIsSuccess(true)
  }

  if (!token) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="w-full max-w-md text-center"
        >
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 sm:p-8">
            <h1 className="text-xl font-bold text-gray-900 mb-2">{t('auth.invalidLink')}</h1>
            <p className="text-gray-600 mb-6">{t('auth.invalidLinkDesc')}</p>
            <Link to="/forgot-password">
              <Button className="w-full">{t('auth.requestNewLink')}</Button>
            </Link>
          </div>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <Link to="/" className="text-3xl font-bold text-primary-600">
            WebPad
          </Link>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 sm:p-8">
          {!isSuccess ? (
            <>
              <div className="text-center mb-6">
                <h1 className="text-2xl font-bold text-gray-900">{t('auth.setNewPassword')}</h1>
                <p className="mt-2 text-gray-600">{t('auth.setNewPasswordDesc')}</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <Input
                  label={t('auth.newPassword')}
                  type="password"
                  name="password"
                  placeholder={t('auth.passwordPlaceholder')}
                  value={formData.password}
                  onChange={handleChange}
                  error={errors.password}
                  leftIcon={<Lock className="w-5 h-5" />}
                />

                <Input
                  label={t('auth.confirmPassword')}
                  type="password"
                  name="confirmPassword"
                  placeholder={t('auth.confirmPasswordPlaceholder')}
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  error={errors.confirmPassword}
                  leftIcon={<Lock className="w-5 h-5" />}
                />

                <Button type="submit" className="w-full" isLoading={isLoading}>
                  {t('auth.resetPassword')}
                </Button>
              </form>
            </>
          ) : (
            <div className="text-center py-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">{t('auth.passwordReset')}</h2>
              <p className="text-gray-600 mb-6">{t('auth.passwordResetDesc')}</p>
              <Link to="/login">
                <Button className="w-full">{t('auth.continueToLogin')}</Button>
              </Link>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  )
}

export default ResetPasswordPage
