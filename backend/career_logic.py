from typing import Any, Optional

SKILL_CATEGORIES = {
    "Languages": ["Python", "JavaScript", "Java", "SQL"],
    "Frontend": ["React", "HTML", "CSS"],
    "Backend": ["FastAPI", "Django", "Node.js", "Express.js", "Spring Boot"],
    "Data & AI": ["Pandas", "NumPy", "Machine Learning", "Deep Learning", "PyTorch", "Data Visualization"],
    "Core CS": ["Data Structures & Algorithms", "OOP", "DBMS", "Git"]
}

ALL_SKILLS = [skill for sublist in SKILL_CATEGORIES.values() for skill in sublist]

ROLES = {
    "Python Developer": {
        "name": "Python Developer",
        "category": "Software Development",
        "description": "Build robust backend services, APIs, and scalable data applications with Python.",
        "icon": "Code2",
        "requiredSkills": [
            {"name": "Python", "weight": 1.5, "core": True, "targetLevel": "Advanced"},
            {"name": "SQL", "weight": 1.2, "core": True, "targetLevel": "Intermediate"},
            {"name": "FastAPI", "weight": 1.2, "core": True, "targetLevel": "Intermediate"},
            {"name": "Django", "weight": 1.0, "core": False, "targetLevel": "Intermediate"},
            {"name": "Git", "weight": 1.0, "core": False, "targetLevel": "Intermediate"},
            {"name": "Data Structures & Algorithms", "weight": 1.2, "core": True, "targetLevel": "Intermediate"}
        ],
        "recommendedProjects": [
            {
                "title": "RESTful Career Platform API",
                "tech": "FastAPI, PostgreSQL, SQLAlchemy",
                "description": "Build asynchronous REST endpoints with JWT authentication, database migrations, and comprehensive automated test suites."
            },
            {
                "title": "Distributed Task Processing Queue",
                "tech": "Python, Redis, Docker",
                "description": "Implement background worker pipelines handling long-running asynchronous data transformation jobs."
            }
        ]
    },
    "AI/ML Engineer": {
        "name": "AI/ML Engineer",
        "category": "Artificial Intelligence",
        "description": "Develop intelligent algorithms, train neural network architectures, and deploy production ML models.",
        "icon": "Cpu",
        "requiredSkills": [
            {"name": "Python", "weight": 1.4, "core": True, "targetLevel": "Advanced"},
            {"name": "Machine Learning", "weight": 1.5, "core": True, "targetLevel": "Advanced"},
            {"name": "Deep Learning", "weight": 1.3, "core": True, "targetLevel": "Intermediate"},
            {"name": "PyTorch", "weight": 1.3, "core": True, "targetLevel": "Intermediate"},
            {"name": "NumPy", "weight": 1.1, "core": False, "targetLevel": "Advanced"},
            {"name": "Pandas", "weight": 1.1, "core": False, "targetLevel": "Advanced"}
        ],
        "recommendedProjects": [
            {
                "title": "Predictive Skill-Matching Engine",
                "tech": "PyTorch, Scikit-learn, Pandas",
                "description": "Train a deep learning recommendation model that pairs applicant skill vectors with role requirements."
            },
            {
                "title": "Real-Time Computer Vision Pipeline",
                "tech": "PyTorch, OpenCV, FastAPI",
                "description": "Deploy an inference endpoint for low-latency visual feature extraction and object classification."
            }
        ]
    },
    "Full Stack Developer": {
        "name": "Full Stack Developer",
        "category": "Web Engineering",
        "description": "Design end-to-end web architectures spanning responsive interfaces to scalable database backends.",
        "icon": "Code2",
        "requiredSkills": [
            {"name": "JavaScript", "weight": 1.4, "core": True, "targetLevel": "Advanced"},
            {"name": "React", "weight": 1.4, "core": True, "targetLevel": "Advanced"},
            {"name": "Node.js", "weight": 1.3, "core": True, "targetLevel": "Intermediate"},
            {"name": "Express.js", "weight": 1.1, "core": False, "targetLevel": "Intermediate"},
            {"name": "HTML", "weight": 1.0, "core": False, "targetLevel": "Advanced"},
            {"name": "CSS", "weight": 1.0, "core": False, "targetLevel": "Intermediate"},
            {"name": "SQL", "weight": 1.2, "core": True, "targetLevel": "Intermediate"}
        ],
        "recommendedProjects": [
            {
                "title": "Full-Stack Collaborative Workspace",
                "tech": "React, Node.js, Express, PostgreSQL",
                "description": "Create an interactive dashboard with WebSocket real-time synchronization, role-based access control, and dark theme UI."
            },
            {
                "title": "E-Commerce Checkout & Inventory Engine",
                "tech": "React, Node.js, Stripe, SQL",
                "description": "Build an ACID-compliant transactional inventory and payment processing checkout flow."
            }
        ]
    },
    "Data Analyst": {
        "name": "Data Analyst",
        "category": "Data Science",
        "description": "Transform complex operational datasets into actionable insights and strategic business intelligence.",
        "icon": "Database",
        "requiredSkills": [
            {"name": "SQL", "weight": 1.5, "core": True, "targetLevel": "Advanced"},
            {"name": "Python", "weight": 1.3, "core": True, "targetLevel": "Intermediate"},
            {"name": "Pandas", "weight": 1.3, "core": True, "targetLevel": "Advanced"},
            {"name": "NumPy", "weight": 1.1, "core": False, "targetLevel": "Intermediate"},
            {"name": "Data Visualization", "weight": 1.3, "core": True, "targetLevel": "Advanced"},
            {"name": "DBMS", "weight": 1.1, "core": False, "targetLevel": "Intermediate"}
        ],
        "recommendedProjects": [
            {
                "title": "Executive Business Intelligence Dashboard",
                "tech": "SQL, Python, Pandas, Matplotlib/Seaborn",
                "description": "Perform cohort retention analysis and build automated trend reporting pipelines on multi-million row datasets."
            },
            {
                "title": "Customer Churn Predictive Analysis",
                "tech": "Python, Pandas, Scikit-learn",
                "description": "Identify key behavioral signals that correlate with customer attrition using statistical correlation matrices."
            }
        ]
    },
    "Software Engineer": {
        "name": "Software Engineer",
        "category": "Core Engineering",
        "description": "Architect maintainable software solutions leveraging foundational algorithms and systems design principles.",
        "icon": "BriefcaseBusiness",
        "requiredSkills": [
            {"name": "Data Structures & Algorithms", "weight": 1.5, "core": True, "targetLevel": "Advanced"},
            {"name": "OOP", "weight": 1.4, "core": True, "targetLevel": "Advanced"},
            {"name": "Python", "weight": 1.2, "core": False, "targetLevel": "Intermediate"},
            {"name": "Java", "weight": 1.2, "core": False, "targetLevel": "Intermediate"},
            {"name": "DBMS", "weight": 1.2, "core": True, "targetLevel": "Intermediate"},
            {"name": "Git", "weight": 1.0, "core": False, "targetLevel": "Intermediate"}
        ],
        "recommendedProjects": [
            {
                "title": "High-Performance In-Memory Cache Engine",
                "tech": "Data Structures, Algorithms, Systems",
                "description": "Implement an LRU/LFU memory cache with concurrent read-write locks and optimal Big-O complexity."
            },
            {
                "title": "Relational Query Parser & Execution Planner",
                "tech": "OOP, Java/Python, DBMS",
                "description": "Design an abstract syntax tree evaluator that executes relational algebra queries on in-memory tables."
            }
        ]
    },
    "Java Developer": {
        "name": "Java Developer",
        "category": "Enterprise Systems",
        "description": "Engineer resilient enterprise backend microservices and high-throughput transactional platforms with Java.",
        "icon": "Code2",
        "requiredSkills": [
            {"name": "Java", "weight": 1.5, "core": True, "targetLevel": "Advanced"},
            {"name": "OOP", "weight": 1.4, "core": True, "targetLevel": "Advanced"},
            {"name": "SQL", "weight": 1.2, "core": True, "targetLevel": "Intermediate"},
            {"name": "Spring Boot", "weight": 1.3, "core": True, "targetLevel": "Intermediate"},
            {"name": "Data Structures & Algorithms", "weight": 1.2, "core": True, "targetLevel": "Intermediate"},
            {"name": "Git", "weight": 1.0, "core": False, "targetLevel": "Intermediate"}
        ],
        "recommendedProjects": [
            {
                "title": "Enterprise Banking Microservice API",
                "tech": "Java, Spring Boot, PostgreSQL, Docker",
                "description": "Implement a secure double-entry transaction service with idempotency keys, JWT auth, and circuit breakers."
            },
            {
                "title": "High-Throughput Order Management System",
                "tech": "Java, Concurrency, SQL",
                "description": "Build an event-driven order processing engine utilizing thread pools and non-blocking I/O."
            }
        ]
    }
}

