// AI Pipeline Player - Pure CSS/SVG visualization (no react-flow dependency)
import { useState, useCallback, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
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
    query_embedding = embed(query)
    candidates = find_similar_columns(query_embedding, k=10)
    return [c for c in candidates if c.score > 0.8]`,
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
    if cached := await redis.get(f"sql:{query_hash}"):
        return cached
    similar = await vector_db.search(query, threshold=0.95)
    return similar[0].sql if similar else None`,
  },
  {
    id: 'llm',
    label: 'LLM Generation',
    icon: Brain,
    detail: 'GPT-4o / Llama 3.1 SQL generation',
    latencyLegacy: '18-22s',
    latencyOptimized: '3-4s',
    code: `# Few-shot SQL generation with GPT-4o
response = await openai.chat.completions.create(
    model="gpt-4o",
    messages=[{"role": "user", "content": prompt}],
    temperature=0
)`,
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
    parsed = sqlparse.parse(sql)[0]
    if contains_dangerous_ops(parsed):
        raise SecurityError("Blocked operation")
    validate_schema_refs(parsed, schema)
    return ValidationResult(valid=True, sql=sql)`,
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
    result = await db.execute(sql, timeout=30)
    chart_type = detect_chart_type(result.columns, result.rows)
    viz_config = generate_viz(chart_type, result)
    await cache_result(sql, result, ttl=3600)
    return {"data": result, "visualization": viz_config}`,
  },
]

// Individual pipeline stage node
function PipelineNode({ stage, index, isActive, isCompleted, onClick }) {
  const Icon = stage.icon
  
  return (
    <motion.button
      className="pipeline-node"
      onClick={onClick}
      initial={{ opacity: 0, y: 20 }}
      animate={{ 
        opacity: 1, 
        y: 0,
        borderColor: isActive 
          ? 'var(--color-accent)' 
          : isCompleted 
            ? 'var(--color-success, #10b981)' 
            : 'var(--color-border)',
        background: isActive 
          ? 'var(--color-accent-soft, rgba(77, 184, 255, 0.1))' 
          : 'var(--color-surface)',
      }}
      whileHover={{ scale: 1.02, y: -2 }}
      transition={{ duration: 0.2, delay: index * 0.05 }}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '0.5rem',
        padding: '1rem',
        border: '1px solid var(--color-border)',
        borderRadius: 'var(--radius-lg, 12px)',
        cursor: 'pointer',
        minWidth: '120px',
        flex: 1,
        position: 'relative',
      }}
    >
      <div 
        style={{
          width: 40,
          height: 40,
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: isActive || isCompleted 
            ? 'var(--color-accent-soft, rgba(77, 184, 255, 0.15))' 
            : 'var(--color-surface-raised, #1a3a5c)',
          transition: 'background 0.2s ease',
        }}
      >
        <Icon 
          size={18} 
          style={{ 
            color: isActive || isCompleted 
              ? 'var(--color-accent, #4db8ff)' 
              : 'var(--color-text-muted, #8892b0)' 
          }} 
        />
      </div>
      
      <span style={{
        fontSize: '0.8rem',
        fontWeight: 600,
        color: 'var(--color-text, #e6f1ff)',
        textAlign: 'center',
      }}>
        {stage.label}
      </span>
      
      <span style={{
        fontSize: '0.65rem',
        color: 'var(--color-text-muted, #8892b0)',
        textAlign: 'center',
      }}>
        {stage.detail}
      </span>
      
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.25rem',
        marginTop: '0.25rem',
        fontSize: '0.65rem',
        fontFamily: 'var(--font-mono, monospace)',
        color: 'var(--color-accent, #4db8ff)',
      }}>
        <Clock size={10} />
        <span>{stage.latencyOptimized}</span>
      </div>
      
      {/* Connector arrow (except last) */}
      {index < pipelineStages.length - 1 && (
        <div style={{
          position: 'absolute',
          right: -20,
          top: '50%',
          transform: 'translateY(-50%)',
          width: 40,
          height: 2,
          display: 'flex',
          alignItems: 'center',
          zIndex: 10,
        }}>
          <motion.div
            style={{
              flex: 1,
              height: 2,
              background: isCompleted 
                ? 'var(--color-accent, #4db8ff)' 
                : 'var(--color-border, #1e3a5c)',
              borderRadius: 1,
            }}
            animate={{
              background: isCompleted 
                ? 'var(--color-accent, #4db8ff)' 
                : 'var(--color-border, #1e3a5c)',
            }}
            transition={{ duration: 0.3 }}
          />
          <div style={{
            width: 0,
            height: 0,
            borderTop: '4px solid transparent',
            borderBottom: '4px solid transparent',
            borderLeft: isCompleted 
              ? '6px solid var(--color-accent, #4db8ff)' 
              : '6px solid var(--color-border, #1e3a5c)',
            transition: 'border-left-color 0.3s ease',
          }} />
        </div>
      )}
    </motion.button>
  )
}

