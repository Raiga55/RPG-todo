// XP required to reach the next level
export const xpToNextLevel = (level) => level * 100

// Calculate level from total XP
export const calcLevel = (totalXp) => {
  let level = 1
  let xpUsed = 0
  while (xpUsed + xpToNextLevel(level) <= totalXp) {
    xpUsed += xpToNextLevel(level)
    level++
  }
  return { level, xpInCurrentLevel: totalXp - xpUsed }
}

// XP reward per task difficulty
export const XP_REWARD = {
  easy: 30,
  normal: 50,
  hard: 100,
}
