"use client"

import axios from 'axios';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { useRouter, useParams } from 'next/navigation';

const skills = [
  "Angular",
  "AWS",
  "C#",
  "CSS3",
  "Django",
  "Docker",
  "Flask",
  "GraphQL",
  "HTML5",
  "Java",
  "JavaScript",
  "Kotlin",
  "MongoDB",
  "Node.js",
  "PHP",
  "Python",
  "React",
  "Ruby on Rails",
  "SQL",
  "TypeScript"
];

const questions = [
  // Angular (IDs 1-5)
  {
    id: 1,
    skill: "Angular",
    text: "Which of the following best describes Angular?",
    options: [
      "A front-end web application framework",
      "A back-end programming language",
      "A database management system",
      "A CSS preprocessor"
    ],
    correctAnswer: "A front-end web application framework"
  },
  {
    id: 2,
    skill: "Angular",
    text: "What language is primarily used to write Angular applications?",
    options: ["JavaScript", "TypeScript", "Python", "Ruby"],
    correctAnswer: "TypeScript"
  },
  {
    id: 3,
    skill: "Angular",
    text: "Which directive in Angular is used to conditionally display elements?",
    options: ["*ngIf", "*ngFor", "*ngSwitch", "ngShow"],
    correctAnswer: "*ngIf"
  },
  {
    id: 4,
    skill: "Angular",
    text: "What is the purpose of Angular's dependency injection?",
    options: [
      "To inject CSS styles",
      "To manage component lifecycles",
      "To provide services to components",
      "To handle HTTP requests"
    ],
    correctAnswer: "To provide services to components"
  },
  {
    id: 5,
    skill: "Angular",
    text: "Angular follows which architectural approach?",
    options: [
      "Model-View-Controller",
      "Component-based architecture",
      "Service-oriented architecture",
      "Event-driven architecture"
    ],
    correctAnswer: "Component-based architecture"
  },
  // AWS (IDs 6-10)
  {
    id: 6,
    skill: "AWS",
    text: "What does AWS stand for?",
    options: [
      "Amazon Web Services",
      "Advanced Web Systems",
      "Applied Web Solutions",
      "Automated Web Services"
    ],
    correctAnswer: "Amazon Web Services"
  },
  {
    id: 7,
    skill: "AWS",
    text: "Which AWS service is primarily used for scalable object storage?",
    options: ["Amazon S3", "Amazon EC2", "Amazon RDS", "Amazon VPC"],
    correctAnswer: "Amazon S3"
  },
  {
    id: 8,
    skill: "AWS",
    text: "Which AWS service allows you to run virtual servers?",
    options: ["Amazon EC2", "AWS Lambda", "Amazon DynamoDB", "Amazon SQS"],
    correctAnswer: "Amazon EC2"
  },
  {
    id: 9,
    skill: "AWS",
    text: "Which AWS service is a fully managed NoSQL database?",
    options: ["Amazon DynamoDB", "Amazon Redshift", "Amazon Aurora", "Amazon RDS"],
    correctAnswer: "Amazon DynamoDB"
  },
  {
    id: 10,
    skill: "AWS",
    text: "What is the main benefit of AWS Lambda?",
    options: [
      "Serverless computing",
      "Managed databases",
      "Content delivery",
      "Networking"
    ],
    correctAnswer: "Serverless computing"
  },
  // C# (IDs 11-15)
  {
    id: 11,
    skill: "C#",
    text: "Which company developed C#?",
    options: ["Microsoft", "Apple", "Google", "IBM"],
    correctAnswer: "Microsoft"
  },
  {
    id: 12,
    skill: "C#",
    text: "Which framework is commonly used for building desktop applications in C#?",
    options: ["Windows Forms", "Angular", "Flask", "Ruby on Rails"],
    correctAnswer: "Windows Forms"
  },
  {
    id: 13,
    skill: "C#",
    text: "Which language feature introduced in C# 7.0 allows pattern matching?",
    options: [
      "Pattern matching",
      "Lambda expressions",
      "Async/Await",
      "LINQ"
    ],
    correctAnswer: "Pattern matching"
  },
  {
    id: 14,
    skill: "C#",
    text: "What is the file extension for C# source code files?",
    options: [".cs", ".java", ".cpp", ".py"],
    correctAnswer: ".cs"
  },
  {
    id: 15,
    skill: "C#",
    text: "Which mechanism is used in C# for memory management?",
    options: [
      "Garbage Collection",
      "Manual memory allocation",
      "Reference counting",
      "Pointer arithmetic"
    ],
    correctAnswer: "Garbage Collection"
  },
  // CSS3 (IDs 16-20)
  {
    id: 16,
    skill: "CSS3",
    text: "Which CSS3 feature is used to create smooth transitions between style changes?",
    options: ["transition", "animation", "transform", "filter"],
    correctAnswer: "transition"
  },
  {
    id: 17,
    skill: "CSS3",
    text: "What is a keyframe in CSS3 animations?",
    options: [
      "A way to define intermediate steps in an animation",
      "A method to select elements",
      "A function to adjust colors",
      "A type of media query"
    ],
    correctAnswer: "A way to define intermediate steps in an animation"
  },
  {
    id: 18,
    skill: "CSS3",
    text: "Which property is used to change the transparency of an element in CSS3?",
    options: ["opacity", "visibility", "display", "filter"],
    correctAnswer: "opacity"
  },
  {
    id: 19,
    skill: "CSS3",
    text: "What does the 'transform' property do in CSS3?",
    options: [
      "Applies a 2D or 3D transformation",
      "Changes the font style",
      "Sets the element's background",
      "Defines the element's layout"
    ],
    correctAnswer: "Applies a 2D or 3D transformation"
  },
  {
    id: 20,
    skill: "CSS3",
    text: "Which CSS3 feature allows for responsive design based on device characteristics?",
    options: ["Media queries", "Flexbox", "Grid", "Animations"],
    correctAnswer: "Media queries"
  },
  // Django (IDs 21-25)
  {
    id: 21,
    skill: "Django",
    text: "Which programming language is Django built with?",
    options: ["Python", "Ruby", "Java", "PHP"],
    correctAnswer: "Python"
  },
  {
    id: 22,
    skill: "Django",
    text: "What is the primary design pattern used by Django?",
    options: [
      "Model-View-Template",
      "Model-View-Controller",
      "MVVM",
      "Flux"
    ],
    correctAnswer: "Model-View-Template"
  },
  {
    id: 23,
    skill: "Django",
    text: "Which command is used to start a new Django project?",
    options: [
      "django-admin startproject",
      "django startproject",
      "python manage.py startproject",
      "django new"
    ],
    correctAnswer: "django-admin startproject"
  },
  {
    id: 24,
    skill: "Django",
    text: "In Django, what is a 'model'?",
    options: [
      "A Python class that represents a database table",
      "A template for rendering HTML",
      "A view function",
      "A configuration file"
    ],
    correctAnswer: "A Python class that represents a database table"
  },
  {
    id: 25,
    skill: "Django",
    text: "What file in a Django project is used to define URL routes?",
    options: ["urls.py", "views.py", "models.py", "settings.py"],
    correctAnswer: "urls.py"
  },
  // Docker (IDs 26-30)
  {
    id: 26,
    skill: "Docker",
    text: "What is Docker primarily used for?",
    options: [
      "Containerization",
      "Virtualization",
      "Compiling code",
      "Managing databases"
    ],
    correctAnswer: "Containerization"
  },
  {
    id: 27,
    skill: "Docker",
    text: "What is a Dockerfile?",
    options: [
      "A file containing instructions to build a Docker image",
      "A file that lists container dependencies",
      "A configuration file for Docker Compose",
      "A script to run Docker commands"
    ],
    correctAnswer: "A file containing instructions to build a Docker image"
  },
  {
    id: 28,
    skill: "Docker",
    text: "Which command is used to list running Docker containers?",
    options: ["docker ps", "docker run", "docker images", "docker list"],
    correctAnswer: "docker ps"
  },
  {
    id: 29,
    skill: "Docker",
    text: "What does the 'docker-compose' tool do?",
    options: [
      "Manages multi-container Docker applications",
      "Compiles Docker images",
      "Scales containers automatically",
      "Monitors container performance"
    ],
    correctAnswer: "Manages multi-container Docker applications"
  },
  {
    id: 30,
    skill: "Docker",
    text: "Which command is used to stop a running Docker container?",
    options: ["docker stop", "docker pause", "docker kill", "docker end"],
    correctAnswer: "docker stop"
  },
  // Flask (IDs 31-35)
  {
    id: 31,
    skill: "Flask",
    text: "Flask is best described as a:",
    options: [
      "Micro web framework",
      "Full-stack web framework",
      "Front-end library",
      "Database engine"
    ],
    correctAnswer: "Micro web framework"
  },
  {
    id: 32,
    skill: "Flask",
    text: "Which programming language is Flask built with?",
    options: ["Python", "Ruby", "JavaScript", "PHP"],
    correctAnswer: "Python"
  },
  {
    id: 33,
    skill: "Flask",
    text: "Which command is typically used to run a Flask application?",
    options: ["flask run", "python app.py", "npm start", "flask start"],
    correctAnswer: "flask run"
  },
  {
    id: 34,
    skill: "Flask",
    text: "What is the purpose of Flask's routing mechanism?",
    options: [
      "Mapping URLs to functions",
      "Connecting to databases",
      "Rendering CSS",
      "Managing state"
    ],
    correctAnswer: "Mapping URLs to functions"
  },
  {
    id: 35,
    skill: "Flask",
    text: "Which file is commonly used as the entry point in a Flask application?",
    options: ["app.py", "index.html", "main.js", "server.rb"],
    correctAnswer: "app.py"
  },
  // GraphQL (IDs 36-40)
  {
    id: 36,
    skill: "GraphQL",
    text: "GraphQL is best described as:",
    options: [
      "An API query language",
      "A type of database",
      "A front-end framework",
      "A CSS library"
    ],
    correctAnswer: "An API query language"
  },
  {
    id: 37,
    skill: "GraphQL",
    text: "Which company originally developed GraphQL?",
    options: ["Facebook", "Google", "Microsoft", "Twitter"],
    correctAnswer: "Facebook"
  },
  {
    id: 38,
    skill: "GraphQL",
    text: "In GraphQL, what is a 'query'?",
    options: [
      "A read operation to fetch data",
      "A mutation to modify data",
      "A subscription to listen for changes",
      "A command to delete data"
    ],
    correctAnswer: "A read operation to fetch data"
  },
  {
    id: 39,
    skill: "GraphQL",
    text: "What is a 'mutation' in GraphQL?",
    options: [
      "An operation to modify server-side data",
      "A query operation",
      "A type of error",
      "A caching mechanism"
    ],
    correctAnswer: "An operation to modify server-side data"
  },
  {
    id: 40,
    skill: "GraphQL",
    text: "What does the 'schema' in GraphQL define?",
    options: [
      "The types and relationships of data",
      "The styling of the API",
      "The routing of requests",
      "The server configuration"
    ],
    correctAnswer: "The types and relationships of data"
  },
  // HTML5 (IDs 41-45)
  {
    id: 41,
    skill: "HTML5",
    text: "Which HTML5 element is used to draw graphics on the fly via scripting?",
    options: ["<canvas>", "<svg>", "<div>", "<section>"],
    correctAnswer: "<canvas>"
  },
  {
    id: 42,
    skill: "HTML5",
    text: "What is the purpose of the <video> element in HTML5?",
    options: [
      "To embed video content",
      "To display images",
      "To create interactive forms",
      "To add animations"
    ],
    correctAnswer: "To embed video content"
  },
  {
    id: 43,
    skill: "HTML5",
    text: "Which element is used to define navigation links in HTML5?",
    options: ["<nav>", "<header>", "<footer>", "<section>"],
    correctAnswer: "<nav>"
  },
  {
    id: 44,
    skill: "HTML5",
    text: "What is a semantic element in HTML5?",
    options: [
      "An element that clearly describes its meaning",
      "An element used only for styling",
      "An element without any content",
      "An element that hides content"
    ],
    correctAnswer: "An element that clearly describes its meaning"
  },
  {
    id: 45,
    skill: "HTML5",
    text: "Which attribute is used to specify alternative text for images in HTML5?",
    options: ["alt", "src", "title", "caption"],
    correctAnswer: "alt"
  },
  // Java (IDs 46-50)
  {
    id: 46,
    skill: "Java",
    text: "Which of the following is a core principle of Java?",
    options: [
      "Object-oriented programming",
      "Functional programming only",
      "Procedural scripting",
      "Assembly language programming"
    ],
    correctAnswer: "Object-oriented programming"
  },
  {
    id: 47,
    skill: "Java",
    text: "Which keyword is used to define a class in Java?",
    options: ["class", "function", "def", "module"],
    correctAnswer: "class"
  },
  {
    id: 48,
    skill: "Java",
    text: "What is the file extension for Java source code files?",
    options: [".java", ".js", ".class", ".py"],
    correctAnswer: ".java"
  },
  {
    id: 49,
    skill: "Java",
    text: "Which Java feature allows for platform independence?",
    options: [
      "The Java Virtual Machine (JVM)",
      "Direct compilation to machine code",
      "Use of pointers",
      "Inline assembly"
    ],
    correctAnswer: "The Java Virtual Machine (JVM)"
  },
  {
    id: 50,
    skill: "Java",
    text: "Which of these is a popular Java build automation tool?",
    options: ["Maven", "Webpack", "Gulp", "Bower"],
    correctAnswer: "Maven"
  },
  // JavaScript (IDs 51-55)
  {
    id: 51,
    skill: "JavaScript",
    text: "What is closure in JavaScript?",
    options: [
      "A function with access to its outer scope",
      "A way to close browser windows",
      "A method to end a loop",
      "A type of data structure"
    ],
    correctAnswer: "A function with access to its outer scope"
  },
  {
    id: 52,
    skill: "JavaScript",
    text: "What does 'hoisting' in JavaScript refer to?",
    options: [
      "Variable and function declarations are moved to the top",
      "Variables are automatically typed",
      "Functions are executed before being defined",
      "Objects are sorted alphabetically"
    ],
    correctAnswer: "Variable and function declarations are moved to the top"
  },
  {
    id: 53,
    skill: "JavaScript",
    text: "Which keyword declares a block-scoped variable in JavaScript?",
    options: ["let", "var", "both let and const", "none of the above"],
    correctAnswer: "both let and const"
  },
  {
    id: 54,
    skill: "JavaScript",
    text: "What is the purpose of the 'use strict' directive in JavaScript?",
    options: [
      "To enable strict mode",
      "To include external libraries",
      "To optimize code performance",
      "To declare global variables"
    ],
    correctAnswer: "To enable strict mode"
  },
  {
    id: 55,
    skill: "JavaScript",
    text: "Which of these is a JavaScript framework?",
    options: ["React", "Laravel", "Django", "Rails"],
    correctAnswer: "React"
  },
  // Kotlin (IDs 56-60)
  {
    id: 56,
    skill: "Kotlin",
    text: "Kotlin is widely used as an alternative to which programming language for Android development?",
    options: ["Java", "Swift", "C++", "Python"],
    correctAnswer: "Java"
  },
  {
    id: 57,
    skill: "Kotlin",
    text: "What feature does Kotlin offer to reduce boilerplate code?",
    options: ["Data classes", "Manual getters and setters", "Explicit type declarations", "Use of semicolons"],
    correctAnswer: "Data classes"
  },
  {
    id: 58,
    skill: "Kotlin",
    text: "Which company developed Kotlin?",
    options: ["JetBrains", "Google", "Microsoft", "Apple"],
    correctAnswer: "JetBrains"
  },
  {
    id: 59,
    skill: "Kotlin",
    text: "In Kotlin, what keyword is used to declare a variable that can be reassigned?",
    options: ["var", "val", "let", "const"],
    correctAnswer: "var"
  },
  {
    id: 60,
    skill: "Kotlin",
    text: "Which of the following is used for null safety in Kotlin?",
    options: ["Elvis operator", "NullPointerException", "Undefined operator", "Optional chaining"],
    correctAnswer: "Elvis operator"
  },
  // MongoDB (IDs 61-65)
  {
    id: 61,
    skill: "MongoDB",
    text: "What type of database is MongoDB?",
    options: ["NoSQL", "SQL", "Graph database", "Relational database"],
    correctAnswer: "NoSQL"
  },
  {
    id: 62,
    skill: "MongoDB",
    text: "Which language is used to query MongoDB?",
    options: [
      "MongoDB Query Language (MQL)",
      "SQL",
      "NoSQL",
      "JavaScript"
    ],
    correctAnswer: "MongoDB Query Language (MQL)"
  },
  {
    id: 63,
    skill: "MongoDB",
    text: "What is a collection in MongoDB?",
    options: [
      "A grouping of MongoDB documents",
      "A table in SQL",
      "A database index",
      "A query operation"
    ],
    correctAnswer: "A grouping of MongoDB documents"
  },
  {
    id: 64,
    skill: "MongoDB",
    text: "Which of the following is a default port for MongoDB?",
    options: ["27017", "3306", "5432", "1521"],
    correctAnswer: "27017"
  },
  {
    id: 65,
    skill: "MongoDB",
    text: "Which command is used to insert a document in MongoDB?",
    options: ["insertOne()", "INSERT", "addDocument()", "create()"],
    correctAnswer: "insertOne()"
  },
  // Node.js (IDs 66-70)
  {
    id: 66,
    skill: "Node.js",
    text: "What is the event loop in Node.js?",
    options: [
      "A mechanism that allows Node.js to perform non-blocking I/O operations",
      "A type of data structure",
      "A method to create loops in JavaScript",
      "A way to handle errors in Node.js"
    ],
    correctAnswer: "A mechanism that allows Node.js to perform non-blocking I/O operations"
  },
  {
    id: 67,
    skill: "Node.js",
    text: "What is the purpose of the package.json file in a Node.js project?",
    options: [
      "To manage project dependencies and scripts",
      "To store application data",
      "To configure the server",
      "To define database schemas"
    ],
    correctAnswer: "To manage project dependencies and scripts"
  },
  {
    id: 68,
    skill: "Node.js",
    text: "Which of the following is a built-in module in Node.js?",
    options: ["http", "express", "react", "lodash"],
    correctAnswer: "http"
  },
  {
    id: 69,
    skill: "Node.js",
    text: "What command is used to install a package in Node.js?",
    options: ["npm install", "node install", "npm get", "node add"],
    correctAnswer: "npm install"
  },
  {
    id: 70,
    skill: "Node.js",
    text: "Which method is used to create an HTTP server in Node.js?",
    options: [
      "http.createServer()",
      "server.listen()",
      "http.server()",
      "net.createServer()"
    ],
    correctAnswer: "http.createServer()"
  },
  // PHP (IDs 71-75)
  {
    id: 71,
    skill: "PHP",
    text: "PHP is primarily used for which of the following?",
    options: [
      "Server-side scripting",
      "Front-end styling",
      "Mobile app development",
      "Operating system development"
    ],
    correctAnswer: "Server-side scripting"
  },
  {
    id: 72,
    skill: "PHP",
    text: "What does PHP stand for?",
    options: [
      "PHP: Hypertext Preprocessor",
      "Personal Home Page",
      "Preprocessor Hypertext",
      "Programming Home Page"
    ],
    correctAnswer: "PHP: Hypertext Preprocessor"
  },
  {
    id: 73,
    skill: "PHP",
    text: "Which symbol is used to denote variables in PHP?",
    options: ["$", "@", "#", "%"],
    correctAnswer: "$"
  },
  {
    id: 74,
    skill: "PHP",
    text: "Which function is used to output text in PHP?",
    options: ["echo", "print", "console.log", "printf"],
    correctAnswer: "echo"
  },
  {
    id: 75,
    skill: "PHP",
    text: "Which of the following is a popular PHP framework?",
    options: ["Laravel", "Django", "Ruby on Rails", "Spring"],
    correctAnswer: "Laravel"
  },
  // Python (IDs 76-80)
  {
    id: 76,
    skill: "Python",
    text: "What is a list comprehension in Python?",
    options: [
      "A concise way to create lists",
      "A method to sort lists",
      "A way to delete list items",
      "A type of loop in Python"
    ],
    correctAnswer: "A concise way to create lists"
  },
  {
    id: 77,
    skill: "Python",
    text: "What is the difference between a tuple and a list in Python?",
    options: [
      "Tuples are immutable, lists are mutable",
      "Tuples are faster than lists",
      "Lists use more memory than tuples",
      "There is no difference"
    ],
    correctAnswer: "Tuples are immutable, lists are mutable"
  },
  {
    id: 78,
    skill: "Python",
    text: "Which keyword is used to define a function in Python?",
    options: ["def", "function", "func", "lambda"],
    correctAnswer: "def"
  },
  {
    id: 79,
    skill: "Python",
    text: "What does the 'self' keyword represent in Python classes?",
    options: [
      "The instance of the class",
      "A global variable",
      "A static method",
      "A constructor"
    ],
    correctAnswer: "The instance of the class"
  },
  {
    id: 80,
    skill: "Python",
    text: "Which of the following is a built-in Python web framework?",
    options: ["Django", "React", "Laravel", "Spring"],
    correctAnswer: "Django"
  },
  // React (IDs 81-85)
  {
    id: 81,
    skill: "React",
    text: "What is JSX?",
    options: [
      "A syntax extension for JavaScript",
      "A new programming language",
      "A database for React",
      "A testing framework for React"
    ],
    correctAnswer: "A syntax extension for JavaScript"
  },
  {
    id: 82,
    skill: "React",
    text: "What is the purpose of the useEffect hook in React?",
    options: [
      "To perform side effects in function components",
      "To create new components",
      "To optimize rendering performance",
      "To handle user input"
    ],
    correctAnswer: "To perform side effects in function components"
  },
  {
    id: 83,
    skill: "React",
    text: "Which company developed React?",
    options: ["Facebook", "Google", "Twitter", "Microsoft"],
    correctAnswer: "Facebook"
  },
  {
    id: 84,
    skill: "React",
    text: "What does the useState hook do in React?",
    options: [
      "Manages state in functional components",
      "Fetches data from APIs",
      "Handles component routing",
      "Styles components"
    ],
    correctAnswer: "Manages state in functional components"
  },
  {
    id: 85,
    skill: "React",
    text: "Which of the following is a benefit of using React?",
    options: [
      "Component reusability",
      "Tight coupling of code",
      "Direct DOM manipulation",
      "Lack of scalability"
    ],
    correctAnswer: "Component reusability"
  },
  // Ruby on Rails (IDs 86-90)
  {
    id: 86,
    skill: "Ruby on Rails",
    text: "Ruby on Rails is primarily used with which programming language?",
    options: ["Ruby", "Python", "JavaScript", "PHP"],
    correctAnswer: "Ruby"
  },
  {
    id: 87,
    skill: "Ruby on Rails",
    text: "What is a key principle of Ruby on Rails?",
    options: [
      "Convention over configuration",
      "Configuration over convention",
      "Explicit coding",
      "Monolithic architecture"
    ],
    correctAnswer: "Convention over configuration"
  },
  {
    id: 88,
    skill: "Ruby on Rails",
    text: "Which command is used to create a new Rails application?",
    options: ["rails new", "ruby new", "rails create", "new rails"],
    correctAnswer: "rails new"
  },
  {
    id: 89,
    skill: "Ruby on Rails",
    text: "What is the file extension for Ruby files?",
    options: [".rb", ".ruby", ".rbs", ".ru"],
    correctAnswer: ".rb"
  },
  {
    id: 90,
    skill: "Ruby on Rails",
    text: "Which pattern does Ruby on Rails follow?",
    options: [
      "Model-View-Controller",
      "Model-View-ViewModel",
      "Flux",
      "Singleton"
    ],
    correctAnswer: "Model-View-Controller"
  },
  // SQL (IDs 91-95)
  {
    id: 91,
    skill: "SQL",
    text: "What is a primary key in SQL?",
    options: [
      "A column or set of columns that uniquely identifies each row in a table",
      "The first column in a table",
      "A key used to encrypt data",
      "A special type of index"
    ],
    correctAnswer:
      "A column or set of columns that uniquely identifies each row in a table"
  },
  {
    id: 92,
    skill: "SQL",
    text: "What is the difference between INNER JOIN and LEFT JOIN in SQL?",
    options: [
      "INNER JOIN returns matching rows; LEFT JOIN returns all rows from the left table and matching rows from the right",
      "There is no difference",
      "INNER JOIN is faster than LEFT JOIN",
      "LEFT JOIN can only be used with two tables"
    ],
    correctAnswer:
      "INNER JOIN returns matching rows; LEFT JOIN returns all rows from the left table and matching rows from the right"
  },
  {
    id: 93,
    skill: "SQL",
    text: "Which SQL statement is used to extract data from a database?",
    options: ["SELECT", "GET", "EXTRACT", "OPEN"],
    correctAnswer: "SELECT"
  },
  {
    id: 94,
    skill: "SQL",
    text: "What does the SQL command 'UPDATE' do?",
    options: [
      "Modifies existing records",
      "Deletes records",
      "Inserts new records",
      "Creates new tables"
    ],
    correctAnswer: "Modifies existing records"
  },
  {
    id: 95,
    skill: "SQL",
    text: "Which clause is used to filter results in a SQL query?",
    options: ["WHERE", "FILTER", "HAVING", "ORDER BY"],
    correctAnswer: "WHERE"
  },
  // TypeScript (IDs 96-100)
  {
    id: 96,
    skill: "TypeScript",
    text: "What is a key advantage of using TypeScript over JavaScript?",
    options: [
      "Static type checking",
      "Slower performance",
      "Fewer libraries available",
      "No support for classes"
    ],
    correctAnswer: "Static type checking"
  },
  {
    id: 97,
    skill: "TypeScript",
    text: "Which file extension is used for TypeScript files?",
    options: [".ts", ".js", ".tsx", ".jsx"],
    correctAnswer: ".ts"
  },
  {
    id: 98,
    skill: "TypeScript",
    text: "TypeScript is a superset of which language?",
    options: ["JavaScript", "Python", "Java", "C#"],
    correctAnswer: "JavaScript"
  },
  {
    id: 99,
    skill: "TypeScript",
    text: "What is the purpose of interfaces in TypeScript?",
    options: [
      "To define contracts for object shapes",
      "To execute code",
      "To style components",
      "To manage state"
    ],
    correctAnswer: "To define contracts for object shapes"
  },
  {
    id: 100,
    skill: "TypeScript",
    text: "Which command is used to compile TypeScript code?",
    options: ["tsc", "tscompile", "typescript", "compile"],
    correctAnswer: "tsc"
  }
];

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

