import { useState } from 'react'
import { useLocalStorage } from './hooks/useLocalStorage'
import { PlayerStatus } from './components/PlayerStatus'
import { Hero } from './components/Hero'
import { TodoForm } from './components/TodoForm'
import { TodoList } from './components/TodoList'
import { XP_REWARD, calcLevel } from './utils/rpg'
import './App.css'

const createTodo = (text, difficulty) => ({
  id: crypto.randomUUID(),
  text,
  difficulty,
  completed: false,
  createdAt: Date.now(),
})

export default function App() {
  const [todos, setTodos] = useLocalStorage('rpg-todos', [])
  const [totalXp, setTotalXp] = useLocalStorage('rpg-totalXp', 0)
  const [levelUpMsg, setLevelUpMsg] = useState(null)

  const handleAdd = ({ text, difficulty }) => {
    setTodos((prev) => [...prev, createTodo(text, difficulty)])
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

    if (newLevel > prevLevel) {
      setLevelUpMsg(`Level Up! Lv. ${newLevel} に到達！`)
      setTimeout(() => setLevelUpMsg(null), 3000)
    }
  }

  const handleDelete = (id) => {
    setTodos((prev) => prev.filter((t) => t.id !== id))
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1 className="app-title">⚔️ RPG Todo</h1>
        <p className="app-subtitle">クエストを完了して冒険者を育てよう</p>
      </header>

      <Hero level={calcLevel(totalXp).level} />
      <PlayerStatus totalXp={totalXp} />

      {levelUpMsg && (
        <div className="levelup-toast" role="alert">
          🎉 {levelUpMsg}
        </div>
      )}

      <TodoForm onAdd={handleAdd} />
      <TodoList todos={todos} onComplete={handleComplete} onDelete={handleDelete} />
    </div>
  )
}
