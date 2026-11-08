import { useMemo, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  ChevronRight,
  Code2,
  Cpu,
  Database,
  Search,
  Sparkles,
  Target,
  BriefcaseBusiness
} from "lucide-react";
import "./Onboarding.css";

const skillCategories = {
  "Programming Languages": ["Python", "Java", "JavaScript", "C", "C++", "SQL"],
  "Web Development": ["HTML", "CSS", "React", "Node.js", "Express.js", "FastAPI", "Django"],
  "Data & AI": ["NumPy", "Pandas", "Scikit-learn", "PyTorch", "Machine Learning", "Deep Learning", "Data Visualization"],
  "Core Computer Science": ["Data Structures & Algorithms", "OOP", "DBMS", "Operating Systems", "Computer Networks"],
  "Tools & Technologies": ["Git", "GitHub", "AWS", "Docker", "Linux", "MongoDB", "MySQL"]
};

const roles = [
  {
    name: "Python Developer",
    description: "Build applications, APIs and backend systems.",
    icon: Code2,
    skills: ["Python", "SQL", "Git", "FastAPI", "Django", "Data Structures & Algorithms"]
  },
  {
    name: "AI/ML Engineer",
    description: "Develop intelligent systems and machine learning models.",
    icon: Cpu,
    skills: ["Python", "Machine Learning", "Deep Learning", "PyTorch", "NumPy", "Pandas"]
  },
  {
    name: "Full Stack Developer",
    description: "Build complete web applications from frontend to backend.",
    icon: Code2,
    skills: ["HTML", "CSS", "JavaScript", "React", "Node.js", "Express.js", "SQL"]
  },
  {
    name: "Data Analyst",
    description: "Analyze data and generate meaningful business insights.",
    icon: Database,
    skills: ["Python", "SQL", "Excel", "Pandas", "Data Visualization", "NumPy"]
  },
  {
    name: "Software Engineer",
    description: "Design, develop and maintain software applications.",
    icon: BriefcaseBusiness,
    skills: ["Data Structures & Algorithms", "OOP", "Python", "Java", "DBMS", "Git"]
  },
  {
    name: "Java Developer",
    description: "Develop scalable applications using Java technologies.",
    icon: Code2,
    skills: ["Java", "OOP", "SQL", "Spring Boot", "Data Structures & Algorithms", "Git"]
  }
];

const proficiencyLevels = ["Beginner", "Intermediate", "Advanced"];

