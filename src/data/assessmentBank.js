import { BrainCircuit, ClipboardList, Code2 } from "lucide-react";

/**
 * CareerFit Master Role-Specific Assessment Bank
 * 
 * Provides validated MCQ, Fill-in-the-Blanks, and Coding Challenges
 * across all core competencies for CareerFit's 6 target roles.
 */

export const assessmentQuestions = {
  Python: {
    MCQ: [
      {
        question: "Which data type stores key-value pairs in Python?",
        options: ["List", "Tuple", "Dictionary", "Set"],
        answer: 2,
        explanation: "A dictionary stores associative key-value mappings."
      },
      {
        question: "What is the output of len([10, 20, 30])?",
        options: ["2", "3", "4", "Error"],
        answer: 1,
        explanation: "The list contains three distinct elements."
      },
      {
        question: "Which keyword defines a function in Python?",
        options: ["function", "define", "def", "fun"],
        answer: 2,
        explanation: "Python uses 'def' to define functions."
      },
      {
        question: "What does range(3) generate when iterated?",
        options: ["1, 2, 3", "0, 1, 2", "0, 1, 2, 3", "3 only"],
        answer: 1,
        explanation: "range(3) produces numbers 0, 1, and 2."
      },
      {
        question: "Which symbol starts a single-line comment in Python?",
        options: ["//", "#", "/*", "--"],
        answer: 1,
        explanation: "The # symbol denotes single-line comments in Python."
      }
    ],
    "Fill in the Blanks": [
      {
        question: "Which keyword is used to define a Python function?",
        answer: "def",
        explanation: "Use 'def' followed by function identifier and arguments."
      },
      {
        question: "Which built-in function returns the length of a list or string?",
        answer: "len",
        explanation: "len() evaluates the item count of collections."
      },
      {
        question: "Which keyword is used to catch exceptions in a try block?",
        answer: "except",
        explanation: "The 'except' block catches and handles exceptions."
      },
      {
        question: "Which keyword is used to create a new class in Python?",
        answer: "class",
        explanation: "Classes are instantiated using the 'class' keyword."
      },
      {
        question: "Which Python value represents the absence of a value or null?",
        answer: "none",
        explanation: "Python uses 'None' to denote the absence of a value."
      }
    ],
    Coding: [
      {
        question: "Write a program to check whether a number is even or odd.",
        description: "Read an integer and print Even or Odd.",
        example: "Input: 7\nOutput: Odd",
        starterCode: "n = int(input())\n# Write your solution below\n"
      },
      {
        question: "Write a program to check whether a number is prime.",
        description: "Print True if prime, else False.",
        example: "Input: 7\nOutput: True",
        starterCode: "n = int(input())\n# Write your solution below\n"
      },
      {
        question: "Write a program to reverse a string without built-in reverse.",
        description: "Read a string and print its reverse.",
        example: "Input: career\nOutput: reerac",
        starterCode: "s = input()\n# Write your solution below\n"
      }
    ]
  },

  SQL: {
    MCQ: [
      {
        question: "Which SQL clause is used to filter rows before grouping?",
        options: ["HAVING", "WHERE", "ORDER BY", "GROUP BY"],
        answer: 1,
        explanation: "WHERE filters rows before any aggregation takes place."
      },
      {
        question: "Which join returns all rows from the left table even if there is no match on the right?",
        options: ["INNER JOIN", "RIGHT JOIN", "LEFT JOIN", "CROSS JOIN"],
        answer: 2,
        explanation: "LEFT JOIN retains all rows from the left relation."
      },
      {
        question: "Which aggregate function calculates the total number of non-null entries?",
        options: ["SUM()", "COUNT()", "TOTAL()", "MAX()"],
        answer: 1,
        explanation: "COUNT(column) counts non-null occurrences."
      },
      {
        question: "Which constraint uniquely identifies each record in a database table?",
        options: ["FOREIGN KEY", "PRIMARY KEY", "CHECK", "INDEX"],
        answer: 1,
        explanation: "A PRIMARY KEY uniquely identifies every table record."
      },
      {
        question: "Which clause sorts query results in ascending or descending order?",
        options: ["SORT BY", "ORDER BY", "ARRANGE BY", "GROUP BY"],
        answer: 1,
        explanation: "ORDER BY controls ordering of result sets."
      }
    ],
    "Fill in the Blanks": [
      {
        question: "The SQL keyword used to retrieve data from a table is ____.",
        answer: "select",
        explanation: "SELECT queries and retrieves tabular data."
      },
      {
        question: "The clause used to filter rows based on conditions is ____.",
        answer: "where",
        explanation: "WHERE filters records."
      },
      {
        question: "The command used to insert new records into a table is ____ into.",
        answer: "insert",
        explanation: "INSERT INTO appends new records."
      },
      {
        question: "The SQL clause used to filter aggregated group results is ____.",
        answer: "having",
        explanation: "HAVING filters groups produced by GROUP BY."
      },
      {
        question: "The command used to update existing records in a table is ____.",
        answer: "update",
        explanation: "UPDATE modifies existing values."
      }
    ],
    Coding: [
      {
        question: "Retrieve high-salary employees.",
        description: "Select all columns from Employees where salary > 60000 ordered by salary DESC.",
        example: "Table: Employees (id, name, department, salary)",
        starterCode: "SELECT *\nFROM Employees\n-- Add WHERE and ORDER BY logic\n"
      },
      {
        question: "Count employees per department.",
        description: "Return department and employee count aliased as emp_count.",
        example: "Columns: department, emp_count",
        starterCode: "SELECT department, COUNT(*) AS emp_count\nFROM Employees\n-- Group appropriately\n"
      }
    ]
  },

  "Machine Learning": {
    MCQ: [
      {
        question: "Which problem type involves predicting a continuous numerical target variable?",
        options: ["Classification", "Regression", "Clustering", "Dimensionality Reduction"],
        answer: 1,
        explanation: "Regression predicts continuous numeric values."
      },
      {
        question: "What issue occurs when a model performs exceptionally well on training data but poorly on unseen test data?",
        options: ["Underfitting", "Overfitting", "High Bias", "Data Leakage"],
        answer: 1,
        explanation: "Overfitting captures noise and fails to generalize."
      },
      {
        question: "Which evaluation metric represents the harmonic mean of Precision and Recall?",
        options: ["Accuracy", "ROC-AUC", "F1 Score", "MAE"],
        answer: 2,
        explanation: "The F1 Score balances precision and recall as their harmonic mean."
      },
      {
        question: "Which algorithm constructs an ensemble of decision trees using bootstrap aggregation?",
        options: ["Linear Regression", "Random Forest", "K-Means", "Naive Bayes"],
        answer: 1,
        explanation: "Random Forest combines bagging with decision trees."
      },
      {
        question: "What is the primary objective of Principal Component Analysis (PCA)?",
        options: ["Model Training", "Dimensionality Reduction", "Supervised Classification", "Hyperparameter Tuning"],
        answer: 1,
        explanation: "PCA reduces feature space while retaining variance."
      }
    ],
    "Fill in the Blanks": [
      {
        question: "The evaluation metric that combines Precision and Recall into a harmonic mean is the ____ score.",
        answer: "f1",
        explanation: "F1 score harmonic mean: 2 * (P * R) / (P + R)."
      },
      {
        question: "The technique used to evaluate model stability by partitioning data into K subsets is ____ validation.",
        answer: "cross",
        explanation: "Cross-validation tests model generalization."
      },
      {
        question: "A high-variance model that memorizes training data is suffering from ____.",
        answer: "overfitting",
        explanation: "Overfitting occurs when complexity exceeds training signals."
      },
      {
        question: "The library in Python most widely used for traditional machine learning algorithms is scikit-____.",
        answer: "learn",
        explanation: "scikit-learn is the standard Python ML framework."
      }
    ],
    Coding: [
      {
        question: "Implement Mean Squared Error (MSE) calculation.",
        description: "Given arrays y_true and y_pred, return the mean squared error.",
        example: "y_true = [1, 2, 3], y_pred = [1, 2, 2] -> MSE = 0.333",
        starterCode: "def calculate_mse(y_true, y_pred):\n    # Return mean of squared differences\n    pass\n"
      },
      {
        question: "Compute Precision and Recall from confusion counts.",
        description: "Given TP, FP, FN, return (precision, recall).",
        example: "TP=10, FP=2, FN=3 -> Precision = 0.833, Recall = 0.769",
        starterCode: "def precision_recall(tp, fp, fn):\n    # Return tuple (precision, recall)\n    pass\n"
      }
    ]
  },

  "Deep Learning": {
    MCQ: [
      {
        question: "Which activation function outputs values strictly in the range (0, 1)?",
        options: ["ReLU", "Sigmoid", "Tanh", "Leaky ReLU"],
        answer: 1,
        explanation: "Sigmoid squashes input values into (0, 1)."
      },
      {
        question: "What algorithm is used to compute gradients across layered neural networks?",
        options: ["Backpropagation", "Hebbian Learning", "K-Means", "Dijkstra"],
        answer: 0,
        explanation: "Backpropagation applies the chain rule backward to compute gradients."
      },
      {
        question: "Which neural network architecture is primarily utilized for image processing and spatial features?",
        options: ["RNN", "Transformer", "CNN", "MLP"],
        answer: 2,
        explanation: "Convolutional Neural Networks (CNNs) excel at spatial feature extraction."
      },
      {
        question: "What regularization technique randomly sets a fraction of neuron activations to zero during training?",
        options: ["Batch Normalization", "Dropout", "Early Stopping", "Gradient Clipping"],
        answer: 1,
        explanation: "Dropout drops units at random to prevent co-adaptation."
      }
    ],
    "Fill in the Blanks": [
      {
        question: "The fundamental unit of data in PyTorch and TensorFlow is a ____.",
        answer: "tensor",
        explanation: "Tensors are multi-dimensional arrays representing weights and data."
      },
      {
        question: "The activation function defined as f(x) = max(0, x) is known as ____.",
        answer: "relu",
        explanation: "Rectified Linear Unit (ReLU) computes max(0, x)."
      },
      {
        question: "The technique of using weights from a pre-trained model for a new task is ____ learning.",
        answer: "transfer",
        explanation: "Transfer learning fine-tunes existing learned representations."
      }
    ],
    Coding: [
      {
        question: "Implement the ReLU activation function.",
        description: "Given an input list of numbers, return a list where negative values are replaced with 0.",
        example: "[-2, 0, 5] -> [0, 0, 5]",
        starterCode: "def relu(x_list):\n    # Return transformed list\n    pass\n"
      }
    ]
  },

  "Data Structures & Algorithms": {
    MCQ: [
      {
        question: "What is the average time complexity of searching an element in a balanced Binary Search Tree (BST)?",
        options: ["O(1)", "O(log n)", "O(n)", "O(n log n)"],
        answer: 1,
        explanation: "Balanced BST search divides the candidate space in half: O(log n)."
      },
      {
        question: "Which data structure operates on a First-In, First-Out (FIFO) discipline?",
        options: ["Stack", "Queue", "Heap", "Graph"],
        answer: 1,
        explanation: "Queues process items in FIFO order."
      },
      {
        question: "What is the worst-case time complexity of QuickSort?",
        options: ["O(n)", "O(n log n)", "O(n^2)", "O(2^n)"],
        answer: 2,
        explanation: "QuickSort degrades to O(n^2) when poor pivots are repeatedly chosen."
      },
      {
        question: "Which data structure provides average O(1) time complexity for lookup, insert, and delete?",
        options: ["Linked List", "Hash Map / Hash Table", "Array", "Binary Tree"],
        answer: 1,
        explanation: "Hash maps provide amortized O(1) access via key hashing."
      }
    ],
    "Fill in the Blanks": [
      {
        question: "A data structure that follows the Last-In, First-Out (LIFO) principle is a ____.",
        answer: "stack",
        explanation: "Stacks push and pop in LIFO sequence."
      },
      {
        question: "The algorithmic technique that solves problems by breaking them into overlapping subproblems and caching results is ____ programming.",
        answer: "dynamic",
        explanation: "Dynamic programming caches overlapping subproblem solutions."
      },
      {
        question: "The Big-O complexity of binary search on a sorted array is O(____ n).",
        answer: "log",
        explanation: "Binary search runs in logarithmic time O(log n)."
      }
    ],
    Coding: [
      {
        question: "Two Sum: Find indices of two numbers that add up to target.",
        description: "Given an integer array nums and an integer target, return indices of two numbers that add to target.",
        example: "nums = [2, 7, 11, 15], target = 9 -> [0, 1]",
        starterCode: "def two_sum(nums, target):\n    # Write an O(n) hash map solution\n    pass\n"
      },
      {
        question: "Valid Parentheses: Check if brackets are balanced.",
        description: "Given a string containing '()[]{}', determine if brackets are properly closed in correct order.",
        example: "'({[]})' -> True, '([)]' -> False",
        starterCode: "def is_valid_parentheses(s):\n    # Use a stack to evaluate brackets\n    pass\n"
      }
    ]
  },

  React: {
    MCQ: [
      {
        question: "Which React hook is used to manage side effects such as data fetching or subscriptions?",
        options: ["useState", "useEffect", "useMemo", "useRef"],
        answer: 1,
        explanation: "useEffect synchronizes components with external side effects."
      },
      {
        question: "What must be included when rendering a dynamic list of React elements to assist reconciliation?",
        options: ["id", "index", "key", "ref"],
        answer: 2,
        explanation: "Unique 'key' props allow React to identify which items have changed."
      },
      {
        question: "What is the primary purpose of the useMemo hook in React?",
        options: ["Execute side effects", "Memoize expensive calculated values", "Hold DOM references", "Create context"],
        answer: 1,
        explanation: "useMemo caches the result of expensive calculations between renders."
      },
      {
        question: "In React, how should component state be updated?",
        options: ["Direct mutation (this.state.x = 5)", "Using the setter function provided by useState", "By modifying props", "Via window.setState"],
        answer: 1,
        explanation: "Always use the state setter function to schedule a re-render."
      }
    ],
    "Fill in the Blanks": [
      {
        question: "The hook used to preserve a mutable value across renders without triggering a re-render is use____.",
        answer: "ref",
        explanation: "useRef holds mutable references without causing re-renders."
      },
      {
        question: "The syntax extension used in React to describe UI appearance within JavaScript is called ____.",
        answer: "jsx",
        explanation: "JSX compiles into React.createElement calls."
      },
      {
        question: "Components that receive props and return JSX without managing their own state are often called ____ components.",
        answer: "stateless",
        explanation: "Stateless (pure) components derive output solely from props."
      }
    ],
    Coding: [
      {
        question: "Write a custom counter hook.",
        description: "Create a function useCounter(initialValue) returning { count, increment, decrement, reset }.",
        example: "const { count, increment } = useCounter(0)",
        starterCode: "function useCounter(initialValue = 0) {\n  // Implement state and handlers\n}\n"
      }
    ]
  },

  "Node.js": {
    MCQ: [
      {
        question: "Which architectural model describes the core runtime of Node.js?",
        options: ["Multi-threaded synchronous", "Single-threaded non-blocking event loop", "Fork-per-request", "Actor model"],
        answer: 1,
        explanation: "Node.js uses an event loop on a single main thread with libuv workers."
      },
      {
        question: "Which core Node.js module is used to interact with the local filesystem?",
        options: ["http", "path", "fs", "os"],
        answer: 2,
        explanation: "The 'fs' module provides file system operations."
      },
      {
        question: "In CommonJS module syntax, which keyword exports functions or objects?",
        options: ["export default", "module.exports", "package.export", "publish"],
        answer: 1,
        explanation: "CommonJS uses module.exports to expose APIs."
      }
    ],
    "Fill in the Blanks": [
      {
        question: "The package manager installed by default alongside Node.js is ____.",
        answer: "npm",
        explanation: "Node Package Manager (npm) distributes JavaScript packages."
      },
      {
        question: "The multi-platform C library that powers Node.js asynchronous I/O is lib____.",
        answer: "uv",
        explanation: "libuv provides the event loop and thread pool in Node.js."
      }
    ],
    Coding: [
      {
        question: "Create a simple HTTP request logger middleware.",
        description: "Write an Express middleware that logs method, url, and timestamp, then calls next().",
        example: "app.use(loggerMiddleware)",
        starterCode: "function requestLogger(req, res, next) {\n  // Log and invoke next()\n}\n"
      }
    ]
  },

  Java: {
    MCQ: [
      {
        question: "Which keyword creates a new object instance in Java?",
        options: ["create", "new", "object", "instantiate"],
        answer: 1,
        explanation: "The 'new' keyword allocates memory for an object."
      },
      {
        question: "Which method represents the runtime entry point of a standard Java application?",
        options: ["start()", "run()", "main(String[] args)", "init()"],
        answer: 2,
        explanation: "Java execution begins in public static void main(String[] args)."
      },
      {
        question: "Which Java primitive type stores true or false values?",
        options: ["int", "String", "boolean", "byte"],
        answer: 2,
        explanation: "The boolean primitive represents binary truth values."
      },
      {
        question: "Which collection interface does NOT permit duplicate elements in Java?",
        options: ["List", "Set", "Queue", "Vector"],
        answer: 1,
        explanation: "Sets prohibit duplicate elements."
      }
    ],
    "Fill in the Blanks": [
      {
        question: "The keyword used to inherit a class in Java is ____.",
        answer: "extends",
        explanation: "Classes use 'extends' to inherit superclass methods and fields."
      },
      {
        question: "The keyword used to inherit an interface in Java is ____.",
        answer: "implements",
        explanation: "Classes use 'implements' to satisfy interface contracts."
      },
      {
        question: "The keyword used to prevent a class or method from being subclassed or overridden is ____.",
        answer: "final",
        explanation: "final entities cannot be mutated, extended, or overridden."
      }
    ],
    Coding: [
      {
        question: "Check if a number is even or odd.",
        description: "Print Even or Odd for a given integer input.",
        example: "Input: 8 -> Even",
        starterCode: "import java.util.Scanner;\n\nclass Main {\n    public static void main(String[] args) {\n        // Read integer and evaluate\n    }\n}\n"
      }
    ]
  },

  JavaScript: {
    MCQ: [
      {
        question: "Which keyword declares a block-scoped variable that can be reassigned?",
        options: ["const", "let", "var", "static"],
        answer: 1,
        explanation: "let declares reassignable block-scoped variables."
      },
      {
        question: "Which method converts a JSON string into a native JavaScript object?",
        options: ["JSON.parse()", "JSON.stringify()", "JSON.convert()", "JSON.read()"],
        answer: 0,
        explanation: "JSON.parse() parses JSON strings into objects."
      },
      {
        question: "Which operator checks both value and type equality without coercion?",
        options: ["=", "==", "===", "!=="],
        answer: 2,
        explanation: "=== enforces strict equality without type coercion."
      }
    ],
    "Fill in the Blanks": [
      {
        question: "The keyword used to declare a constant variable that cannot be reassigned is ____.",
        answer: "const",
        explanation: "const creates an immutable binding."
      },
      {
        question: "The built-in method used to serialize a JavaScript object into a JSON string is JSON.____().",
        answer: "stringify",
        explanation: "JSON.stringify converts objects into JSON text."
      }
    ],
    Coding: [
      {
        question: "Write a function that returns the sum of all elements in an array.",
        description: "Use Array.prototype.reduce to compute the sum.",
        example: "sumArray([1, 2, 3, 4]) -> 10",
        starterCode: "function sumArray(numbers) {\n  // Implement reduce\n}\n"
      }
    ]
  },

  OOP: {
    MCQ: [
      {
        question: "Which OOP principle hides internal object state and requires all interaction through methods?",
        options: ["Inheritance", "Encapsulation", "Polymorphism", "Abstraction"],
        answer: 1,
        explanation: "Encapsulation bundles data with methods and restricts direct access."
      },
      {
        question: "What term describes the ability of different classes to respond to the same method call in unique ways?",
        options: ["Polymorphism", "Encapsulation", "Compilation", "Aggregation"],
        answer: 0,
        explanation: "Polymorphism allows objects of different types to be treated through a common interface."
      },
      {
        question: "What relationship is established when Class B extends Class A?",
        options: ["HAS-A", "IS-A", "USES-A", "CONTAINS"],
        answer: 1,
        explanation: "Class inheritance represents an 'IS-A' relationship."
      }
    ],
    "Fill in the Blanks": [
      {
        question: "The mechanism of acquiring properties and behaviors from a parent class is ____.",
        answer: "inheritance",
        explanation: "Inheritance enables code reuse from base classes."
      },
      {
        question: "The principle of displaying only essential features while hiding background details is ____.",
        answer: "abstraction",
        explanation: "Abstraction simplifies interfaces by hiding implementation complexity."
      }
    ],
    Coding: [
      {
        question: "Implement a BankAccount class with deposit, withdraw, and getBalance methods.",
        description: "Ensure withdraw does not allow negative balances.",
        example: "account.deposit(100); account.withdraw(30); -> balance 70",
        starterCode: "class BankAccount {\n  constructor(initialBalance = 0) {\n    this.balance = initialBalance;\n  }\n  // Implement methods\n}\n"
      }
    ]
  },

  DBMS: {
    MCQ: [
      {
        question: "What does the 'A' represent in the relational ACID transaction properties?",
        options: ["Availability", "Atomicity", "Authentication", "Authorization"],
        answer: 1,
        explanation: "Atomicity guarantees that all transaction operations succeed, or none do."
      },
      {
        question: "Which normal form removes partial dependencies on a composite primary key?",
        options: ["1NF", "2NF", "3NF", "BCNF"],
        answer: 1,
        explanation: "Second Normal Form (2NF) eliminates partial functional dependencies."
      },
      {
        question: "What database structure is built on columns to dramatically accelerate data retrieval speeds?",
        options: ["Trigger", "View", "Index", "Cursor"],
        answer: 2,
        explanation: "Indexes (e.g. B-Trees) provide rapid lookup paths for query execution."
      }
    ],
    "Fill in the Blanks": [
      {
        question: "The property ensuring that a database transaction leaves data in a valid state adhering to all rules is ____ in ACID.",
        answer: "consistency",
        explanation: "Consistency preserves invariants and constraints across transactions."
      },
      {
        question: "A column that creates a relationship pointing to a primary key in another table is a ____ key.",
        answer: "foreign",
        explanation: "Foreign keys enforce referential integrity between tables."
      }
    ],
    Coding: [
      {
        question: "Write SQL to create an indexed order table with foreign key constraint.",
        description: "Create table Orders with id, user_id (FK to Users.id), amount, created_at.",
        example: "CREATE TABLE Orders (...)",
        starterCode: "CREATE TABLE Orders (\n  id SERIAL PRIMARY KEY,\n  -- Add foreign key and amount\n);\n"
      }
    ]
  },

  Pandas: {
    MCQ: [
      {
        question: "Which primary two-dimensional labeled data structure is provided by Pandas?",
        options: ["Series", "DataFrame", "Panel", "NDArray"],
        answer: 1,
        explanation: "A DataFrame is Pandas' primary two-dimensional tabular data structure."
      },
      {
        question: "Which method in Pandas returns summary statistics (count, mean, std, min, max) for numeric columns?",
        options: ["df.info()", "df.describe()", "df.summary()", "df.values()"],
        answer: 1,
        explanation: "df.describe() generates descriptive summary statistics."
      },
      {
        question: "Which method drops rows containing missing or null values from a DataFrame?",
        options: ["df.fillna()", "df.dropna()", "df.remove_empty()", "df.clean()"],
        answer: 1,
        explanation: "df.dropna() removes rows or columns with NaN values."
      }
    ],
    "Fill in the Blanks": [
      {
        question: "The method used to group DataFrame rows by a specific categorical column is df.____().",
        answer: "groupby",
        explanation: "df.groupby() splits data into groups for aggregation."
      },
      {
        question: "A one-dimensional labeled array in Pandas is called a ____.",
        answer: "series",
        explanation: "A Series is a 1D labeled array capable of holding any data type."
      }
    ],
    Coding: [
      {
        question: "Filter rows and calculate average.",
        description: "Given a DataFrame df with 'age' and 'salary', return the average salary for rows where age > 30.",
        example: "df[df['age'] > 30]['salary'].mean()",
        starterCode: "def average_senior_salary(df):\n    # Return mean salary for age > 30\n    pass\n"
      }
    ]
  }
};

export const assessmentTypes = [
  {
    id: "MCQ",
    title: "Multiple Choice",
    description: "Choose the correct answer from the given options.",
    duration: 10,
    icon: BrainCircuit
  },
  {
    id: "Fill in the Blanks",
    title: "Fill in the Blanks",
    description: "Complete statements to demonstrate your knowledge.",
    duration: 10,
    icon: ClipboardList
  },
  {
    id: "Coding",
    title: "Coding Challenge",
    description: "Solve practical programming problems.",
    duration: 20,
    icon: Code2
  }
];
