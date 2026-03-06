export const STAGES = [
  { minLevel: 1,  emoji: '🌱', name: 'ボロ布の旅人',    equip: '木の棒・ぼろぬの',               color: '#9090b0', stageIndex: 1 },
  { minLevel: 5,  emoji: '🗡️', name: '駆け出し冒険者', equip: '短剣・革の鎧',                   color: '#c09040', stageIndex: 2 },
  { minLevel: 10, emoji: '⚔️', name: '鉄の剣士',       equip: '鉄の剣・鉄の鎧',                color: '#4080e0', stageIndex: 3 },
  { minLevel: 15, emoji: '🛡️', name: '銀の騎士',       equip: '銀の剣・フルプレートアーマー',    color: '#a0c8f8', stageIndex: 4 },
  { minLevel: 20, emoji: '🔮', name: '魔法剣士',         equip: '魔法の剣・エンチャント鎧',        color: '#c050f0', stageIndex: 5 },
  { minLevel: 30, emoji: '💫', name: '英雄',             equip: '聖剣・英雄の鎧',                color: '#f0c040', stageIndex: 6 },
  { minLevel: 50, emoji: '👑', name: '伝説の勇者',       equip: '神話の剣・神の鎧',               color: '#ff6040', stageIndex: 7 },
]

export const getStage = (level) =>
  [...STAGES].reverse().find((s) => level >= s.minLevel) ?? STAGES[0]