export default function Onboarding({ onComplete, onBack, initialSkills = {}, initialRole = "" }) {
  const [step, setStep] = useState(1);
  const [search, setSearch] = useState("");
  const [selectedSkills, setSelectedSkills] = useState(initialSkills);
  const [targetRole, setTargetRole] = useState(initialRole);
  const [error, setError] = useState("");

  const allSkills = useMemo(
    () => Object.values(skillCategories).flat(),
    []
  );

  const filteredSkills = useMemo(() => {
    return allSkills.filter(skill =>
      skill.toLowerCase().includes(search.toLowerCase())
    );
  }, [allSkills, search]);

  const toggleSkill = skill => {
    setSelectedSkills(previous => {
      const updated = { ...previous };

      if (updated[skill]) {
        delete updated[skill];
      } else {
        updated[skill] = "Beginner";
      }

      return updated;
    });

    setError("");
  };

  const updateProficiency = (skill, level) => {
    setSelectedSkills(previous => ({
      ...previous,
      [skill]: level
    }));
  };

  const handleContinue = () => {
    if (step === 1) {
      if (Object.keys(selectedSkills).length === 0) {
        setError("Please select at least one skill to continue.");
        return;
      }

      setStep(2);
      setError("");
      return;
    }

    if (!targetRole) {
      setError("Please select your target job role.");
      return;
    }

    const profile = {
      skills: selectedSkills,
      targetRole,
      completedAt: new Date().toISOString()
    };

    if (onComplete) {
      onComplete(profile);
    }
  };

  const selectedCount = Object.keys(selectedSkills).length;

  const currentRole = roles.find(role => role.name === targetRole);

  return (
    <div className="cf-onboarding">
      <div className="cf-onboarding-glow cf-glow-one"></div>
      <div className="cf-onboarding-glow cf-glow-two"></div>

      <header className="cf-onboarding-header">
        <div className="cf-onboarding-brand">
          <div className="cf-brand-icon">C</div>
          <span>Career<span>Fit</span></span>
        </div>

        <div className="cf-onboarding-step-label">
          STEP {step} OF 2
        </div>
      </header>

      <main className="cf-onboarding-main">

        <div className="cf-onboarding-progress">
          <div className={`cf-progress-line ${step >= 1 ? "active" : ""}`}></div>
          <div className={`cf-progress-line ${step >= 2 ? "active" : ""}`}></div>
        </div>

        {step === 1 && (
          <section className="cf-onboarding-content">
            <div className="cf-onboarding-eyebrow">
              <Sparkles size={15} />
              LET'S GET TO KNOW YOU
            </div>

            <h1>What skills do you <span>currently have?</span></h1>

            <p className="cf-onboarding-description">
              Select the skills you already know. Be honest about your
              proficiency so we can understand your current level.
            </p>

            <div className="cf-skill-search">
              <Search size={19} />
              <input
                type="text"
                placeholder="Search skills..."
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>

            <div className="cf-selected-summary">
              <span>Selected skills</span>
              <strong>{selectedCount} selected</strong>
            </div>

            <div className="cf-skill-categories">
              {Object.entries(skillCategories).map(([category, skills]) => {
                const visibleSkills = skills.filter(skill =>
                  filteredSkills.includes(skill)
                );

                if (visibleSkills.length === 0) return null;

                return (
                  <div className="cf-skill-category" key={category}>
                    <h3>{category}</h3>

                    <div className="cf-skill-options">
                      {visibleSkills.map(skill => {
                        const isSelected = Boolean(selectedSkills[skill]);

                        return (
                          <button
                            type="button"
                            key={skill}
                            className={`cf-skill-chip ${isSelected ? "selected" : ""}`}
                            onClick={() => toggleSkill(skill)}
                          >
                            {isSelected && <Check size={14} />}
                            {skill}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>

            {selectedCount > 0 && (
              <div className="cf-proficiency-section">
                <div className="cf-proficiency-heading">
                  <h3>Your proficiency</h3>
                  <span>Set your level for each selected skill</span>
                </div>

                <div className="cf-proficiency-list">
                  {Object.entries(selectedSkills).map(([skill, level]) => (
                    <div className="cf-proficiency-item" key={skill}>
                      <span>{skill}</span>

                      <select
                        value={level}
                        onChange={e => updateProficiency(skill, e.target.value)}
                      >
                        {proficiencyLevels.map(option => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </section>
        )}

        {step === 2 && (
          <section className="cf-onboarding-content">
            <div className="cf-onboarding-eyebrow">
              <Target size={15} />
              DEFINE YOUR CAREER GOAL
            </div>

            <h1>Where do you want <span>to go?</span></h1>

            <p className="cf-onboarding-description">
              Choose the job role you're aiming for. CareerFit will
              personalize your skill gaps, roadmap and assessments around it.
            </p>

            <div className="cf-role-grid">
              {roles.map(role => {
                const Icon = role.icon;
                const isSelected = targetRole === role.name;

                return (
                  <button
                    type="button"
                    key={role.name}
                    className={`cf-role-card ${isSelected ? "selected" : ""}`}
                    onClick={() => {
                      setTargetRole(role.name);
                      setError("");
                    }}
                  >
                    <div className="cf-role-top">
                      <div className="cf-role-icon">
                        <Icon size={21} />
                      </div>

                      <div className={`cf-role-check ${isSelected ? "checked" : ""}`}>
                        {isSelected && <Check size={14} />}
                      </div>
                    </div>

                    <h3>{role.name}</h3>
                    <p>{role.description}</p>

                    <div className="cf-role-skill-count">
                      {role.skills.length} relevant skills
                    </div>
                  </button>
                );
              })}
            </div>

            {currentRole && (
              <div className="cf-role-preview">
                <div className="cf-role-preview-heading">
                  <div>
                    <span>YOUR SELECTED CAREER PATH</span>
                    <h3>{currentRole.name}</h3>
                  </div>

                  <Target size={22} />
                </div>

                <p>Skills commonly associated with this role:</p>

                <div className="cf-role-tags">
                  {currentRole.skills.map(skill => (
                    <span key={skill}>{skill}</span>
                  ))}
                </div>

                <small>
                  These are recommended skills, not automatically added
                  to your existing skills.
                </small>
              </div>
            )}
          </section>
        )}

        {error && (
          <div className="cf-onboarding-error">
            {error}
          </div>
        )}

        <div className="cf-onboarding-navigation">
          {step === 1 ? (
            <button
              type="button"
              className="cf-onboarding-back"
              onClick={() => (onBack ? onBack({ skills: selectedSkills, targetRole }) : null)}
            >
              <ArrowLeft size={17} />
              Back
            </button>
          ) : (
            <button
              type="button"
              className="cf-onboarding-back"
              onClick={() => {
                setStep(1);
                setError("");
              }}
            >
              <ArrowLeft size={17} />
              Previous
            </button>
          )}

          <button
            type="button"
            className="cf-onboarding-continue"
            onClick={handleContinue}
          >
            {step === 1 ? "Choose Target Role" : "Continue to Assessment"}
            {step === 1 ? <ArrowRight size={17} /> : <ChevronRight size={18} />}
          </button>
        </div>

        <div className="cf-onboarding-footer">
          Your career journey starts with understanding where you are.
        </div>

      </main>
    </div>
  );
}