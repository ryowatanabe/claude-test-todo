import { useState } from 'react';
import type { KeyboardEvent } from 'react';

type Props = {
  onAdd: (title: string) => void;
};

export function TodoForm({ onAdd }: Props) {
  const [value, setValue] = useState('');

  const handleAdd = () => {
    if (!value.trim()) return;
    onAdd(value);
    setValue('');
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleAdd();
  };

  return (
    <div className="todo-form">
      <input
        type="text"
        placeholder="新しいTODOを入力..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <button onClick={handleAdd}>追加</button>
    </div>
  );
}
