import { TodoItem } from './TodoItem'

export const TodoList = ({ todos, onComplete, onDelete }) => {
  if (todos.length === 0) {
    return <p className="empty-msg">クエストがありません。新しいクエストを追加しよう！</p>
  }

  const active = todos.filter((t) => !t.completed)
  const done = todos.filter((t) => t.completed)

  return (
    <div className="todo-list-wrapper">
      {active.length > 0 && (
        <section>
          <h3 className="section-title">進行中のクエスト</h3>
          <ul className="todo-list">
            {active.map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onComplete={onComplete}
                onDelete={onDelete}
              />
            ))}
          </ul>
        </section>
      )}
      {done.length > 0 && (
        <section>
          <h3 className="section-title cleared">クリア済みクエスト</h3>
          <ul className="todo-list">
            {done.map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onComplete={onComplete}
                onDelete={onDelete}
              />
            ))}
          </ul>
        </section>
      )}
    </div>
  )
}
