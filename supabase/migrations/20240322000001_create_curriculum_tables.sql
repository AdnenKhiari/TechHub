CREATE TABLE IF NOT EXISTS curriculums (
  id BIGSERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  duration TEXT NOT NULL,
  price TEXT NOT NULL,
  level TEXT NOT NULL,
  start_date TEXT NOT NULL,
  video_url TEXT,
  outcomes TEXT[] NOT NULL,
  prerequisites TEXT[] NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS courses (
  id BIGSERIAL PRIMARY KEY,
  curriculum_id BIGINT NOT NULL REFERENCES curriculums(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  subject TEXT NOT NULL,
  description TEXT NOT NULL,
  hours INTEGER NOT NULL,
  details TEXT[],
  order_index INTEGER NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_courses_curriculum_id ON courses(curriculum_id);

INSERT INTO curriculums (title, description, duration, price, level, start_date, video_url, outcomes, prerequisites) VALUES
(
  'React Native Mobile Development',
  'Master cross-platform mobile app development with React Native. Build production-ready iOS and Android applications.',
  '16 weeks',
  '$2,499',
  'Intermediate',
  'March 15, 2024',
  'https://www.youtube.com/embed/dQw4w9WgXcQ',
  ARRAY[
    'Build and deploy production-ready mobile apps',
    'Master React Native core concepts and APIs',
    'Implement complex navigation patterns',
    'Integrate native device features',
    'Optimize app performance',
    'Publish apps to App Store and Google Play'
  ],
  ARRAY[
    'JavaScript fundamentals',
    'Basic React knowledge',
    'Understanding of mobile app concepts',
    'Git version control'
  ]
),
(
  'Full Stack Web Development',
  'Comprehensive full-stack development bootcamp covering frontend, backend, and deployment.',
  '24 weeks',
  '$3,499',
  'Beginner to Advanced',
  'April 1, 2024',
  'https://www.youtube.com/embed/dQw4w9WgXcQ',
  ARRAY[
    'Build full-stack web applications from scratch',
    'Master modern frontend frameworks',
    'Create RESTful APIs with Node.js',
    'Design and implement databases',
    'Deploy applications to cloud platforms',
    'Implement authentication and security'
  ],
  ARRAY[
    'Basic computer skills',
    'Willingness to learn',
    'No prior coding experience required'
  ]
),
(
  'Data Science & Machine Learning',
  'Learn data analysis, visualization, and machine learning with Python.',
  '20 weeks',
  '$2,999',
  'Intermediate',
  'March 22, 2024',
  'https://www.youtube.com/embed/dQw4w9WgXcQ',
  ARRAY[
    'Analyze and visualize complex datasets',
    'Build machine learning models',
    'Work with popular ML frameworks',
    'Deploy ML models to production',
    'Understand deep learning fundamentals',
    'Complete real-world data science projects'
  ],
  ARRAY[
    'Basic programming knowledge',
    'High school mathematics',
    'Statistical thinking',
    'Problem-solving skills'
  ]
);

INSERT INTO courses (curriculum_id, title, subject, description, hours, details, order_index) VALUES
(1, 'React Native Fundamentals', 'Mobile Development', 'Core concepts of React Native development', 40, ARRAY[
  'Setting up React Native development environment',
  'Understanding React Native components and JSX',
  'Working with Views, Text, and Image components',
  'Styling with StyleSheet and Flexbox',
  'Handling user input with TextInput and TouchableOpacity',
  'Managing component state with useState and useEffect hooks',
  'Props and component composition patterns',
  'Debugging React Native applications',
  'Platform-specific code for iOS and Android'
], 1),
(1, 'Navigation & Routing', 'Mobile Development', 'Implementing navigation in React Native apps', 30, ARRAY[
  'React Navigation setup and configuration',
  'Stack Navigator for screen transitions',
  'Tab Navigator for bottom navigation',
  'Drawer Navigator for side menus',
  'Passing parameters between screens',
  'Deep linking and URL handling',
  'Navigation lifecycle and events',
  'Custom navigation headers and animations'
], 2),
(1, 'State Management', 'Mobile Development', 'Managing application state effectively', 35, ARRAY[
  'Context API for global state',
  'Redux fundamentals and setup',
  'Redux Toolkit for simplified Redux',
  'Async actions with Redux Thunk',
  'Zustand for lightweight state management',
  'Recoil for atomic state management',
  'State persistence and hydration',
  'Performance optimization with selectors'
], 3),
(1, 'Native Features', 'Mobile Development', 'Accessing device capabilities', 40, ARRAY[
  'Camera and photo library access',
  'Geolocation and maps integration',
  'Push notifications setup',
  'Biometric authentication',
  'File system operations',
  'Device sensors (accelerometer, gyroscope)',
  'Background tasks and services',
  'Native module integration'
], 4),
(1, 'API Integration', 'Mobile Development', 'Connecting to backend services', 30, ARRAY[
  'Fetch API and Axios for HTTP requests',
  'RESTful API consumption',
  'GraphQL with Apollo Client',
  'WebSocket for real-time communication',
  'Authentication token management',
  'Error handling and retry logic',
  'Caching strategies',
  'Offline-first architecture'
], 5),
(1, 'Testing & Deployment', 'Mobile Development', 'Testing and publishing your apps', 35, ARRAY[
  'Unit testing with Jest',
  'Component testing with React Native Testing Library',
  'E2E testing with Detox',
  'iOS deployment with TestFlight',
  'Android deployment with Google Play',
  'Code signing and certificates',
  'CI/CD pipeline setup',
  'App performance monitoring'
], 6),
(2, 'HTML, CSS & Responsive Design', 'Frontend', 'Foundation of web development', 45, ARRAY[
  'HTML5 semantic elements and document structure',
  'CSS selectors, specificity, and the cascade',
  'Box model, positioning, and layout techniques',
  'Flexbox for flexible layouts',
  'CSS Grid for complex layouts',
  'Responsive design principles and mobile-first approach',
  'Media queries and breakpoints',
  'CSS animations and transitions',
  'Modern CSS features (custom properties, calc, etc.)'
], 1),
(2, 'JavaScript & TypeScript Fundamentals', 'Programming', 'Modern JavaScript and TypeScript', 60, ARRAY[
  'ES6+ syntax: let, const, arrow functions',
  'Destructuring, spread, and rest operators',
  'Promises, async/await, and asynchronous programming',
  'Array methods: map, filter, reduce, forEach',
  'Object-oriented programming in JavaScript',
  'TypeScript basics: types, interfaces, and generics',
  'Type inference and type annotations',
  'Working with modules and imports',
  'Error handling and debugging techniques'
], 2),
(2, 'React & Modern Frontend', 'Frontend', 'Building interactive UIs with React', 70, ARRAY[
  'React fundamentals: components, props, and state',
  'React Hooks: useState, useEffect, useContext, useReducer',
  'Component lifecycle and side effects',
  'Context API for state management',
  'React Router for navigation',
  'Form handling and validation',
  'Performance optimization with useMemo and useCallback',
  'Custom hooks and reusable logic',
  'Testing React components with Jest and React Testing Library'
], 3),
(2, 'Node.js & Express Backend', 'Backend', 'Server-side development with Node.js', 65, ARRAY[
  'Node.js runtime and event loop',
  'Creating HTTP servers with Express',
  'Routing and middleware patterns',
  'RESTful API design principles',
  'Request/response handling and validation',
  'Error handling and logging',
  'Authentication with JWT and sessions',
  'File uploads and static file serving',
  'Environment variables and configuration'
], 4),
(2, 'PostgreSQL & Database Design', 'Database', 'Relational database management', 50, ARRAY[
  'Relational database concepts and SQL basics',
  'Creating tables, indexes, and constraints',
  'CRUD operations: SELECT, INSERT, UPDATE, DELETE',
  'Joins: INNER, LEFT, RIGHT, FULL OUTER',
  'Aggregations and GROUP BY queries',
  'Database normalization and schema design',
  'Transactions and ACID properties',
  'Working with ORMs (Sequelize, TypeORM)',
  'Database migrations and seeding'
], 5),
(2, 'AWS Deployment & DevOps', 'DevOps', 'Deploying and maintaining applications', 40, ARRAY[
  'AWS fundamentals: EC2, S3, RDS',
  'Deploying applications to AWS Elastic Beanstalk',
  'Setting up CI/CD pipelines with GitHub Actions',
  'Docker containerization basics',
  'Environment management and secrets',
  'Load balancing and auto-scaling',
  'Monitoring and logging with CloudWatch',
  'Domain setup and SSL certificates',
  'Cost optimization strategies'
], 6),
(3, 'Python Programming', 'Programming', 'Python fundamentals for data science', 40, ARRAY[
  'Python syntax and data types',
  'Control flow: if statements, loops',
  'Functions and lambda expressions',
  'Object-oriented programming in Python',
  'List comprehensions and generators',
  'File I/O and exception handling',
  'Working with modules and packages',
  'Virtual environments and pip',
  'Python best practices and PEP 8'
], 1),
(3, 'NumPy & Pandas', 'Data Analysis', 'Data manipulation and analysis', 45, ARRAY[
  'NumPy arrays and vectorization',
  'Array operations and broadcasting',
  'Linear algebra with NumPy',
  'Pandas DataFrames and Series',
  'Data loading from CSV, Excel, SQL',
  'Data cleaning and preprocessing',
  'Grouping, aggregation, and pivot tables',
  'Time series analysis',
  'Merging and joining datasets'
], 2),
(3, 'Data Visualization', 'Visualization', 'Creating compelling data visualizations', 35, ARRAY[
  'Matplotlib fundamentals and plotting',
  'Seaborn for statistical visualizations',
  'Plotly for interactive charts',
  'Creating subplots and layouts',
  'Customizing colors, labels, and legends',
  'Heatmaps and correlation matrices',
  'Geographic data visualization',
  'Dashboard creation with Streamlit',
  'Best practices for data storytelling'
], 3),
(3, 'Machine Learning Basics', 'Machine Learning', 'Introduction to ML algorithms', 50, ARRAY[
  'Supervised vs unsupervised learning',
  'Train-test split and cross-validation',
  'Linear and logistic regression',
  'Decision trees and random forests',
  'K-means clustering',
  'Feature engineering and selection',
  'Model evaluation metrics',
  'Hyperparameter tuning',
  'Scikit-learn library essentials'
], 4),
(3, 'Deep Learning', 'Machine Learning', 'Neural networks and deep learning', 55, ARRAY[
  'Neural network fundamentals',
  'TensorFlow and Keras basics',
  'Building and training models',
  'Convolutional Neural Networks (CNNs)',
  'Recurrent Neural Networks (RNNs)',
  'Transfer learning and pre-trained models',
  'Model optimization and regularization',
  'GPU acceleration',
  'Deploying ML models'
], 5),
(3, 'Real-world Projects', 'Projects', 'Hands-on data science projects', 60, ARRAY[
  'Exploratory data analysis project',
  'Predictive modeling for business',
  'Image classification with CNNs',
  'Natural language processing tasks',
  'Time series forecasting',
  'Recommendation system',
  'A/B testing analysis',
  'Building a data pipeline',
  'Portfolio project presentation'
], 6);

ALTER PUBLICATION supabase_realtime ADD TABLE curriculums;
ALTER PUBLICATION supabase_realtime ADD TABLE courses;
