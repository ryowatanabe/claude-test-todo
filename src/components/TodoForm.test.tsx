import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TodoForm } from './TodoForm';

describe('TodoForm', () => {
  it('入力フィールドと追加ボタンが表示される', () => {
    render(<TodoForm onAdd={vi.fn()} />);
    expect(screen.getByPlaceholderText('新しいTODOを入力...')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '追加' })).toBeInTheDocument();
  });

  it('ボタンクリックで onAdd が呼ばれる', async () => {
    const user = userEvent.setup();
    const onAdd = vi.fn();
    render(<TodoForm onAdd={onAdd} />);
    await user.type(screen.getByPlaceholderText('新しいTODOを入力...'), 'テストTODO');
    await user.click(screen.getByRole('button', { name: '追加' }));
    expect(onAdd).toHaveBeenCalledWith('テストTODO');
  });

  it('Enter キーで onAdd が呼ばれる', async () => {
    const user = userEvent.setup();
    const onAdd = vi.fn();
    render(<TodoForm onAdd={onAdd} />);
    await user.type(screen.getByPlaceholderText('新しいTODOを入力...'), 'テストTODO{Enter}');
    expect(onAdd).toHaveBeenCalledWith('テストTODO');
  });

  it('追加後に入力フィールドがクリアされる', async () => {
    const user = userEvent.setup();
    render(<TodoForm onAdd={vi.fn()} />);
    const input = screen.getByPlaceholderText('新しいTODOを入力...');
    await user.type(input, 'テストTODO');
    await user.click(screen.getByRole('button', { name: '追加' }));
    expect(input).toHaveValue('');
  });

  it('空文字では onAdd が呼ばれない', async () => {
    const user = userEvent.setup();
    const onAdd = vi.fn();
    render(<TodoForm onAdd={onAdd} />);
    await user.click(screen.getByRole('button', { name: '追加' }));
    expect(onAdd).not.toHaveBeenCalled();
  });

  it('スペースのみでは onAdd が呼ばれない', async () => {
    const user = userEvent.setup();
    const onAdd = vi.fn();
    render(<TodoForm onAdd={onAdd} />);
    await user.type(screen.getByPlaceholderText('新しいTODOを入力...'), '   ');
    await user.click(screen.getByRole('button', { name: '追加' }));
    expect(onAdd).not.toHaveBeenCalled();
  });
});
