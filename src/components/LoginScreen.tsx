import { useState } from 'react'
import './LoginScreen.css'

interface LoginScreenProps {
  onLogin: (password: string) => void
  error?: string | null
}

export default function LoginScreen({ onLogin, error }: LoginScreenProps) {
  const [password, setPassword] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      onLogin(password)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="login-screen">
      <div className="login-container">
        <h1>Campaign Dashboard</h1>
        <p>Enter password to access the dashboard</p>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              autoFocus
              disabled={isSubmitting}
              required
            />
          </div>

          {error && <div className="alert alert-error">{error}</div>}

          <button type="submit" disabled={isSubmitting} className="login-button">
            {isSubmitting ? 'Authenticating...' : 'Enter'}
          </button>
        </form>
      </div>
    </div>
  )
}
