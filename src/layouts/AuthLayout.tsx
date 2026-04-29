import { Outlet } from 'react-router-dom'

const AuthLayout = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 to-primary-100 p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-primary-600">WebPad</h1>
          <p className="text-gray-500 mt-2">Your gateway to amazing webtoons</p>
        </div>
        <Outlet />
      </div>
    </div>
  )
}

export default AuthLayout
