import { useState, useEffect, useRef } from 'react'

const HEROES = [
  { minLevel: 1,  art: '🧍', name: 'ボロ布の旅人',   equip: 'ボロ布 ＋ 木の棒',       color: '#7070a0' },
  { minLevel: 3,  art: '🧝', name: '革装備の戦士',   equip: '革の鎧 ＋ 短剣',         color: '#c08030' },
  { minLevel: 5,  art: '🧙', name: '鉄剣の剣士',     equip: '鉄の剣 ＋ 鉄の盾',       color: '#5080e0' },
  { minLevel: 10, art: '🦸', name: 'マントの勇者',   equip: '聖剣 ＋ 魔法のマント',   color: '#f0c040' },
]

const getStage = (level) =>
  [...HEROES].reverse().find((h) => level >= h.minLevel) ?? HEROES[0]

export const Hero = ({ level }) => {
  const [evolving, setEvolving] = useState(false)
  const prevStageRef = useRef(null)

  useEffect(() => {
    const stage = getStage(level)
    if (prevStageRef.current !== null && prevStageRef.current !== stage) {
      setEvolving(true)
      setTimeout(() => setEvolving(false), 1500)
    }
    prevStageRef.current = stage
  }, [level])

  const stage = getStage(level)

  return (
    <div className="hero-card">
      <div className={`hero-art-wrap ${evolving ? 'hero-evolving' : ''}`}>
        <span className="hero-art">{stage.art}</span>
        {evolving && <span className="evolve-text">進化！</span>}
      </div>
      <div className="hero-name" style={{ color: stage.color }}>{stage.name}</div>
      <div className="hero-equip">{stage.equip}</div>
    </div>
  )
}
