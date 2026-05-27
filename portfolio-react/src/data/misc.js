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
    avatar: 'User',
  },
  {
    name: 'Portfolio Manager',
    role: 'State Street Corporation',
    text: 'WealthAI narratives help us communicate complex portfolio changes to clients in plain language.',
    avatar: 'User',
  },
  {
    name: 'Compliance Officer',
    role: 'State Street Corporation',
    text: 'The Fund Prospectus RAG system saves us countless hours of manual document review.',
    avatar: 'User',
  },
]
