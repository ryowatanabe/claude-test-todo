import { renderHook, act } from '@testing-library/react';
import { useTodos } from './useTodos';

describe('useTodos', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('初期状態は空の配列', () => {
    const { result } = renderHook(() => useTodos());
    expect(result.current.todos).toEqual([]);
  });

  it('addTodo で TODO が追加される', () => {
    const { result } = renderHook(() => useTodos());
    act(() => {
      result.current.addTodo('テストTODO');
    });
    expect(result.current.todos).toHaveLength(1);
    expect(result.current.todos[0].title).toBe('テストTODO');
    expect(result.current.todos[0].completed).toBe(false);
  });

  it('空白のみの文字列では追加されない', () => {
    const { result } = renderHook(() => useTodos());
    act(() => {
      result.current.addTodo('   ');
    });
    expect(result.current.todos).toHaveLength(0);
  });

  it('addTodo はタイトルをトリムして保存する', () => {
    const { result } = renderHook(() => useTodos());
    act(() => {
      result.current.addTodo('  前後スペース  ');
    });
    expect(result.current.todos[0].title).toBe('前後スペース');
  });

  it('toggleTodo で completed が true になる', () => {
    const { result } = renderHook(() => useTodos());
    act(() => {
      result.current.addTodo('テストTODO');
    });
    const id = result.current.todos[0].id;
    act(() => {
      result.current.toggleTodo(id);
    });
    expect(result.current.todos[0].completed).toBe(true);
  });

  it('toggleTodo を2回呼ぶと completed が元に戻る', () => {
    const { result } = renderHook(() => useTodos());
    act(() => {
      result.current.addTodo('テストTODO');
    });
    const id = result.current.todos[0].id;
    act(() => {
      result.current.toggleTodo(id);
      result.current.toggleTodo(id);
    });
    expect(result.current.todos[0].completed).toBe(false);
  });

  it('deleteTodo で TODO が削除される', () => {
    const { result } = renderHook(() => useTodos());
    act(() => {
      result.current.addTodo('テストTODO');
    });
    const id = result.current.todos[0].id;
    act(() => {
      result.current.deleteTodo(id);
    });
    expect(result.current.todos).toHaveLength(0);
  });

  it('deleteTodo は指定した ID のみ削除する', () => {
    const { result } = renderHook(() => useTodos());
    act(() => {
      result.current.addTodo('TODO 1');
      result.current.addTodo('TODO 2');
    });
    const id = result.current.todos[0].id;
    act(() => {
      result.current.deleteTodo(id);
    });
    expect(result.current.todos).toHaveLength(1);
    expect(result.current.todos[0].title).toBe('TODO 2');
  });

  it('TODO が localStorage に保存される', () => {
    const { result } = renderHook(() => useTodos());
    act(() => {
      result.current.addTodo('保存テスト');
    });
    const stored = JSON.parse(localStorage.getItem('todos') ?? '[]');
    expect(stored).toHaveLength(1);
    expect(stored[0].title).toBe('保存テスト');
  });

  it('localStorage から TODO が復元される', () => {
    localStorage.setItem(
      'todos',
      JSON.stringify([{ id: '1', title: '復元テスト', completed: false, createdAt: 1 }])
    );
    const { result } = renderHook(() => useTodos());
    expect(result.current.todos).toHaveLength(1);
    expect(result.current.todos[0].title).toBe('復元テスト');
  });
});
