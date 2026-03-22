export const experience = [
  {
    role: 'Senior Associate — AI Software Developer',
    company: 'State Street Corporation',
    location: 'Hyderabad, India',
    period: 'Mar 2024 – Present',
    bullets: [
      'Architected Alpha Copilot — enterprise LLM-powered Text-to-SQL chatbot serving 100+ internal users over structured financial data',
      'Engineered FastAPI + SQLAlchemy backend with advanced caching, cutting response time by 75% (25–30s → 6–8s)',
      'Integrated LLM-based data visualization for auto-generating interactive charts from query results',
      'Led backend for WealthAI — real-time portfolio narrative generation from optimizer outputs',
      'Fine-tuned GPT-4o mini, GPT-4.1 mini (Azure OpenAI) and Llama 3.1-8B (Databricks) using PEFT/LoRA',
      'Researched schema-linking and few-shot prompting strategies, improving SQL accuracy by 25%',
      'Building Agent Forge — no-code AI agent builder with real-time trace monitoring and evaluation dashboards',
      'Achieved 95%+ unit test coverage across production systems',
    ],
    tags: ['FastAPI', 'LangChain', 'Azure OpenAI', 'LoRA/PEFT', 'Text-to-SQL', 'Databricks', 'Google ADK'],
  },
  {
    role: 'Associate 2 — AI Software Developer',
    company: 'State Street Corporation',
    location: 'Hyderabad, India',
    period: 'Jul 2023 – Feb 2024',
    bullets: [
      'Built production-ready RAG system for extracting insights from fund prospectuses using OpenAI + vector embeddings',
      'Designed intelligent chunking, semantic embedding, and vector DB pipeline for sub-second retrieval',
      'Collaborated with business analysts and compliance officers to meet regulatory requirements',
    ],
    tags: ['RAG', 'OpenAI', 'pgvector', 'Semantic Search'],
  },
  {
    role: 'Software Development Intern',
    company: 'State Street Corporation',
    location: 'Hyderabad, India',
    period: 'Jan 2023 – Jun 2023',
    bullets: [
      'Migrated legacy ideation platform from .NET Core to FastAPI + ReactJS, improving performance by 40%',
      'Designed RESTful APIs with SQLite backend and comprehensive test coverage',
    ],
    tags: ['FastAPI', 'ReactJS', 'SQLite', '.NET Core'],
  },
  {
    role: 'Machine Learning Developer Intern',
    company: 'Technocolabs Software Inc.',
    location: 'Remote',
    period: 'Jun 2022 – Jul 2022',
    bullets: [
      'Built CNN-based Spotify Skip Action Predictor achieving 87% accuracy in real-time prediction',
      'End-to-end ML pipeline: data preprocessing, feature engineering, model training, and API deployment',
    ],
    tags: ['CNN', 'Python', 'Deep Learning', 'API Deployment'],
  },
]

export const projects = [
  { icon: '🤖', title: 'Alpha Copilot', desc: 'Enterprise LLM-powered Text-to-SQL chatbot enabling natural language queries over structured financial data. Serves 100+ internal users at State Street.', tags: ['Text-to-SQL', 'FastAPI', 'Azure OpenAI', 'SQLAlchemy'], badge: 'Production', link: null },
  { icon: '🔧', title: 'Agent Forge', desc: 'No-code AI agent builder platform for designing, registering, and deploying custom agents with real-time trace monitoring and evaluation dashboards.', tags: ['AI Agents', 'Google ADK', 'LangChain', 'Observability'], badge: 'In Progress', link: null },
  { icon: '💼', title: 'WealthAI', desc: 'Real-time portfolio narrative generation system that processes optimizer outputs and delivers personalized investment insights at scale.', tags: ['LLM', 'FastAPI', 'Real-time', 'Finance'], badge: 'Production', link: null },
  { icon: '📄', title: 'Fund Prospectus RAG', desc: 'Production RAG system for extracting actionable insights from fund prospectuses using OpenAI models, vector embeddings, and intelligent chunking.', tags: ['RAG', 'OpenAI', 'pgvector', 'Embeddings'], badge: 'Production', link: null },
  { icon: '🛡️', title: 'Intrusion Detection System', desc: 'ML-based network intrusion detection on KDD Cup 1999 dataset (4.9M records), achieving 94% accuracy across DoS, Probe, R2L, and U2R attacks.', tags: ['Random Forest', 'XGBoost', 'Python'], badge: null, link: 'https://github.com/himanshu-nakrani/Intrusion-Detection-System' },
  { icon: '₿', title: 'Cryptocurrency Price Prediction', desc: 'Automated daily-updated crypto forecasting using LSTM networks with technical indicators. Achieved 18% RMSE reduction via walk-forward validation.', tags: ['LSTM', 'Time Series', 'Deep Learning'], badge: null, link: 'https://github.com/himanshu-nakrani/Cryptocurrency-Price-Prediction' },
  { icon: '🥇', title: 'Gold Price Prediction', desc: 'ML-based gold price forecasting using historical market data, feature engineering, and regression models.', tags: ['Python', 'Regression', 'Jupyter'], badge: null, link: 'https://github.com/himanshu-nakrani/Gold-price-prediction' },
  { icon: '📚', title: 'Document QA', desc: 'Document question-answering system using LLMs and retrieval techniques to extract precise answers from uploaded documents.', tags: ['Python', 'LLM', 'RAG'], badge: null, link: 'https://github.com/himanshu-nakrani/document-qa' },
]

