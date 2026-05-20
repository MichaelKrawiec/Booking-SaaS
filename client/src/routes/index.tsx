import { createBrowserRouter } from 'react-router-dom'

// Pages
import HomePage from '../pages/HomePage'
import SearchPage from '../pages/SearchPage'
import BusinessPage from '../pages/BusinessPage'
import BookingConfirmPage from '../pages/BookingConfirmPage'
import ListBusinessPage from '../pages/ListBusinessPage'
import LoginPage from '../pages/LoginPage'
import RegisterPage from '../pages/RegisterPage'
import DashboardPage from '../pages/DashboardPage'
import NotFoundPage from '../pages/NotFoundPage'

// Protected route wrapper
import ProtectedRoute from '../components/common/ProtectedRoute'

export const router = createBrowserRouter([
  { path: '/',                    element: <HomePage /> },
  { path: '/search',              element: <SearchPage /> },
  { path: '/business/:id',        element: <BusinessPage /> },
  { path: '/booking/confirm',     element: <BookingConfirmPage /> },
  { path: '/list-your-business',  element: <ListBusinessPage /> },
  { path: '/login',               element: <LoginPage /> },
  { path: '/register',            element: <RegisterPage /> },
  {
    path: '/dashboard',
    element: <ProtectedRoute><DashboardPage /></ProtectedRoute>
  },
  { path: '*',                    element: <NotFoundPage /> },
])