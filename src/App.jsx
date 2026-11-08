import { useState } from "react";
import Login from "./Login.jsx";
import Register from "./Register.jsx";
import Dashboard from "./Dashboard.jsx";
import Onboarding from "./Onboarding.jsx";
import {
  hasActiveSession,
  clearSession,
  getUserProfile,
  getCareerGoal,
  initializeSession,
  loginUser
} from "./services/storage.js";

import {
  ArrowRight,
  ArrowUpRight,
  BrainCircuit,
  CheckCircle2,
  ChevronRight,
  Compass,
  GraduationCap,
  Menu,
  Target,
  TrendingUp,
  Sparkles,
  Zap,
  X
} from "lucide-react";

const features = [
  {
    number: "01",
    icon: BrainCircuit,
    title: "Skill Assessment",
    description: "Evaluate your abilities through role-specific questions to understand your strengths and areas for improvement.",
    color: "blue",
    label: "KNOW YOURSELF"
  },
  {
    number: "02",
    icon: Target,
    title: "Readiness Analysis",
    description: "Understand your strengths, identify missing competencies, and compare your current skills with your target role.",
    color: "pink",
    label: "KNOW YOUR LEVEL"
  },
  {
    number: "03",
    icon: Compass,
    title: "Personalized Roadmap",
    description: "Get a prioritized, day-wise learning plan based on your skill gaps and available time.",
    color: "blue",
    label: "KNOW YOUR NEXT STEP"
  },
  {
    number: "04",
    icon: TrendingUp,
    title: "Track Your Growth",
    description: "Practice, complete learning activities, and reassess your skills to measure your progress over time.",
    color: "pink",
    label: "KEEP IMPROVING"
  }
];

const steps = [
  {
    number: "01",
    icon: Target,
    title: "Choose your destination",
    description: "Select the job role you want to pursue and define your career goal."
  },
  {
    number: "02",
    icon: BrainCircuit,
    title: "Discover your current level",
    description: "Complete relevant assessments to evaluate your skills and performance."
  },
  {
    number: "03",
    icon: Compass,
    title: "Get your personal roadmap",
    description: "Explore your estimated readiness, skill gaps, priorities, and learning schedule."
  },
  {
    number: "04",
    icon: TrendingUp,
    title: "Learn, practice, and grow",
    description: "Follow your plan, reassess your skills, and monitor your updated readiness."
  }
];

function Logo() {
  return (
    <a href="#home" className="brand" aria-label="CareerFit home">
      <span className="brand-symbol">
        <Target size={23} strokeWidth={2.3} />
        <span className="brand-dot" />
      </span>
      <span>
        Career<span className="brand-accent">Fit</span>
      </span>
    </a>
  );
}

function ReadinessPreview() {
  const skills = [
    { name: "Problem solving", score: 82, color: "blue" },
    { name: "Technical skills", score: 64, color: "pink" },
    { name: "Communication", score: 76, color: "blue" }
  ];

  return (
    <div className="preview-shell">
      <div className="preview-glow" />
      <div className="preview-card">
        <div className="preview-top">
          <div>
            <span className="eyebrow">CAREER OVERVIEW</span>
            <h3>Your progress, visualized.</h3>
          </div>
          <span className="live-badge">
            <span className="live-dot" />
            PREVIEW
          </span>
        </div>
        <div className="readiness-panel">
          <div className="readiness-copy">
            <span className="eyebrow">ILLUSTRATIVE READINESS SCORE</span>
            <div className="readiness-number">
              78<span>%</span>
            </div>
            <p>A sample of what your career dashboard could show.</p>
          </div>
          <div className="readiness-ring">
            <svg viewBox="0 0 120 120" aria-label="Illustrative 78 percent progress">
              <circle cx="60" cy="60" r="49" className="ring-track" />
              <circle cx="60" cy="60" r="49" className="ring-progress" />
            </svg>
            <Sparkles size={24} className="ring-icon" />
          </div>
        </div>
        <div className="preview-divider" />
        <div className="skills-heading">
          <span>SKILL SNAPSHOT</span>
          <span>EXAMPLE DATA</span>
        </div>
        <div className="skill-list">
          {skills.map((skill) => (
            <div className="skill-row" key={skill.name}>
              <div className="skill-label">
                <span>{skill.name}</span>
                <span>{skill.score}%</span>
              </div>
              <div className="skill-track">
                <div
                  className={`skill-fill ${skill.color}`}
                  style={{ width: `${skill.score}%` }}
                />
              </div>
            </div>
          ))}
        </div>
        <div className="preview-next">
          <span className="next-icon">
            <Zap size={17} />
          </span>
          <div>
            <span className="next-label">YOUR NEXT STEP</span>
            <p>Focus on your highest-priority skill gaps.</p>
          </div>
          <ArrowUpRight size={19} />
        </div>
      </div>
      <div className="floating-chip chip-top">
        <span className="chip-icon blue-chip">
          <CheckCircle2 size={17} />
        </span>
        <span>
          <strong>Know your strengths</strong>
          <small>Understand your skill profile</small>
        </span>
      </div>
      <div className="floating-chip chip-bottom">
        <span className="chip-icon pink-chip">
          <TrendingUp size={17} />
        </span>
        <span>
          <strong>Keep moving forward</strong>
          <small>Track your improvement</small>
        </span>
      </div>
    </div>
  );
}

