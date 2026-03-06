import { useState, useEffect } from 'react'
import { useLocalStorage } from './hooks/useLocalStorage'
import { PlayerStatus } from './components/PlayerStatus'
import { Hero } from './components/Hero'
import { TodoForm } from './components/TodoForm'
import { TodoList } from './components/TodoList'
import { AchievementToast } from './components/AchievementToast'
import { AchievementsPanel } from './components/AchievementsPanel'
import { XP_REWARD, calcLevel, xpToNextLevel } from './utils/rpg'
import { playComplete, playLevelUp } from './utils/sound'
import { checkAchievements } from './utils/achievements'
import './App.css'

const createTodo = (text, difficulty, category) => ({
  id: crypto.randomUUID(),
  text,
  difficulty,
  category,
  completed: false,
  createdAt: Date.now(),
})

const todayStr = () => new Date().toISOString().slice(0, 10)

export default function App() {
  const [todos, setTodos] = useLocalStorage('rpg-todos', [])
  const [totalXp, setTotalXp] = useLocalStorage('rpg-totalXp', 0)
  const [stats, setStats] = useLocalStorage('rpg-stats', { totalCompleted: 0, hardCompleted: 0 })
  const [unlockedAch, setUnlockedAch] = useLocalStorage('rpg-achievements', [])
  const [streak, setStreak] = useLocalStorage('rpg-streak', { count: 0, lastDate: '' })
  const [levelUpMsg, setLevelUpMsg] = useState(null)
  const [achQueue, setAchQueue] = useState([])

  // Daily login streak
  useEffect(() => {
    const today = todayStr()
    if (streak.lastDate === today) return
    const yesterday = new Date()
    yesterday.setDate(yesterday.getDate() - 1)
    const isConsecutive = streak.lastDate === yesterday.toISOString().slice(0, 10)
    const newCount = isConsecutive ? streak.count + 1 : 1
    const newStreak = { count: newCount, lastDate: today }
    setStreak(newStreak)

    const newUnlocks = checkAchievements(
      { totalCompleted: stats.totalCompleted, hardCompleted: stats.hardCompleted, level: calcLevel(totalXp).level, streak: newCount },
      unlockedAch
    )
    if (newUnlocks.length > 0) {
      setUnlockedAch((prev) => [...prev, ...newUnlocks])
      setAchQueue((q) => [...q, ...newUnlocks])
    }
  }, [])

  const handleAdd = ({ text, difficulty, category }) => {
    setTodos((prev) => [...prev, createTodo(text, difficulty, category)])
  }

  const handleComplete = (id) => {
    const todo = todos.find((t) => t.id === id)
    if (!todo || todo.completed) return

    const xpGain = XP_REWARD[todo.difficulty]
    const prevLevel = calcLevel(totalXp).level
    const newTotal = totalXp + xpGain
    const newLevel = calcLevel(newTotal).level

    setTodos((prev) => prev.map((t) => (t.id === id ? { ...t, completed: true } : t)))
    setTotalXp(newTotal)
    playComplete()

    const newStats = {
      totalCompleted: stats.totalCompleted + 1,
      hardCompleted: stats.hardCompleted + (todo.difficulty === 'hard' ? 1 : 0),
    }
    setStats(newStats)

    if (newLevel > prevLevel) {
      playLevelUp()
      setLevelUpMsg(`Level Up! Lv. ${newLevel} に到達！`)
      setTimeout(() => setLevelUpMsg(null), 3000)
    }

    const newUnlocks = checkAchievements(
      { ...newStats, level: newLevel, streak: streak.count },
      unlockedAch
    )
    if (newUnlocks.length > 0) {
      setUnlockedAch((prev) => [...prev, ...newUnlocks])
      setAchQueue((q) => [...q, ...newUnlocks])
    }
  }

  const handleDelete = (id) => {
    setTodos((prev) => prev.filter((t) => t.id !== id))
  }

  const handleReset = () => {
    if (!window.confirm('レベルとXPをリセットしますか？')) return
    setTotalXp(0)
  }

  // TODO: 確認後に削除する
  const handleDebugLevelUp = () => {
    const { level, xpInCurrentLevel } = calcLevel(totalXp)
    const xpToAdd = xpToNextLevel(level) - xpInCurrentLevel
    const newTotal = totalXp + xpToAdd
    const newLevel = calcLevel(newTotal).level
    setTotalXp(newTotal)
    playLevelUp()
    setLevelUpMsg(`Level Up! Lv. ${newLevel} に到達！`)
    setTimeout(() => setLevelUpMsg(null), 3000)
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1 className="app-title">⚔️ RPG Todo</h1>
        <p className="app-subtitle">クエストを完了して冒険者を育てよう</p>
      </header>

      <Hero level={calcLevel(totalXp).level} />
      <PlayerStatus totalXp={totalXp} onReset={handleReset} streak={streak.count} />

      {levelUpMsg && (
        <div className="levelup-toast" role="alert">
          <img src="/levelup.png" alt="Level Up!" className="levelup-img" />
          <div className="levelup-text">🎉 {levelUpMsg}</div>
        </div>
      )}

      <AchievementToast queue={achQueue} onPop={() => setAchQueue((q) => q.slice(1))} />

      {/* TODO: 確認後に削除する */}
      <button className="debug-levelup-btn" onClick={handleDebugLevelUp}>
        [DEBUG] レベルアップ
      </button>

      <TodoForm onAdd={handleAdd} />
      <TodoList todos={todos} onComplete={handleComplete} onDelete={handleDelete} />
      <AchievementsPanel unlocked={unlockedAch} />
    </div>
  )
}
