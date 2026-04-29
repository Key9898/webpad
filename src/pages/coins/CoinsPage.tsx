import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Coins,
  Gift,
  History,
  Check,
  Shield,
  Clock,
  ArrowUpRight,
  ArrowDownLeft,
  Sparkles,
} from 'lucide-react'
import { useTranslation } from 'react-i18next'
import Button from '../../components/Button'
import Modal from '../../components/Modal'

interface CoinPackage {
  id: string
  coins: number
  price: number
  bonus?: number
  popular?: boolean
  bestValue?: boolean
}

interface Transaction {
  id: string
  type: 'purchase' | 'spend' | 'refund' | 'bonus'
  amount: number
  description: string
  balance: number
  createdAt: string
}

const coinPackages: CoinPackage[] = [
  { id: '1', coins: 50, price: 1000 },
  { id: '2', coins: 120, price: 2000, bonus: 10 },
  { id: '3', coins: 300, price: 5000, bonus: 30, popular: true },
  { id: '4', coins: 650, price: 10000, bonus: 80 },
  { id: '5', coins: 1400, price: 20000, bonus: 200, bestValue: true },
  { id: '6', coins: 3000, price: 40000, bonus: 500 },
]

const mockTransactions: Transaction[] = [
  {
    id: '1',
    type: 'purchase',
    amount: 300,
    description: 'Purchased 300 coins',
    balance: 450,
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: '2',
    type: 'spend',
    amount: -5,
    description: 'Unlocked Episode 45 - Shadow Knight',
    balance: 150,
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: '3',
    type: 'spend',
    amount: -5,
    description: 'Unlocked Episode 44 - Shadow Knight',
    balance: 155,
    createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: '4',
    type: 'bonus',
    amount: 30,
    description: 'Bonus coins from package purchase',
    balance: 160,
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: '5',
    type: 'purchase',
    amount: 120,
    description: 'Purchased 120 coins',
    balance: 130,
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
  },
]

type PaymentMethod = 'mmqr' | 'aPlus' | 'card'

