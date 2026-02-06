---
name: add-news
description: Adds news articles to Swiftechie website. Use when user asks to add, create, or append news, announcements, or updates. Step-by-step guides non-technical users through news creation using Markdown frontmatter. Collects title, date, category (製品/AI/企業/その他), summary, and featured image. Creates file in src/content/news/ directory with proper naming convention (YYYY-MM-DD-slug.md). Handles image uploads and path generation. Keywords: 添加新闻, 新着情報, News追加, お知らせ, add news, new article, アップデート, announcement.
---

# Add News - ニュース記事追加

## 目的 / Purpose

新しいニュース記事やお知らせを作成し、ウェブサイトに追加します。Markdown形式で記事を作成します。

This skill guides you through creating news articles or announcements in Markdown format.

## 実行ステップ / Execution Steps

### ステップ 1: 記事情報の収集 / Step 1: Collect Article Information

以下の情報を提供してください / Please provide the following information:

1. **タイトル / Title**
   - 記事のタイトル
   - Article title

2. **日付 / Date**
   - 公開日 (YYYY-MM-DD形式)
   - Publication date (YYYY-MM-DD format)

3. **カテゴリ / Category**
   - 製品 / Products
   - AI / AI
   - 企業 / Company
   - その他 / Other

4. **概要 / Summary**
   - 記事の要約（一覧表示に使用）
   - Article summary (for list display)

5. **本文 / Content**
   - 記事の本文（Markdown形式で記述）
   - Article body (written in Markdown)

---

### ステップ 2: 画像の準備 / Step 2: Prepare Featured Image

1. **アイキャッチ画像 / Featured Image**
   - 記事の代表性画像
   - 画像パスを提供（例: `/wp-content/uploads/2025/01/news-image.jpg`）

2. **本文内の画像 / Inline Images** (任意 / Optional)
   - 記事内で使用する画像

**⚠️ 注意 / Note:** 画像がない場合、プレースホルダーを使用します。

---

### ステップ 3: ファイル作成 / Step 3: Create File

以下の形式でファイルを作成します：

File will be created in the following format:

**ファイル名 / Filename**: `src/content/news/YYYY-MM-DD-[slug].md`

**Frontmatter テンプレート / Template**:
```yaml
---
title: "記事タイトル"
date: 2025-01-15
category: "製品"  # 製品/AI/企業/その他
description: "記事の概要"
image: "/wp-content/uploads/2025/01/image.jpg"
draft: false
---

# 記事タイトル

本文の内容をここに記述します...

## サブセクション

- 箇条書き
- 複数の項目
```

---

### ステップ 4: 確認 / Step 4: Verification

生成後、以下を確認します：
- Frontmatter が正しく設定されているか
- 画像パスが正しいか
- Markdown のフォーマットが正しいか

After generation, verify:
- Frontmatter is correctly set
- Image paths are correct
- Markdown formatting is proper

---

## 使用例 / Usage Examples

### Example 1: 新製品発表

```
ユーザー: 「新製品 Popohu Pro の発表ニュースを追加して」

AIのガイド：
1. タイトルは？
   ユーザー: 「Popohu Pro 新登場」

2. 日付は？
   ユーザー: 「2025-02-01」

3. カテゴリは？
   ユーザー: 「製品」

4. 概要は？
   ユーザー: 「次世代のスマート給電ソリューションが登場...」

5. 本文を教えてください
   ユーザー: （Markdownで記事内容を入力）
```

---

## Markdown 記法ガイド / Markdown Syntax Guide

### 見出し / Headings
```markdown
# H1 - 記事タイトル（frontmatterのtitleを使用）
## H2 - セクション
### H3 - サブセクション
```

### リスト / Lists
```markdown
- 箇条書きアイテム
- 別のアイテム
  - ネストされたアイテム

1. 番号付きリスト
2. 2番目の項目
```

### リンク / Links
```markdown
[リンクテキスト](/url)
[外部リンク](https://example.com)
```

### 画像 / Images
```markdown
![代替テキスト](/wp-content/uploads/2025/01/image.jpg)
```

### 強調 / Emphasis
```markdown
**太字 / Bold**
*斜体 / Italic*
~~取り消し線~~
```

---

## カテゴリについて / About Categories

使用できるカテゴリ：

| カテゴリ | 説明 | Example |
|---------|------|---------|
| 製品 | 新製品、機能追加、アップデート | Popohu Pro 発表 |
| AI | AI関連のニュース | AI機能の強化 |
| 企業 | 会社情報、採用、イベント | 新オフィス開設 |
| その他 | その他のお知らせ | ホリデー営業時間 |

---

## 画像配置 / Image Placement

### 推奨画像サイズ / Recommended Image Sizes

- **Featured Image**: 1200x630px (OGP対応)
- **Inline Image**: 最大幅800px
- **Thumbnail**: 300x300px

### 画像アップロード先 / Image Upload Location

```
/public/wp-content/uploads/YYYY/MM/
```

---

## よくある質問 / FAQ

**Q: 記事を下書き保存したい場合は？**
A: Frontmatter の `draft: true` を設定します。

**Q: 公開済みの記事を編集したい場合は？**
A: `update-page-content` スキルを使用してください。

**Q: 記事を削除したい場合は？**
A: お知らせください。ファイルを削除し、ニュース一覧を更新します。

**Q: カテゴリを追加したい場合は？**
A: お知らせください。設定を更新します。
