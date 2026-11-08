/**
 * CareerFit Core Career Registry, Readiness Engine & Study Plan Generator
 * 
 * Provides role requirements, skill hierarchies, deterministic readiness calculation,
 * dynamic skill-gap analysis, and personalized study roadmaps.
 */

export const SKILL_CATEGORIES = {
  "Programming Languages": ["Python", "Java", "JavaScript", "C", "C++", "SQL"],
  "Web Development": ["HTML", "CSS", "React", "Node.js", "Express.js", "FastAPI", "Django"],
  "Data & AI": ["NumPy", "Pandas", "Scikit-learn", "PyTorch", "Machine Learning", "Deep Learning", "Data Visualization"],
  "Core Computer Science": ["Data Structures & Algorithms", "OOP", "DBMS", "Operating Systems", "Computer Networks"],
  "Tools & Technologies": ["Git", "GitHub", "AWS", "Docker", "Linux", "MongoDB", "MySQL"]
};

export const ALL_SKILLS = Object.values(SKILL_CATEGORIES).flat();

export const ROLES = {
  "Python Developer": {
    name: "Python Developer",
    category: "Software Development",
    description: "Build robust backend services, APIs, and scalable data applications with Python.",
    icon: "Code2",
    requiredSkills: [
      { name: "Python", weight: 1.5, core: true, targetLevel: "Advanced" },
      { name: "SQL", weight: 1.2, core: true, targetLevel: "Intermediate" },
      { name: "FastAPI", weight: 1.2, core: true, targetLevel: "Intermediate" },
      { name: "Django", weight: 1.0, core: false, targetLevel: "Intermediate" },
      { name: "Git", weight: 1.0, core: false, targetLevel: "Intermediate" },
      { name: "Data Structures & Algorithms", weight: 1.2, core: true, targetLevel: "Intermediate" }
    ],
    recommendedProjects: [
      {
        title: "RESTful Career Platform API",
        tech: "FastAPI, PostgreSQL, SQLAlchemy",
        description: "Build asynchronous REST endpoints with JWT authentication, database migrations, and comprehensive automated test suites."
      },
      {
        title: "Distributed Task Processing Queue",
        tech: "Python, Redis, Docker",
        description: "Implement background worker pipelines handling long-running asynchronous data transformation jobs."
      }
    ]
  },
  "AI/ML Engineer": {
    name: "AI/ML Engineer",
    category: "Artificial Intelligence",
    description: "Develop intelligent algorithms, train neural network architectures, and deploy production ML models.",
    icon: "Cpu",
    requiredSkills: [
      { name: "Python", weight: 1.4, core: true, targetLevel: "Advanced" },
      { name: "Machine Learning", weight: 1.5, core: true, targetLevel: "Advanced" },
      { name: "Deep Learning", weight: 1.3, core: true, targetLevel: "Intermediate" },
      { name: "PyTorch", weight: 1.3, core: true, targetLevel: "Intermediate" },
      { name: "NumPy", weight: 1.1, core: false, targetLevel: "Advanced" },
      { name: "Pandas", weight: 1.1, core: false, targetLevel: "Advanced" }
    ],
    recommendedProjects: [
      {
        title: "Predictive Skill-Matching Engine",
        tech: "PyTorch, Scikit-learn, Pandas",
        description: "Train a deep learning recommendation model that pairs applicant skill vectors with role requirements."
      },
      {
        title: "Real-Time Computer Vision Pipeline",
        tech: "PyTorch, OpenCV, FastAPI",
        description: "Deploy an inference endpoint for low-latency visual feature extraction and object classification."
      }
    ]
  },
  "Full Stack Developer": {
    name: "Full Stack Developer",
    category: "Web Engineering",
    description: "Design end-to-end web architectures spanning responsive interfaces to scalable database backends.",
    icon: "Code2",
    requiredSkills: [
      { name: "JavaScript", weight: 1.4, core: true, targetLevel: "Advanced" },
      { name: "React", weight: 1.4, core: true, targetLevel: "Advanced" },
      { name: "Node.js", weight: 1.3, core: true, targetLevel: "Intermediate" },
      { name: "Express.js", weight: 1.1, core: false, targetLevel: "Intermediate" },
      { name: "HTML", weight: 1.0, core: false, targetLevel: "Advanced" },
      { name: "CSS", weight: 1.0, core: false, targetLevel: "Intermediate" },
      { name: "SQL", weight: 1.2, core: true, targetLevel: "Intermediate" }
    ],
    recommendedProjects: [
      {
        title: "Full-Stack Collaborative Workspace",
        tech: "React, Node.js, Express, PostgreSQL",
        description: "Create an interactive dashboard with WebSocket real-time synchronization, role-based access control, and dark theme UI."
      },
      {
        title: "E-Commerce Checkout & Inventory Engine",
        tech: "React, Node.js, Stripe, SQL",
        description: "Build an ACID-compliant transactional inventory and payment processing checkout flow."
      }
    ]
  },
  "Data Analyst": {
    name: "Data Analyst",
    category: "Data Science",
    description: "Transform complex operational datasets into actionable insights and strategic business intelligence.",
    icon: "Database",
    requiredSkills: [
      { name: "SQL", weight: 1.5, core: true, targetLevel: "Advanced" },
      { name: "Python", weight: 1.3, core: true, targetLevel: "Intermediate" },
      { name: "Pandas", weight: 1.3, core: true, targetLevel: "Advanced" },
      { name: "NumPy", weight: 1.1, core: false, targetLevel: "Intermediate" },
      { name: "Data Visualization", weight: 1.3, core: true, targetLevel: "Advanced" },
      { name: "DBMS", weight: 1.1, core: false, targetLevel: "Intermediate" }
    ],
    recommendedProjects: [
      {
        title: "Executive Business Intelligence Dashboard",
        tech: "SQL, Python, Pandas, Matplotlib/Seaborn",
        description: "Perform cohort retention analysis and build automated trend reporting pipelines on multi-million row datasets."
      },
      {
        title: "Customer Churn Predictive Analysis",
        tech: "Python, Pandas, Scikit-learn",
        description: "Identify key behavioral signals that correlate with customer attrition using statistical correlation matrices."
      }
    ]
  },
  "Software Engineer": {
    name: "Software Engineer",
    category: "Core Engineering",
    description: "Architect maintainable software solutions leveraging foundational algorithms and systems design principles.",
    icon: "BriefcaseBusiness",
    requiredSkills: [
      { name: "Data Structures & Algorithms", weight: 1.5, core: true, targetLevel: "Advanced" },
      { name: "OOP", weight: 1.4, core: true, targetLevel: "Advanced" },
      { name: "Python", weight: 1.2, core: false, targetLevel: "Intermediate" },
      { name: "Java", weight: 1.2, core: false, targetLevel: "Intermediate" },
      { name: "DBMS", weight: 1.2, core: true, targetLevel: "Intermediate" },
      { name: "Git", weight: 1.0, core: false, targetLevel: "Intermediate" }
    ],
    recommendedProjects: [
      {
        title: "High-Performance In-Memory Cache Engine",
        tech: "Data Structures, Algorithms, Systems",
        description: "Implement an LRU/LFU memory cache with concurrent read-write locks and optimal Big-O complexity."
      },
      {
        title: "Relational Query Parser & Execution Planner",
        tech: "OOP, Java/Python, DBMS",
        description: "Design an abstract syntax tree evaluator that executes relational algebra queries on in-memory tables."
      }
    ]
  },
  "Java Developer": {
    name: "Java Developer",
    category: "Enterprise Systems",
    description: "Engineer resilient enterprise backend microservices and high-throughput transactional platforms with Java.",
    icon: "Code2",
    requiredSkills: [
      { name: "Java", weight: 1.5, core: true, targetLevel: "Advanced" },
      { name: "OOP", weight: 1.4, core: true, targetLevel: "Advanced" },
      { name: "SQL", weight: 1.2, core: true, targetLevel: "Intermediate" },
      { name: "Spring Boot", weight: 1.3, core: true, targetLevel: "Intermediate" },
      { name: "Data Structures & Algorithms", weight: 1.2, core: true, targetLevel: "Intermediate" },
      { name: "Git", weight: 1.0, core: false, targetLevel: "Intermediate" }
    ],
    recommendedProjects: [
      {
        title: "Enterprise Banking Microservice API",
        tech: "Java, Spring Boot, PostgreSQL, Docker",
        description: "Implement a secure double-entry transaction service with idempotency keys, JWT auth, and circuit breakers."
      },
      {
        title: "High-Throughput Order Management System",
        tech: "Java, Concurrency, SQL",
        description: "Build an event-driven order processing engine utilizing thread pools and non-blocking I/O."
      }
    ]
  }
};

