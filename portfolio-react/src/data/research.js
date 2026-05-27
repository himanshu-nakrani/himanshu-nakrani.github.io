export const publications = [
  { venue: 'FLLM 2025', title: 'GoT4SQL-DA: A Graph-of-Thoughts Framework for Scalable Text-to-SQL Data Augmentation', desc: 'Novel framework leveraging Graph-of-Thoughts reasoning for scalable data augmentation in Text-to-SQL systems.', tags: ['Graph-of-Thoughts', 'Text-to-SQL', 'Data Augmentation'], link: 'https://ieeexplore.ieee.org/abstract/document/11391068' },
  { venue: 'CSCI 2025', title: 'GRAFT: Graph-of-Thoughts based Reasoning and Augmentation for Finetuning Text-to-SQL', desc: 'Research on applying Graph-of-Thoughts reasoning to improve fine-tuning pipelines for Text-to-SQL generation.', tags: ['Fine-tuning', 'LLM', 'Reasoning'], link: null },
]
export const researchDeepDives = [
  {
    id: 'llama-3b-reasoning',
    slug: 'llama-3b-reasoning',
    title: 'LLaMA 3.2-3B Mathematical Reasoning Fine-tuning',
    shortTitle: 'LLaMA 3B Reasoning',
    badge: 'Research',
    summary: 'Fine-tuned LLaMA 3.2-3B for mathematical reasoning using QLoRA after generating synthetic reasoning data.',
    metrics: [
      { label: 'Loss Reduction', value: '77%' },
      { label: 'Token Accuracy', value: '90%' },
      { label: 'Training Time', value: '32 min' },
      { label: 'Synthetic Samples', value: '200' },
    ],
    pipeline: [
      { id: 'datagen', label: 'Synthetic Data Generation', detail: 'Generated 200 graduate-level math reasoning samples using Qwen 3.6-35B on AMD MI300X via vLLM.' },
      { id: 'format', label: 'Prompt/Completion Formatting', detail: 'Structured into prompt/completion pairs. Loss computed only on reasoning tokens (completion side).' },
      { id: 'finetune', label: 'QLoRA Fine-tuning', detail: 'Fine-tuned LLaMA 3.2-3B with 4-bit NF4 quantization + LoRA adapters (r=16, alpha=32) targeting all 7 projection layers.' },
      { id: 'eval', label: 'Evaluation', detail: 'Training loss dropped from 1.3 to 0.30 over 5 epochs. 90% token accuracy on held-out reasoning chains.' },
      { id: 'export', label: 'Hugging Face Adapter', detail: '46MB adapter uploaded to Hugging Face Hub. 0.47% trainable parameters.' },
    ],
    stack: ['PyTorch', 'Transformers', 'PEFT', 'QLoRA', 'Hugging Face', 'vLLM', 'AMD MI300X', 'NVIDIA A10G'],
    notes: [
      'Synthetic reasoning samples generated with Qwen 3.6-35B on AMD MI300X',
      'Fine-tuned with QLoRA / LoRA adapters on NVIDIA A10G',
      'Adapter size: 46MB, 0.47% trainable parameters',
      'Structured reasoning format: Understand → Plan → Execute → Verify',
      'Reduced max_length from 4096 → 2048 and batch_size to 1 with gradient accumulation to avoid OOM',
    ],
    link: 'https://huggingface.co/himanshunakrani9/llama-3.2-3b-reasoning-sft',
    demoModuleId: 'model-training-panel',
  },
  {
    id: 'tinymathreason-1b',
    slug: 'tinymathreason-1b',
    title: 'TinyMathReason-1B',
    shortTitle: 'TinyMathReason-1B',
    badge: 'Research',
    summary: 'From-scratch 1.07B-parameter math reasoning model pretraining run on TPU v4-64.',
    metrics: [
      { label: 'Parameters', value: '1.07B' },
      { label: 'Tokens Trained', value: '57B' },
      { label: 'Training Steps', value: '54,363' },
      { label: 'Tokens / Step', value: '~1M' },
    ],
    pipeline: [
      { id: 'tokenizer', label: 'Tokenizer', detail: 'Custom 32k math tokenizer trained on FineWeb-Edu, MathPile, OpenWebMath, and Stack-Edu.' },
      { id: 'dataprep', label: 'Data Preparation', detail: 'Distributed data processing on parallel Vultr instances. Cleaning, MinHash deduplication, and packing.' },
      { id: 'shard', label: 'Sharding', detail: 'Staged jsonl.zst shards uploaded to Google Cloud Storage for TPU-accessible data loading.' },
      { id: 'pretrain', label: 'TPU Pretraining', detail: 'MaxText pretraining on TPU v4-64. LLaMA-style 1.07B architecture: 22 layers, 2048 hidden, 16Q/4KV heads.' },
      { id: 'checkpoint', label: 'Checkpointing', detail: 'Orbax checkpoints every 1,000 steps. AdamW with cosine decay, 256 × 4096 sequence batches.' },
      { id: 'next', label: 'Planned: SFT / DPO', detail: 'Next stages: Orbax → Hugging Face conversion, SFT, DPO/GRPO, benchmark evaluation, model release.' },
    ],
    stack: ['JAX', 'MaxText', 'Orbax', 'TPU v4-64', 'GCS', 'Hugging Face'],
    notes: [
      'LLaMA-style architecture with 22 layers, 2048 hidden size, 16 query heads, 4 KV heads',
      'Custom 32k tokenizer trained on curated math and code data',
      'Orbax checkpointing with restart resilience for TPU preemptions',
      'SFT and DPO/GRPO planned as next stages',
    ],
    link: null,
    demoModuleId: 'model-training-panel',
  },
]

