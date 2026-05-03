export const experience = [
  {
    role: 'AI Software Developer',
    company: 'State Street Corporation',
    location: 'Hyderabad, India',
    period: 'Jan 2023 – Present',
    progression: 'Software Development Intern → Associate 2 → Senior Associate → Emerging Lead',
    progressionSteps: [
      'Software Development Intern',
      'Associate 2',
      'Senior Associate',
      'Emerging Lead',
    ],
    currentRoleStep: 'Emerging Lead',
    description: 'Building enterprise-grade LLM systems and AI agents. Architected Alpha Copilot (Text-to-SQL chatbot serving 100+ users) and Agent Forge (no-code AI agent builder). Optimized systems achieving 75% latency reduction and 95%+ test coverage.',
    bullets: [
      'Architected Alpha Copilot — enterprise LLM-powered Text-to-SQL chatbot serving 100+ internal users over structured financial data',
      'Engineered FastAPI + SQLAlchemy backend with advanced caching, cutting response time by 75% (25–30s → 6–8s)',
      'Integrated LLM-based data visualization for auto-generating interactive charts from query results',
      'Led backend for WealthAI — real-time portfolio narrative generation from optimizer outputs',
      'Fine-tuned GPT-4o mini, GPT-4.1 mini (Azure OpenAI) and Llama 3.1-8B (Databricks) using PEFT/LoRA',
      'Researched schema-linking and few-shot prompting strategies, improving SQL accuracy by 25%',
      'Building Agent Forge — no-code AI agent builder with real-time trace monitoring and evaluation dashboards',
      'Achieved 95%+ unit test coverage across production systems',
      'Built production-ready RAG for fund prospectuses using OpenAI + vector embeddings; intelligent chunking and vector DB pipeline for sub-second retrieval',
      'Collaborated with business analysts and compliance officers to meet regulatory requirements',
      'Migrated legacy ideation platform from .NET Core to FastAPI + ReactJS, improving performance by 40%',
      'Designed RESTful APIs with SQLite backend and comprehensive test coverage',
    ],
    tags: [
      'FastAPI',
      'LangChain',
      'Azure OpenAI',
      'LoRA/PEFT',
      'Text-to-SQL',
      'Databricks',
      'Google ADK',
      'RAG',
      'OpenAI',
      'pgvector',
      'Semantic Search',
      'ReactJS',
      'SQLite',
      '.NET Core',
    ],
  },
  {
    role: 'Machine Learning Developer Intern',
    company: 'Technocolabs Software Inc.',
    location: 'Remote',
    period: 'Jun 2022 – Jul 2022',
    description: 'Developed CNN-based music skip prediction model achieving 87% accuracy. Executed end-to-end ML pipeline from data preprocessing through production API deployment.',
    bullets: [
      'Built CNN-based Spotify Skip Action Predictor achieving 87% accuracy in real-time prediction',
      'End-to-end ML pipeline: data preprocessing, feature engineering, model training, and API deployment',
    ],
    tags: ['CNN', 'Python', 'Deep Learning', 'API Deployment'],
  },
]