/**
 * Maps self-reported proficiency level to a numeric score [0 - 100].
 */
export function proficiencyToScore(level) {
  switch (String(level || "").toLowerCase()) {
    case "advanced":
      return 90;
    case "intermediate":
      return 68;
    case "beginner":
      return 42;
    default:
      return 0;
  }
}

/**
 * Calculates a verified, explainable readiness score and identifies skill gaps.
 * 
 * @param {Object} userSkills - Map of { [skillName]: "Beginner" | "Intermediate" | "Advanced" }
 * @param {string} targetRoleName - Name of the target role
 * @param {Array} assessmentHistory - Array of completed assessments
 * @returns {Object} Comprehensive readiness analysis
 */
export function calculateReadiness(userSkills = {}, targetRoleName = "Python Developer", assessmentHistory = []) {
  const role = ROLES[targetRoleName] || ROLES["Python Developer"];
  const requiredSkills = role.requiredSkills;

  let totalWeightedScore = 0;
  let totalWeight = 0;
  const skillBreakdown = [];
  const skillGaps = [];
  const strengths = [];

  requiredSkills.forEach(req => {
    const userProficiency = userSkills[req.name];
    const baseScore = proficiencyToScore(userProficiency);

    // Find relevant objective assessments for this skill
    const relevantAssessments = (assessmentHistory || []).filter(
      a => a.skill === req.name && typeof a.percentage === "number"
    );

    let finalScore = baseScore;
    let verified = false;

    if (relevantAssessments.length > 0) {
      // Average the completed assessment scores
      const avgAssessment = Math.round(
        relevantAssessments.reduce((sum, a) => sum + a.percentage, 0) / relevantAssessments.length
      );
      // Blend 40% self-reported proficiency + 60% demonstrated test performance
      finalScore = Math.round(baseScore * 0.4 + avgAssessment * 0.6);
      verified = true;
    }

    const item = {
      name: req.name,
      score: finalScore,
      targetLevel: req.targetLevel,
      currentLevel: userProficiency || "Not Added",
      core: req.core,
      weight: req.weight,
      verified,
      color: finalScore >= 75 ? "blue" : finalScore >= 50 ? "pink" : "purple"
    };

    skillBreakdown.push(item);

    // Thresholds: Core skills need 75%+, secondary need 60%+
    const targetThreshold = req.core ? 75 : 60;
    if (finalScore < targetThreshold) {
      skillGaps.push({
        ...item,
        gapPoints: targetThreshold - finalScore,
        priority: req.core ? "High" : "Medium",
        reason: !userProficiency
          ? "Missing required skill"
          : finalScore < 50
            ? "Requires foundational practice"
            : "Requires further refinement"
      });
    } else {
      strengths.push(item);
    }

    totalWeightedScore += finalScore * req.weight;
    totalWeight += req.weight;
  });

  // Calculate normalized overall score
  const overallScore = totalWeight > 0 ? Math.round(totalWeightedScore / totalWeight) : 0;

  // Sort gaps by priority and gap size
  skillGaps.sort((a, b) => {
    if (a.core !== b.core) return a.core ? -1 : 1;
    return b.gapPoints - a.gapPoints;
  });

  return {
    targetRole: role.name,
    overallScore,
    skillBreakdown,
    skillGaps,
    strengths,
    totalRequired: requiredSkills.length,
    missingCount: skillGaps.filter(g => g.currentLevel === "Not Added").length,
    gapCount: skillGaps.length,
    assessedCount: assessmentHistory.length,
    recommendedProjects: role.recommendedProjects
  };
}

