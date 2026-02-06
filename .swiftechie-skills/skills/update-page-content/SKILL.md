---
name: update-page-content
description: Modifies existing page content on Swiftechie website. Use when user wants to edit, change, or update text content on any page. Locates target .astro file, identifies editable sections, preserves HTML structure, validates syntax, maintains consistent styling (slate + brand-teal colors). Supports text changes in product pages, company info, solutions, and other content areas. Keywords: 修改内容, 更新内容, edit content, 修改文字, 文字修正, 更改文案, テキスト修正, 内容編集.
---

# Update Page Content - ページ内容更新

## 目的 / Purpose

既存のページのテキスト内容を編集・更新します。HTML構造を保持しながら、安全に内容を変更します。

This skill guides you through editing or updating text content on existing pages while preserving HTML structure.

## 対応ページ / Supported Pages

以下のページの編集に対応しています：

Supports editing the following pages:

| ページ / Page | ファイル / File |
|--------------|---------------|
| ホーム / Home | `src/pages/index.astro` |
| 会社概要 / Company | `src/pages/company.astro` |
| お問い合わせ / Contact | `src/pages/contact.astro` |
| 採用情報 / Recruit | `src/pages/recruit.astro` |
| プライバシーポリシー / Privacy | `src/pages/privacy.astro` |
| 製品ページ / Products | `src/pages/products/[name].astro` |
| ソリューション / Solutions | `src/pages/solutions/[name].astro` |
| AIページ / AI | `src/pages/ai.astro` |

## 実行ステップ / Execution Steps

### ステップ 1: 編集対象の特定 / Step 1: Identify Target

編集したいページを教えてください：

Please specify which page to edit:

```
例 / Example:
「会社概要ページを編集したい」
「Popohu Mini ページの説明文を変更したい」
「お問い合わせページのテキストを修正したい」
```

---

### ステップ 2: 編集箇所の特定 / Step 2: Locate Section to Edit

該当ページのどの部分を編集しますか？

Which section would you like to edit?

**会社概要ページの例 / Company Page Example:**
- 会社理念 / Company Philosophy
- 会社概要 / Company Overview
- 企業情報 / Company Information
- 事業内容 / Business Description

**製品ページの例 / Product Page Example:**
- ヒーローセクション / Hero Section
- 機能説明 / Features
- 仕様 / Specifications
- 使用シーン / Use Cases

---

### ステップ 3: 新しい内容の入力 / Step 3: Input New Content

新しいテキスト内容を提供してください。

Please provide the new text content:

```
例 / Example:
変更前 / Before: 「私たちは最新技術を提供します」
変更後 / After: 「私たちは革新的なソリューションを提供します」
```

---

### ステップ 4: 確認と反映 / Step 4: Confirm and Apply

変更内容を確認し、問題なければ適用します。

Review the changes and apply if correct:

1. 変更前後の内容を表示 / Show before/after comparison
2. HTML構造の確認 / Verify HTML structure
3. 文法チェック / Validate syntax
4. 適用 / Apply changes

---

## 使用例 / Usage Examples

### Example 1: 会社理念の更新

```
ユーザー: 「会社概要ページの理念部分を更新して」

AI:
会社概要ページを開きました...
理念セクションを特定しました...

現在の内容:
「テクノロジーで未来を創造する」

新しい内容を教えてください。

ユーザー:
「イノベーションで社会を変える」
```

### Example 2: 製品説明の修正

```
ユーザー: 「Popohu Mini ページの簡易説明を修正して」

AI:
Popohu Mini ページを開きました...
ヒーローセクションの説明を特定しました...

現在の内容:
「コンセントが届かないあのデスクも、ポポフなら...」

新しい内容を教えてください。
```

---

## 安全な編集のためのルール / Safe Editing Rules

### ✅ できること / What You CAN Do

- **テキスト内容の変更**: 文章の修正、追加、削除
- **リンク先の変更**: URLの更新
- **altテキストの修正**: 画像説明の更新
- **見出しの変更**: タイトル、ヘッダーの修正

### ❌ できないこと / What You CANNOT Do

- **HTML構造の変更**: タグの追加・削除は危険です
- **スタイルの直接変更**: CSSクラスの変更は別スキルで
- **コンポーネントの削除**: セクション全体の削除は注意が必要
- **画像ファイルの変更**: 画像差し替えは `replace-media` スキルで

---

## スタイル維持ガイド / Style Maintenance Guide

編集後も以下のスタイルを維持します：

Maintain the following styles after editing:

### テキストスタイル / Text Styles
```astro
<!-- 見出し / Headings -->
<h1 class="text-4xl sm:text-5xl font-bold">...</h1>
<h2 class="text-2xl sm:text-3xl font-bold">...</h2>
<h3 class="text-xl font-semibold">...</h3>

<!-- 本文 / Body Text -->
<p class="text-slate-700 leading-relaxed">...</p>
<p class="text-slate-600">...</p>
```

### リンクスタイル / Link Styles
```astro
<!-- メインリンク / Main Link -->
<a href="/path" class="text-brand-teal hover:underline">...</a>

<!-- ボタンリンク / Button Link -->
<a href="/path" class="bg-slate-800 hover:bg-slate-700 text-white px-6 py-3 rounded-lg">...</a>
```

---

## よくある質問 / FAQ

**Q: 複数の箇所をまとめて編集できますか？**
A: はい、編集箇所をリストアップしていただければ、まとめて変更できます。

**Q: 編集を取り消したい場合は？**
A: Gitで履歴管理されているため、簡単に元に戻せます。

**Q: 画像も一緒に変更したい場合は？**
A: 画像の変更は `replace-media` スキルを使用してください。テキストと画像は別々に処理します。

**Q: 編集後のプレビューを見たい場合は？**
A: `npm run dev` でローカルサーバーを起動し、ブラウザで確認できます。

---

## 編集後の確認事項 / Post-Edit Checklist

編集適用後、以下を確認してください：

After applying edits, please verify:

- [ ] スペルミスや誤字がないか
- [ ] リンクが正しく動作するか
- [ ] レスポンシブデザインで正しく表示されるか
- [ ] 元のスタイルが保持されているか
- [ ] 他のセクションに影響していないか
