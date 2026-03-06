import { useEffect } from 'react'
import { ACHIEVEMENTS } from '../utils/achievements'
import { playAchievement } from '../utils/sound'

export const AchievementToast = ({ queue, onPop }) => {
  const id = queue[0]
  const ach = id ? ACHIEVEMENTS.find((a) => a.id === id) : null

  useEffect(() => {
    if (!id) return
    playAchievement()
    const t = setTimeout(onPop, 3500)
    return () => clearTimeout(t)
  }, [id])

  if (!ach) return null

  return (
    <div className="achievement-toast" role="alert">
      <span className="ach-icon">{ach.icon}</span>
      <div className="ach-info">
        <div className="ach-unlocked">実績解除！</div>
        <div className="ach-title">{ach.title}</div>
        <div className="ach-desc">{ach.desc}</div>
      </div>
    </div>
  )
}
