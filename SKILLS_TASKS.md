# Skills 开发任务列表

本文档列出了为 Swiftechie 网站开发 Claude Code Skills 的任务清单。

## 优先级说明

- **P0（高优先级）**：高频使用，核心维护任务
- **P1（中优先级）**：定期使用，重要任务
- **P2（低优先级）**：偶尔使用，优化性任务

---

## 任务列表

### P0 - 高优先级（核心维护）

#### ✅ SKILLS_MANUAL.md
- [x] 创建 Skills 开发指南文档
- [x] 说明 Skills 机制和结构
- [x] 提供最佳实践指南

---

#### 🔄 Task: add-product
**描述**：添加新产品页面

**优先级**：P0

**功能需求**：
1. 引导收集产品信息
   - 产品名称
   - 产品类别（Popohu/Pitopa/Pitoshiyu/其他）
   - 简短描述
   - 详细说明
   - 规格参数
   - 价格（可选）

2. 图片/视频处理
   - 主图（Hero 用途）
   - 产品展示图
   - 使用场景图
   - YouTube 视频（可选）
   - 缺少素材时使用占位符并提醒

3. 页面生成
   - 使用正确的模板（参考现有产品页）
   - 保持风格统一
   - 包含必需元素：
     - Hero 区域
     - 产品描述
     - 规格/特性
     - CTA（联系/下载）
   - 遵循 Tailwind 配色（slate + brand-teal/blue）

4. 后续处理
   - 创建文件：`src/pages/products/[product-name].astro`
   - 更新 `src/pages/products/index.astro` 添加卡片
   - 更新 `src/pages/sitemap.xml.ts`
   - 添加产品系列交叉链接（如适用）

**Description 草稿**：
```yaml
name: add-product
description: Creates new product pages for Swiftechie website. Use when user wants to add, append, or create a new product page (Popohu, Pitopa, Pitoshiyu, or other products). Step-by-step guides non-technical users through product information collection. Handles hero section, specs, features, CTA creation. Uses provided images/videos or creates placeholders with reminders. Maintains consistent styling with existing pages (slate + brand-teal color scheme). Updates navigation and sitemap. Keywords: 新商品, 追加商品, 新製品, add product, product page, Popohu, Pitopa, Pitoshiyu, 商品ページ, 製品追加.
```

**参考文件**：
- `src/pages/products/popohu-mini.astro`（模板参考）
- `src/pages/products/popohu-minilite5.astro`（模板参考）

---

#### 🔄 Task: add-news
**描述**：添加 News 文章

**优先级**：P0

**功能需求**：
1. 设置 Content Collections（需要先配置）
2. 引导创建 Markdown 文件
3. Frontmatter 设置
   - title（标题）
   - date（日期，YYYY-MM-DD）
   - category（分类：製品、AI、企業、その他）
   - description（摘要）
   - image（主图）
   - draft（草稿状态）

4. 图片处理
   - 支持上传到 `public/images/news/`
   - 生成图片引用路径

5. 验证和创建
   - 验证必需字段
   - 创建文件：`src/content/news/YYYY-MM-DD-slug.md`

**Description 草稿**：
```yaml
name: add-news
description: Adds news articles to Swiftechie website. Use when user wants to add, create, or append news, announcements, or updates. Step-by-step guides non-technical users through news creation using Markdown frontmatter. Collects title, date, category (製品/AI/企業/その他), summary, and featured image. Creates file in src/content/news/ directory with proper naming convention (YYYY-MM-DD-slug.md). Handles image uploads and path generation. Keywords: 添加新闻, 新着情報, News追加, お知らせ, add news, new article, アップデート, announcement.
```

---

#### 🔄 Task: update-page-content
**描述**：修改现有页面内容

**优先级**：P0

**功能需求**：
1. 定位目标页面
2. 引导用户选择修改区域
3. 保持 HTML 结构完整
4. 验证语法错误
5. 保持风格一致

