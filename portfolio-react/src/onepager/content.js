/**
 * Presentation-layer content for the one-pager.
 * Every fact here is carried over verbatim from the previous multi-page
 * portfolio (AboutPage, ProfilesPage, ResearchPage). Mutable facts such as
 * projects, experience and publications live in `data.js`.
 */

export const identity = {
  name: 'Himanshu Nakrani',
  firstName: 'Himanshu',
  role: 'AI Software Developer',
  company: 'State Street Corporation',
  email: 'himanshunakrani0@gmail.com',
  bio: "I build production AI systems at State Street Corporation — enterprise LLM pipelines that transform complex financial data into actionable insights. From fine-tuning models to shipping scalable APIs.",
  bioFacts: [
    'I build production AI systems: Text-to-SQL, RAG pipelines, LLM fine-tuning, and AI agents',
    'Published researcher in Graph-of-Thoughts reasoning for Text-to-SQL (IEEE FLLM 2025)',
    'Always exploring new tools, frameworks, and practical ML workflows',
  ],
}

export const socials = [
  { label: 'GitHub', href: 'https://github.com/himanshu-nakrani' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/himanshu-nakrani/' },
  { label: 'Kaggle', href: 'https://www.kaggle.com/himanshunakrani' },
  { label: 'LeetCode', href: 'https://leetcode.com/u/himanshunakrani0/' },
]

export const heroStats = [
  { value: '2+', label: 'Years experience' },
  { value: '100+', label: 'Users served' },
  { value: '75%', label: 'Latency reduction' },
  { value: '2', label: 'Publications' },
]

export const techMarquee = [
  'Python', 'LangChain', 'PyTorch', 'FastAPI', 'React', 'PostgreSQL',
  'AWS', 'Docker', 'LlamaIndex', 'Transformers', 'Azure OpenAI', 'pgvector',
]

export const journey = [
  {
    year: '2023 – Present',
    title: 'AI Software Developer',
    subtitle: 'State Street Corporation',
    description: 'Building enterprise LLM systems for financial data analysis. Leading Text-to-SQL and RAG pipelines.',
  },
  {
    year: '2025',
    title: 'Published Researcher',
    subtitle: 'IEEE FLLM & CSCI',
    description: 'Graph-of-Thoughts reasoning for Text-to-SQL augmentation.',
  },
  {
    year: '2022',
    title: 'ML Summer School',
    subtitle: 'Amazon',
    description: 'Selected for Amazon ML Summer School program.',
  },
]

export const values = [
  {
    title: 'Ship What Works',
    description: 'Production-first mindset. AI that solves real problems.',
  },
  {
    title: 'Continuous Growth',
    description: 'Always exploring new research and pushing boundaries.',
  },
  {
    title: 'Open Source',
    description: 'Contributing to community and sharing knowledge.',
  },
]

export const platforms = [
  {
    id: 'github',
    name: 'GitHub',
    handle: '@himanshu-nakrani',
    href: 'https://github.com/himanshu-nakrani',
    stats: [
      { label: 'Public Repos', value: '31' },
      { label: 'Stars', value: '156' },
      { label: 'Followers', value: '7' },
    ],
    badge: 'Python Primary',
  },
  {
    id: 'kaggle',
    name: 'Kaggle',
    handle: '@himanshunakrani',
    href: 'https://www.kaggle.com/himanshunakrani',
    stats: [
      { label: 'Tier', value: 'Expert' },
      { label: 'Votes', value: '884' },
      { label: 'Followers', value: '53' },
    ],
    badge: 'Datasets + Notebooks',
  },
  {
    id: 'leetcode',
    name: 'LeetCode',
    handle: '@himanshunakrani0',
    href: 'https://leetcode.com/u/himanshunakrani0/',
    stats: [
      { label: 'Solved', value: '180' },
      { label: 'Ranking', value: '~150k' },
    ],
    badge: 'Consistent problem solver',
  },
  {
    id: 'linkedin',
    name: 'LinkedIn',
    handle: 'himanshu-nakrani',
    href: 'https://www.linkedin.com/in/himanshu-nakrani/',
    stats: [
      { label: 'Open to', value: 'AI Roles' },
    ],
    badge: 'Connect on LinkedIn',
  },
]

export const ghStats = [
  { num: '31', label: 'Public Repos' },
  { num: '1,240', label: 'Commits (2024)' },
  { num: 'Python', label: 'Primary Lang' },
  { num: '2021', label: 'Member Since' },
]

export const kaggleTiers = [
  { title: 'Datasets Expert', rank: '1,211', total: '9,360', highest: '241', silver: 3, bronze: 4 },
  { title: 'Notebooks Expert', rank: '2,815', total: '61,511', highest: '479', silver: 1, bronze: 16 },
]

export const kaggleCounters = [
  ['74', 'Notebooks'], ['13', 'Datasets'], ['4', 'Competitions'], ['53', 'Followers'],
]

export const methodologySteps = [
  {
    label: 'NL Query',
    description: 'Natural language question input from user — e.g., “What were the top performing funds last quarter?”',
  },
  {
    label: 'GoT Reasoning',
    description: 'Graph-of-Thoughts decomposes complex queries into sub-problems, exploring multiple reasoning paths simultaneously.',
  },
  {
    label: 'SQL Augmentation',
    description: 'High-quality synthetic SQL examples generated for training data, improving model accuracy on edge cases.',
  },
  {
    label: 'Fine-tuned LLM',
    description: 'Domain-adapted language model trained on augmented data, optimized for structured query generation.',
  },
]

export const researchInterests = [
  'Graph-of-Thoughts',
  'Text-to-SQL',
  'LLM Fine-tuning',
  'Data Augmentation',
  'Structured Reasoning',
  'NL Interfaces',
]

export const researchFocus =
  'My research bridges structured reasoning and LLM capabilities — specifically how Graph-of-Thoughts frameworks improve data augmentation and fine-tuning pipelines for Text-to-SQL tasks. The goal is connecting academic NLP advances with production-grade enterprise systems.'

export const navSections = [
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'research', label: 'Research' },
  { id: 'skills', label: 'Skills' },
  { id: 'profiles', label: 'Profiles' },
  { id: 'contact', label: 'Contact' },
]
