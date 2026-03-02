import { useState, useEffect, useRef } from 'react'

// 左から順に Lv1, Lv3, Lv5, Lv10 の4分割スプライト
const HEROES = [
  { minLevel: 1,  spriteIndex: 0, name: 'ボロ布の旅人',   equip: 'ボロ布 ＋ 木の棒',     color: '#7070a0' },
  { minLevel: 3,  spriteIndex: 1, name: '革装備の戦士',   equip: '革の鎧 ＋ 短剣',       color: '#c08030' },
  { minLevel: 5,  spriteIndex: 2, name: '鉄剣の剣士',     equip: '鉄の剣 ＋ 鉄の盾',     color: '#5080e0' },
  { minLevel: 10, spriteIndex: 3, name: 'マントの勇者',   equip: '聖剣 ＋ 魔法のマント', color: '#f0c040' },
]

const getStage = (level) =>
  [...HEROES].reverse().find((h) => level >= h.minLevel) ?? HEROES[0]

// 4分割スプライトのX位置を計算 (0%, 33.33%, 66.67%, 100%)
const spriteX = (index) => (index === 0 ? 0 : (index / (HEROES.length - 1)) * 100)

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
        <div
          className="hero-art"
          style={{ backgroundPosition: `${spriteX(stage.spriteIndex)}% center` }}
          aria-label={stage.name}
        />
        {evolving && <span className="evolve-text">進化！</span>}
      </div>
      <div className="hero-name" style={{ color: stage.color }}>{stage.name}</div>
      <div className="hero-equip">{stage.equip}</div>
    </div>
  )
}