**Description 草稿**：
```yaml
name: update-page-content
description: Modifies existing page content on Swiftechie website. Use when user wants to edit, change, or update text content on any page. Locates target .astro file, identifies editable sections, preserves HTML structure, validates syntax, maintains consistent styling (slate + brand-teal colors). Supports text changes in product pages, company info, solutions, and other content areas. Keywords: 修改内容, 更新内容, edit content, 修改文字, 文字修正, 更改文案, テキスト修正, 内容編集.
```

---

### P1 - 中优先级（定期使用）

#### 🔄 Task: replace-media
**描述**：替换图片或视频

**优先级**：P1

**功能需求**：
1. 定位现有媒体文件
2. 处理新文件上传
   - 指导上传到正确目录
   - 验证格式
   - 优化图片大小（可选）
3. 更新引用路径
4. 保持 alt 文本

**Description 草稿**：
```yaml
name: replace-media
description: Replaces images or videos on Swiftechie website. Use when user wants to swap, change, or update media files (images/videos). Locates current media references, guides file upload to public/images/ or public/videos/, validates formats (jpg, png, webp, mp4), updates file paths in .astro files, preserves alt text. Supports hero images, product photos, section backgrounds, and embedded videos. Keywords: 替换图片, 更换视频, replace image, change media, 媒体替换, 素材更新, 画像変更, 動画交換.
```

---

#### 🔄 Task: add-solution-page
**描述**：添加新的解决方案页面

**优先级**：P1

**功能需求**：
1. 收集页面信息
   - 标题
   - 描述
   - 功能特性
   - 应用场景
   - 联系 CTA

2. 页面生成
   - 使用解决方案页面模板
   - 保持风格统一

3. 导航更新
   - 添加到导航菜单
   - 更新 sitemap

**Description 草稿**：
```yaml
name: add-solution-page
description: Creates new solution pages for Swiftechie website. Use when user wants to add or create solution pages (システム開発, システム運用保守, インフラ, etc.). Collects page title, description, features, use cases, and CTA. Generates .astro file matching existing solution page style. Updates navigation menu and sitemap. Maintains consistent design patterns. Keywords: 添加解决方案, 追加ソリューション, add solution, solution page, 新規サービスページ, サービス追加.
```

---

#### 🔄 Task: update-contact-info
**描述**：更新联系方式

**优先级**：P1

**功能需求**：
1. 定位联系信息位置
2. 更新多个页面
   - Footer
   - Contact 页面
   - 其他相关页面
3. 保持数据一致
4. 验证格式

**Description 草稿**：
```yaml
name: update-contact-info
description: Updates contact information across Swiftechie website. Use when user wants to change phone numbers, email addresses, or office location. Locates all contact info instances in Footer, Contact page, and other relevant sections. Updates data consistently across all pages. Validates format and tests links. Keywords: 联系方式, 更新电话, 連絡先, 電話番号, email, メールアドレス, 会社情報, contact info, 住所変更.
```

---

### P2 - 低优先级（优化任务）

#### 🔄 Task: adjust-colors
**描述**：调整页面配色

**优先级**：P2

**功能需求**：
1. 提供安全的配色方案
2. 使用 Tailwind 配色
3. 确保对比度和可访问性
4. 测试多个页面一致性

**Description 草稿**：
```yaml
name: adjust-colors
description: Adjusts color schemes on Swiftechie website pages. Use when user wants to modify colors, update styling, or refresh design. Provides safe Tailwind color palettes, maintains brand-teal and brand-blue as primary colors, ensures accessibility (contrast ratios), tests consistency across pages. Can update component colors, backgrounds, or accents. Keywords: 修改颜色, 配色調整, change color, design update, スタイル調整, デザイン変更, カラー変更.
```

---

#### 🔄 Task: update-seo
**描述**：更新 SEO 元数据

**优先级**：P2

**功能需求**：
1. 修改页面标题
2. 更新 meta description
3. 添加 Open Graph 标签
4. 优化结构化数据

