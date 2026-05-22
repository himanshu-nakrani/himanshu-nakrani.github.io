import { ExternalLink } from 'lucide-react'
import { modelOpsSnapshots } from '../data'

function ModelCard({ model }) {
  return (
    <div className="mos__card">
      <div className="mos__card-header">
        <div style={{ flex: 1, minWidth: 0 }}>
          <div className="mos__card-title">{model.title}</div>
          <div className="mos__card-sub">{model.subtitle}</div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexShrink: 0 }}>
          <span className="mos__badge">{model.badge}</span>
          {model.link && (
            <a
              href={model.link}
              target="_blank"
              rel="noopener noreferrer"
              className="mos__ext-link"
              aria-label={`View ${model.title} on Hugging Face`}
            >
              <ExternalLink size={13} />
            </a>
          )}
        </div>
      </div>

      <div className="mos__metrics">
        {model.metrics.map(m => (
          <div key={m.label} className="mos__metric">
            <div className="mos__metric-value">{m.value}</div>
            <div className="mos__metric-label">{m.label}</div>
          </div>
        ))}
      </div>

      <p className="mos__note">{model.note}</p>

      <div className="mos__stack">
        {model.stack.map(t => (
          <span key={t} className="mos__stack-tag">{t}</span>
        ))}
      </div>
    </div>
  )
}

export default function ModelOpsSnapshot() {
  return (
    <div className="mos">
      {modelOpsSnapshots.map(model => (
        <ModelCard key={model.id} model={model} />
      ))}
    </div>
  )
}