const CoinsPage = () => {
  const { t } = useTranslation()
  const [balance, setBalance] = useState(150)
  const [selectedPackage, setSelectedPackage] = useState<CoinPackage | null>(null)
  const [showPaymentModal, setShowPaymentModal] = useState(false)
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<PaymentMethod | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [activeTab, setActiveTab] = useState<'buy' | 'history'>('buy')

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US').format(price) + ' MMK'
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  const handlePurchase = () => {
    if (!selectedPackage || !selectedPaymentMethod) return

    setIsProcessing(true)

    setTimeout(() => {
      const totalCoins = selectedPackage.coins + (selectedPackage.bonus || 0)
      setBalance((prev) => prev + totalCoins)
      setIsProcessing(false)
      setShowPaymentModal(false)
      setShowSuccess(true)
      setSelectedPackage(null)
      setSelectedPaymentMethod(null)

      setTimeout(() => setShowSuccess(false), 3000)
    }, 2000)
  }

  const getTransactionIcon = (type: Transaction['type']) => {
    switch (type) {
      case 'purchase':
        return <ArrowDownLeft className="w-5 h-5 text-green-500" />
      case 'spend':
        return <ArrowUpRight className="w-5 h-5 text-red-500" />
      case 'refund':
        return <ArrowDownLeft className="w-5 h-5 text-blue-500" />
      case 'bonus':
        return <Gift className="w-5 h-5 text-amber-500" />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-primary-500 to-primary-700 rounded-2xl p-6 sm:p-8 mb-6 text-white">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <p className="text-primary-100 text-sm font-medium">{t('coinsPage.yourBalance')}</p>
              <div className="flex items-center gap-3 mt-1">
                <Coins className="w-10 h-10" />
                <span className="text-4xl sm:text-5xl font-bold">{balance}</span>
              </div>
              <p className="text-primary-200 text-sm mt-2">{t('coinsPage.useCoinsDesc')}</p>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2 text-primary-100 text-sm">
                <Shield className="w-4 h-4" />
                {t('coinsPage.securePayments')}
              </div>
              <div className="flex items-center gap-2 text-primary-100 text-sm">
                <Clock className="w-4 h-4" />
                {t('coinsPage.instantDelivery')}
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm mb-6">
          <div className="flex border-b border-gray-100">
            <button
              onClick={() => setActiveTab('buy')}
              className={`flex-1 flex items-center justify-center gap-2 px-6 py-4 font-medium transition-colors ${
                activeTab === 'buy'
                  ? 'text-primary-600 border-b-2 border-primary-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <Coins className="w-5 h-5" />
              {t('coinsPage.buyCoins')}
            </button>
            <button
              onClick={() => setActiveTab('history')}
              className={`flex-1 flex items-center justify-center gap-2 px-6 py-4 font-medium transition-colors ${
                activeTab === 'history'
                  ? 'text-primary-600 border-b-2 border-primary-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <History className="w-5 h-5" />
              {t('coinsPage.transactionHistory')}
            </button>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {activeTab === 'buy' ? (
            <motion.div
              key="buy"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {coinPackages.map((pkg) => (
                  <motion.button
                    key={pkg.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      setSelectedPackage(pkg)
                      setShowPaymentModal(true)
                    }}
                    className={`relative p-6 rounded-2xl border-2 text-left transition-all ${
                      pkg.popular
                        ? 'border-primary-500 bg-primary-50'
                        : pkg.bestValue
                          ? 'border-amber-500 bg-amber-50'
                          : 'border-gray-200 bg-white hover:border-primary-300'
                    }`}
                  >
                    {pkg.popular && (
                      <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-primary-600 text-white text-xs font-semibold rounded-full">
                        {t('coinsPage.popular')}
                      </span>
                    )}
                    {pkg.bestValue && (
                      <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-amber-500 text-white text-xs font-semibold rounded-full">
                        {t('coinsPage.bestValue')}
                      </span>
                    )}

                    <div className="flex items-center gap-3 mb-4">
                      <div
                        className={`w-12 h-12 rounded-full flex items-center justify-center ${
                          pkg.popular
                            ? 'bg-primary-600'
                            : pkg.bestValue
                              ? 'bg-amber-500'
                              : 'bg-gray-200'
                        }`}
                      >
                        <Coins
                          className={`w-6 h-6 ${
                            pkg.popular || pkg.bestValue ? 'text-white' : 'text-gray-600'
                          }`}
                        />
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-gray-900">
                          {pkg.coins.toLocaleString()}
                        </p>
                        {pkg.bonus && (
                          <p className="text-sm text-green-600 font-medium">
                            +{pkg.bonus} {t('coinsPage.bonus')}
                          </p>
                        )}
                      </div>
                    </div>

                    <p className="text-lg font-semibold text-gray-900">{formatPrice(pkg.price)}</p>
                    <p className="text-sm text-gray-500 mt-1">
                      {Math.round(pkg.price / pkg.coins)} MMK per coin
                    </p>
                  </motion.button>
                ))}
              </div>

              <div className="mt-8 bg-white rounded-2xl shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">{t('coinsPage.title')}</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  {[
                    {
                      icon: <Coins className="w-6 h-6" />,
                      title: t('coinsPage.buyCoins'),
                      description: t('coinsPage.selectPaymentMethod'),
                    },
                    {
                      icon: <Sparkles className="w-6 h-6" />,
                      title: t('webtoonDetail.episodes'),
                      description: t('coinsPage.useCoinsDesc'),
                    },
                    {
                      icon: <Gift className="w-6 h-6" />,
                      title: t('coinsPage.bonus'),
                      description: t('coinsPage.bonusCoins'),
                    },
                  ].map((item, index) => (
                    <div key={index} className="flex gap-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center text-primary-600">
                        {item.icon}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">{item.title}</p>
                        <p className="text-sm text-gray-500 mt-1">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="history"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                <div className="divide-y divide-gray-100">
                  {mockTransactions.map((transaction) => (
                    <div
                      key={transaction.id}
                      className="flex items-center gap-4 p-4 hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex-shrink-0 w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                        {getTransactionIcon(transaction.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-gray-900">{transaction.description}</p>
                        <p className="text-sm text-gray-500">{formatDate(transaction.createdAt)}</p>
                      </div>
                      <div className="text-right">
                        <p
                          className={`font-semibold ${
                            transaction.amount > 0 ? 'text-green-600' : 'text-red-600'
                          }`}
                        >
                          {transaction.amount > 0 ? '+' : ''}
                          {transaction.amount}
                        </p>
                        <p className="text-sm text-gray-500">
                          {t('coinsPage.balance')}: {transaction.balance}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {mockTransactions.length === 0 && (
                  <div className="py-16 text-center">
                    <History className="w-12 h-12 mx-auto text-gray-300 mb-3" />
                    <p className="text-gray-500">{t('libraryPage.noItems')}</p>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <Modal
          isOpen={showPaymentModal}
          onClose={() => {
            setShowPaymentModal(false)
            setSelectedPackage(null)
            setSelectedPaymentMethod(null)
          }}
          title={t('coinsPage.selectPaymentMethod')}
        >
          {selectedPackage && (
            <div className="space-y-6">
              <div className="bg-gray-50 rounded-xl p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary-600 rounded-full flex items-center justify-center">
                      <Coins className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">
                        {selectedPackage.coins.toLocaleString()} {t('coinsPage.coins')}
                      </p>
                      {selectedPackage.bonus && (
                        <p className="text-sm text-green-600">
                          +{selectedPackage.bonus} {t('coinsPage.bonusCoins')}
                        </p>
                      )}
                    </div>
                  </div>
                  <p className="text-lg font-bold text-gray-900">
                    {formatPrice(selectedPackage.price)}
                  </p>
                </div>
              </div>

              <div>
                <p className="text-sm font-medium text-gray-700 mb-3">
                  {t('coinsPage.selectPaymentMethod')}
                </p>
                <div className="space-y-3">
                  {[
                    {
                      id: 'mmqr' as PaymentMethod,
                      name: 'MMQR',
                      description: 'Scan QR code with any banking app',
                      icon: '📱',
                    },
                    {
                      id: 'aPlus' as PaymentMethod,
                      name: 'A+',
                      description: 'Pay with A+ mobile money',
                      icon: '💳',
                    },
                    {
                      id: 'card' as PaymentMethod,
                      name: 'Credit/Debit Card',
                      description: 'Visa, Mastercard, JCB',
                      icon: '💳',
                    },
                  ].map((method) => (
                    <button
                      key={method.id}
                      onClick={() => setSelectedPaymentMethod(method.id)}
                      className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-all ${
                        selectedPaymentMethod === method.id
                          ? 'border-primary-600 bg-primary-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <span className="text-2xl">{method.icon}</span>
                      <div className="flex-1 text-left">
                        <p className="font-medium text-gray-900">{method.name}</p>
                        <p className="text-sm text-gray-500">{method.description}</p>
                      </div>
                      {selectedPaymentMethod === method.id && (
                        <Check className="w-5 h-5 text-primary-600" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex gap-3">
                <Button
                  variant="ghost"
                  className="flex-1"
                  onClick={() => {
                    setShowPaymentModal(false)
                    setSelectedPackage(null)
                    setSelectedPaymentMethod(null)
                  }}
                >
                  {t('common.cancel')}
                </Button>
                <Button
                  variant="primary"
                  className="flex-1"
                  disabled={!selectedPaymentMethod || isProcessing}
                  onClick={handlePurchase}
                >
                  {isProcessing ? (
                    <span className="flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      {t('coinsPage.processing')}
                    </span>
                  ) : (
                    `Pay ${formatPrice(selectedPackage.price)}`
                  )}
                </Button>
              </div>
            </div>
          )}
        </Modal>

        <AnimatePresence>
          {showSuccess && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-green-600 text-white px-6 py-3 rounded-full shadow-lg flex items-center gap-2"
            >
              <Check className="w-5 h-5" />
              {t('coinsPage.purchaseSuccess')}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default CoinsPage
