import type { Filter } from '../types';

type Props = {
  current: Filter;
  onChange: (filter: Filter) => void;
};

const FILTERS: { value: Filter; label: string }[] = [
  { value: 'all', label: 'すべて' },
  { value: 'active', label: '未完了' },
  { value: 'completed', label: '完了済み' },
];

export function TodoFilter({ current, onChange }: Props) {
  return (
    <div className="todo-filter">
      {FILTERS.map(({ value, label }) => (
        <button
          key={value}
          className={current === value ? 'active' : ''}
          onClick={() => onChange(value)}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
