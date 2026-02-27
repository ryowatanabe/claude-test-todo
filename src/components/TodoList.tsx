import type { Todo, Filter } from '../types';
import { TodoItem } from './TodoItem';

type Props = {
  todos: Todo[];
  filter: Filter;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
};

export function TodoList({ todos, filter, onToggle, onDelete }: Props) {
  const filtered = todos.filter((todo) => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  if (filtered.length === 0) {
    return <p className="empty">TODOがありません</p>;
  }

  return (
    <ul className="todo-list">
      {filtered.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
}
