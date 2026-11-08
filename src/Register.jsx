import { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  UserRound,
  Mail,
  LockKeyhole,
  Eye,
  EyeOff,
  Target,
  Sparkles,
  CheckCircle2,
  TrendingUp
} from "lucide-react";
import "./Register.css";

export default function Register({ onBack, onLogin, onRegisterSuccess, initialValues = {} }) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [fullName, setFullName] = useState(initialValues.fullName || "");
  const [email, setEmail] = useState(initialValues.email || "");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [error, setError] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    setError("");

    if (!fullName.trim() || !email.trim() || !password || !confirmPassword) {
      setError("Please complete all required fields.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError("Please enter a valid email address.");
      return;
    }

    if (password.length < 8) {
      setError("Your password must contain at least 8 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Your passwords do not match.");
      return;
    }

    if (!acceptedTerms) {
      setError("Please accept the terms and conditions to continue.");
      return;
    }

    if (onRegisterSuccess) {
      onRegisterSuccess({
        fullName: fullName.trim(),
        email: email.trim(),
        password
      });
    } else {
      setError("Your form is valid! Account creation will be enabled after backend integration.");
    }
  }

  return (
    <main className="register-page">
      <section className="register-showcase">
        <div className="register-glow register-glow-blue" />
        <div className="register-glow register-glow-pink" />

        <button
        type="button"
        className="register-back"
        onClick={() => {
            onBack();
            window.history.replaceState(null, "", window.location.pathname);
            window.scrollTo({ top: 0, behavior: "instant" });
        }}
        >
            <ArrowLeft size={17} />
            Back to homepage
        </button>

        <a className="register-brand" href="#register-home">
          <span className="register-brand-icon">
            <Target size={25} />
            <span />
          </span>
          <span>
            Career<span>Fit</span>
          </span>
        </a>

        <div className="register-showcase-content">
          <div className="register-badge">
            <Sparkles size={15} />
            YOUR FUTURE, BUILT STEP BY STEP
          </div>

          <h1>
            Your journey
            <br />
            starts <span>here.</span>
          </h1>

          <p className="register-description">
            Understand your strengths, uncover your skill gaps, and create
            a personalized path toward the career you want.
          </p>

          <div className="register-preview">
            <div className="register-preview-header">
              <div>
                <span className="register-eyebrow">YOUR CAREER JOURNEY</span>
                <h3>Every step moves you forward.</h3>
              </div>
              <span className="register-preview-icon">
                <TrendingUp size={20} />
              </span>
            </div>

            <div className="register-score-panel">
              <div>
                <span className="register-eyebrow">ILLUSTRATIVE READINESS SCORE</span>
                <div className="register-score">
                  78<span>%</span>
                </div>
                <p>Example dashboard preview</p>
              </div>

              <div className="register-score-ring">
                <svg viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="39" className="register-ring-track" />
                  <circle cx="50" cy="50" r="39" className="register-ring-progress" />
                </svg>
                <Sparkles size={23} />
              </div>
            </div>

            <div className="register-progress">
              <div className="register-progress-heading">
                <span>Personalized learning</span>
                <span>YOUR NEXT STEP</span>
              </div>
              <div className="register-progress-track">
                <span />
              </div>
            </div>

            <div className="register-preview-footer">
              <CheckCircle2 size={17} />
              <span>Understand your skills. Plan your growth.</span>
              <ArrowUpRight size={17} />
            </div>
          </div>

          <div className="register-benefits">
            <span><CheckCircle2 size={16} /> Identify skill gaps</span>
            <span><CheckCircle2 size={16} /> Build a learning plan</span>
            <span><CheckCircle2 size={16} /> Track your growth</span>
          </div>
        </div>

        <div className="register-showcase-footer">
          YOUR GOAL. YOUR SKILLS. YOUR PLAN.
        </div>
      </section>

      <section className="register-form-side">
        <div className="register-mobile-brand">
          <span className="register-brand-icon">
            <Target size={23} />
            <span />
          </span>
          <span>
            Career<span>Fit</span>
          </span>
        </div>

        <div className="register-form-container">
          <div className="register-form-heading">
            <span className="register-kicker">
              <span />
              GET STARTED
            </span>

            <h2>
              Create your
              <br />
              <span>CareerFit account.</span>
            </h2>

            <p>Start building a clearer path toward your career goals.</p>
          </div>

          <form className="register-form" onSubmit={handleSubmit}>
            <div className="register-field">
              <label htmlFor="register-name">Full name</label>
              <div className="register-input">
                <UserRound size={19} />
                <input
                  id="register-name"
                  type="text"
                  placeholder="Enter your full name"
                  autoComplete="name"
                  value={fullName}
                  onChange={(event) => setFullName(event.target.value)}
                />
              </div>
            </div>

            <div className="register-field">
              <label htmlFor="register-email">Email address</label>
              <div className="register-input">
                <Mail size={19} />
                <input
                  id="register-email"
                  type="email"
                  placeholder="you@example.com"
                  autoComplete="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                />
              </div>
            </div>

            <div className="register-field">
              <label htmlFor="register-password">Password</label>
              <div className="register-input">
                <LockKeyhole size={19} />
                <input
                  id="register-password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a password"
                  autoComplete="new-password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                />
                <button
                  type="button"
                  className="register-password-toggle"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={19} /> : <Eye size={19} />}
                </button>
              </div>
              <span className="register-field-hint">
                Use at least 8 characters.
              </span>
            </div>

            <div className="register-field">
              <label htmlFor="register-confirm-password">Confirm password</label>
              <div className="register-input">
                <LockKeyhole size={19} />
                <input
                  id="register-confirm-password"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Re-enter your password"
                  autoComplete="new-password"
                  value={confirmPassword}
                  onChange={(event) => setConfirmPassword(event.target.value)}
                />
                <button
                  type="button"
                  className="register-password-toggle"
                  aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <EyeOff size={19} /> : <Eye size={19} />}
                </button>
              </div>
            </div>

            <label className="register-terms">
              <input
                type="checkbox"
                checked={acceptedTerms}
                onChange={(event) => setAcceptedTerms(event.target.checked)}
              />
              <span className="register-custom-checkbox">
                <CheckCircle2 size={14} />
              </span>
              <span>
                I agree to the <a href="#terms" onClick={(event) => event.preventDefault()}>Terms of Service</a> and{" "}
                <a href="#privacy" onClick={(event) => event.preventDefault()}>Privacy Policy</a>.
              </span>
            </label>

            {error && (
              <div className="register-message" role="status">
                {error}
              </div>
            )}

            <button className="register-submit" type="submit">
              Create my account
              <ArrowRight size={19} />
            </button>

            <div className="register-divider">
              <span />
              <span>YOUR CAREER JOURNEY</span>
              <span />
            </div>

            <p className="register-login-prompt">
              Already have an account?
              <button type="button" onClick={onLogin}>
                Log in <ArrowUpRight size={16} />
              </button>
            </p>
          </form>

          <div className="register-security-note">
            <LockKeyhole size={15} />
            <span>Your next step starts with you.</span>
          </div>
        </div>

        <div className="register-legal">
          <span>© 2026 CareerFit</span>
          <span>Built for your next step.</span>
        </div>
      </section>
    </main>
  );
}