export default function AIPipelinePlayer() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentStage, setCurrentStage] = useState(-1)
  const [selectedStage, setSelectedStage] = useState(null)
  const [playbackSpeed, setPlaybackSpeed] = useState(1)
  const intervalRef = useRef(null)

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
  useEffect(() => {
    if (!isPlaying) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
      return
    }
    
    intervalRef.current = setInterval(() => {
      setCurrentStage(prev => {
        if (prev >= pipelineStages.length - 1) {
          setIsPlaying(false)
          return prev
        }
        return prev + 1
      })
    }, 1200 / playbackSpeed)

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isPlaying, playbackSpeed])

  // Calculate total latencies
  const legacyTotal = '25-30s'
  const optimizedTotal = '6-8s'
  const improvement = '75%'

  return (
    <div style={{
      background: 'var(--color-surface, #0f2744)',
      border: '1px solid var(--color-border, #1e3a5c)',
      borderRadius: 'var(--radius-xl, 16px)',
      overflow: 'hidden',
    }}>
      {/* Header */}
      <div style={{
        padding: '1.5rem',
        borderBottom: '1px solid var(--color-border, #1e3a5c)',
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          gap: '1.5rem',
          marginBottom: '1rem',
          flexWrap: 'wrap',
        }}>
          <div>
            <h3 style={{
              fontFamily: 'var(--font-display, Inter)',
              fontSize: '1.125rem',
              fontWeight: 600,
              color: 'var(--color-text, #e6f1ff)',
              margin: '0 0 0.25rem',
            }}>
              Production RAG / Text-to-SQL Pipeline
            </h3>
            <p style={{
              fontSize: '0.875rem',
              color: 'var(--color-text-muted, #8892b0)',
              margin: 0,
            }}>
              Interactive visualization of the Alpha Copilot architecture
            </p>
          </div>
          
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
          }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.15rem' }}>
              <span style={{
                fontSize: '0.65rem',
                fontFamily: 'var(--font-mono, monospace)',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                color: 'var(--color-text-subtle, #64748b)',
              }}>Legacy</span>
              <span style={{
                fontFamily: 'var(--font-mono, monospace)',
                fontSize: '1rem',
                fontWeight: 600,
                color: '#ef4444',
                textDecoration: 'line-through',
                opacity: 0.7,
              }}>{legacyTotal}</span>
            </div>
            <span style={{ color: 'var(--color-text-subtle, #64748b)', fontSize: '1.2rem' }}>→</span>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.15rem' }}>
              <span style={{
                fontSize: '0.65rem',
                fontFamily: 'var(--font-mono, monospace)',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                color: 'var(--color-text-subtle, #64748b)',
              }}>Optimized</span>
              <span style={{
                fontFamily: 'var(--font-mono, monospace)',
                fontSize: '1rem',
                fontWeight: 600,
                color: 'var(--color-accent, #4db8ff)',
              }}>{optimizedTotal}</span>
            </div>
            <span style={{
              padding: '0.25rem 0.5rem',
              background: 'var(--color-accent-soft, rgba(77, 184, 255, 0.1))',
              border: '1px solid var(--color-accent, #4db8ff)',
              borderRadius: '9999px',
              fontFamily: 'var(--font-mono, monospace)',
              fontSize: '0.7rem',
              color: 'var(--color-accent, #4db8ff)',
              fontWeight: 500,
            }}>
              {improvement} faster
            </span>
          </div>
        </div>
        
        {/* Controls */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          flexWrap: 'wrap',
        }}>
          <button 
            onClick={togglePlay}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.5rem 1rem',
              background: 'var(--color-accent, #4db8ff)',
              border: '1px solid var(--color-accent, #4db8ff)',
              borderRadius: '8px',
              color: '#0a192f',
              fontSize: '0.875rem',
              fontWeight: 500,
              cursor: 'pointer',
              transition: 'all 0.15s ease',
            }}
          >
            {isPlaying ? <Pause size={16} /> : <Play size={16} />}
            <span>{isPlaying ? 'Pause' : 'Play Animation'}</span>
          </button>
          
          <button 
            onClick={reset}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.5rem 1rem',
              background: 'var(--color-surface-raised, #1a3a5c)',
              border: '1px solid var(--color-border, #1e3a5c)',
              borderRadius: '8px',
              color: 'var(--color-text, #e6f1ff)',
              fontSize: '0.875rem',
              fontWeight: 500,
              cursor: 'pointer',
              transition: 'all 0.15s ease',
            }}
          >
            <RotateCcw size={16} />
            <span>Reset</span>
          </button>
          
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            marginLeft: 'auto',
            fontSize: '0.875rem',
            color: 'var(--color-text-muted, #8892b0)',
          }}>
            <span>Speed:</span>
            {[0.5, 1, 2].map(speed => (
              <button
                key={speed}
                onClick={() => setPlaybackSpeed(speed)}
                style={{
                  padding: '0.25rem 0.5rem',
                  background: playbackSpeed === speed 
                    ? 'var(--color-accent-soft, rgba(77, 184, 255, 0.1))' 
                    : 'transparent',
                  border: `1px solid ${playbackSpeed === speed 
                    ? 'var(--color-accent, #4db8ff)' 
                    : 'var(--color-border, #1e3a5c)'}`,
                  borderRadius: '4px',
                  color: playbackSpeed === speed 
                    ? 'var(--color-accent, #4db8ff)' 
                    : 'var(--color-text-muted, #8892b0)',
                  fontFamily: 'var(--font-mono, monospace)',
                  fontSize: '0.7rem',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                }}
              >
                {speed}x
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Pipeline visualization */}
      <div style={{
        padding: '2rem 1.5rem',
        background: 'var(--color-bg, #0a192f)',
        overflowX: 'auto',
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'stretch',
          gap: '2.5rem',
          minWidth: 'max-content',
          paddingRight: '1rem',
        }}>
          {pipelineStages.map((stage, index) => (
            <PipelineNode
              key={stage.id}
              stage={stage}
              index={index}
              isActive={currentStage === index}
              isCompleted={currentStage > index}
              onClick={() => setSelectedStage(stage)}
            />
          ))}
        </div>
      </div>

      {/* Stage detail panel */}
      <AnimatePresence>
        {selectedStage && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            style={{
              borderTop: '1px solid var(--color-border, #1e3a5c)',
              overflow: 'hidden',
            }}
          >
            <div style={{ padding: '1.5rem' }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '1rem',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <selectedStage.icon size={20} style={{ color: 'var(--color-accent, #4db8ff)' }} />
                  <h4 style={{
                    margin: 0,
                    fontSize: '1rem',
                    fontWeight: 600,
                    color: 'var(--color-text, #e6f1ff)',
                  }}>
                    {selectedStage.label}
                  </h4>
                </div>
                <button 
                  onClick={() => setSelectedStage(null)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 28,
                    height: 28,
                    background: 'transparent',
                    border: '1px solid var(--color-border, #1e3a5c)',
                    borderRadius: '6px',
                    color: 'var(--color-text-muted, #8892b0)',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                  }}
                >
                  <X size={14} />
                </button>
              </div>
              
              <p style={{
                fontSize: '0.875rem',
                color: 'var(--color-text-muted, #8892b0)',
                margin: '0 0 1rem',
              }}>
                {selectedStage.detail}
              </p>
              
              <div style={{
                display: 'flex',
                gap: '1.5rem',
                marginBottom: '1rem',
              }}>
                <div>
                  <span style={{
                    fontSize: '0.65rem',
                    fontFamily: 'var(--font-mono, monospace)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    color: 'var(--color-text-subtle, #64748b)',
                  }}>Legacy</span>
                  <div style={{
                    fontFamily: 'var(--font-mono, monospace)',
                    fontSize: '1rem',
                    fontWeight: 600,
                    color: '#ef4444',
                    textDecoration: 'line-through',
                    opacity: 0.7,
                  }}>{selectedStage.latencyLegacy}</div>
                </div>
                <div>
                  <span style={{
                    fontSize: '0.65rem',
                    fontFamily: 'var(--font-mono, monospace)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    color: 'var(--color-text-subtle, #64748b)',
                  }}>Optimized</span>
                  <div style={{
                    fontFamily: 'var(--font-mono, monospace)',
                    fontSize: '1rem',
                    fontWeight: 600,
                    color: 'var(--color-accent, #4db8ff)',
                  }}>{selectedStage.latencyOptimized}</div>
                </div>
              </div>
              
              {selectedStage.code && (
                <pre style={{
                  margin: 0,
                  padding: '1rem',
                  background: 'var(--color-bg, #0a192f)',
                  border: '1px solid var(--color-border, #1e3a5c)',
                  borderRadius: '8px',
                  overflow: 'auto',
                  fontSize: '0.75rem',
                  fontFamily: 'var(--font-mono, monospace)',
                  color: 'var(--color-text-muted, #8892b0)',
                  lineHeight: 1.6,
                }}>
                  <code>{selectedStage.code}</code>
                </pre>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Progress bar */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        padding: '1rem 1.5rem',
        borderTop: '1px solid var(--color-border, #1e3a5c)',
        overflowX: 'auto',
      }}>
        {pipelineStages.map((stage, index) => (
          <div 
            key={stage.id}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              flex: index === pipelineStages.length - 1 ? 0 : 1,
            }}
          >
            <motion.div
              style={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                flexShrink: 0,
              }}
              animate={{
                background: currentStage >= index 
                  ? 'var(--color-accent, #4db8ff)' 
                  : 'var(--color-border, #1e3a5c)',
                boxShadow: currentStage === index 
                  ? '0 0 8px var(--color-accent, #4db8ff)' 
                  : 'none',
              }}
              transition={{ duration: 0.2 }}
            />
            <span style={{
              fontSize: '0.65rem',
              fontFamily: 'var(--font-mono, monospace)',
              color: currentStage >= index 
                ? 'var(--color-text, #e6f1ff)' 
                : 'var(--color-text-subtle, #64748b)',
              whiteSpace: 'nowrap',
              transition: 'color 0.2s ease',
            }}>
              {stage.label}
            </span>
            {index < pipelineStages.length - 1 && (
              <motion.div
                style={{
                  flex: 1,
                  height: 1,
                  minWidth: 20,
                  borderRadius: 1,
                }}
                animate={{
                  background: currentStage > index 
                    ? 'var(--color-accent, #4db8ff)' 
                    : 'var(--color-border, #1e3a5c)',
                }}
                transition={{ duration: 0.2 }}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
