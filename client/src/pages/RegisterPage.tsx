import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const RegisterPage = () => {
  const navigate = useNavigate()
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({})
  const [role, setRole] = useState('owner')
  
  const [loading, setLoading] = useState(false)

    const handleRegister = async () => {
  setError('')
  setFieldErrors({})
  setLoading(true)
    try {
      const response = await axios.post('http://localhost:5000/api/auth/register', {
        first_name: firstName,
        last_name: lastName,
        email,
        password,
        role
      })

      // Create user in localStorage
      localStorage.setItem('token', response.data.token)
      localStorage.setItem('user', JSON.stringify(response.data.user))

      // Redirect to dashboard
      navigate('/list-your-business')

    } catch (err: any) {
      const data = err.response?.data

      if (data?.errors) {
        // Validation errors — field specific
        setFieldErrors(data.errors)
        setError('')
      } else {
        // General error (e.g. email already in use)
        setError(data?.message || 'Something went wrong. Please try again.')
        setFieldErrors({})
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="flex flex-col items-center gap-8 w-full max-w-sm px-4">

        <h1 className="animate-pulse text-4xl font-black bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-transparent bg-clip-text">
          Register
        </h1>


        <div className="flex flex-col gap-4 w-full">
          {fieldErrors.firstName && (
            <p className="text-red-500 text-sm">{fieldErrors.firstName[0]}</p>
          )}
          <input
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="w-full px-4 py-2 rounded bg-gray-900 text-white border border-gray-700 focus:outline-none focus:border-purple-500"
          />
          {fieldErrors.lastName && (
            <p className="text-red-500 text-sm">{fieldErrors.lastName[0]}</p>
          )}
          <input
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="w-full px-4 py-2 rounded bg-gray-900 text-white border border-gray-700 focus:outline-none focus:border-purple-500"
          />
          {fieldErrors.email && (
            <p className="text-red-500 text-sm">{fieldErrors.email[0]}</p>
          )} 
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 rounded bg-gray-900 text-white border border-gray-700 focus:outline-none focus:border-purple-500"
          />
          {fieldErrors.password && (
            <p className="text-red-500 text-sm">{fieldErrors.password[0]}</p>
          )}
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 rounded bg-gray-900 text-white border border-gray-700 focus:outline-none focus:border-purple-500"
          />

          {fieldErrors.role && (
            <p className="text-red-500 text-sm">{fieldErrors.role[0]}</p>
          )}
          {error && (
            <p className="text-red-500 text-sm text-center">{error}</p>
          )}

          <button
            onClick={handleRegister}
            disabled={loading}
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition disabled:opacity-50"
          >
            {loading ? 'Registering...' : 'Register'}
          </button>

        </div>

      </div>
    </div>
  )
  
}

export default RegisterPage