/**
 * Generates a tailored 10-day study plan targeting the user's primary skill gaps.
 * 
 * @param {Array} skillGaps - List of identified skill gaps
 * @param {string} targetRoleName - Target role name
 * @param {Array} completedTaskDays - List of day identifiers already marked complete
 * @returns {Array} List of structured daily milestones
 */
export function generateStudyPlan(skillGaps = [], targetRoleName = "Python Developer", completedTaskDays = []) {
  // If user has zero gaps, provide advanced mastery topics
  const primaryGaps = skillGaps.length > 0
    ? skillGaps.slice(0, 4).map(g => g.name)
    : ["System Design", "Performance Optimization", "Clean Architecture", "Production Deployment"];

  const topic1 = primaryGaps[0] || "Core Fundamentals";
  const topic2 = primaryGaps[1] || "Data & Backend Architecture";
  const topic3 = primaryGaps[2] || primaryGaps[0] || "API & Systems";
  const topic4 = primaryGaps[3] || primaryGaps[1] || "Practice & Integration";

  const template = [
    {
      day: "DAY 01",
      title: `${topic1} Foundations`,
      description: `Review fundamental patterns, key constructs, and core syntax in ${topic1}.`,
      duration: "45 min",
      skill: topic1
    },
    {
      day: "DAY 02",
      title: `${topic1} Applied Practice`,
      description: `Solve 4 practical exercises focusing on common real-world interview patterns.`,
      duration: "60 min",
      skill: topic1
    },
    {
      day: "DAY 03",
      title: `${topic2} Principles`,
      description: `Deep-dive into essential concepts, data handling, and query/function workflows.`,
      duration: "50 min",
      skill: topic2
    },
    {
      day: "DAY 04",
      title: `${topic2} Real-World Implementation`,
      description: `Build a mini-module integrating ${topic2} with standard industry patterns.`,
      duration: "60 min",
      skill: topic2
    },
    {
      day: "DAY 05",
      title: `Mid-Week Reassessment: ${topic1}`,
      description: `Complete a role-specific assessment challenge to measure your score improvement.`,
      duration: "30 min",
      skill: topic1
    },
    {
      day: "DAY 06",
      title: `${topic3} Intensive Review`,
      description: `Master core mechanisms and architectural principles for ${topic3}.`,
      duration: "55 min",
      skill: topic3
    },
    {
      day: "DAY 07",
      title: `${topic3} Practical Exercises`,
      description: `Implement practical challenges and debug typical runtime bottlenecks.`,
      duration: "60 min",
      skill: topic3
    },
    {
      day: "DAY 08",
      title: `${topic4} Overview & Techniques`,
      description: `Explore production-readiness practices and deployment considerations.`,
      duration: "45 min",
      skill: topic4
    },
    {
      day: "DAY 09",
      title: `End-to-End Capstone Exercise`,
      description: `Combine ${topic1} and ${topic2} in a cohesive project feature for ${targetRoleName}.`,
      duration: "90 min",
      skill: targetRoleName
    },
    {
      day: "DAY 10",
      title: `Final Role-Readiness Assessment`,
      description: `Evaluate your updated readiness score across all target competencies.`,
      duration: "40 min",
      skill: targetRoleName
    }
  ];

  return template.map(task => {
    const isCompleted = completedTaskDays.includes(task.day);
    return {
      ...task,
      status: isCompleted ? "Completed" : "Upcoming"
    };
  });
}
