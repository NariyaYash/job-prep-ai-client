import { useState } from "react"
import "../auth.form.scss"
import { Link, useNavigate } from 'react-router'
import { useAuth } from "../hooks/useAuth"

function Login() {
  const { loading, handleLogin } = useAuth();
  const navigate = useNavigate()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [errors, setErrors] = useState({})

  const validateForm = () => {
    const newErrors = {}
    if (!email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Please enter a valid email"
    }
    if (!password.trim()) {
      newErrors.password = "Password is required"
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validateForm()) return
    await handleLogin({ email, password })
    navigate('/')
  }

  if (loading) {
    return (
      <main className="loading-screen">
        <h1>Signing you in...</h1>
        <div className="loader"></div>
      </main>
    )
  }

  return (
    <main className="auth-page">
      <div className="form-container">
        <div className="form-top">
          <div className="brand-title">
            <span>Job Prep</span>
            <strong>AI</strong>
          </div>
          <h1>Welcome back</h1>
          <p>Sign in to continue building your personalized interview strategy.</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor='email'>Email</label>
            <input
              autoComplete="email"
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              id='email'
              placeholder="you@example.com"
              value={email}
            />
            {errors.email && <span className="error-message">{errors.email}</span>}
          </div>
          <div className="input-group">
            <label htmlFor='password'>Password</label>
            <input
              autoComplete="current-password"
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              id='password'
              placeholder="********"
              value={password}
            />
            {errors.password && <span className="error-message">{errors.password}</span>}
          </div>
          <button className="button primary-button">Login</button>
        </form>
        <p className="form-footer">
          Don&apos;t have an account? <Link to="/register">Create one</Link>
        </p>
      </div>
    </main>
  )
}

export default Login