export const kagglePinned = [
  { type: 'notebook', medal: '🥈', title: 'Bitcoin Price Prediction (Updated Daily)', desc: 'LSTM-based daily-updated crypto forecasting with technical indicators. Auto-refreshes with latest market data.', votes: 154, link: 'https://www.kaggle.com/code/himanshunakrani/bitcoin-price-prediction-updated-daily' },
  { type: 'dataset', medal: '🥈', title: 'Iris Dataset', desc: 'Widely-used classification dataset. One of the most popular datasets on Kaggle with hundreds of downstream notebooks.', votes: 383, link: 'https://www.kaggle.com/datasets/himanshunakrani/iris-dataset' },
  { type: 'dataset', medal: '🥈', title: 'Student Study Hours Dataset', desc: 'Popular regression dataset for predicting student scores based on study hours. Widely used for ML tutorials.', votes: 261, link: 'https://www.kaggle.com/datasets/himanshunakrani/student-study-hours' },
  { type: 'notebook', medal: '🥉', title: 'Gold Price Prediction Project', desc: 'End-to-end ML project predicting gold prices using historical market data and feature engineering techniques.', votes: 59, link: 'https://www.kaggle.com/code/himanshunakrani/gold-price-prediction-project' },
  { type: 'notebook', medal: null, title: 'RAG with LangChain', desc: 'Practical implementation of Retrieval-Augmented Generation using LangChain — bridging ML fundamentals with modern LLM work.', votes: 10, link: 'https://www.kaggle.com/code/himanshunakrani/rag-retrieval-augmented-generation-with-langchain' },
  { type: 'notebook', medal: null, title: 'CrewAI Multi-Agent Blog Generator', desc: 'Multi-agent system using CrewAI framework to autonomously generate blog content — showcasing AI agent orchestration.', votes: 2, link: 'https://www.kaggle.com/code/himanshunakrani/crewai-multi-ai-agent-blog-generator' },
]

export const skills = [
  { label: 'AI / ML', items: ['LLMs', 'RAG', 'Fine-tuning', 'LoRA/PEFT', 'Prompt Engineering', 'LangChain', 'Google ADK', 'AI Agents', 'OpenAI API'] },
  { label: 'Backend', items: ['FastAPI', 'ASP.NET Core', 'REST APIs', 'SQLAlchemy', 'Microservices'] },
  { label: 'Languages', items: ['Python', 'Java', 'SQL', 'C/C++', 'C#', 'TypeScript', 'Shell/Perl'] },
  { label: 'Cloud & DevOps', items: ['Azure', 'AWS', 'OCI', 'Databricks', 'Azure OpenAI Studio', 'CI/CD'] },
  { label: 'Databases', items: ['PostgreSQL', 'pgvector', 'SQLite', 'Vector DBs', 'Semantic Search'] },
  { label: 'ML / Deep Learning', items: ['CNNs', 'LSTM', 'Computer Vision', 'XGBoost', 'Random Forest', 'Model Deployment'] },
]

export const publications = [
  { venue: 'FLLM 2025', title: 'GoT4SQL-DA: A Graph-of-Thoughts Framework for Scalable Text-to-SQL Data Augmentation', desc: 'Novel framework leveraging Graph-of-Thoughts reasoning for scalable data augmentation in Text-to-SQL systems.', tags: ['Graph-of-Thoughts', 'Text-to-SQL', 'Data Augmentation'], link: 'https://ieeexplore.ieee.org/abstract/document/11391068' },
  { venue: 'CSCI 2025', title: 'GRAFT: Graph-of-Thoughts based Reasoning and Augmentation for Finetuning Text-to-SQL', desc: 'Research on applying Graph-of-Thoughts reasoning to improve fine-tuning pipelines for Text-to-SQL generation.', tags: ['Fine-tuning', 'LLM', 'Reasoning'], link: null },
]

export const certifications = [
  { icon: '☁️', title: 'Oracle Cloud Infrastructure Certified Generative AI Professional' },
  { icon: '🤖', title: 'Amazon Machine Learning Summer School 2022' },
  { icon: '☁️', title: 'AWS Machine Learning Foundations — Udacity' },
  { icon: '🏦', title: 'Goldman Sachs Engineering Virtual Program' },
  { icon: '🧠', title: 'Generative AI Fundamentals — Databricks' },
]