export const projects = [
  { 
    icon: '🤖', 
    title: 'Alpha Copilot', 
    desc: 'Enterprise LLM-powered Text-to-SQL chatbot enabling natural language queries over structured financial data. Serves 100+ internal users at State Street.', 
    fullDesc: 'Alpha Copilot is a production-grade enterprise chatbot that democratizes data access by allowing non-technical users to query complex financial databases using natural language. Built with FastAPI and Azure OpenAI, it features advanced caching, query optimization, and automatic data visualization.',
    tags: ['Text-to-SQL', 'FastAPI', 'Azure OpenAI', 'SQLAlchemy'], 
    techStack: ['FastAPI', 'Azure OpenAI', 'SQLAlchemy', 'PostgreSQL', 'Redis', 'React', 'LangChain'],
    badge: 'Production', 
    link: null,
    metrics: [
      { type: 'performance', value: '75%', label: 'Response Time Reduction' },
      { type: 'users', value: '100+', label: 'Active Users' },
      { type: 'efficiency', value: '6-8s', label: 'Avg Query Time' },
    ],
    features: [
      'Natural language to SQL translation with 90%+ accuracy',
      'Intelligent caching system reducing response time from 25-30s to 6-8s',
      'Auto-generated interactive charts and visualizations',
      'Multi-turn conversation with context awareness',
      'Query history and favorites for power users',
    ],
    challenges: [
      { challenge: 'High latency on complex queries', solution: 'Implemented Redis caching and query result memoization, achieving 75% latency reduction' },
      { challenge: 'SQL accuracy on ambiguous queries', solution: 'Developed schema-linking and few-shot prompting strategies, improving accuracy by 25%' },
    ],
  },
  { 
    icon: '🔧', 
    title: 'Agent Forge', 
    desc: 'No-code AI agent builder platform for designing, registering, and deploying custom agents with real-time trace monitoring and evaluation dashboards.', 
    fullDesc: 'Agent Forge empowers teams to build, test, and deploy AI agents without writing code. Features drag-and-drop workflow design, real-time observability, and comprehensive evaluation metrics.',
    tags: ['AI Agents', 'Google ADK', 'LangChain', 'Observability'], 
    techStack: ['Google ADK', 'LangChain', 'FastAPI', 'React', 'PostgreSQL', 'WebSocket'],
    badge: 'Production', 
    link: null,
    features: [
      'Visual workflow builder with drag-and-drop interface',
      'Real-time agent execution tracing and debugging',
      'Built-in evaluation framework with custom metrics',
      'Version control and rollback capabilities',
      'Integration with multiple LLM providers',
    ],
  },
  { 
    icon: '💼', 
    title: 'WealthAI', 
    desc: 'Real-time portfolio narrative generation system that processes optimizer outputs and delivers personalized investment insights at scale.', 
    fullDesc: 'WealthAI transforms complex portfolio optimization data into clear, personalized narratives for wealth management clients. Processes real-time market data and generates tailored investment insights.',
    tags: ['LLM', 'FastAPI', 'Real-time', 'Finance'], 
    techStack: ['FastAPI', 'GPT-4', 'WebSocket', 'PostgreSQL', 'Redis'],
    badge: 'Production', 
    link: null,
    metrics: [
      { type: 'performance', value: '<2s', label: 'Generation Time' },
      { type: 'efficiency', value: '95%', label: 'Client Satisfaction' },
    ],
  },
  { 
    icon: '📄', 
    title: 'Fund Prospectus RAG', 
    desc: 'Production RAG system for extracting actionable insights from fund prospectuses using OpenAI models, vector embeddings, and intelligent chunking.', 
    fullDesc: 'A sophisticated RAG pipeline that processes fund prospectuses, extracts key information, and enables semantic search across thousands of documents. Features intelligent chunking and hybrid search.',
    tags: ['RAG', 'OpenAI', 'pgvector', 'Embeddings'], 
    techStack: ['OpenAI', 'pgvector', 'PostgreSQL', 'FastAPI', 'LangChain'],
    badge: 'Production', 
    link: null,
    features: [
      'Intelligent document chunking with overlap strategy',
      'Hybrid search combining semantic and keyword matching',
      'Sub-second retrieval from 10,000+ documents',
      'Compliance-aware response generation',
      'Citation tracking and source attribution',
    ],
  },
  { 
    icon: '🧮', 
    title: 'LLaMA 3.2-3B Mathematical Reasoning Fine-tuning', 
    desc: 'End-to-end fine-tuning pipeline: generated 200 synthetic reasoning samples on AMD MI300X GPU using Qwen 3.6, then fine-tuned LLaMA 3.2-3B with QLoRA. Achieved 77% loss reduction and 90% token accuracy.', 
    fullDesc: 'Complete end-to-end pipeline for teaching a 3B parameter model to reason step-by-step through complex mathematical problems. First, generated 200 high-quality synthetic chain-of-thought reasoning samples using Qwen 3.6-35B on AMD MI300X GPU. Then fine-tuned LLaMA 3.2-3B using QLoRA (4-bit quantization + LoRA adapters) on NVIDIA A10G. Training loss dropped from 1.3 → 0.30 over 5 epochs in 32 minutes.',
    tags: ['Fine-tuning', 'QLoRA', 'LoRA/PEFT', 'LLM', 'Reasoning', 'Data Generation'], 
    techStack: ['PyTorch', 'Transformers', 'PEFT', 'bitsandbytes', 'TRL', 'Hugging Face', 'vLLM', 'AMD MI300X'],
    badge: 'Research', 
    link: 'https://huggingface.co/himanshunakrani9/llama-3.2-3b-reasoning-sft',
    metrics: [
      { type: 'performance', value: '77%', label: 'Loss Reduction' },
      { type: 'efficiency', value: '90%', label: 'Token Accuracy' },
      { type: 'performance', value: '32 min', label: 'Training Time' },
      { type: 'efficiency', value: '200', label: 'Synthetic Samples' },
    ],
    features: [
      'Synthetic data generation using Qwen 3.6-35B on AMD MI300X GPU via vLLM',
      'Graduate-level mathematical reasoning problems with structured chain-of-thought',
      'QLoRA with 4-bit NormalFloat quantization for memory efficiency',
      'LoRA adapters (r=16, α=32) targeting all 7 projection layers',
      'Structured reasoning format: Understand → Plan → Execute → Verify',
      'Prompt/completion split ensuring loss only on reasoning tokens',
      '46MB adapter achieving 0.47% trainable parameters',
    ],
    challenges: [
      { challenge: 'Generating high-quality reasoning data at scale', solution: 'Used Qwen 3.6-35B on AMD MI300X GPU with structured prompts to generate 200 diverse graduate-level problems with detailed chain-of-thought reasoning' },
      { challenge: 'OOM errors with long reasoning chains during training', solution: 'Reduced max_length from 4096 → 2048 and batch_size to 1 with gradient accumulation' },
      { challenge: 'Small dataset overfitting risk', solution: 'Used QLoRA regularization (frozen base + small adapters) and cosine LR schedule' },
      { challenge: 'Training pipeline crashes', solution: 'Wrapped monitoring callbacks in try/except to prevent non-fatal failures from blocking model saves' },
    ],
  },
  { 
    icon: '📚', 
    title: 'Document QA', 
    desc: 'Document question-answering system using LLMs and retrieval techniques to extract precise answers from uploaded documents.', 
    tags: ['Python', 'LLM', 'RAG'], 
    badge: null, 
    link: 'https://github.com/himanshu-nakrani/document-qa',
    liveLink: 'https://document-qa-two.vercel.app/',
  },
  { 
    icon: '🛡️', 
    title: 'Intrusion Detection System', 
    desc: 'ML-based network intrusion detection on KDD Cup 1999 dataset (4.9M records), achieving 94% accuracy across DoS, Probe, R2L, and U2R attacks.', 
    fullDesc: 'Comprehensive intrusion detection system using ensemble methods to identify network attacks. Trained on 4.9M records with extensive feature engineering.',
    tags: ['Random Forest', 'XGBoost', 'Python'], 
    techStack: ['Python', 'scikit-learn', 'XGBoost', 'Pandas', 'NumPy'],
    badge: null, 
    link: 'https://github.com/himanshu-nakrani/Intrusion-Detection-System',
    metrics: [
      { type: 'performance', value: '94%', label: 'Accuracy' },
      { type: 'efficiency', value: '4.9M', label: 'Records Processed' },
    ],
  },
  { 
    icon: '₿', 
    title: 'Cryptocurrency Price Prediction', 
    desc: 'Automated daily-updated crypto forecasting using LSTM networks with technical indicators. Achieved 18% RMSE reduction via walk-forward validation.', 
    fullDesc: 'LSTM-based cryptocurrency price prediction system with automated daily updates. Features technical indicators, walk-forward validation, and real-time data integration.',
    tags: ['LSTM', 'Time Series', 'Deep Learning'], 
    techStack: ['Python', 'TensorFlow', 'Keras', 'Pandas', 'TA-Lib'],
    badge: null, 
    link: 'https://github.com/himanshu-nakrani/Cryptocurrency-Price-Prediction',
    metrics: [
      { type: 'performance', value: '18%', label: 'RMSE Reduction' },
    ],
  },
  { 
    icon: '🥇', 
    title: 'Gold Price Prediction', 
    desc: 'ML-based gold price forecasting using historical market data, feature engineering, and regression models.', 
    tags: ['Python', 'Regression', 'Jupyter'], 
    badge: null, 
    link: 'https://github.com/himanshu-nakrani/Gold-price-prediction' 
  },
]

