from typing import Any, Optional
import random

# Curated difficulty-graded seed bank for 12 skills
QUESTION_BANK: dict[str, dict[str, dict[str, list[dict[str, Any]]]]] = {
    "Python": {
        "MCQ": {
            "easy": [
                {
                    "id": 1,
                    "question": "Which of the following is an immutable data structure in Python?",
                    "options": ["List", "Dictionary", "Tuple", "Set"],
                    "correctAnswer": "Tuple",
                    "explanation": "Tuples in Python are immutable sequences; once created, their elements cannot be changed.",
                    "difficulty": "easy"
                },
                {
                    "id": 2,
                    "question": "What is the output of bool([]) in Python?",
                    "options": ["True", "False", "None", "Error"],
                    "correctAnswer": "False",
                    "explanation": "Empty collections (like lists, dictionaries, tuples) evaluate to False in Python truthiness checks.",
                    "difficulty": "easy"
                }
            ],
            "medium": [
                {
                    "id": 3,
                    "question": "What is the time complexity of looking up a key in a Python dict on average?",
                    "options": ["O(1)", "O(n)", "O(log n)", "O(n log n)"],
                    "correctAnswer": "O(1)",
                    "explanation": "Python dictionaries are implemented using hash tables, giving average O(1) time complexity for lookups.",
                    "difficulty": "medium"
                },
                {
                    "id": 4,
                    "question": "Which decorator in Python is used to cache pure function returns based on arguments?",
                    "options": ["@functools.lru_cache", "@property", "@staticmethod", "@cache_result"],
                    "correctAnswer": "@functools.lru_cache",
                    "explanation": "functools.lru_cache memoizes function returns with a least-recently-used cache algorithm.",
                    "difficulty": "medium"
                }
            ],
            "hard": [
                {
                    "id": 5,
                    "question": "How does the Python Global Interpreter Lock (GIL) behave during I/O-bound operations?",
                    "options": [
                        "It releases the GIL during blocking system calls so other threads can execute bytecode",
                        "It maintains the GIL, blocking all other threads entirely",
                        "It creates a new OS process automatically",
                        "It converts the operation into an asyncio coroutine"
                    ],
                    "correctAnswer": "It releases the GIL during blocking system calls so other threads can execute bytecode",
                    "explanation": "Python releases the GIL before executing blocking system I/O calls, allowing other threads to run bytecode concurrently.",
                    "difficulty": "hard"
                },
                {
                    "id": 6,
                    "question": "In Python 3.12+, what is the effect of PEP 684 (A Per-Interpreter GIL)?",
                    "options": [
                        "Allows subinterpreters to run with their own isolated GIL concurrently",
                        "Completely removes the GIL for all single-threaded programs",
                        "Makes lists thread-safe without locks",
                        "Replaces CPython with PyPy"
                    ],
                    "correctAnswer": "Allows subinterpreters to run with their own isolated GIL concurrently",
                    "explanation": "PEP 684 introduces per-interpreter GILs, allowing distinct subinterpreters within a single process to execute in parallel without lock contention.",
                    "difficulty": "hard"
                }
            ]
        },
        "Fill in Blanks": {
            "easy": [
                {
                    "id": 101,
                    "question": "In Python, the keyword used to define an anonymous inline function is ______.",
                    "correctAnswer": "lambda",
                    "explanation": "The 'lambda' keyword creates small anonymous functions in Python.",
                    "difficulty": "easy"
                }
            ],
            "medium": [
                {
                    "id": 102,
                    "question": "To yield values lazily from a function instead of returning all at once, Python uses the ______ keyword.",
                    "correctAnswer": "yield",
                    "explanation": "The 'yield' statement turns a regular function into a generator object.",
                    "difficulty": "medium"
                }
            ],
            "hard": [
                {
                    "id": 103,
                    "question": "In Python metaclasses, the method called to customize class creation before __init__ is ______.",
                    "correctAnswer": "__new__",
                    "explanation": "The __new__ method is the constructor that creates and returns the class instance before __init__ initializes it.",
                    "difficulty": "hard"
                }
            ]
        },
        "Coding": {
            "easy": [
                {
                    "id": 201,
                    "question": "Write a Python function `reverse_string(s)` that reverses a string.",
                    "initialCode": "def reverse_string(s: str) -> str:\n    # Return reversed string\n    pass",
                    "correctAnswer": "def reverse_string(s: str) -> str:\n    return s[::-1]",
                    "explanation": "String slicing with step -1 (`s[::-1]`) reverses any sequence efficiently in Python.",
                    "difficulty": "easy"
                }
            ],
            "medium": [
                {
                    "id": 202,
                    "question": "Implement `two_sum(nums, target)` returning indices of two numbers that add up to target in O(n) time.",
                    "initialCode": "def two_sum(nums: list[int], target: int) -> list[int]:\n    # Implement O(n) hashmap lookup\n    pass",
                    "correctAnswer": "def two_sum(nums, target):\n    seen = {}\n    for i, num in enumerate(nums):\n        diff = target - num\n        if diff in seen:\n            return [seen[diff], i]\n        seen[num] = i\n    return []",
                    "explanation": "Using a hashmap to store seen values allows O(1) complement lookup for an overall O(n) time complexity.",
                    "difficulty": "medium"
                }
            ],
            "hard": [
                {
                    "id": 203,
                    "question": "Write a thread-safe singleton decorator `singleton(cls)` using double-checked locking.",
                    "initialCode": "import threading\n\ndef singleton(cls):\n    # Implement thread-safe singleton\n    pass",
                    "correctAnswer": "import threading\n\ndef singleton(cls):\n    instances = {}\n    lock = threading.Lock()\n    def get_instance(*args, **kwargs):\n        if cls not in instances:\n            with lock:\n                if cls not in instances:\n                    instances[cls] = cls(*args, **kwargs)\n        return instances[cls]\n    return get_instance",
                    "explanation": "Double-checked locking ensures thread safety while avoiding synchronization overhead on subsequent reads.",
                    "difficulty": "hard"
                }
            ]
        }
    },
    "SQL": {
        "MCQ": {
            "easy": [
                {
                    "id": 301,
                    "question": "Which SQL statement is used to extract data from a database?",
                    "options": ["SELECT", "EXTRACT", "GET", "OPEN"],
                    "correctAnswer": "SELECT",
                    "explanation": "The SELECT statement retrieves rows from one or more database tables.",
                    "difficulty": "easy"
                }
            ],
            "medium": [
                {
                    "id": 302,
                    "question": "What is the key difference between WHERE and HAVING in SQL?",
                    "options": [
                        "WHERE filters rows before aggregation; HAVING filters aggregated groups",
                        "HAVING filters rows before aggregation; WHERE filters groups",
                        "WHERE is only used with JOINs",
                        "There is no functional difference"
                    ],
                    "correctAnswer": "WHERE filters rows before aggregation; HAVING filters aggregated groups",
                    "explanation": "WHERE evaluates individual rows prior to GROUP BY, whereas HAVING filters grouped aggregate results.",
                    "difficulty": "medium"
                }
            ],
            "hard": [
                {
                    "id": 303,
                    "question": "Which window function assigns unique sequential integers to rows within a partition starting at 1?",
                    "options": ["ROW_NUMBER()", "RANK()", "DENSE_RANK()", "NTILE()"],
                    "correctAnswer": "ROW_NUMBER()",
                    "explanation": "ROW_NUMBER() assigns consecutive unique integers to rows, unlike RANK() which duplicates numbers for ties.",
                    "difficulty": "hard"
                }
            ]
        },
        "Fill in Blanks": {
            "easy": [
                {
                    "id": 351,
                    "question": "The SQL clause used to combine rows from two or more tables based on a related column is ______.",
                    "correctAnswer": "JOIN",
                    "explanation": "A JOIN clause merges columns from related tables.",
                    "difficulty": "easy"
                }
            ],
            "medium": [
                {
                    "id": 352,
                    "question": "To prevent duplicate records from being returned by a SELECT query, use the ______ keyword.",
                    "correctAnswer": "DISTINCT",
                    "explanation": "SELECT DISTINCT discards duplicate output tuples.",
                    "difficulty": "medium"
                }
            ],
            "hard": [
                {
                    "id": 353,
                    "question": "In PostgreSQL, the isolation level that prevents both dirty reads, non-repeatable reads, and phantom reads is ______.",
                    "correctAnswer": "SERIALIZABLE",
                    "explanation": "SERIALIZABLE is the strictest transaction isolation level in relational databases.",
                    "difficulty": "hard"
                }
            ]
        },
        "Coding": {
            "easy": [
                {
                    "id": 401,
                    "question": "Write a query to select employee name and salary where salary is greater than 50000 ordered descending.",
                    "initialCode": "-- Write SQL query\nSELECT ",
                    "correctAnswer": "SELECT name, salary FROM employees WHERE salary > 50000 ORDER BY salary DESC;",
                    "explanation": "Filters with WHERE salary > 50000 and orders descending with ORDER BY salary DESC.",
                    "difficulty": "easy"
                }
            ],
            "medium": [
                {
                    "id": 402,
                    "question": "Write a query to find the second highest salary from an Employees table.",
                    "initialCode": "-- Query 2nd highest salary\nSELECT ",
                    "correctAnswer": "SELECT MAX(salary) FROM employees WHERE salary < (SELECT MAX(salary) FROM employees);",
                    "explanation": "A correlated or nested subquery selects the maximum value strictly below the table maximum.",
                    "difficulty": "medium"
                }
            ],
            "hard": [
                {
                    "id": 403,
                    "question": "Write a query using window functions to find employees whose salary is in the top 10% of their department.",
                    "initialCode": "-- Use NTILE or DENSE_RANK\nWITH Ranked AS (\n",
                    "correctAnswer": "WITH Ranked AS (\n  SELECT *, NTILE(10) OVER(PARTITION BY department_id ORDER BY salary DESC) as bucket\n  FROM employees\n)\nSELECT * FROM Ranked WHERE bucket = 1;",
                    "explanation": "NTILE(10) divides partitioned department rows into 10 deciles; bucket = 1 represents top 10%.",
                    "difficulty": "hard"
                }
            ]
        }
    }
}

