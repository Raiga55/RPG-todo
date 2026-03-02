import { calcLevel, xpToNextLevel } from '../utils/rpg'

const RANK_LABELS = ['E', 'D', 'C', 'B', 'A', 'S', 'SS', 'SSS']
const rank = (level) => RANK_LABELS[Math.min(level - 1, RANK_LABELS.length - 1)]

export const PlayerStatus = ({ totalXp }) => {
  const { level, xpInCurrentLevel } = calcLevel(totalXp)
  const needed = xpToNextLevel(level)
  const pct = Math.min((xpInCurrentLevel / needed) * 100, 100)

  return (
    <div className="player-status">
      <div className="player-header">
        <span className="rank-badge">Rank {rank(level)}</span>
        <h2 className="level-text">Lv. {level}</h2>
        <span className="total-xp">{totalXp} XP total</span>
      </div>
      <div className="xp-bar-wrapper">
        <div className="xp-bar-track">
          <div className="xp-bar-fill" style={{ width: `${pct}%` }} />
        </div>
        <div className="xp-label">
          {xpInCurrentLevel} / {needed} XP
        </div>
      </div>
    </div>
  )
}
