import { useState } from 'react'
import { XP_REWARD } from '../utils/rpg'

const CATEGORIES = [
  { value: 'other', label: '⚡ その他' },
  { value: 'work',  label: '💼 仕事' },
  { value: 'study', label: '📚 学習' },
  { value: 'life',  label: '🏠 生活' },
  { value: 'hobby', label: '🎮 趣味' },
]

export const TodoForm = ({ onAdd }) => {
  const [text, setText] = useState('')
  const [difficulty, setDifficulty] = useState('normal')
  const [category, setCategory] = useState('other')

  const handleSubmit = (e) => {
    e.preventDefault()
    const trimmed = text.trim()
    if (!trimmed) return
    onAdd({ text: trimmed, difficulty, category })
    setText('')
  }

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      <input
        className="todo-input"
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="クエストを入力..."
        maxLength={80}
      />
      <select
        className="difficulty-select"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        {CATEGORIES.map(({ value, label }) => (
          <option key={value} value={value}>{label}</option>
        ))}
      </select>
      <select
        className="difficulty-select"
        value={difficulty}
        onChange={(e) => setDifficulty(e.target.value)}
      >
        {Object.entries(XP_REWARD).map(([key, xp]) => (
          <option key={key} value={key}>
            {key === 'easy' ? '易' : key === 'normal' ? '普' : '難'} (+{xp} XP)
          </option>
        ))}
      </select>
      <button className="add-btn" type="submit">
        追加
      </button>
    </form>
  )
}
