import { useState } from 'react';
import type { Filter } from './types';
import { useTodos } from './hooks/useTodos';
import { TodoForm } from './components/TodoForm';
import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import './App.css';

function App() {
  const { todos, addTodo, toggleTodo, deleteTodo } = useTodos();
  const [filter, setFilter] = useState<Filter>('all');

  return (
    <div className="app">
      <h1>TODO アプリ</h1>
      <TodoForm onAdd={addTodo} />
      <TodoFilter current={filter} onChange={setFilter} />
      <TodoList
        todos={todos}
        filter={filter}
        onToggle={toggleTodo}
        onDelete={deleteTodo}
      />
    </div>
  );
}

export default App;
