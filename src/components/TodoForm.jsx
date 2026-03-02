import { useState } from 'react'
import { XP_REWARD } from '../utils/rpg'

export const TodoForm = ({ onAdd }) => {
  const [text, setText] = useState('')
  const [difficulty, setDifficulty] = useState('normal')

  const handleSubmit = (e) => {
    e.preventDefault()
    const trimmed = text.trim()
    if (!trimmed) return
    onAdd({ text: trimmed, difficulty })
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
