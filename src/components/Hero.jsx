import { useState, useEffect, useRef } from 'react'

const STAGES = [
  { minLevel: 1,  emoji: '🌱', name: 'ボロ布の旅人',    equip: '木の棒・ぼろぬの',              color: '#9090b0', stageIndex: 1 },
  { minLevel: 5,  emoji: '🗡️', name: '駆け出し冒険者', equip: '短剣・革の鎧',                  color: '#c09040', stageIndex: 2 },
  { minLevel: 10, emoji: '⚔️', name: '鉄の剣士',       equip: '鉄の剣・鉄の鎧',               color: '#4080e0', stageIndex: 3 },
  { minLevel: 15, emoji: '🛡️', name: '銀の騎士',       equip: '銀の剣・フルプレートアーマー',   color: '#a0c8f8', stageIndex: 4 },
  { minLevel: 20, emoji: '🔮', name: '魔法剣士',         equip: '魔法の剣・エンチャント鎧',       color: '#c050f0', stageIndex: 5 },
  { minLevel: 30, emoji: '💫', name: '英雄',             equip: '聖剣・英雄の鎧',               color: '#f0c040', stageIndex: 6 },
  { minLevel: 50, emoji: '👑', name: '伝説の勇者',       equip: '神話の剣・神の鎧',              color: '#ff6040', stageIndex: 7 },
]

const getStage = (level) =>
  [...STAGES].reverse().find((s) => level >= s.minLevel) ?? STAGES[0]

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
