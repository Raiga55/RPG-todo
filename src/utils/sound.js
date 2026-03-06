let ctx = null

const getCtx = () => {
  if (!ctx) ctx = new (window.AudioContext || window.webkitAudioContext)()
  return ctx
}

const tone = (freq, start, duration, gain = 0.25, type = 'sine') => {
  const c = getCtx()
  const osc = c.createOscillator()
  const g = c.createGain()
  osc.connect(g)
  g.connect(c.destination)
  osc.type = type
  osc.frequency.setValueAtTime(freq, start)
  g.gain.setValueAtTime(gain, start)
  g.gain.exponentialRampToValueAtTime(0.001, start + duration)
  osc.start(start)
  osc.stop(start + duration)
}

export const playComplete = () => {
  try {
    const c = getCtx()
    const t = c.currentTime
    tone(523.25, t, 0.12)
    tone(659.25, t + 0.1, 0.12)
    tone(783.99, t + 0.2, 0.22)
  } catch (_) {}
}

export const playLevelUp = () => {
  try {
    const c = getCtx()
    const t = c.currentTime
    ;[523.25, 659.25, 783.99, 1046.5].forEach((f, i) => tone(f, t + i * 0.1, 0.15, 0.3))
    tone(1046.5, t + 0.5, 0.6, 0.35)
  } catch (_) {}
}

export const playAchievement = () => {
  try {
    const c = getCtx()
    const t = c.currentTime
    tone(880, t, 0.1, 0.2)
    tone(1108.73, t + 0.12, 0.15, 0.2)
    tone(1318.51, t + 0.26, 0.35, 0.25)
  } catch (_) {}
}
