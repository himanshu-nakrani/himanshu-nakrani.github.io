import { motion, useReducedMotion } from 'framer-motion'

const benchmarkSeries = [
  { name: 'GSM8K', base: 1, sft: 1, grpo: 2.2 },
  { name: 'Minerva', base: 0, sft: 0, grpo: 2.02 },
  { name: 'ARC-C', base: 21.7, sft: 24.66, grpo: 22.78 },
  { name: 'MMLU', base: 23.5, sft: 24.6, grpo: 23.62 },
  { name: 'HellaSwag', base: 25.8, sft: 26.7, grpo: 26.3 },
]

const metrics = [
  ['Parameters', '1.12B'],
  ['Pretraining tokens', '~57B'],
  ['Final loss', '~2.6'],
  ['Throughput', '~8.9k tok/s/chip'],
]

export default function TrainingTelemetry() {
  const reduceMotion = useReducedMotion()
  const chartHeight = 220
  const maxScore = 30

  return (
    <section className="signature-visual telemetry" aria-labelledby="telemetry-title">
      <header className="signature-visual__header">
        <div>
          <span>Experiment telemetry</span>
          <h2 id="telemetry-title">TinyMathReason-1B evaluation</h2>
        </div>
        <p>Verified results from the repository&apos;s completed base, SFT, and GRPO pipeline. Scores are benchmark accuracy percentages.</p>
      </header>

      <div className="telemetry__layout">
        <div className="telemetry__chart">
          <svg viewBox="0 0 760 280" role="img" aria-label="Base, SFT, and GRPO accuracy across five evaluation benchmarks">
            <g className="telemetry__grid">
              {[0, 10, 20, 30].map((score) => {
                const y = 238 - (score / maxScore) * chartHeight
                return <line key={score} x1="56" y1={y} x2="744" y2={y} />
              })}
            </g>

            {benchmarkSeries.map((benchmark, index) => {
              const groupX = 76 + index * 137
              return (
                <g key={benchmark.name}>
                  {['base', 'sft', 'grpo'].map((stage, stageIndex) => {
                    const score = benchmark[stage]
                    const height = (score / maxScore) * chartHeight
                    return (
                      <motion.rect
                        key={stage}
                        className={`telemetry__bar telemetry__bar--${stage}`}
                        x={groupX + stageIndex * 24}
                        y={238 - height}
                        width="16"
                        height={height}
                        rx="2"
                        initial={reduceMotion ? false : { scaleY: 0 }}
                        whileInView={{ scaleY: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, delay: index * 0.07 + stageIndex * 0.05 }}
                        style={{ transformOrigin: `${groupX + stageIndex * 24 + 8}px 238px` }}
                      />
                    )
                  })}
                  <text className="telemetry__axis-label" x={groupX + 28} y="260" textAnchor="middle">{benchmark.name}</text>
                </g>
              )
            })}
          </svg>
          <div className="telemetry__legend">
            <span className="is-base">Base</span>
            <span className="is-sft">SFT</span>
            <span className="is-grpo">GRPO</span>
          </div>
        </div>

        <div className="telemetry__metrics">
          {metrics.map(([label, value], index) => (
            <motion.div key={label} initial={reduceMotion ? false : { opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.08 }}>
              <span>{label}</span>
              <strong>{value}</strong>
            </motion.div>
          ))}
        </div>
      </div>
      <p className="telemetry__note">Pretraining: TPU v4-64, 54,363 steps, 4096-token context. Final GRPO scores include GSM8K 2.20% and Minerva Math 2.02%.</p>
    </section>
  )
}
