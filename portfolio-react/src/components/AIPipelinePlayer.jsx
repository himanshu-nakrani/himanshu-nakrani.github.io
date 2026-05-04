import { useState, useCallback, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ReactFlow,
  Background,
  Controls,
  useNodesState,
  useEdgesState,
  MarkerType,
  Handle,
  Position,
} from '@xyflow/react'
import '@xyflow/react/dist/style.css'
import { Play, Pause, RotateCcw, Clock, Zap, Database, Brain, CheckCircle, Rocket, X } from 'lucide-react'

// Pipeline stage definitions with real metrics
const pipelineStages = [
  {
    id: 'query',
    label: 'User Query',
    icon: Brain,
    detail: 'Natural language input',
    latencyLegacy: '0ms',
    latencyOptimized: '0ms',
    code: `// User query input
const query = "What were the top 10 performing funds last quarter?"
const context = { user_id: "analyst_123", schema: "financial_db" }`,
    position: { x: 50, y: 150 },
  },
  {
    id: 'schema',
    label: 'Schema Linking',
    icon: Database,
    detail: 'Map entities to tables/columns',
    latencyLegacy: '2-3s',
    latencyOptimized: '200ms',
    code: `# Schema linking with semantic similarity
def link_schema(query: str, schema: dict):
    # Embed query and column descriptions
    query_embedding = embed(query)
    candidates = find_similar_columns(query_embedding, k=10)
    
    # Filter by relevance threshold
    return [c for c in candidates if c.score > 0.8]`,
    position: { x: 280, y: 50 },
  },
  {
    id: 'cache',
    label: 'Query Cache',
    icon: Zap,
    detail: 'Check Redis for similar queries',
    latencyLegacy: 'N/A',
    latencyOptimized: '50ms',
    code: `# Semantic cache lookup
async def check_cache(query: str) -> Optional[str]:
    query_hash = hash_query(query)
    
    # Check exact match
    if cached := await redis.get(f"sql:{query_hash}"):
        return cached
    
    # Check semantic similarity (>0.95 threshold)
    similar = await vector_db.search(query, threshold=0.95)
    return similar[0].sql if similar else None`,
    position: { x: 280, y: 250 },
  },
  {
    id: 'llm',
    label: 'LLM Generation',
    icon: Brain,
    detail: 'GPT-4o / Llama 3.1 SQL generation',
    latencyLegacy: '18-22s',
    latencyOptimized: '3-4s',
    code: `# Few-shot SQL generation with GPT-4o
prompt = f"""Given the schema:
{relevant_tables}

Generate SQL for: {query}

Examples:
{few_shot_examples}

Return only valid SQL."""

response = await openai.chat.completions.create(
    model="gpt-4o",
    messages=[{"role": "user", "content": prompt}],
    temperature=0
)`,
    position: { x: 510, y: 150 },
  },
  {
    id: 'validate',
    label: 'Validation',
    icon: CheckCircle,
    detail: 'Syntax check + security scan',
    latencyLegacy: '3-4s',
    latencyOptimized: '800ms',
    code: `# SQL validation pipeline
def validate_sql(sql: str, schema: dict) -> ValidationResult:
    # Parse and check syntax
    parsed = sqlparse.parse(sql)[0]
    
    # Security checks (no DROP, TRUNCATE, etc.)
    if contains_dangerous_ops(parsed):
        raise SecurityError("Blocked operation")
    
    # Verify table/column existence
    validate_schema_refs(parsed, schema)
    
    return ValidationResult(valid=True, sql=sql)`,
    position: { x: 740, y: 50 },
  },
  {
    id: 'execute',
    label: 'Execute & Viz',
    icon: Rocket,
    detail: 'Run query + auto-generate charts',
    latencyLegacy: '2-3s',
    latencyOptimized: '1-2s',
    code: `# Execute and visualize
async def execute_and_visualize(sql: str):
    # Execute with timeout
    result = await db.execute(sql, timeout=30)
    
    # Auto-detect chart type based on data shape
    chart_type = detect_chart_type(result.columns, result.rows)
    
    # Generate visualization config
    viz_config = generate_viz(chart_type, result)
    
    # Cache result
    await cache_result(sql, result, ttl=3600)
    
    return {"data": result, "visualization": viz_config}`,
    position: { x: 740, y: 250 },
  },
]

