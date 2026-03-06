import { useState } from 'react'
import { ACHIEVEMENTS } from '../utils/achievements'

export const AchievementsPanel = ({ unlocked }) => {
  const [open, setOpen] = useState(false)
  const count = unlocked.length

  return (
    <div className="achievements-panel">
      <button className="achievements-toggle" onClick={() => setOpen((v) => !v)}>
        🏆 実績 <span className="ach-count">{count} / {ACHIEVEMENTS.length}</span>
        <span className="ach-chevron">{open ? '▲' : '▼'}</span>
      </button>
      {open && (
        <div className="achievements-grid">
          {ACHIEVEMENTS.map((ach) => {
            const isUnlocked = unlocked.includes(ach.id)
            return (
              <div
                key={ach.id}
                className={`ach-card ${isUnlocked ? 'unlocked' : 'locked'}`}
                title={isUnlocked ? ach.desc : '???'}
              >
                <span className="ach-card-icon">{isUnlocked ? ach.icon : '🔒'}</span>
                <div className="ach-card-title">{isUnlocked ? ach.title : '???'}</div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
