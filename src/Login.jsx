import { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  Target,
  Sparkles,
  CheckCircle2,
  TrendingUp
} from "lucide-react";
import "./Login.css";

export default function Login({ onBack, onRegister, onLoginSuccess }) {
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    setError("");

    if (!email.trim() || !password) {
      setError("Please enter your email and password.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError("Please enter a valid email address.");
      return;
    }

    if (onLoginSuccess) {
      onLoginSuccess({ email: email.trim() });
    } else {
      setError("Login authentication will be connected in the backend phase.");
    }
  }

  return (
    <main className="login-page">
      <section className="login-showcase">
        <div className="login-glow login-glow-blue" />
        <div className="login-glow login-glow-pink" />

        <button
        type="button"
        className="login-back"
        onClick={() => {
            onBack();
            window.history.replaceState(null, "", window.location.pathname);
            window.scrollTo({ top: 0, behavior: "instant" });
        }}
        >
            <ArrowLeft size={17} />
            Back to homepage
        </button>

        <a className="login-brand" href="#login-home">
          <span className="login-brand-icon">
            <Target size={25} />
            <span />
          </span>
          <span>
            Career<span>Fit</span>
          </span>
        </a>

        <div className="showcase-content">
          <div className="showcase-badge">
            <Sparkles size={15} />
            YOUR CAREER, WITH CLARITY
          </div>

          <h1>
            Your next move
            <br />
            starts <span className="login-blue">here.</span>
          </h1>

          <p className="showcase-description">
            Know where you stand. Discover the skills you need.
            Build a personalized path toward the career you want.
          </p>

          <div className="login-preview">
            <div className="login-preview-header">
              <div>
                <span className="login-eyebrow">YOUR CAREER JOURNEY</span>
                <h3>Every step moves you forward.</h3>
              </div>

              <span className="login-preview-icon">
                <TrendingUp size={20} />
              </span>
            </div>

            <div className="login-preview-score">
              <div>
                <span className="login-eyebrow">ILLUSTRATIVE READINESS SCORE</span>
                <div className="login-score">
                  78<span>%</span>
                </div>
                <p>Example dashboard preview</p>
              </div>

              <div className="login-score-ring">
                <svg viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="39" className="login-ring-track" />
                  <circle cx="50" cy="50" r="39" className="login-ring-progress" />
                </svg>
                <Sparkles size={22} />
              </div>
            </div>

            <div className="login-preview-progress">
              <div className="login-progress-heading">
                <span>Personalized learning</span>
                <span>YOUR NEXT STEP</span>
              </div>

              <div className="login-progress-track">
                <span />
              </div>
            </div>

            <div className="login-preview-footer">
              <CheckCircle2 size={17} />
              <span>Understand your skills. Plan your growth.</span>
              <ArrowUpRight size={17} />
            </div>
          </div>

          <div className="showcase-points">
            <span><CheckCircle2 size={16} /> Know your strengths</span>
            <span><CheckCircle2 size={16} /> Identify skill gaps</span>
            <span><CheckCircle2 size={16} /> Track your progress</span>
          </div>
        </div>

        <div className="showcase-footer">
          YOUR GOAL. YOUR SKILLS. YOUR PLAN.
        </div>
      </section>

      <section className="login-form-side">
        <div className="login-mobile-brand">
          <span className="login-brand-icon">
            <Target size={23} />
            <span />
          </span>
          <span>
            Career<span>Fit</span>
          </span>
        </div>

        <div className="login-form-container">
          <div className="login-form-heading">
            <span className="form-kicker">
              <span className="form-kicker-line" />
              WELCOME BACK
            </span>

            <h2>
              Let's get you
              <br />
              <span className="login-blue">back on track.</span>
            </h2>

            <p>Sign in to continue your career-readiness journey.</p>
          </div>

          <form className="login-form" onSubmit={handleSubmit}>
            <div className="login-input-group">
              <label htmlFor="login-email">Email address</label>

              <div className="login-input-wrapper">
                <Mail size={19} />
                <input
                  id="login-email"
                  type="email"
                  placeholder="you@example.com"
                  autoComplete="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                />
              </div>
            </div>

            <div className="login-input-group">
              <div className="login-password-heading">
                <label htmlFor="login-password">Password</label>
                <button
                  type="button"
                  className="forgot-password"
                  onClick={() =>
                    setError("Password recovery will be available after backend integration.")
                  }
                >
                  Forgot password?
                </button>
              </div>

              <div className="login-input-wrapper">
                <LockKeyhole size={19} />
                <input
                  id="login-password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                />

                <button
                  type="button"
                  className="password-toggle"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={19} /> : <Eye size={19} />}
                </button>
              </div>
            </div>

            <label className="remember-option">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(event) => setRememberMe(event.target.checked)}
              />
              <span className="custom-checkbox">
                <CheckCircle2 size={14} />
              </span>
              Remember me
            </label>

            {error && (
              <div className="login-error" role="status">
                {error}
              </div>
            )}

            <button className="login-submit" type="submit">
              Sign in to CareerFit
              <ArrowRight size={19} />
            </button>

            <div className="login-form-divider">
              <span />
              <span>YOUR CAREER JOURNEY</span>
              <span />
            </div>

            <p className="register-prompt">
              New to CareerFit?
              <button type="button" onClick={onRegister}>
                Create an account <ArrowUpRight size={16} />
              </button>
            </p>
          </form>

          <div className="login-security-note">
            <LockKeyhole size={15} />
            <span>Your career journey starts with a single step.</span>
          </div>
        </div>

        <div className="login-legal">
          <span>© 2026 CareerFit</span>
          <span>Built for your next step.</span>
        </div>
      </section>
    </main>
  );
}