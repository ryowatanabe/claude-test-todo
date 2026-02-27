import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

describe('App (統合テスト)', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('初期表示で空メッセージが表示される', () => {
    render(<App />);
    expect(screen.getByText('TODOがありません')).toBeInTheDocument();
  });

  it('TODO を追加できる', async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.type(screen.getByPlaceholderText('新しいTODOを入力...'), '新しいTODO');
    await user.click(screen.getByRole('button', { name: '追加' }));
    expect(screen.getByText('新しいTODO')).toBeInTheDocument();
  });

  it('TODO を完了済みにできる', async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.type(screen.getByPlaceholderText('新しいTODOを入力...'), 'テストTODO');
    await user.click(screen.getByRole('button', { name: '追加' }));
    await user.click(screen.getByRole('checkbox'));
    expect(screen.getByRole('checkbox')).toBeChecked();
  });

  it('TODO を削除できる', async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.type(screen.getByPlaceholderText('新しいTODOを入力...'), '削除するTODO');
    await user.click(screen.getByRole('button', { name: '追加' }));
    await user.click(screen.getByRole('button', { name: '削除' }));
    expect(screen.queryByText('削除するTODO')).not.toBeInTheDocument();
  });

  it('active フィルターで未完了のみ表示される', async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.type(screen.getByPlaceholderText('新しいTODOを入力...'), '未完了TODO');
    await user.click(screen.getByRole('button', { name: '追加' }));
    await user.type(screen.getByPlaceholderText('新しいTODOを入力...'), '完了済みTODO');
    await user.click(screen.getByRole('button', { name: '追加' }));
    const checkboxes = screen.getAllByRole('checkbox');
    await user.click(checkboxes[1]);
    await user.click(screen.getByRole('button', { name: '未完了' }));
    expect(screen.getByText('未完了TODO')).toBeInTheDocument();
    expect(screen.queryByText('完了済みTODO')).not.toBeInTheDocument();
  });

  it('completed フィルターで完了済みのみ表示される', async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.type(screen.getByPlaceholderText('新しいTODOを入力...'), '未完了TODO');
    await user.click(screen.getByRole('button', { name: '追加' }));
    await user.type(screen.getByPlaceholderText('新しいTODOを入力...'), '完了済みTODO');
    await user.click(screen.getByRole('button', { name: '追加' }));
    const checkboxes = screen.getAllByRole('checkbox');
    await user.click(checkboxes[1]);
    await user.click(screen.getByRole('button', { name: '完了済み' }));
    expect(screen.queryByText('未完了TODO')).not.toBeInTheDocument();
    expect(screen.getByText('完了済みTODO')).toBeInTheDocument();
  });

  it('追加した TODO が localStorage に保存される', async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.type(screen.getByPlaceholderText('新しいTODOを入力...'), '保存テスト');
    await user.click(screen.getByRole('button', { name: '追加' }));
    const stored = JSON.parse(localStorage.getItem('todos') ?? '[]');
    expect(stored).toHaveLength(1);
    expect(stored[0].title).toBe('保存テスト');
  });
});
