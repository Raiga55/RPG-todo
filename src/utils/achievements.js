export const ACHIEVEMENTS = [
  { id: 'first',      icon: '🗡️', title: '初めての一歩',   desc: '最初のクエストを完了する' },
  { id: 'complete10', icon: '📜', title: 'クエストマスター', desc: '10個のクエストを完了する' },
  { id: 'complete50', icon: '👑', title: '伝説の冒険者',    desc: '50個のクエストを完了する' },
  { id: 'hard3',      icon: '🔥', title: '難題討伐者',      desc: '難易度:難を3回完了する' },
  { id: 'hard10',     icon: '💀', title: '真の猛者',        desc: '難易度:難を10回完了する' },
  { id: 'lv5',        icon: '⚔️', title: '見習い冒険者',   desc: 'レベル5に到達する' },
  { id: 'lv10',       icon: '🛡️', title: '熟練の剣士',    desc: 'レベル10に到達する' },
  { id: 'lv20',       icon: '🌟', title: '英雄',            desc: 'レベル20に到達する' },
  { id: 'streak3',    icon: '💫', title: '三日坊主返上',    desc: '3日連続でログインする' },
  { id: 'streak7',    icon: '⚡', title: '七連撃',          desc: '7日連続でログインする' },
]

export const checkAchievements = (stats, unlocked) => {
  const conditions = {
    first:      stats.totalCompleted >= 1,
    complete10: stats.totalCompleted >= 10,
    complete50: stats.totalCompleted >= 50,
    hard3:      stats.hardCompleted >= 3,
    hard10:     stats.hardCompleted >= 10,
    lv5:        stats.level >= 5,
    lv10:       stats.level >= 10,
    lv20:       stats.level >= 20,
    streak3:    stats.streak >= 3,
    streak7:    stats.streak >= 7,
  }
  return Object.entries(conditions)
    .filter(([id, met]) => met && !unlocked.includes(id))
    .map(([id]) => id)
}