function HomePage({ onLogin, onRegister }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <header className="navbar">
        <div className="nav-inner">
          <Logo />
          <button
            className="mobile-menu-button"
            aria-label={menuOpen ? "Close navigation" : "Open navigation"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={23} /> : <Menu size={23} />}
          </button>
          <nav className={`nav-links ${menuOpen ? "nav-open" : ""}`}>
            <a href="#home" onClick={closeMenu}>Home</a>
            <a href="#how-it-works" onClick={closeMenu}>How it works</a>
            <a href="#features" onClick={closeMenu}>Features</a>
            <a href="#about" onClick={closeMenu}>About</a>
            <div className="nav-actions">
              <button type="button" className="login-link" onClick={onLogin}>
                Log in
              </button>
              <button type="button" className="button button-primary nav-cta" onClick={onRegister}>
                Get started <ArrowRight size={16} />
              </button>
            </div>
          </nav>
        </div>
      </header>

      <main>
        <section className="hero section-container" id="home">
          <div className="hero-copy">
            <div className="hero-badge">
              <span className="badge-sparkle"><Sparkles size={14} /></span>
              YOUR CAREER, WITH CLARITY
            </div>
            <h1>
              Your next move.
              <br />
              <span className="heading-blue">Your</span>{" "}
              <span className="heading-pink">potential.</span>
              <br />
              <span className="heading-white">Your future.</span>
            </h1>
            <p className="hero-description">
              Stop guessing if you're ready for your dream job. Discover your
              strengths, close your skill gaps, and follow a learning plan
              built around you.
            </p>
            <div className="hero-actions">
              <button type="button" className="button button-primary button-large" onClick={onRegister}>
                Find my career path <ArrowRight size={19} />
              </button>
              <a className="button button-secondary button-large" href="#how-it-works">
                <span className="play-icon">↗</span>
                See how it works
              </a>
            </div>
            <div className="hero-points">
              <span><CheckCircle2 size={16} /> Role-specific assessments</span>
              <span><CheckCircle2 size={16} /> Personalized learning</span>
              <span><CheckCircle2 size={16} /> Measurable progress</span>
            </div>
          </div>
          <ReadinessPreview />
          <a className="scroll-cue" href="#why-careerfit">
            <span className="scroll-line" />
            SCROLL TO EXPLORE
            <ArrowUpRight size={15} />
          </a>
        </section>

        <section className="trust-strip">
          <div className="section-container trust-inner">
            <span>YOUR CAREER JOURNEY, MADE CLEARER</span>
            <div className="trust-item"><Target size={17} /> Assess</div>
            <div className="trust-item"><BrainCircuit size={17} /> Understand</div>
            <div className="trust-item"><Compass size={17} /> Improve</div>
            <div className="trust-item"><TrendingUp size={17} /> Reassess</div>
          </div>
        </section>

        <section className="problem-section section-container" id="why-careerfit">
          <div className="section-heading">
            <span className="section-kicker">
              <span className="kicker-line" /> THE CHALLENGE
            </span>
            <h2>
              Preparing for a job
              <br />
              shouldn't feel like <span className="heading-pink">guesswork.</span>
            </h2>
            <p>
              Knowing your target role is only the beginning. Knowing where
              you stand and what to do next is what moves you forward.
            </p>
          </div>
          <div className="problem-grid">
            <article className="problem-card">
              <span className="problem-index">01 / UNCERTAINTY</span>
              <div className="problem-icon"><Compass size={22} /></div>
              <h3>Where do I stand?</h3>
              <p>
                Without structured assessment, it's difficult to understand
                how well your skills match your target role.
              </p>
            </article>
            <article className="problem-card problem-card-highlight">
              <span className="problem-index">02 / SKILL GAPS</span>
              <div className="problem-icon pink-icon"><Target size={22} /></div>
              <h3>What am I missing?</h3>
              <p>
                Unclear priorities can make learning overwhelming and leave
                important skill gaps unaddressed.
              </p>
            </article>
            <article className="problem-card">
              <span className="problem-index">03 / NO DIRECTION</span>
              <div className="problem-icon"><GraduationCap size={22} /></div>
              <h3>What should I learn next?</h3>
              <p>
                A practical learning schedule helps turn career goals into
                manageable daily actions.
              </p>
            </article>
          </div>
        </section>

        <section className="how-section" id="how-it-works">
          <div className="section-container">
            <div className="how-heading">
              <div className="section-heading">
                <span className="section-kicker">
                  <span className="kicker-line" /> YOUR ROADMAP
                </span>
                <h2>
                  From where you are
                  <br />
                  to <span className="heading-blue">where you want to be.</span>
                </h2>
              </div>
              <p>
                One connected journey. Every step designed to help you
                understand your skills and make purposeful progress.
              </p>
            </div>
            <div className="steps-grid">
              {steps.map((step) => {
                const Icon = step.icon;
                return (
                  <article className="step-card" key={step.number}>
                    <div className="step-top">
                      <span className="step-number">{step.number}</span>
                      <Icon size={21} />
                    </div>
                    <div className="step-connector">
                      <span />
                      <ChevronRight size={15} />
                    </div>
                    <h3>{step.title}</h3>
                    <p>{step.description}</p>
                  </article>
                );
              })}
            </div>
            <div className="loop-note">
              <span className="loop-icon"><TrendingUp size={19} /></span>
              <p>
                <strong>Growth doesn't stop at a score.</strong> Learn, practice,
                reassess, and discover how your readiness evolves.
              </p>
              <ArrowUpRight size={20} className="loop-arrow" />
            </div>
          </div>
        </section>

        <section className="features-section section-container" id="features">
          <div className="section-heading features-heading">
            <span className="section-kicker">
              <span className="kicker-line" /> BUILT AROUND YOUR GOALS
            </span>
            <h2>
              Everything you need.
              <br />
              <span className="heading-pink">A clearer way forward.</span>
            </h2>
            <p>
              From understanding your current abilities to building a
              practical learning routine, CareerFit connects every step.
            </p>
          </div>
          <div className="features-grid">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <article className="feature-card" key={feature.number}>
                  <div className="feature-card-top">
                    <span className={`feature-icon ${feature.color}`}>
                      <Icon size={23} />
                    </span>
                    <span className="feature-number">{feature.number}</span>
                  </div>
                  <span className={`feature-label ${feature.color}`}>
                    {feature.label}
                  </span>
                  <h3>{feature.title}</h3>
                  <p>{feature.description}</p>
                  <span className="feature-bottom-line" />
                </article>
              );
            })}
          </div>
        </section>

        <section className="about-section" id="about">
          <div className="section-container about-inner">
            <div className="about-mark">
              <div className="about-mark-inner">
                <Target size={52} strokeWidth={1.3} />
                <span className="about-mark-dot" />
              </div>
              <span className="about-orbit orbit-one" />
              <span className="about-orbit orbit-two" />
            </div>
            <div className="about-copy">
              <span className="section-kicker">
                <span className="kicker-line" /> THE CAREERFIT APPROACH
              </span>
              <h2>
                Less uncertainty.
                <br />
                More <span className="heading-blue">intentional progress.</span>
              </h2>
              <p>
                CareerFit is designed to connect assessment, skill-gap
                analysis, personalized learning, and reassessment in one
                continuous career-readiness journey.
              </p>
              <a className="text-link" href="#how-it-works">
                Explore the process <ArrowRight size={17} />
              </a>
            </div>
          </div>
        </section>

        <section className="final-cta section-container" id="signup">
          <div className="cta-card">
            <div className="cta-glow cta-glow-blue" />
            <div className="cta-glow cta-glow-pink" />
            <span className="cta-icon"><Sparkles size={22} /></span>
            <span className="section-kicker">YOUR NEXT CHAPTER STARTS HERE</span>
            <h2>
              Ready to make your
              <br />
              <span className="heading-blue">next move count?</span>
            </h2>
            <p>
              Start by choosing your goal. Your journey toward better
              job readiness begins with understanding where you stand.
            </p>
            <button type="button" className="button button-primary button-large" onClick={onRegister}>
              Start your journey <ArrowRight size={19} />
            </button>
            <span className="cta-footnote">
              Your goal. Your skills. Your plan.
            </span>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="section-container footer-main">
          <div className="footer-brand">
            <Logo />
            <p>
              Know where you stand.
              <br />
              Build your path forward.
            </p>
          </div>
          <div className="footer-links">
            <div>
              <span className="footer-heading">EXPLORE</span>
              <a href="#home">Home</a>
              <a href="#how-it-works">How it works</a>
              <a href="#features">Features</a>
            </div>
            <div>
              <span className="footer-heading">CAREERFIT</span>
              <a href="#about">About us</a>
              <a href="#login" onClick={(event) => { event.preventDefault(); onLogin(); }}>Log in</a>
              <a href="#signup" onClick={(event) => { event.preventDefault(); onRegister(); }}>Get started</a>
            </div>
          </div>
        </div>
        <div className="section-container footer-bottom">
          <span>© 2026 CareerFit. All rights reserved.</span>
          <span>Built for your next step <span className="footer-heart">♥</span></span>
        </div>
      </footer>
    </>
  );
}