def proficiency_to_score(level: Optional[str]) -> int:
    if not level:
        return 0
    norm = str(level).strip().capitalize()
    if norm == "Advanced":
        return 90
    if norm == "Intermediate":
        return 68
    if norm == "Beginner":
        return 42
    return 0

def calculate_readiness(
    user_skills: Optional[dict[str, str]] = None,
    target_role_name: str = "Python Developer",
    assessment_history: Optional[list[Any]] = None
) -> dict[str, Any]:
    skills = user_skills or {}
    history = assessment_history or []
    role = ROLES.get(target_role_name) or ROLES["Python Developer"]
    required_skills = role["requiredSkills"]

    total_weighted_score = 0.0
    total_weight = 0.0
    skill_breakdown = []
    skill_gaps = []
    strengths = []

    for req in required_skills:
        user_prof = skills.get(req["name"])
        base_score = proficiency_to_score(user_prof)

        # Objective assessments
        relevant = [
            a for a in history
            if (getattr(a, "skill", None) or (isinstance(a, dict) and a.get("skill"))) == req["name"]
        ]

        final_score = base_score
        verified = False

        if relevant:
            percentages = []
            for item in relevant:
                pct = getattr(item, "percentage", None) if not isinstance(item, dict) else item.get("percentage")
                if pct is not None:
                    percentages.append(float(pct))
            if percentages:
                avg_assessment = sum(percentages) / len(percentages)
                final_score = round(base_score * 0.4 + avg_assessment * 0.6)
                verified = True

        color = "blue" if final_score >= 75 else "pink" if final_score >= 50 else "purple"

        item = {
            "name": req["name"],
            "score": final_score,
            "targetLevel": req["targetLevel"],
            "currentLevel": user_prof or "Not Added",
            "core": req["core"],
            "weight": req["weight"],
            "verified": verified,
            "color": color
        }
        skill_breakdown.append(item)

        target_threshold = 75 if req["core"] else 60
        if final_score < target_threshold:
            gap_diff = target_threshold - final_score
            priority = "High" if (req["core"] or gap_diff >= 40) else "Medium"
            reason = f"Essential core competency for {target_role_name} roles" if req["core"] else f"Recommended supporting technology for {target_role_name}"
            skill_gaps.append({
                "name": req["name"],
                "priority": priority,
                "currentLevel": user_prof or "Not Added",
                "targetLevel": req["targetLevel"],
                "gap": gap_diff,
                "reason": reason
            })
        else:
            strengths.append({
                "name": req["name"],
                "score": final_score,
                "verified": verified
            })

        total_weighted_score += final_score * req["weight"]
        total_weight += req["weight"]

    overall_score = round(total_weighted_score / total_weight) if total_weight > 0 else 0

    if overall_score >= 80:
        status = "Job Ready"
    elif overall_score >= 60:
        status = "Competitive Applicant"
    elif overall_score >= 40:
        status = "Developing Core Foundation"
    else:
        status = "Early Preparation Stage"

    # Sort gaps by priority
    skill_gaps.sort(key=lambda g: (0 if g["priority"] == "High" else 1, -g["gap"]))

    return {
        "overallScore": overall_score,
        "status": status,
        "skillBreakdown": skill_breakdown,
        "skillGaps": skill_gaps,
        "strengths": strengths
    }

