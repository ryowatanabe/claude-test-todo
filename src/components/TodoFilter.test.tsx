import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TodoFilter } from './TodoFilter';

describe('TodoFilter', () => {
  it('3つのフィルターボタンが表示される', () => {
    render(<TodoFilter current="all" onChange={vi.fn()} />);
    expect(screen.getByRole('button', { name: 'すべて' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '未完了' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '完了済み' })).toBeInTheDocument();
  });

  it('現在のフィルターボタンに active クラスが付く', () => {
    render(<TodoFilter current="active" onChange={vi.fn()} />);
    expect(screen.getByRole('button', { name: '未完了' })).toHaveClass('active');
  });

  it('現在のフィルター以外に active クラスが付かない', () => {
    render(<TodoFilter current="active" onChange={vi.fn()} />);
    expect(screen.getByRole('button', { name: 'すべて' })).not.toHaveClass('active');
    expect(screen.getByRole('button', { name: '完了済み' })).not.toHaveClass('active');
  });

  it('ボタンクリックで onChange が対応する値で呼ばれる', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<TodoFilter current="all" onChange={onChange} />);
    await user.click(screen.getByRole('button', { name: '完了済み' }));
    expect(onChange).toHaveBeenCalledWith('completed');
  });

  it('all ボタンクリックで onChange が "all" で呼ばれる', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<TodoFilter current="completed" onChange={onChange} />);
    await user.click(screen.getByRole('button', { name: 'すべて' }));
    expect(onChange).toHaveBeenCalledWith('all');
  });
});