export const kagglePinned = [
  { type: 'notebook', medal: '🥈', title: 'Bitcoin Price Prediction (Updated Daily)', desc: 'LSTM-based daily-updated crypto forecasting with technical indicators. Auto-refreshes with latest market data.', votes: 156, link: 'https://www.kaggle.com/code/himanshunakrani/bitcoin-price-prediction-updated-daily' },
  { type: 'dataset', medal: '🥈', title: 'Iris Dataset', desc: 'Widely-used classification dataset. One of the most popular datasets on Kaggle with hundreds of downstream notebooks.', votes: 395, link: 'https://www.kaggle.com/datasets/himanshunakrani/iris-dataset' },
  { type: 'dataset', medal: '🥈', title: 'Student Study Hours Dataset', desc: 'Popular regression dataset for predicting student scores based on study hours. Widely used for ML tutorials.', votes: 262, link: 'https://www.kaggle.com/datasets/himanshunakrani/student-study-hours' },
  { type: 'notebook', medal: '🥉', title: 'Gold Price Prediction Project', desc: 'End-to-end ML project predicting gold prices using historical market data and feature engineering techniques.', votes: 59, link: 'https://www.kaggle.com/code/himanshunakrani/gold-price-prediction-project' },
  { type: 'notebook', medal: null, title: 'RAG with LangChain', desc: 'Practical implementation of Retrieval-Augmented Generation using LangChain — bridging ML fundamentals with modern LLM work.', votes: 12, link: 'https://www.kaggle.com/code/himanshunakrani/rag-retrieval-augmented-generation-with-langchain' },
  { type: 'notebook', medal: null, title: 'CrewAI Multi-Agent Blog Generator', desc: 'Multi-agent system using CrewAI framework to autonomously generate blog content — showcasing AI agent orchestration.', votes: 2, link: 'https://www.kaggle.com/code/himanshunakrani/crewai-multi-ai-agent-blog-generator' },
]

