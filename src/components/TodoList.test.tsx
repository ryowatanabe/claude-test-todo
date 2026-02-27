import { render, screen } from '@testing-library/react';
import { TodoList } from './TodoList';
import type { Todo } from '../types';

const todos: Todo[] = [
  { id: '1', title: '未完了TODO', completed: false, createdAt: 1 },
  { id: '2', title: '完了済みTODO', completed: true, createdAt: 2 },
];

describe('TodoList', () => {
  it('フィルター all で全件表示される', () => {
    render(<TodoList todos={todos} filter="all" onToggle={vi.fn()} onDelete={vi.fn()} />);
    expect(screen.getByText('未完了TODO')).toBeInTheDocument();
    expect(screen.getByText('完了済みTODO')).toBeInTheDocument();
  });

  it('フィルター active で未完了のみ表示される', () => {
    render(<TodoList todos={todos} filter="active" onToggle={vi.fn()} onDelete={vi.fn()} />);
    expect(screen.getByText('未完了TODO')).toBeInTheDocument();
    expect(screen.queryByText('完了済みTODO')).not.toBeInTheDocument();
  });

  it('フィルター completed で完了済みのみ表示される', () => {
    render(<TodoList todos={todos} filter="completed" onToggle={vi.fn()} onDelete={vi.fn()} />);
    expect(screen.queryByText('未完了TODO')).not.toBeInTheDocument();
    expect(screen.getByText('完了済みTODO')).toBeInTheDocument();
  });

  it('該当する TODO がない場合に空メッセージが表示される', () => {
    render(<TodoList todos={[]} filter="all" onToggle={vi.fn()} onDelete={vi.fn()} />);
    expect(screen.getByText('TODOがありません')).toBeInTheDocument();
  });

  it('active フィルターで全て完了済みの場合に空メッセージが表示される', () => {
    const allCompleted: Todo[] = [
      { id: '1', title: '完了TODO', completed: true, createdAt: 1 },
    ];
    render(<TodoList todos={allCompleted} filter="active" onToggle={vi.fn()} onDelete={vi.fn()} />);
    expect(screen.getByText('TODOがありません')).toBeInTheDocument();
  });
});