# Generic fallback generator for skills without specialized question sub-banks
def generate_generic_questions(
    skill: str,
    qtype: str,
    difficulty: str,
    count: int
) -> list[dict[str, Any]]:
    questions = []
    base_id = random.randint(1000, 9999)

    for i in range(count):
        qid = base_id + i
        if qtype == "MCQ":
            if difficulty == "easy":
                questions.append({
                    "id": qid,
                    "question": f"What is the primary role of {skill} in modern software and data systems?",
                    "options": [
                        f"Core foundational tool and architecture for {skill} operations",
                        f"Legacy protocol deprecated in modern {skill} workflows",
                        "Network transport physical layer protocol",
                        "Desktop operating system kernel"
                    ],
                    "correctAnswer": f"Core foundational tool and architecture for {skill} operations",
                    "explanation": f"{skill} is utilized across engineering teams to build maintainable, performant systems.",
                    "difficulty": difficulty
                })
            elif difficulty == "medium":
                questions.append({
                    "id": qid,
                    "question": f"Which best practice should be applied when scaling {skill} applications?",
                    "options": [
                        "Modular separation of concerns and robust error isolation",
                        "Disabling validation to improve raw execution speed",
                        "Storing unencrypted credentials in version control",
                        "Hardcoding global state across concurrent modules"
                    ],
                    "correctAnswer": "Modular separation of concerns and robust error isolation",
                    "explanation": "Production readiness requires clean modular abstractions and fault isolation.",
                    "difficulty": difficulty
                })
            else:
                questions.append({
                    "id": qid,
                    "question": f"In high-throughput environments, how should bottlenecks in {skill} be diagnosed and resolved?",
                    "options": [
                        "Profile resource utilization, benchmark critical paths, and apply asynchronous pooling",
                        "Restart the host instance whenever memory consumption rises",
                        "Remove unit and integration tests to save compute cycles",
                        "Replace relational schema with arbitrary string blobs"
                    ],
                    "correctAnswer": "Profile resource utilization, benchmark critical paths, and apply asynchronous pooling",
                    "explanation": "Systematic profiling and architectural concurrency optimization provide predictable low-latency throughput.",
                    "difficulty": difficulty
                })
        elif qtype == "Fill in Blanks":
            questions.append({
                "id": qid,
                "question": f"When configuring {skill}, the standard configuration file format frequently utilized is ______ (JSON/YAML).",
                "correctAnswer": "YAML",
                "explanation": f"YAML is standard for configuration management in modern {skill} tooling.",
                "difficulty": difficulty
            })
        else:  # Coding
            questions.append({
                "id": qid,
                "question": f"Implement a clean utility demonstrating {skill} best practices for data validation.",
                "initialCode": f"# {skill} Implementation Challenge\ndef solve():\n    pass",
                "correctAnswer": f"# Solution for {skill}\ndef solve():\n    return True",
                "explanation": f"Validates inputs cleanly according to {skill} conventions.",
                "difficulty": difficulty
            })
    return questions