/**
 * Optional YYYY-MM-DD → activity count for the Kaggle heatmap grid in `Kaggle.jsx`.
 * Kaggle has no public contribution API like GitHub/ghchart — add dates here manually if you want the grid filled.
 */
export const kaggleContributionMap = {}

export const skills = [
  {
    label: 'AI & LLMs',
    icon: '🤖',
    color: 'var(--accent)',
    items: ['LLMs', 'RAG', 'Fine-tuning', 'LoRA/PEFT', 'Prompt Engineering', 'AI Agents', 'OpenAI API', 'Azure OpenAI', 'LangChain', 'Google ADK'],
  },
  {
    label: 'Machine Learning',
    icon: '🧠',
    color: 'var(--accent2)',
    items: ['CNNs', 'LSTM', 'XGBoost', 'Random Forest', 'Feature Engineering', 'Model Deployment', 'scikit-learn', 'TensorFlow'],
  },
  {
    label: 'Backend & APIs',
    icon: '⚙️',
    color: 'var(--accent3)',
    items: ['FastAPI', 'ASP.NET Core', 'REST APIs', 'SQLAlchemy', 'WebSocket', 'Microservices'],
  },
  {
    label: 'Languages',
    icon: '💻',
    color: 'var(--nav-dot)',
    items: ['Python', 'SQL', 'TypeScript', 'Java', 'C#', 'C/C++', 'Shell/Perl'],
  },
  {
    label: 'Data & Databases',
    icon: '🗄️',
    color: '#4ade80',
    items: ['PostgreSQL', 'pgvector', 'SQLite', 'Vector DBs', 'Semantic Search', 'Redis', 'Pandas', 'NumPy'],
  },
  {
    label: 'Cloud & DevOps',
    icon: '☁️',
    color: 'var(--accent)',
    items: ['Azure', 'AWS', 'OCI', 'Databricks', 'CI/CD', 'Docker', 'Azure OpenAI Studio'],
  },
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


export const blogPosts = [
  {
    id: 'text-to-sql-production',
    title: 'Building Production Text-to-SQL: Lessons from 100+ Users',
    excerpt: 'Key insights from deploying an enterprise Text-to-SQL system serving real users in a financial institution.',
    date: '2024-03-15',
    readTime: '8 min',
    tags: ['Text-to-SQL', 'LLM', 'Production'],
    content: `
# Building Production Text-to-SQL: Lessons from 100+ Users

After deploying Alpha Copilot to 100+ internal users, here are the critical lessons learned...

## 1. Schema Linking is Everything
The biggest challenge wasn't the LLM—it was helping it understand which tables and columns to use...

## 2. Caching Saves Lives
Our initial response times were 25-30 seconds. After implementing intelligent caching, we got down to 6-8 seconds...

## 3. User Trust Through Transparency
Always show the generated SQL. Users need to verify the query before execution...
    `,
  },
  {
    id: 'rag-pipeline-design',
    title: 'Designing RAG Pipelines That Actually Work',
    excerpt: 'Practical guide to building retrieval-augmented generation systems based on real production experience.',
    date: '2024-02-20',
    readTime: '10 min',
    tags: ['RAG', 'LLM', 'Architecture'],
    content: `
# Designing RAG Pipelines That Actually Work

RAG is simple in theory but complex in practice. Here's what actually matters...

## Chunking Strategy
Don't just split on character count. Use semantic boundaries...

## Hybrid Search
Pure vector search isn't enough. Combine with keyword matching...
    `,
  },
  {
    id: 'llm-fine-tuning-guide',
    title: 'Fine-tuning LLMs with LoRA: A Practical Guide',
    excerpt: 'Step-by-step guide to fine-tuning GPT and Llama models using LoRA/PEFT for domain-specific tasks.',
    date: '2024-01-10',
    readTime: '12 min',
    tags: ['Fine-tuning', 'LoRA', 'PEFT'],
    content: `
# Fine-tuning LLMs with LoRA: A Practical Guide

Fine-tuning doesn't have to be expensive. Here's how we fine-tuned GPT-4o mini and Llama 3.1-8B...
    `,
  },
]

export const testimonials = [
  {
    name: 'Senior Data Analyst',
    role: 'State Street Corporation',
    text: 'Alpha Copilot transformed how we access data. What used to take hours of SQL writing now takes seconds.',
    avatar: '👤',
  },
  {
    name: 'Portfolio Manager',
    role: 'State Street Corporation',
    text: 'WealthAI narratives help us communicate complex portfolio changes to clients in plain language.',
    avatar: '👤',
  },
  {
    name: 'Compliance Officer',
    role: 'State Street Corporation',
    text: 'The Fund Prospectus RAG system saves us countless hours of manual document review.',
    avatar: '👤',
  },
]

export const featuredHighlights = [
  {
    id: 'alpha-copilot',
    icon: '🤖',
    category: 'Production AI',
    headline: 'Alpha Copilot — LLM system serving 100+ users',
    subtext: 'Text-to-SQL + RAG pipeline deployed at State Street Corporation',
    metric: '100+ users',
  },
  {
    id: 'latency',
    icon: '⚡',
    category: 'Performance',
    headline: '75% query latency reduction',
    subtext: 'Optimized retrieval pipeline via hybrid search and prompt caching',
    metric: '75% faster',
  },
  {
    id: 'research',
    icon: '📄',
    category: 'Research',
    headline: 'IEEE published — Text-to-SQL & Graph-of-Thoughts',
    subtext: 'Peer-reviewed research on structured query generation with LLMs',
    metric: '2 publications',
  },
]

export const proofLinks = [
  { label: 'GitHub', href: 'https://github.com/himanshu-nakrani', sublabel: '31 repos' },
  { label: 'Kaggle', href: 'https://www.kaggle.com/himanshunakrani', sublabel: 'Expert' },
  { label: 'LeetCode', href: 'https://leetcode.com/u/himanshunakrani0/', sublabel: '180 solved' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/himanshu-nakrani/' },
  { label: 'Research', href: '#research' },
  { label: 'Resume', href: '/resume.pdf' },
]

export const architecturePipeline = {
  title: 'Production RAG / Text-to-SQL Pipeline',
  stages: [
    { id: 'ingest',   label: 'Ingestion',            icon: '📥', detail: 'Document parsing, chunking, embedding' },
    { id: 'retrieve', label: 'Retrieval',             icon: '🔍', detail: 'Hybrid vector + keyword search' },
    { id: 'prompt',   label: 'Prompt Orchestration',  icon: '🧠', detail: 'Chain-of-thought, few-shot, routing' },
    { id: 'eval',     label: 'Evaluation',            icon: '✅', detail: 'Faithfulness, relevance, latency checks' },
    { id: 'deliver',  label: 'Delivery',              icon: '🚀', detail: 'API response, UI rendering, caching' },
  ],
  connections: [
    ['ingest', 'retrieve'],
    ['retrieve', 'prompt'],
    ['prompt', 'eval'],
    ['eval', 'deliver'],
  ],
}

export const currentFocusItems = [
  {
    area: 'Researching',
    description: 'Agentic evaluation frameworks — measuring multi-step LLM reasoning quality at scale',
    tags: ['LLM Evals', 'Agents'],
  },
  {
    area: 'Building',
    description: 'Agent Forge v2 — composable multi-agent orchestration with structured tool use',
    tags: ['Multi-Agent', 'Tool Use'],
  },
  {
    area: 'Optimizing',
    description: 'Retrieval latency in hybrid RAG — exploring late interaction models and re-ranking',
    tags: ['RAG', 'Latency'],
  },
]

export const availabilityStatus = {
  available: true,
  statusLabel: 'Open to opportunities',
  description: 'Looking for senior AI/ML engineering roles where I can build production LLM systems that matter. Open to full-time and select consulting.',
  actions: [
    { label: 'Send an email', href: 'mailto:himanshunakrani0@gmail.com', variant: 'primary' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/himanshu-nakrani/', variant: 'ghost' },
    { label: 'Resume', href: '/resume.pdf', variant: 'ghost' },
  ],
}