// Custom node component
function PipelineNode({ data, selected }) {
  const Icon = data.icon
  const isActive = data.isActive
  const isCompleted = data.isCompleted
  
  return (
    <motion.div
      className={`pipeline-node ${isActive ? 'pipeline-node--active' : ''} ${isCompleted ? 'pipeline-node--completed' : ''} ${selected ? 'pipeline-node--selected' : ''}`}
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ 
        scale: isActive ? 1.05 : 1, 
        opacity: 1,
        borderColor: isActive ? 'var(--color-accent)' : isCompleted ? 'var(--color-success)' : 'var(--color-border)'
      }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
      onClick={() => data.onSelect?.(data)}
    >
      <Handle type="target" position={Position.Left} className="pipeline-handle" />
      
      <div className="pipeline-node-icon" style={{ 
        background: isActive 
          ? 'var(--color-accent-soft)' 
          : isCompleted 
            ? 'rgba(100, 255, 218, 0.15)'
            : 'var(--color-surface-raised)'
      }}>
        <Icon size={18} style={{ 
          color: isActive || isCompleted ? 'var(--color-accent)' : 'var(--color-text-muted)' 
        }} />
      </div>
      
      <div className="pipeline-node-content">
        <div className="pipeline-node-label">{data.label}</div>
        <div className="pipeline-node-detail">{data.detail}</div>
      </div>
      
      {data.latencyOptimized && (
        <div className="pipeline-node-latency">
          <Clock size={10} />
          <span>{data.latencyOptimized}</span>
        </div>
      )}
      
      <Handle type="source" position={Position.Right} className="pipeline-handle" />
    </motion.div>
  )
}

const nodeTypes = { pipeline: PipelineNode }

