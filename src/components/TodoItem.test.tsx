import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TodoItem } from './TodoItem';
import type { Todo } from '../types';

const baseTodo: Todo = {
  id: '1',
  title: 'テストTODO',
  completed: false,
  createdAt: 1000,
};

describe('TodoItem', () => {
  it('タイトルが表示される', () => {
    render(<TodoItem todo={baseTodo} onToggle={vi.fn()} onDelete={vi.fn()} />);
    expect(screen.getByText('テストTODO')).toBeInTheDocument();
  });

  it('未完了の場合チェックボックスが未チェック', () => {
    render(<TodoItem todo={baseTodo} onToggle={vi.fn()} onDelete={vi.fn()} />);
    expect(screen.getByRole('checkbox')).not.toBeChecked();
  });

  it('完了済みの場合チェックボックスがチェック済み', () => {
    render(<TodoItem todo={{ ...baseTodo, completed: true }} onToggle={vi.fn()} onDelete={vi.fn()} />);
    expect(screen.getByRole('checkbox')).toBeChecked();
  });

  it('完了済みの場合 li に completed クラスが付く', () => {
    const { container } = render(
      <TodoItem todo={{ ...baseTodo, completed: true }} onToggle={vi.fn()} onDelete={vi.fn()} />
    );
    expect(container.querySelector('li')).toHaveClass('completed');
  });

  it('未完了の場合 li に completed クラスが付かない', () => {
    const { container } = render(
      <TodoItem todo={baseTodo} onToggle={vi.fn()} onDelete={vi.fn()} />
    );
    expect(container.querySelector('li')).not.toHaveClass('completed');
  });

  it('チェックボックスクリックで onToggle が ID と共に呼ばれる', async () => {
    const user = userEvent.setup();
    const onToggle = vi.fn();
    render(<TodoItem todo={baseTodo} onToggle={onToggle} onDelete={vi.fn()} />);
    await user.click(screen.getByRole('checkbox'));
    expect(onToggle).toHaveBeenCalledWith('1');
  });

  it('削除ボタンクリックで onDelete が ID と共に呼ばれる', async () => {
    const user = userEvent.setup();
    const onDelete = vi.fn();
    render(<TodoItem todo={baseTodo} onToggle={vi.fn()} onDelete={onDelete} />);
    await user.click(screen.getByRole('button', { name: '削除' }));
    expect(onDelete).toHaveBeenCalledWith('1');
  });
});