def determine_difficulty(
    capability_level: Optional[str] = None,
    user_score_history: Optional[float] = None
) -> str:
    """
    Dynamically determines question difficulty based on user's demonstrated capability.
    """
    if user_score_history is not None:
        if user_score_history >= 80.0:
            return "hard"
        if user_score_history >= 50.0:
            return "medium"
        return "easy"

    if capability_level:
        cap = capability_level.lower()
        if "advanced" in cap:
            return "hard"
        if "intermediate" in cap:
            return "medium"
        return "easy"

    return "medium"

def generate_adaptive_questions(
    skill: str,
    qtype: str = "MCQ",
    count: int = 3,
    capability_level: Optional[str] = None,
    user_score_history: Optional[float] = None
) -> list[dict[str, Any]]:
    """
    On-the-spot question generator dynamically generating questions adapted to user capability.
    """
    diff = determine_difficulty(capability_level, user_score_history)

    skill_bank = QUESTION_BANK.get(skill, {})
    type_bank = skill_bank.get(qtype, {})
    diff_bank = type_bank.get(diff, [])

    results = []
    if diff_bank:
        # Use available curated questions for this difficulty
        results.extend(diff_bank)

    # If we need more questions or skill is not in seed bank, generate dynamically
    if len(results) < count:
        needed = count - len(results)
        generated = generate_generic_questions(skill, qtype, diff, needed)
        results.extend(generated)

    return results[:count]
