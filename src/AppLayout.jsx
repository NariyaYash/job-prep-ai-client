import { useState } from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import { useAuth } from "./features/auth/hooks/useAuth";
import "./AppLayout.scss";

const AppLayout = () => {
  const [navOpen, setNavOpen] = useState(false);
  const { user, handleLogout } = useAuth();
  const navigate = useNavigate();

  const onLogout = async () => {
    await handleLogout();
    navigate("/login");
  };

  return (
    <div className="app-shell">
      <header className="app-header">
        <div className="header-brand">
          <Link to="/" className="brand-logo">
            Job Prep AI
          </Link>
          <p className="brand-tagline">Interview prep tailored for your next role.</p>
        </div>

        <button
          className={`header-toggle ${navOpen ? "header-toggle--active" : ""}`}
          type="button"
          aria-label="Toggle navigation"
          onClick={() => setNavOpen((open) => !open)}
        >
          <span />
          <span />
          <span />
        </button>

        <nav className={`header-nav ${navOpen ? "header-nav--open" : ""}`}>
          <Link to="/" className="nav-link" onClick={() => setNavOpen(false)}>
            Home
          </Link>
          {user && (
            <Link to="/about" className="nav-link" onClick={() => setNavOpen(false)}>
              About
            </Link>
          )}
          {user && (
            <button
              type="button"
              className="nav-link nav-link--button"
              onClick={() => {
                setNavOpen(false);
                onLogout();
              }}
            >
              Logout
            </button>
          )}
        </nav>

        <div className="header-actions">
          {user && (
            <span className="user-badge">Hi, {user.username || user.email}</span>
          )}
          <button className="logout-button" onClick={onLogout}>
            Logout
          </button>
        </div>
      </header>

      <main className="app-main">
        <Outlet />
      </main>

      <footer className="page-footer">
        <div className="footer-content">
          <p className="footer-text">© 2026 Job Prep AI. All rights reserved.</p>
          <nav className="footer-links">
            <a href="#privacy">Privacy Policy</a>
            <span className="footer-divider">•</span>
            <a href="#terms">Terms of Service</a>
            <span className="footer-divider">•</span>
            <a href="#contact">Contact Us</a>
          </nav>
        </div>
      </footer>
    </div>
  );
};

export default AppLayout;