export default function QuizApp() {
  const router = useRouter();
  const { id } = useParams(); // Get the dynamic id from the URL

  const [userDetails, setUserDetails] = useState({
    _id: '',
    username: '',
    email: '',
  });
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(false);

  // Separate state for the editable fields.
  const [updatedDetails, setUpdatedDetails] = useState({
    username: '',
    email: '',
  });

  const getUserDetails = async () => {
    try {
      setLoading(true);
      const res = await axios.get('/api/users/me');
      // Update state with the returned user details
      setUserDetails({
        _id: res.data.user._id,
        username: res.data.user.username,
        email: res.data.user.email,
      });
      // Initialize editable fields with current details
      setUpdatedDetails({
        username: res.data.user.username,
        email: res.data.user.email,
      });
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Call getUserDetails on component mount.
  useEffect(() => {
    getUserDetails();
  }, []);


  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<{ [key: number]: string }>({});
  const [quizState, setQuizState] = useState<"selection" | "quiz" | "results">("selection");
  const [shuffledQuestions, setShuffledQuestions] = useState<typeof questions>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);

  useEffect(() => {
    if (quizState === "quiz") {
      const shuffled = shuffleArray(questions);
      const filteredAndShuffled = shuffled
        .filter((q) => selectedSkills.includes(q.skill))
        .map((q) => ({ ...q, options: shuffleArray(q.options) }));
      setShuffledQuestions(filteredAndShuffled);
    }
  }, [quizState, selectedSkills]);

  // New useEffect to save test scores when quizState becomes "results"
  useEffect(() => {
    if (quizState === "results") {
      const scores = calculateScores();
      const totalCorrect = Object.values(scores).reduce((sum, score) => sum + score.correct, 0);
      const totalQuestions = Object.values(scores).reduce((sum, score) => sum + score.total, 0);
      const scoreData = {
        userId: userDetails._id, // Ensure user is logged in; adjust if handling guests
        score: totalCorrect,
        totalQuestions: totalQuestions,
        skills: selectedSkills,
      };
      axios.post('/api/basic-test', scoreData)
        .then((response) => {
          console.log("Test score saved", response.data);
        })
        .catch((error) => {
          console.error("Error saving test score", error);
        });
    }
  }, [quizState, selectedSkills, userDetails]);

  const handleSkillToggle = (skill: string) => {
    setSelectedSkills((prev) =>
      prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]
    );
  };

  const startQuiz = () => {
    if (selectedSkills.length > 0) {
      setQuizState("quiz");
    }
  };

  const handleAnswerSelection = (answer: string) => {
    setSelectedAnswer(answer);
  };

  const handleSubmitAnswer = () => {
    if (selectedAnswer !== null && currentQuestionIndex < shuffledQuestions.length) {
      setUserAnswers((prev) => ({
        ...prev,
        [shuffledQuestions[currentQuestionIndex].id]: selectedAnswer,
      }));

      if (currentQuestionIndex < shuffledQuestions.length - 1) {
        setCurrentQuestionIndex((prev) => prev + 1);
        setSelectedAnswer(null);
      } else {
        setQuizState("results");
      }
    }
  };

  const calculateScores = () => {
    const scores: { [key: string]: { correct: number; total: number } } = {};

    shuffledQuestions.forEach((question) => {
      if (!scores[question.skill]) {
        scores[question.skill] = { correct: 0, total: 0 };
      }
      scores[question.skill].total++;
      if (userAnswers[question.id] === question.correctAnswer) {
        scores[question.skill].correct++;
      }
    });

    return scores;
  };

  const restartQuiz = () => {
    setSelectedSkills([]);
    setCurrentQuestionIndex(0);
    setUserAnswers({});
    setQuizState("selection");
    setShuffledQuestions([]);
    setSelectedAnswer(null);
  };

  const primaryColor = "rgb(96,166,236)"; // #60A6EC
  const primaryBgClass = "bg-[rgb(96,166,236)]";

  if (quizState === "selection") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
        <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-3xl">
          <h1 className="text-4xl font-bold text-center mb-6" style={{ color: primaryColor }}>
            Hello there {userDetails.username}!
          </h1>
          <h2 className="text-2xl font-semibold text-center mb-6">
            Welcome to the Basic Skills Test. <br/>
            Select the skills you want to be tested on.
          </h2>
          <h1 className="text-4xl font-bold text-center mb-6" style={{ color: primaryColor }}>
            Select Your Skills
          </h1>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            {skills.map((skill) => (
              <button
                key={skill}
                onClick={() => handleSkillToggle(skill)}
                className={`p-3 rounded-lg border transition-colors ${
                  selectedSkills.includes(skill)
                    ? `${primaryBgClass} text-white border-transparent`
                    : "bg-gray-100 text-gray-800 border-gray-300 hover:bg-gray-200"
                }`}
              >
                {skill}
              </button>
            ))}
          </div>
          <button
            onClick={startQuiz}
            disabled={selectedSkills.length === 0}
            className="w-full bg-[rgb(96,166,236)] text-white py-3 rounded-lg hover:bg-blue-600 transition-colors disabled:bg-gray-300"
          >
            Start Quiz
          </button>
        </div>
      </div>
    );
  }

  if (quizState === "quiz" && shuffledQuestions.length > 0) {
    const currentQuestion = shuffledQuestions[currentQuestionIndex];
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
        <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-xl">
          <h1 className="text-3xl font-bold mb-4" style={{ color: primaryColor }}>
            Question {currentQuestionIndex + 1}
          </h1>
          <p className="text-xl mb-6">{currentQuestion.text}</p>
          <div className="space-y-4 mb-6">
            {currentQuestion.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelection(option)}
                className={`w-full py-2 px-4 border rounded-lg transition-colors text-left focus:outline-none focus:ring-2 focus:ring-[rgb(96,166,236)] ${
                  selectedAnswer === option
                    ? `${primaryBgClass} text-white border-transparent`
                    : "bg-white text-gray-800 border-gray-300 hover:bg-gray-50"
                }`}
              >
                {option}
              </button>
            ))}
          </div>
          <button
            onClick={handleSubmitAnswer}
            disabled={selectedAnswer === null}
            className="w-full bg-[rgb(96,166,236)] text-white py-3 rounded-lg hover:bg-blue-600 transition-colors disabled:bg-gray-300"
          >
            Submit Answer
          </button>
        </div>
      </div>
    );
  }

  if (quizState === "results") {
    const scores = calculateScores();
    const totalCorrect = Object.values(scores).reduce((sum, score) => sum + score.correct, 0);
    const totalQuestions = Object.values(scores).reduce((sum, score) => sum + score.total, 0);
    const overallPercentage = Math.round((totalCorrect / totalQuestions) * 100);

    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
        <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-xl">
          <h1 className="text-3xl font-bold mb-6 text-center" style={{ color: primaryColor }}>
            Quiz Results
          </h1>
          <p className="text-2xl mb-4 text-center">
            Overall Score: {totalCorrect} out of {totalQuestions} ({overallPercentage}%)
          </p>
          <div className="space-y-4">
            {Object.entries(scores).map(([skill, score]) => {
              const percentage = Math.round((score.correct / score.total) * 100);
              return (
                <div key={skill}>
                  <p className="font-semibold text-gray-700">
                    {skill}: {score.correct}/{score.total} ({percentage}%)
                  </p>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className={`h-3 rounded-full ${primaryBgClass}`}
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
          <button
            onClick={restartQuiz}
            className="mt-6 w-full bg-[rgb(96,166,236)] text-white py-3 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Take Another Quiz
          </button>
        </div>
      </div>
    );
  }

  return <div>Loading...</div>;
}