export default function AIPipelinePlayer() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentStage, setCurrentStage] = useState(-1)
  const [selectedStage, setSelectedStage] = useState(null)
  const [playbackSpeed, setPlaybackSpeed] = useState(1)

  // Convert stages to React Flow nodes
  const initialNodes = useMemo(() => 
    pipelineStages.map((stage, index) => ({
      id: stage.id,
      type: 'pipeline',
      position: stage.position,
      data: {
        ...stage,
        isActive: currentStage === index,
        isCompleted: currentStage > index,
        onSelect: setSelectedStage,
      },
    })), [currentStage])

  // Define edges between nodes
  const initialEdges = useMemo(() => [
    { id: 'e1', source: 'query', target: 'schema', animated: currentStage >= 0 },
    { id: 'e2', source: 'query', target: 'cache', animated: currentStage >= 0 },
    { id: 'e3', source: 'schema', target: 'llm', animated: currentStage >= 1 },
    { id: 'e4', source: 'cache', target: 'llm', animated: currentStage >= 2, style: { strokeDasharray: '5,5' } },
    { id: 'e5', source: 'llm', target: 'validate', animated: currentStage >= 3 },
    { id: 'e6', source: 'validate', target: 'execute', animated: currentStage >= 4 },
  ].map(edge => ({
    ...edge,
    type: 'smoothstep',
    style: { 
      stroke: currentStage >= parseInt(edge.id.slice(1)) 
        ? 'var(--color-accent)' 
        : 'var(--color-border-solid)',
      strokeWidth: 2,
      ...edge.style
    },
    markerEnd: {
      type: MarkerType.ArrowClosed,
      color: currentStage >= parseInt(edge.id.slice(1)) 
        ? 'var(--color-accent)' 
        : 'var(--color-border-solid)',
    },
  })), [currentStage])

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges)

  // Update nodes when currentStage changes
  useMemo(() => {
    setNodes(pipelineStages.map((stage, index) => ({
      id: stage.id,
      type: 'pipeline',
      position: stage.position,
      data: {
        ...stage,
        isActive: currentStage === index,
        isCompleted: currentStage > index,
        onSelect: setSelectedStage,
      },
    })))
    setEdges(initialEdges)
  }, [currentStage, setNodes, setEdges])

  // Play/pause animation
  const togglePlay = useCallback(() => {
    if (isPlaying) {
      setIsPlaying(false)
    } else {
      setIsPlaying(true)
      if (currentStage >= pipelineStages.length - 1) {
        setCurrentStage(-1)
      }
    }
  }, [isPlaying, currentStage])

  // Reset animation
  const reset = useCallback(() => {
    setIsPlaying(false)
    setCurrentStage(-1)
    setSelectedStage(null)
  }, [])

  // Animation timer
  useMemo(() => {
    if (!isPlaying) return
    
    const timer = setInterval(() => {
      setCurrentStage(prev => {
        if (prev >= pipelineStages.length - 1) {
          setIsPlaying(false)
          return prev
        }
        return prev + 1
      })
    }, 1200 / playbackSpeed)

    return () => clearInterval(timer)
  }, [isPlaying, playbackSpeed])

  // Calculate total latencies
  const legacyTotal = '25-30s'
  const optimizedTotal = '6-8s'
  const improvement = '75%'

  return (
    <div className="pipeline-player">
      {/* Header */}
      <div className="pipeline-header">
        <div className="pipeline-title-row">
          <div>
            <h3 className="pipeline-title">Production RAG / Text-to-SQL Pipeline</h3>
            <p className="pipeline-subtitle">Interactive visualization of the Alpha Copilot architecture</p>
          </div>
          <div className="pipeline-metrics">
            <div className="pipeline-metric">
              <span className="pipeline-metric-label">Legacy</span>
              <span className="pipeline-metric-value pipeline-metric-value--legacy">{legacyTotal}</span>
            </div>
            <div className="pipeline-metric-arrow">→</div>
            <div className="pipeline-metric">
              <span className="pipeline-metric-label">Optimized</span>
              <span className="pipeline-metric-value pipeline-metric-value--optimized">{optimizedTotal}</span>
            </div>
            <div className="pipeline-metric-badge">{improvement} faster</div>
          </div>
        </div>
        
        {/* Controls */}
        <div className="pipeline-controls">
          <button 
            onClick={togglePlay} 
            className="pipeline-btn pipeline-btn--primary"
            aria-label={isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying ? <Pause size={16} /> : <Play size={16} />}
            <span>{isPlaying ? 'Pause' : 'Play Animation'}</span>
          </button>
          <button 
            onClick={reset} 
            className="pipeline-btn"
            aria-label="Reset"
          >
            <RotateCcw size={16} />
            <span>Reset</span>
          </button>
          <div className="pipeline-speed">
            <span>Speed:</span>
            {[0.5, 1, 2].map(speed => (
              <button
                key={speed}
                onClick={() => setPlaybackSpeed(speed)}
                className={`pipeline-speed-btn ${playbackSpeed === speed ? 'pipeline-speed-btn--active' : ''}`}
              >
                {speed}x
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Flow diagram */}
      <div className="pipeline-canvas">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          nodeTypes={nodeTypes}
          fitView
          fitViewOptions={{ padding: 0.3 }}
          minZoom={0.5}
          maxZoom={1.5}
          nodesDraggable={false}
          nodesConnectable={false}
          elementsSelectable={true}
          panOnDrag={true}
          zoomOnScroll={true}
          attributionPosition="bottom-left"
        >
          <Background color="var(--color-border)" gap={20} size={1} />
          <Controls position="bottom-right" showInteractive={false} />
        </ReactFlow>
      </div>

      {/* Stage detail panel */}
      <AnimatePresence>
        {selectedStage && (
          <motion.div
            className="pipeline-detail"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.2 }}
          >
            <div className="pipeline-detail-header">
              <div className="pipeline-detail-title-row">
                <selectedStage.icon size={20} style={{ color: 'var(--color-accent)' }} />
                <h4>{selectedStage.label}</h4>
              </div>
              <button 
                onClick={() => setSelectedStage(null)} 
                className="pipeline-detail-close"
                aria-label="Close details"
              >
                <X size={16} />
              </button>
            </div>
            
            <p className="pipeline-detail-desc">{selectedStage.detail}</p>
            
            <div className="pipeline-detail-latencies">
              <div className="pipeline-detail-latency">
                <span className="pipeline-detail-latency-label">Legacy</span>
                <span className="pipeline-detail-latency-value pipeline-detail-latency-value--legacy">
                  {selectedStage.latencyLegacy}
                </span>
              </div>
              <div className="pipeline-detail-latency">
                <span className="pipeline-detail-latency-label">Optimized</span>
                <span className="pipeline-detail-latency-value pipeline-detail-latency-value--optimized">
                  {selectedStage.latencyOptimized}
                </span>
              </div>
            </div>
            
            {selectedStage.code && (
              <div className="pipeline-detail-code">
                <pre><code>{selectedStage.code}</code></pre>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Progress bar */}
      <div className="pipeline-progress">
        {pipelineStages.map((stage, index) => (
          <div 
            key={stage.id}
            className={`pipeline-progress-step ${currentStage >= index ? 'pipeline-progress-step--active' : ''} ${currentStage === index ? 'pipeline-progress-step--current' : ''}`}
          >
            <div className="pipeline-progress-dot" />
            <span className="pipeline-progress-label">{stage.label}</span>
          </div>
        ))}
      </div>

      <style>{`
        .pipeline-player {
          background: var(--color-surface);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-xl);
          overflow: hidden;
        }

        .pipeline-header {
          padding: 1.5rem;
          border-bottom: 1px solid var(--color-border);
        }

        .pipeline-title-row {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 1.5rem;
          margin-bottom: 1rem;
          flex-wrap: wrap;
        }

        .pipeline-title {
          font-family: var(--font-display);
          font-size: var(--text-lg);
          font-weight: var(--font-weight-semibold);
          color: var(--color-text);
          margin: 0 0 0.25rem;
        }

        .pipeline-subtitle {
          font-size: var(--text-sm);
          color: var(--color-text-muted);
          margin: 0;
        }

        .pipeline-metrics {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .pipeline-metric {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.15rem;
        }

        .pipeline-metric-label {
          font-size: 0.65rem;
          font-family: var(--font-mono);
          text-transform: uppercase;
          letter-spacing: var(--letter-spacing-wide);
          color: var(--color-text-subtle);
        }

        .pipeline-metric-value {
          font-family: var(--font-mono);
          font-size: var(--text-base);
          font-weight: var(--font-weight-semibold);
        }

        .pipeline-metric-value--legacy {
          color: var(--color-danger);
          text-decoration: line-through;
          opacity: 0.7;
        }

        .pipeline-metric-value--optimized {
          color: var(--color-accent);
        }

        .pipeline-metric-arrow {
          color: var(--color-text-subtle);
          font-size: 1.2rem;
        }

        .pipeline-metric-badge {
          padding: 0.25rem 0.5rem;
          background: var(--color-accent-soft);
          border: 1px solid var(--color-accent);
          border-radius: var(--radius-pill);
          font-family: var(--font-mono);
          font-size: 0.7rem;
          color: var(--color-accent);
          font-weight: var(--font-weight-medium);
        }

        .pipeline-controls {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          flex-wrap: wrap;
        }

        .pipeline-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem 1rem;
          background: var(--color-surface-raised);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-md);
          color: var(--color-text);
          font-size: var(--text-sm);
          font-weight: var(--font-weight-medium);
          cursor: pointer;
          transition: all var(--motion-duration-fast) var(--motion-ease);
        }

        .pipeline-btn:hover {
          border-color: var(--color-border-strong);
          background: var(--color-surface-elev);
        }

        .pipeline-btn--primary {
          background: var(--color-accent);
          border-color: var(--color-accent);
          color: var(--color-accent-fg);
        }

        .pipeline-btn--primary:hover {
          background: var(--color-accent-strong);
          border-color: var(--color-accent-strong);
        }

        .pipeline-speed {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-left: auto;
          font-size: var(--text-sm);
          color: var(--color-text-muted);
        }

        .pipeline-speed-btn {
          padding: 0.25rem 0.5rem;
          background: transparent;
          border: 1px solid var(--color-border);
          border-radius: var(--radius-sm);
          color: var(--color-text-muted);
          font-family: var(--font-mono);
          font-size: 0.7rem;
          cursor: pointer;
          transition: all var(--motion-duration-fast) var(--motion-ease);
        }

        .pipeline-speed-btn:hover {
          border-color: var(--color-border-strong);
        }

        .pipeline-speed-btn--active {
          background: var(--color-accent-soft);
          border-color: var(--color-accent);
          color: var(--color-accent);
        }

        .pipeline-canvas {
          height: 380px;
          background: var(--color-bg);
          position: relative;
        }

        .pipeline-canvas .react-flow__attribution {
          display: none;
        }

        .pipeline-canvas .react-flow__controls {
          background: var(--color-surface);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-md);
          box-shadow: var(--shadow-sm);
        }

        .pipeline-canvas .react-flow__controls-button {
          background: var(--color-surface);
          border: none;
          border-bottom: 1px solid var(--color-border);
          color: var(--color-text-muted);
        }

        .pipeline-canvas .react-flow__controls-button:hover {
          background: var(--color-surface-raised);
          color: var(--color-text);
        }

        .pipeline-canvas .react-flow__controls-button:last-child {
          border-bottom: none;
        }

        /* Custom node styles */
        .pipeline-node {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.75rem 1rem;
          background: var(--color-surface);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-lg);
          min-width: 180px;
          cursor: pointer;
          position: relative;
        }

        .pipeline-node--active {
          border-color: var(--color-accent);
          box-shadow: 0 0 20px rgba(100, 255, 218, 0.2);
        }

        .pipeline-node--completed {
          border-color: var(--color-success);
        }

        .pipeline-node--selected {
          border-color: var(--color-accent);
          box-shadow: 0 0 0 2px var(--color-accent-soft);
        }

        .pipeline-node-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 36px;
          height: 36px;
          border-radius: var(--radius-md);
          flex-shrink: 0;
        }

        .pipeline-node-content {
          flex: 1;
          min-width: 0;
        }

        .pipeline-node-label {
          font-size: var(--text-sm);
          font-weight: var(--font-weight-medium);
          color: var(--color-text);
          white-space: nowrap;
        }

        .pipeline-node-detail {
          font-size: 0.7rem;
          color: var(--color-text-muted);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .pipeline-node-latency {
          display: flex;
          align-items: center;
          gap: 0.25rem;
          padding: 0.15rem 0.4rem;
          background: var(--color-accent-soft);
          border-radius: var(--radius-sm);
          font-family: var(--font-mono);
          font-size: 0.6rem;
          color: var(--color-accent);
          position: absolute;
          top: -8px;
          right: 8px;
        }

        .pipeline-handle {
          width: 8px;
          height: 8px;
          background: var(--color-border-solid);
          border: 2px solid var(--color-surface);
        }

        /* Detail panel */
        .pipeline-detail {
          position: absolute;
          top: 60px;
          right: 16px;
          width: 320px;
          max-height: calc(100% - 120px);
          background: var(--color-surface);
          border: 1px solid var(--color-border-strong);
          border-radius: var(--radius-lg);
          box-shadow: var(--shadow-lg);
          overflow: hidden;
          z-index: 10;
        }

        .pipeline-detail-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1rem;
          border-bottom: 1px solid var(--color-border);
        }

        .pipeline-detail-title-row {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .pipeline-detail-title-row h4 {
          margin: 0;
          font-size: var(--text-base);
          font-weight: var(--font-weight-semibold);
          color: var(--color-text);
        }

        .pipeline-detail-close {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 28px;
          height: 28px;
          background: transparent;
          border: none;
          border-radius: var(--radius-sm);
          color: var(--color-text-muted);
          cursor: pointer;
          transition: all var(--motion-duration-fast) var(--motion-ease);
        }

        .pipeline-detail-close:hover {
          background: var(--color-surface-raised);
          color: var(--color-text);
        }

        .pipeline-detail-desc {
          padding: 0 1rem;
          margin: 0.75rem 0;
          font-size: var(--text-sm);
          color: var(--color-text-muted);
        }

        .pipeline-detail-latencies {
          display: flex;
          gap: 1rem;
          padding: 0 1rem 1rem;
        }

        .pipeline-detail-latency {
          display: flex;
          flex-direction: column;
          gap: 0.15rem;
        }

        .pipeline-detail-latency-label {
          font-size: 0.65rem;
          font-family: var(--font-mono);
          text-transform: uppercase;
          letter-spacing: var(--letter-spacing-wide);
          color: var(--color-text-subtle);
        }

        .pipeline-detail-latency-value {
          font-family: var(--font-mono);
          font-size: var(--text-sm);
          font-weight: var(--font-weight-medium);
        }

        .pipeline-detail-latency-value--legacy {
          color: var(--color-danger);
        }

        .pipeline-detail-latency-value--optimized {
          color: var(--color-accent);
        }

        .pipeline-detail-code {
          background: var(--color-bg);
          border-top: 1px solid var(--color-border);
          padding: 1rem;
          max-height: 200px;
          overflow: auto;
        }

        .pipeline-detail-code pre {
          margin: 0;
        }

        .pipeline-detail-code code {
          font-family: var(--font-mono);
          font-size: 0.7rem;
          line-height: 1.6;
          color: var(--color-text-muted);
          white-space: pre;
        }

        /* Progress bar */
        .pipeline-progress {
          display: flex;
          justify-content: space-between;
          padding: 1rem 1.5rem;
          border-top: 1px solid var(--color-border);
          background: var(--color-bg);
        }

        .pipeline-progress-step {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.35rem;
          flex: 1;
          position: relative;
        }

        .pipeline-progress-step:not(:last-child)::after {
          content: '';
          position: absolute;
          top: 6px;
          left: 50%;
          width: 100%;
          height: 2px;
          background: var(--color-border);
          z-index: 0;
        }

        .pipeline-progress-step--active:not(:last-child)::after {
          background: var(--color-accent);
        }

        .pipeline-progress-dot {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: var(--color-border);
          border: 2px solid var(--color-bg);
          position: relative;
          z-index: 1;
          transition: all var(--motion-duration-fast) var(--motion-ease);
        }

        .pipeline-progress-step--active .pipeline-progress-dot {
          background: var(--color-accent);
        }

        .pipeline-progress-step--current .pipeline-progress-dot {
          box-shadow: 0 0 0 4px var(--color-accent-soft);
        }

        .pipeline-progress-label {
          font-size: 0.6rem;
          font-family: var(--font-mono);
          text-transform: uppercase;
          letter-spacing: var(--letter-spacing-wide);
          color: var(--color-text-subtle);
          text-align: center;
          white-space: nowrap;
          transition: color var(--motion-duration-fast) var(--motion-ease);
        }

        .pipeline-progress-step--active .pipeline-progress-label {
          color: var(--color-accent);
        }

        @media (max-width: 768px) {
          .pipeline-canvas {
            height: 300px;
          }
          
          .pipeline-detail {
            position: fixed;
            top: auto;
            bottom: 0;
            left: 0;
            right: 0;
            width: 100%;
            max-height: 50vh;
            border-radius: var(--radius-xl) var(--radius-xl) 0 0;
          }

          .pipeline-progress {
            overflow-x: auto;
            justify-content: flex-start;
            gap: 1rem;
          }

          .pipeline-progress-step {
            flex: 0 0 auto;
          }

          .pipeline-progress-step::after {
            display: none;
          }

          .pipeline-metrics {
            flex-wrap: wrap;
          }
        }
      `}</style>
    </div>
  )
}
