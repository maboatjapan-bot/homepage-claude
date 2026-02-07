# Swiftechie Website

Swiftechie（株式会社シーテック）の公式ウェブサイト - Astro 5 + Tailwind CSS で構築された静的サイト

## 技術スタック / Tech Stack

- **Astro 5.16** - 静的サイトジェネレーター
- **Tailwind CSS** - ユーティリティファーストCSS
- **TypeScript** - 型安全な開発
- **Pagefind** - 検索機能
- **AWS Amplify** - ホスティング & デプロイ

## プロジェクト構造 / Project Structure

```
homepage-claude/
├── .swiftechie-skills/       # Claude Code Skills（非技術者向けメンテナンス用）
│   ├── README_CN.md          # 中国語ユーザーマニュアル
│   ├── README_JA.md          # 日本語ユーザーマニュアル
│   └── skills/
│       ├── add-product/      # 新製品追加
│       ├── add-news/         # ニュース追加
│       └── update-page-content/  # ページ内容更新
│
├── docs/                     # プロジェクトドキュメント
│   ├── design/               # デザイン関連
│   │   ├── ANIMATION_GUIDE.md
│   │   ├── DESIGN_SYSTEM.md
│   │   └── ASSET_GUIDELINES.md
│   ├── deployment/           # デプロイ関連
│   │   └── DEPLOYMENT_SCHEDULE.md
│   ├── planning/             # 計画・進捗
│   │   ├── PROJECT_PLAN.md
│   │   └── PROJECT_STATUS.md
│   ├── SKILLS_MANUAL.md      # Skills開発ガイド
│   ├── SKILLS_TASKS.md       # Skillsタスクリスト
│   └── OPERATIONS_MANUAL.md  # 運用マニュアル
│
├── public/                   # 静的アセット
│   ├── assets/               # 最適化済みアセット
│   │   ├── fonts/
│   │   ├── images/
│   │   └── videos/
│   └── wp-content/uploads/   # WordPress から移行した画像
│
├── src/
│   ├── components/           # Astro コンポーネント
│   │   ├── Header.astro
│   │   ├── Footer.astro
│   │   ├── FadeIn.astro
│   │   ├── ScaleIn.astro
│   │   └── ...
│   │
│   ├── content/              # Content Collections
│   │   ├── news/             # ニュース記事（Markdown）
│   │   ├── products/         # 製品データ
│   │   └── solutions/        # ソリューションデータ
│   │
│   ├── layouts/              # レイアウト
│   │   └── BaseLayout.astro
│   │
│   ├── pages/                # ページ
│   │   ├── index.astro       # トップページ
│   │   ├── company.astro     # 会社概要
│   │   ├── contact.astro     # お問い合わせ
│   │   ├── ai.astro          # AI ページ
│   │   ├── products/         # 製品ページ
│   │   │   ├── index.astro
│   │   │   ├── popohu.astro
│   │   │   ├── popohu-mini.astro
│   │   │   └── ...
│   │   ├── solutions/        # ソリューションページ
│   │   │   ├── index.astro
│   │   │   ├── system-development.astro
│   │   │   └── ...
│   │   └── news/             # ニュース一覧・詳細
│   │
│   └── styles/               # グローバルスタイル
│
├── CLAUDE.md                 # Claude Code プロジェクトガイド
├── package.json
└── tsconfig.json
```

## 開発コマンド / Development Commands

```bash
# 開発サーバー起動
npm run dev

# 本番ビルド
npm run build

# プレビュー
npm run preview

# 検索インデックス作成
npm run build:search
```

## デプロイ / Deployment

- **本番環境**: https://www.swiftechie.com
- **ステージング**: https://main.d3572wh1uqcd5u.amplifyapp.com
- **自動デプロイ**: GitHub main ブランチへのプッシュで Amplify が自動ビルド・デプロイ

## Skills の使い方 / Using Skills

非技術者の方は Claude Code Skills を使用してウェブサイトを保守できます：

```bash
# 製品追加
"请使用 add-product 添加新产品 Popohu Pro"

# ニュース追加
"add-news でニュースを公開して"

# ページ更新
"update-page-content で会社ページを修正"
```

詳細は `.swiftechie-skills/README_CN.md` または `README_JA.md` を参照してください。

## 色彩設計 / Color Scheme

- **Primary Text**: `slate-900` (#0f172a)
- **Secondary Text**: `slate-700` (#334155)
- **Brand Teal**: `#0d9488`
- **Brand Blue**: `#1e40af`
- **Background**: `white`, `slate-50`

## ライセンス / License

Copyright © 2025 Swiftechie (株式会社シーテック)