def generate_study_plan(
    skill_gaps: Optional[list[dict[str, Any]]] = None,
    target_role_name: str = "Python Developer",
    completed_task_days: Optional[list[str]] = None
) -> list[dict[str, Any]]:
    gaps = skill_gaps or []
    completed = completed_task_days or []

    primary_gap = gaps[0]["name"] if len(gaps) > 0 else "System Architecture"
    secondary_gap = gaps[1]["name"] if len(gaps) > 1 else (gaps[0]["name"] if len(gaps) > 0 else "Code Optimization")
    tertiary_gap = gaps[2]["name"] if len(gaps) > 2 else primary_gap

    template = [
        {
            "day": "DAY 01",
            "topic": f"Foundational review of {primary_gap}",
            "duration": "45 mins",
            "tag": "Concept Deep Dive",
            "action": f"Read documentation and complete 5 core exercises on {primary_gap}."
        },
        {
            "day": "DAY 02",
            "topic": f"Hands-on syntax & primitives in {primary_gap}",
            "duration": "60 mins",
            "tag": "Active Practice",
            "action": f"Build 3 small script challenges applying {primary_gap}."
        },
        {
            "day": "DAY 03",
            "topic": f"Core competency verification for {primary_gap}",
            "duration": "30 mins",
            "tag": "Assessment Ready",
            "action": f"Take the CareerFit {primary_gap} diagnostic assessment to benchmark current knowledge."
        },
        {
            "day": "DAY 04",
            "topic": f"Introduction to {secondary_gap} best practices",
            "duration": "50 mins",
            "tag": "Architecture",
            "action": f"Study common design patterns and industry conventions in {secondary_gap}."
        },
        {
            "day": "DAY 05",
            "topic": f"Practical problem solving with {secondary_gap}",
            "duration": "60 mins",
            "tag": "Implementation",
            "action": f"Implement a mini service or algorithm using {secondary_gap} with automated unit tests."
        },
        {
            "day": "DAY 06",
            "topic": f"Integration: Linking {primary_gap} and {secondary_gap}",
            "duration": "75 mins",
            "tag": "System Design",
            "action": f"Create an integrated workflow combining {primary_gap} and {secondary_gap} to emulate real-world production setups."
        },
        {
            "day": "DAY 07",
            "topic": f"Midpoint Assessment & Gap Closure for {secondary_gap}",
            "duration": "35 mins",
            "tag": "Assessment Ready",
            "action": f"Complete the diagnostic test for {secondary_gap} and review incorrect answers."
        },
        {
            "day": "DAY 08",
            "topic": f"Advanced edge cases & optimization in {tertiary_gap}",
            "duration": "60 mins",
            "tag": "Optimization",
            "action": f"Analyze Big-O performance, memory footprint, and concurrency patterns in {tertiary_gap}."
        },
        {
            "day": "DAY 09",
            "topic": f"Target Role Capstone Sprint: {target_role_name}",
            "duration": "90 mins",
            "tag": "Portfolio Capstone",
            "action": f"Begin a portfolio-ready project demonstrating high proficiency in {target_role_name} skills."
        },
        {
            "day": "DAY 10",
            "topic": f"Final Readiness Mock Evaluation for {target_role_name}",
            "duration": "45 mins",
            "tag": "Milestone Review",
            "action": f"Complete full-length evaluation across all target {target_role_name} competencies."
        }
    ]

    for task in template:
        task["status"] = "Completed" if task["day"] in completed else "In Progress" if task["day"] == "DAY 01" and not completed else "Upcoming"

    return template
