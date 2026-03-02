import { XP_REWARD } from '../utils/rpg'

const DIFFICULTY_LABEL = { easy: '易', normal: '普', hard: '難' }
const DIFFICULTY_CLASS = { easy: 'diff-easy', normal: 'diff-normal', hard: 'diff-hard' }

export const TodoItem = ({ todo, onComplete, onDelete }) => {
  return (
    <li className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      <span className={`diff-tag ${DIFFICULTY_CLASS[todo.difficulty]}`}>
        {DIFFICULTY_LABEL[todo.difficulty]}
      </span>
      <span className="todo-text">{todo.text}</span>
      <span className="xp-chip">+{XP_REWARD[todo.difficulty]} XP</span>
      {!todo.completed ? (
        <button className="complete-btn" onClick={() => onComplete(todo.id)}>
          ✔ 完了
        </button>
      ) : (
        <span className="done-label">CLEAR!</span>
      )}
      <button className="delete-btn" onClick={() => onDelete(todo.id)}>
        ✕
      </button>
    </li>
  )
}