export default function App() {
  const [page, setPage] = useState(() => {
    return hasActiveSession() ? "dashboard" : "home";
  });

  const [currentUser, setCurrentUser] = useState(() => getUserProfile());
  const [careerGoal, setCareerGoal] = useState(() => getCareerGoal());

  const [onboardingDraft, setOnboardingDraft] = useState({
    skills: {},
    targetRole: ""
  });

  function navigateTo(targetPage) {
    setPage(targetPage);
    window.scrollTo({ top: 0, behavior: "instant" });
  }

  function handleRegisterSuccess(userData) {
    setCurrentUser((prev) => ({
      ...prev,
      fullName: userData.fullName,
      email: userData.email
    }));
    navigateTo("onboarding");
  }

  function handleLoginSuccess(loginData) {
    const updated = loginUser(loginData.email);
    setCurrentUser(updated);
    setCareerGoal(getCareerGoal());
    navigateTo("dashboard");
  }

  function handleOnboardingComplete(profile) {
    const dashboardState = initializeSession(currentUser, profile);
    setCurrentUser(dashboardState.user);
    setCareerGoal(dashboardState.careerGoal);
    navigateTo("dashboard");
  }

  function handleLogout() {
    clearSession();
    navigateTo("login");
  }

  if (page === "login") {
    return (
      <Login
        onBack={() => {
          navigateTo("home");
          window.history.replaceState(null, "", window.location.pathname);
        }}
        onRegister={() => navigateTo("register")}
        onLoginSuccess={handleLoginSuccess}
      />
    );
  }

  if (page === "register") {
    return (
      <Register
        initialValues={{
          fullName: currentUser?.fullName || "",
          email: currentUser?.email || ""
        }}
        onBack={() => {
          navigateTo("home");
          window.history.replaceState(null, "", window.location.pathname);
        }}
        onLogin={() => navigateTo("login")}
        onRegisterSuccess={handleRegisterSuccess}
      />
    );
  }

  if (page === "onboarding") {
    return (
      <Onboarding
        initialSkills={onboardingDraft.skills}
        initialRole={onboardingDraft.targetRole}
        onBack={(draft) => {
          if (draft) setOnboardingDraft(draft);
          navigateTo("register");
        }}
        onComplete={handleOnboardingComplete}
      />
    );
  }

  if (page === "dashboard") {
    return (
      <Dashboard
        user={currentUser}
        careerGoal={careerGoal}
        onLogout={handleLogout}
        onProfile={() => {}}
        onUpdateDashboard={() => {
          setCurrentUser(getUserProfile());
          setCareerGoal(getCareerGoal());
        }}
      />
    );
  }

  return (
    <HomePage
      onLogin={() => navigateTo("login")}
      onRegister={() => navigateTo("register")}
    />
  );
}