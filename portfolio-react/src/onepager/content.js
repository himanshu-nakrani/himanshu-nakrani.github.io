/**
 * Presentation-layer content for the one-pager.
 * Numeric facts mirror src/data/* on main (stats.js, ProfilesPage) so both
 * experiences stay in sync; mutable project/experience/research facts flow
 * directly from the data modules.
 */

import { RESUME_URL } from '../lib/site'

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

export const resumeUrl = RESUME_URL

export const socials = [
  { label: 'GitHub', href: 'https://github.com/himanshu-nakrani' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/himanshu-nakrani/' },
  { label: 'Kaggle', href: 'https://www.kaggle.com/himanshunakrani' },
  { label: 'LeetCode', href: 'https://leetcode.com/u/himanshunakrani0/' },
  { label: 'Hugging Face', href: 'https://huggingface.co/himanshunakrani9' },
]

export const heroStats = [
  { value: '3+', label: 'Years experience' },
  { value: '200+', label: 'Users served' },
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
    description: 'Building LLM systems for financial-data workflows: Text-to-SQL, RAG, agent tooling, and evaluation.',
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
      { label: 'Repos', value: '46' },
      { label: 'Commits', value: '680' },
      { label: 'Since', value: '2021' },
    ],
    badge: 'Python primary',
  },
  {
    id: 'kaggle',
    name: 'Kaggle',
    handle: '@himanshunakrani',
    href: 'https://www.kaggle.com/himanshunakrani',
    stats: [
      { label: 'Votes', value: '895' },
      { label: 'Expert', value: '2×' },
      { label: 'Notebooks', value: '74' },
    ],
    badge: 'Datasets & Notebooks Expert',
  },
  {
    id: 'huggingface',
    name: 'Hugging Face',
    handle: '@himanshunakrani9',
    href: 'https://huggingface.co/himanshunakrani9',
    stats: [
      { label: 'Models', value: '11' },
      { label: 'Downloads', value: '2.8K' },
      { label: 'Datasets', value: '11' },
    ],
    badge: 'LoRA · Open models',
  },
  {
    id: 'leetcode',
    name: 'LeetCode',
    handle: '@himanshunakrani0',
    href: 'https://leetcode.com/u/himanshunakrani0/',
    stats: [
      { label: 'Solved', value: '152' },
      { label: 'Global rank', value: '1,068,827' },
    ],
    badge: 'DSA · Python',
  },
  {
    id: 'linkedin',
    name: 'LinkedIn',
    handle: 'himanshu-nakrani',
    href: 'https://www.linkedin.com/in/himanshu-nakrani/',
    stats: [
      { label: 'Focus', value: 'AI' },
      { label: 'Years', value: '3+' },
    ],
    badge: 'Open to contact',
  },
]

export const ghStats = [
  { num: '46', label: 'Public Repos' },
  { num: '680', label: 'Commits' },
  { num: 'Python', label: 'Primary Lang' },
  { num: '2021', label: 'Member Since' },
]

export const kaggleTiers = [
  { title: 'Datasets Expert', rank: '1,056', total: '9,785', silver: 3, bronze: 4 },
  { title: 'Notebooks Expert', rank: '2,883', total: '62,296', silver: 1, bronze: 16 },
]

export const kaggleCounters = [
  ['74', 'Notebooks'], ['14', 'Datasets'], ['895', 'Votes'], ['2×', 'Expert tiers'],
]

export const medalByLabel = {
  Silver: '🥈',
  Bronze: '🥉',
  Gold: '🥇',
}

export const methodologySteps = [
  { label: 'NL Query', description: 'Natural language question input from the user.' },
  { label: 'GoT Reasoning', description: 'Graph-of-Thoughts explores several reasoning paths.' },
  { label: 'SQL Augmentation', description: 'Synthetic SQL examples improve edge-case coverage.' },
  { label: 'Fine-tuned LLM', description: 'A domain-adapted model generates structured queries.' },
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