**Description 草稿**：
```yaml
name: update-seo
description: Updates SEO metadata on Swiftechie website pages. Use when user wants to improve search engine optimization, modify page titles, update meta descriptions, or add Open Graph tags. Handles title tags, meta descriptions, OG images, Twitter Cards, and structured data (JSON-LD). Ensures best practices for SEO. Keywords: SEO, meta标签, 搜索优化, SNS最適化, OGP, 画像最適化, SNS画像.
```

---

#### 🔄 Task: add-partner-logo
**描述**：添加合作伙伴 Logo

**优先级**：P2

**功能需求**：
1. 准备 Logo 图片
   - 优化格式（PNG/SVG）
   - 调整大小
   - 添加透明背景（如需要）
2. 添加到正确页面区域
3. 保持对齐和样式
4. 添加链接（如适用）

**Description 草稿**：
```yaml
name: add-partner-logo
description: Adds partner or customer logos to Swiftechie website. Use when user wants to append customer logos, partner logos, or company badges. Optimizes logo images (PNG/SVG format, proper sizing), adds to Footer or other sections, maintains alignment and consistent styling. Links to partner websites when applicable. Keywords: 合作伙伴, Logo追加, partner logo, 顧客事例, 企業ロゴ, customer logo, 協力企業.
```

---

## 开发顺序建议

### 第一批（立即开发）

1. ✅ **SKILLS_MANUAL.md** - 提供开发指南
2. **add-product** - 高频使用（新产品发布）
3. **add-news** - 高频使用（新闻发布）
4. **update-page-content** - 高频使用（内容修改）

### 第二批（核心需求）

5. **replace-media** - 定期使用
6. **add-solution-page** - 新服务上线时
7. **update-contact-info** - 信息变更时

### 第三批（优化需求）

8. **adjust-colors** - 设计更新时
9. **update-seo** - SEO 优化
10. **add-partner-logo** - 新合作伙伴时

---

## 技术准备

### 前置条件

1. **Content Collections 配置**（用于 News）
   - [ ] 配置 `src/content/config.ts`
   - [ ] 创建类型定义
   - [ ] 创建 News 组件

2. **参考模板准备**
   - [ ] 产品页标准模板
   - [ ] 解决方案页标准模板
   - [ ] News 模板

3. **样式指南文档**
   - [ ] 配色方案
   - [ ] 间距标准
   - [ ] 组件示例

---

## 开发检查清单

开发每个 Skill 时确认：

- [ ] Description 包含触发条件
- [ ] Description 包含中英双语关键词
- [ ] 使用第三人称
- [ ] 提供逐步引导
- [ ] 验证输入完整性
- [ ] 处理缺失素材（占位符 + 提醒）
- [ ] 保持风格一致
- [ ] 自动更新相关文件（导航、sitemap）
- [ ] 提供错误处理
- [ ] 测试实际场景

---

## 使用流程

### 给同事的使用说明

#### 示例 1：添加新产品

```
同事："请使用 add-product 添加新产品 Popohu Pro"

AI 会引导：
1. 产品名称是什么？
   同事："Popohu Pro"

2. 产品类别？
   同事："Popohu 系列"

3. 请提供简短描述...
   （逐步收集信息）

4. 生成页面...
   （创建文件并更新导航）

5. ⚠️ 缺少使用场景图，已使用占位符
   （提醒上传素材）
```

#### 示例 2：修改页面内容

```
同事："请使用 update-page-content 修改公司概要"

AI 会引导：
1. 想修改哪一页？
   同事："company 页面"

2. 想修改什么内容？
   同事："公司理念部分"

3. 新内容是什么？
   同事："xxx"

4. 更新并验证...
   （完成修改）
```

---

## 更新日志

| 日期 | 更新内容 |
|------|----------|
| 2026-02-06 | 创建任务列表，定义 10 个 Skills 任务 |
| | 分为 P0/P1/P2 优先级 |
| | 提供开发顺序建议 |
| | 创建 SKILLS_MANUAL.md 开发指南 |

---

**维护者**：Swiftechie 开发团队
**文档版本**：1.0
**最后更新**：2026-02-06
