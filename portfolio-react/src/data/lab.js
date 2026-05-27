export const architecturePipeline = {
  title: 'Production RAG / Text-to-SQL Pipeline',
  stages: [
    { id: 'ingest',   label: 'Ingestion',            icon: 'Download',    detail: 'Document parsing, chunking, embedding' },
    { id: 'retrieve', label: 'Retrieval',             icon: 'Search',      detail: 'Hybrid vector + keyword search' },
    { id: 'prompt',   label: 'Prompt Orchestration',  icon: 'Brain',       detail: 'Chain-of-thought, few-shot, routing' },
    { id: 'eval',     label: 'Evaluation',            icon: 'CheckCircle', detail: 'Faithfulness, relevance, latency checks' },
    { id: 'deliver',  label: 'Delivery',              icon: 'Rocket',      detail: 'API response, UI rendering, caching' },
  ],
  connections: [
    ['ingest', 'retrieve'],
    ['retrieve', 'prompt'],
    ['prompt', 'eval'],
    ['eval', 'deliver'],
  ],
}

// ─── Production Trace Explorer ────────────────────────────────────────────────
export const productionTraceStages = [
  {
    id: 'query',
    label: 'User Query',
    purpose: 'Parse and validate the natural language question from the analyst.',
    legacyMs: '—',
    optimizedMs: '<10 ms',
    optimization: 'No processing overhead — input is pre-validated at the API boundary.',
    snippet: 'query = "Top 10 performing funds last quarter?"\nctx = { user_id: "analyst_42", schema: "financial_db" }',
  },
  {
    id: 'schema',
    label: 'Schema Linking',
    purpose: 'Map query entities to database tables and columns via semantic similarity.',
    legacyMs: '2–3 s',
    optimizedMs: '200 ms',
    optimization: 'Pre-built embedding index with top-k column matching; 0.8 similarity threshold.',
    snippet: 'candidates = find_similar_columns(embed(query), k=10)\nlinked = [c for c in candidates if c.score > 0.8]',
  },
  {
    id: 'cache',
    label: 'Query Cache',
    purpose: 'Check Redis for a semantically equivalent cached SQL result before calling the LLM.',
    legacyMs: 'N/A',
    optimizedMs: '50 ms',
    optimization: 'Semantic hash + vector similarity at 0.95 threshold; ~40% of requests served from cache.',
    snippet: 'if cached := await redis.get(hash(query)):\n    return cached\nhit = await vector_db.search(query, threshold=0.95)',
  },
  {
    id: 'llm',
    label: 'LLM Generation',
    purpose: 'Generate SQL using GPT-4o with schema-linked context and few-shot examples.',
    legacyMs: '18–22 s',
    optimizedMs: '3–4 s',
    optimization: 'Schema context injection reduces token count; LoRA fine-tuned fallback for common query patterns.',
    snippet: 'response = await openai.chat.completions.create(\n    model="gpt-4o",\n    messages=[system, few_shot, user],\n    temperature=0\n)',
  },
  {
    id: 'validate',
    label: 'Validation',
    purpose: 'AST-based syntax check, blocked-operation scan, and schema reference validation.',
    legacyMs: '3–4 s',
    optimizedMs: '800 ms',
    optimization: 'Parallel AST parsing; blocked-ops pre-checked before a DB connection is acquired.',
    snippet: 'parsed = sqlparse.parse(sql)[0]\nif contains_dangerous_ops(parsed): raise SecurityError\nvalidate_schema_refs(parsed, schema)',
  },
  {
    id: 'execute',
    label: 'Execute & Viz',
    purpose: 'Run the validated query against the database and auto-generate a chart config.',
    legacyMs: '2–3 s',
    optimizedMs: '1–2 s',
    optimization: 'Connection pooling + 1 h result cache; async chart config generated from column types.',
    snippet: 'result = await db.execute(sql, timeout=30)\nchart = generate_viz(detect_chart_type(result))\nawait cache_result(sql, result, ttl=3600)',
  },
]

// ─── ModelOps Snapshots ───────────────────────────────────────────────────────
export const modelOpsSnapshots = [
  {
    id: 'llama-finetune',
    title: 'LLaMA 3.2-3B Math Reasoning',
    subtitle: 'QLoRA fine-tuning on NVIDIA A10G',
    badge: 'Research',
    link: 'https://huggingface.co/himanshunakrani9/llama-3.2-3b-reasoning-sft',
    metrics: [
      { label: 'Loss Reduction', value: '77%' },
      { label: 'Token Accuracy', value: '90%' },
      { label: 'Training Time', value: '32 min' },
      { label: 'Synthetic Samples', value: '200' },
    ],
    stack: ['QLoRA', 'PEFT', 'Transformers', 'HF', 'AMD MI300X'],
    note: 'Synthetic data generated on AMD MI300X using Qwen 3.6-35B via vLLM. Fine-tuned with 4-bit NF4 quantisation + LoRA (r=16, α=32) targeting all 7 projection layers. 46 MB adapter, 0.47% trainable params.',
  },
  {
    id: 'tinymathReason',
    title: 'TinyMathReason-1B',
    subtitle: 'Pretraining on TPU v4-64 with MaxText',
    badge: 'Research',
    link: null,
    metrics: [
      { label: 'Parameters', value: '1.07B' },
      { label: 'Tokens Trained', value: '57B' },
      { label: 'Training Steps', value: '54,363' },
      { label: 'Tokens / Step', value: '~1M' },
    ],
    stack: ['JAX', 'MaxText', 'Orbax', 'TPU v4-64', 'GCS'],
    note: 'LLaMA-style architecture: 22 layers, 2048 hidden, 16Q/4KV heads. Custom 32k tokeniser trained on FineWeb-Edu, MathPile, OpenWebMath. SFT and DPO/GRPO planned next.',
  },
]
