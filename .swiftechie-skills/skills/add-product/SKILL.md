---
name: add-product
description: Creates new product pages for Swiftechie website. Use when user asks to add, create, or append new products. Handles product page creation with consistent styling, validates required elements (hero, specs, features, CTA), uses provided images or placeholders, and guides non-technical users step-by-step. Maintains slate + brand-teal color scheme. Updates navigation and sitemap. Keywords: 新商品, 追加商品, 新製品, add product, product page, Popohu, Pitopa, Pitoshiyu, 商品ページ, 製品追加.
---

# Add Product - 新製品ページ追加

## 目的 / Purpose

新しい製品ページを作成し、Swiftechieウェブサイトに追加します。非技術者の方でもステップバイステージで進めるようにガイドします。

This skill guides you through creating a new product page for the Swiftechie website, step by step.

## 実行ステップ / Execution Steps

### ステップ 1: 製品情報の収集 / Step 1: Collect Product Information

以下の情報を提供してください / Please provide the following information:

1. **製品名 / Product Name**
   - 例: Popohu Mini, Pitopa, etc.

2. **製品カテゴリ / Product Category**
   - Popohu シリーズ
   - Pitopa シリーズ
   - Pitoshiyu シリーズ
   - その他 / Other

3. **簡易説明 / Short Description**
   - ヒーローセクションで表示する簡潔な説明（2-3行）
   - Short description for hero section (2-3 lines)

4. **詳細説明 / Detailed Description**
   - 製品の詳細な説明
   - Detailed product description

5. **主な特徴 / Key Features**
   - 製品の主な機能や特徴をリストアップ
   - List key features and functionalities

6. **仕様 / Specifications** (任意 / Optional)
   - サイズ、重量、電源仕様など
   - Size, weight, power specifications, etc.

7. **価格 / Price** (任意 / Optional)
   - 希望小売価格等
   - MSRP or pricing information

---

### ステップ 2: 画像・動画の準備 / Step 2: Prepare Images and Videos

以下の素材を準備してください / Please prepare the following assets:

1. **メイン画像 / Hero Image**
   - 製品のメインビジュアル
   - 画像パスを提供（例: `/wp-content/uploads/2025/01/product-name.jpg`）
   - ※ まだアップロードしていない場合は、後でアップロードできます

2. **製品画像 / Product Photos**
   - 製品の各種アングル画像
   - 使用シーンの写真

3. **YouTube 動画** (任意 / Optional)
   - 動画がある場合はURLを提供

**⚠️ 注意 / Note:** 画像・動画がない場合、プレースホルダーを使用し、後で追加できるようリマインドします。

---

### ステップ 3: ページ生成 / Step 3: Page Generation

情報を確認後、以下のファイルを作成します：

After confirming the information, the following files will be created:

1. **製品ページ**: `src/pages/products/[product-slug].astro`
2. **製品一覧の更新**: `src/pages/products/index.astro` にカードを追加
3. **サイトマップの更新**: `src/pages/sitemap.xml.ts` に追加

---

### ステップ 4: 確認 / Step 4: Verification

生成後、以下を確認します：
- デザインが既存ページと一致しているか
- すべてのリンクが正しく動作するか
- レスポンシブデザインが正しく表示されるか

After generation, verify:
- Design matches existing pages
- All links work correctly
- Responsive design displays properly

---

## 使用例 / Usage Examples

### Example 1: 日本語で製品を追加

```
ユーザー: 「add-product を使って Popohu Pro という新製品を追加して」

AIは以下をガイド：
1. 製品名は？
   ユーザー: 「Popohu Pro」

2. カテゴリは？
   ユーザー: 「Popohu シリーズ」

3. 簡易説明を教えてください
   ユーザー: 「次世代のスマート給電ソリューション...」
   （続けて情報を収集）
```

### Example 2: English Product Addition

```
User: "Use add-product to create a new product page"

AI will guide:
1. What is the product name?
   User: "Pitopa Mini"

2. Which category?
   User: "Pitopa series"

3. Please provide a short description
   User: "Compact power bank for mobile use..."
   (Continues collecting information)
```

---

## スタイルガイド / Style Guide

生成されるページは以下のデザイン原則に従います：

Generated pages follow these design principles:

### カラー / Colors
- **Primary Text**: `text-slate-900`
- **Secondary Text**: `text-slate-700`
- **Accent**: `text-brand-teal`, `bg-brand-teal`
- **Buttons**: `bg-slate-800 hover:bg-slate-700`
- **Background**: `bg-white`, `bg-slate-50`

### セクション構成 / Section Structure
1. **Hero Section**: メインビジュアル + 簡易説明 + CTA
2. **Features Section**: 主要な機能をカード形式で表示
3. **Specifications**: 仕様情報（テーブル形式）
4. **Use Cases**: 使用シーンの画像ギャラリー
5. **CTA Section**: お問い合わせ・資料ダウンロード

### 必須コンポーネント / Required Components
- インポート: `BaseLayout`, `Header`, `Footer`, `FadeIn`, `ScaleIn`, `SlideIn`
- アニメーション: 各セクションに適切なアニメーションを適用

---

## 参考ファイル / Reference Files

必要に応じて以下のファイルを参照します：

Reference the following files as needed:

- **テンプレート**: `src/pages/products/popohu-mini.astro`
- **製品一覧**: `src/pages/products/index.astro`
- **カラーガイド**: `.swiftechie-skills/skills/add-product/references/style-guide.md`

---

## よくある質問 / FAQ

**Q: 画像ファイルはどこに置けばいいですか？**
A: `/public/wp-content/uploads/YYYY/MM/` ディレクトリに配置してください。

**Q: 既存の製品ページを編集したい場合は？**
A: `update-page-content` スキルを使用してください。

**Q: 製品カテゴリを追加したい場合は？**
A: お知らせください。製品一覧ページの更新も併せて行います。
