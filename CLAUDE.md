# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 技術スタック

- React + TypeScript
- Vite (ビルドツール)
- localStorage (データ永続化)
- Node.js v24（fnm 管理、`.node-version` 参照）

## コマンド

```bash
# 開発サーバー起動
npm run dev

# プロダクションビルド
npm run build

# ビルド成果物のプレビュー
npm run preview

# 型チェック
npx tsc --noEmit
```

## プロジェクト構成

```
src/
├── App.tsx              # メインコンポーネント（フィルター状態管理）
├── App.css              # アプリ全体のスタイル
├── types.ts             # 型定義（Todo, Filter）
├── components/
│   ├── TodoForm.tsx     # 新規TODO入力フォーム
│   ├── TodoList.tsx     # TODOリスト表示
│   ├── TodoItem.tsx     # 個別TODOアイテム
│   └── TodoFilter.tsx   # フィルターボタン
└── hooks/
    └── useTodos.ts      # TODO CRUD + localStorage カスタムフック
```

## 注意事項

- TypeScript の `verbatimModuleSyntax` が有効なため、型のインポートは `import type` を使用する
