import { useState, useEffect, useRef } from 'react'
import { STAGES, getStage } from '../utils/stages'

export const Hero = ({ level }) => {
  const [evolving, setEvolving] = useState(false)
  const prevStageRef = useRef(null)

  useEffect(() => {
    const stage = getStage(level)
    if (prevStageRef.current !== null && prevStageRef.current.stageIndex !== stage.stageIndex) {
      setEvolving(true)
      setTimeout(() => setEvolving(false), 2000)
    }
    prevStageRef.current = stage
  }, [level])

  const stage = getStage(level)

  return (
    <div className="hero-card">
      <div className={`hero-art-wrap ${evolving ? 'hero-evolving' : ''}`}>
        <div
          className="hero-emoji"
          data-stage={stage.stageIndex}
          role="img"
          aria-label={stage.name}
        >
          {stage.emoji}
        </div>
        {evolving && <span className="evolve-text">進化！</span>}
        {evolving && <div className="evolve-ring" />}
      </div>
      <div className="hero-name" style={{ color: stage.color }}>{stage.name}</div>
      <div className="hero-equip">{stage.equip}</div>
      <div className="hero-level-bar">
        <span className="hero-lv-label">Lv.{level}</span>
        {stage.stageIndex < STAGES.length && (
          <span className="hero-next-label">
            次の進化: Lv.{STAGES[stage.stageIndex]?.minLevel}
          </span>
        )}
      </div>
    </div>
  )
}
