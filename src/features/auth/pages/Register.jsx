import { useState } from "react"
import "../auth.form.scss"
import { Link, useNavigate } from 'react-router'
import { useAuth } from "../hooks/useAuth"

function Register() {
  const { loading, handleRegister } = useAuth();
  const navigate = useNavigate()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [username, setUsername] = useState("")
  const [errors, setErrors] = useState({})

  const validateForm = () => {
    const newErrors = {}
    if (!username.trim()) {
      newErrors.username = "Username is required"
    }
    if (!email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Please enter a valid email"
    }
    if (!password.trim()) {
      newErrors.password = "Password is required"
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters"
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return
    await handleRegister({ username, email, password });
    navigate("/")
  }

  if (loading) {
    return (
      <main className="loading-screen">
        <h1>Creating your account...</h1>
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
          <h1>Create your account</h1>
          <p>Join Job Prep AI and get tailored interview coaching for your next role.</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor='username'>Username</label>
            <input
              autoComplete="username"
              onChange={(e) => setUsername(e.target.value)}
              type="text"
              id='username'
              placeholder="Your name"
              value={username}
            />
            {errors.username && <span className="error-message">{errors.username}</span>}
          </div>
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
              autoComplete="new-password"
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              id='password'
              placeholder="Create a password"
              value={password}
            />
            {errors.password && <span className="error-message">{errors.password}</span>}
          </div>
          <button className="button primary-button">Sign Up</button>
        </form>
        <p className="form-footer">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </main>
  )
}

export default Register 