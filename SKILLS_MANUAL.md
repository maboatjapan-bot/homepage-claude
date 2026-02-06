# Claude Code Skills 开发指南

本文档说明如何为 Swiftechie 网站项目创建和维护 Claude Code Skills，供非技术人员使用。

## 目录

1. [Skills 是什么](#skills-是什么)
2. [为什么使用 Skills](#为什么使用-skills)
3. [Skills 文件结构](#skills-文件结构)
4. [开发流程](#开发流程)
5. [Description 编写指南](#description-编写指南)
6. [最佳实践](#最佳实践)
7. [常见任务类型](#常见任务类型)

## Skills 是什么

Skills 是 Claude Code 的可扩展功能，让 AI 助手能够：
- 自主判断何时被使用
- 执行特定的预定义任务
- 引导用户完成复杂操作流程
- 保持项目的一致性

**关键特性**：
- 只有 `name` 和 `description` 用于选择 Skill
- 被选中后，整个 SKILL.md 内容都会被读取
- 支持逐步引导、输入验证、文件创建等

## 为什么使用 Skills

对于非技术人员维护网站的优势：

| 传统方式 | 使用 Skills |
|---------|-----------|
| 需要学习代码语法 | 简单问答即可 |
| 容易出错（忘记文件位置、格式等） | AI 自动处理细节 |
| 风格不一致 | 自动统一风格 |
| 需要查阅文档 | AI 引导每一步 |

## Skills 文件结构

```
.swiftechie-skills/
├── skills/
│   ├── add-product/
│   │   ├── SKILL.md
│   │   ├── references/
│   │   │   ├── product-template.astro
│   │   │   ├── required-elements.md
│   │   │   └── style-guide.md
│   │   └── scripts/
│   │       └── validate.js
│   ├── add-news/
│   │   ├── SKILL.md
│   │   └── references/
│   │       └── news-template.md
│   └── update-content/
│       ├── SKILL.md
│       └── references/
│           └── file-locations.md
└── README.md
```

**文件说明**：

- **SKILL.md** - 主流程脚本，定义对话流程和操作步骤
- **references/** - 参考文件（模板、指南、检查清单等）
- **scripts/** - 辅助脚本（可选）
- **README.md** - Skills 集合的使用说明

## 开发流程

### 步骤 1: 创建 Skill 目录

```bash
mkdir -p .swiftechie-skills/skills/your-skill-name
```

### 步骤 2: 编写 SKILL.md

SKILL.md 的内容会在 Skill 被选中时完全加载到上下文中。

基本结构：

```markdown
---
name: your-skill-name
description: Clear description of when to use this skill. Use when...
---

# Skill 标题

## 目的
简要说明这个 Skill 的用途

## 使用方法
用户应该如何触发这个 Skill

## 执行流程
详细的步骤说明...
```

### 步骤 3: 创建参考文件（可选）

在 `references/` 目录中放置：
- 模板文件
- 样式指南
- 检查清单
- 示例代码

### 步骤 4: 测试 Skill

```
1. 在 Claude Code 中说："请使用 your-skill-name"
2. AI 应该自动选中并执行 Skill
3. 验证输出结果
```

### 步骤 5: 更新文档

在项目 README.md 中添加：
- Skill 的使用说明
- 何时使用哪个 Skill
- 示例对话

## Description 编写指南

Description 是最重要的部分，决定了 AI 是否能正确选择 Skill。

### ✅ 最佳实践

```yaml
# 好的 Description
description: Adds new product pages to Swiftechie website. Use when user asks to add, create, or append new products. Handles product page creation with consistent styling, validates required elements (hero, specs, features, CTA), uses provided images or placeholders, and guides non-technical users step-by-step. Keywords: 新商品, 追加商品, 新製品, add product, product page, 商品ページ.
```

**特点**：
- ✅ 第三人称（不使用 "I", "You"）
- ✅ 明确触发条件
- ✅ 丰富的关键词（中英双语）
- ✅ 说明处理方式
- ✅ 提及关键功能

### ❌ 避免的写法

```yaml
# 不好的 Description
description: I can help you add products
description: Helps with product pages
description: 产品相关
```

**问题**：
- ❌ 使用 "I" 或 "You"
- ❌ 过于模糊
- ❌ 缺少触发条件
- ❌ 关键词不足

### 包含的关键要素

1. **动作动词**：Adds, creates, updates, modifies
2. **触发条件**：Use when user asks to...
3. **处理方式**：guides, validates, handles
4. **目标对象**：product pages, news articles
5. **关键词**：中英文常用词

## 最佳实践

### 1. Progressive Disclosure 模式

只加载必要的参考文件，保持 SKILL.md 简洁。

```markdown
## 执行步骤

请提供以下信息：

1. 商品名称
2. 简短描述
3. 主图路径

<!-- 生成后，根据需要读取 style-guide.md -->
```

### 2. 输入验证

在 SKILL.md 中添加验证逻辑：

```markdown
### 验证必需信息

- [ ] 商品名称
- [ ] 产品描述
- [ ] 主图
- [ ] 规格

⚠️ 缺少的项目将使用占位符
```

### 3. 逐步引导

使用编号步骤和清晰提示：

```markdown
## 步骤 1: 收集基本信息

请提供以下信息：
- 商品名称
- 产品类别（Popohu/Pitopa/Pitoshiyu/其他）

## 步骤 2: 准备素材

需要以下图片/视频：
- [ ] 主图（Hero 用途）
- [ ] 产品图（展示用途）
- [ ] 使用场景图

## 步骤 3: 生成页面
```

### 4. 风格一致性

在 references/ 中提供：
- 颜色方案定义
- 组件示例
- 间距标准
- 字体使用规范

### 5. 错误处理

```markdown
### 常见问题

**Q: 我没有某个图片怎么办？**
A: AI 会使用占位符，并提醒您稍后上传。

**Q: 我想修改生成的页面怎么办？**
A: 告诉 AI："修改 xxx 页面的 xxx 部分"
```

## 常见任务类型

基于项目维护需求，以下是应开发的 Skills 列表：

### 1. 产品管理类

#### Skill: add-product
**用途**：添加新产品页面

**功能**：
- 引导收集产品信息
- 生成符合风格的 .astro 页面
- 处理图片/视频（提供或占位符）
- 验证必需元素（Hero、规格、特性、CTA）
- 自动更新 sitemap.xml
- 创建产品系列交叉链接

**关键词**：新商品, 追加商品, 新製品, product, 商品ページ, Popohu, Pitopa, Pitoshiyu

---

#### Skill: update-product-content
**用途**：修改现有产品页面内容

**功能**：
- 定位目标产品页面
- 引导选择修改区域（描述、规格、特性等）
- 保持风格一致性
- 验证链接有效性

**关键词**：修改内容, 更新产品, update product, 修改描述, 更改规格

---

#### Skill: replace-product-media
**用途**：替换产品页面的图片或视频

**功能**：
- 定位媒体文件位置
- 验证新文件存在
- 更新引用路径
- 保持 alt 文本

**关键词**：替换图片, 更换视频, replace image, 媒体替换

---

### 2. 内容管理类

#### Skill: add-news
**用途**：添加 News 文章

**功能**：
- 引导创建 Markdown 文件
- 设置 frontmatter（标题、日期、分类）
- 验证必需字段
- 自动放入正确目录
- 添加图片引用

**关键词**：添加新闻, 新着情報, add news, News 追加, お知らせ

---

#### Skill: update-page-content
**用途**：修改任意页面文字内容

**功能**：
- 定位目标 .astro 文件
- 识别可编辑区域
- 保持 HTML 结构完整
- 验证修改后无语法错误

**关键词**：修改文字, 内容更新, edit content, 更新文案, 文字修正

---

### 3. 素材管理类

#### Skill: upload-asset
**用途**：上传图片或视频到正确位置

**功能**：
- 确定目标目录（public/images 或 public/videos）
- 验证文件格式
- 优化图片（如果是上传工具）
- 提供正确的引用路径

**关键词**：上传图片, 添加视频, upload image, 媒体上传, 素材追加

---

#### Skill: replace-asset
**用途**：替换现有图片或视频

**功能**：
- 定位现有文件
- 备份原文件（可选）
- 更新为新文件
- 保持文件名一致或更新引用

**关键词**：替换图片, 更换视频, replace media, 素材替换

---

### 4. 样式管理类

#### Skill: adjust-colors
**用途**：调整页面配色

**功能**：
- 提供安全的 Tailwind 配色方案
- 更新 CSS 变量
- 确保对比度和可访问性
- 测试多个页面的一致性

**关键词**：修改颜色, 配色调整, change color, スタイル調整, design update

---

#### Skill: update-spacing
**用途**：调整页面间距

**功能**：
- 修改 Tailwind spacing 类
- 保持视觉层次
- 验证响应式行为

**关键词**：调整间距, 修改空白, spacing, 余白調整

---

### 5. 页面创建类

#### Skill: add-solution-page
**用途**：添加新的解决方案页面

**功能**：
- 引导收集页面信息
- 生成符合现有风格的 .astro 页面
- 添加到导航菜单
- 更新 sitemap

**关键词**：添加解决方案, 追加ソリューション, add solution, solution page, 新規ページ

---

#### Skill: add-job-page
**用途**：添加招聘页面

**功能**：
- 创建职位信息页面
- 更新 recruit.astro 或创建新页面
- 添加到招聘列表

**关键词**：招聘, 求人, add job, 採用情報, 新規職種

---

### 6. 信息更新类

#### Skill: update-contact-info
**用途**：更新联系方式

**功能**：
- 定位联系信息位置
- 更新电话、邮箱、地址
- 同步多个页面（Footer、Contact等）

**关键词**：联系方式, 更新电话, contact info, 連絡先, 電話番号

---

#### Skill: update-company-info
**用途**：更新公司信息

**功能**：
- 更新公司概要
- 修改公司信息
- 保持数据一致性

**关键词**：公司信息, 会社概要, company info, 企業情報

---

### 7. SEO 优化类

#### Skill: update-seo
**用途**：更新 SEO 元数据

**功能**：
- 修改页面标题
- 更新 meta description
- 添加 Open Graph 标签
- 优化结构化数据

**关键词**：SEO, meta标签, 搜索优化, OGP, SNS最適化

---

### 8. 合作伙伴类

#### Skill: add-partner-logo
**用途**：添加合作伙伴 Logo

**功能**：
- 准备 Logo 图片（优化格式和大小）
- 添加到正确的页面区域
- 保持对齐和样式一致

**关键词**：合作伙伴, Logo追加, partner logo, 協力企業

---

## 开发新 Skill 的检查清单

创建新 Skill 时，请确认：

- [ ] Skill 名称清晰明确（如 `add-product`）
- [ ] Description 包含触发条件
- [ ] Description 使用第三人称
- [ ] Description 包含丰富的关键词（中英双语）
- [ ] SKILL.md 提供逐步引导
- [ ] 验证输入完整性
- [ ] 处理缺失素材（占位符 + 提醒）
- [ ] 保持风格一致性
- [ ] 提供清晰的错误提示
- [ ] 测试实际使用场景
- [ ] 更新项目文档

## 技术参考

### Tailwind CSS 配色

项目中使用的配色方案：

```css
/* 主要配色 */
--brand-teal: #0d9488;
--brand-blue: #1e40af;
--slate-50: #f8fafc;
--slate-900: #0f172a;
```

### 组件结构

```astro
<!-- 标准页面结构 -->
<BaseLayout>
  <Header />
  <main>
    <!-- 页面内容 -->
  </main>
  <Footer />
</BaseLayout>
```

### 文件位置参考

- 产品页面：`src/pages/products/[product-name].astro`
- 解决方案：`src/pages/solutions/[name].astro`
- News：使用 Content Collections（待设置）
- 图片：`public/images/` 或 `public/wp-content/uploads/`
- 视频：`public/videos/`

## 调试技巧

### 测试 Skill 是否被选中

1. 在 Claude Code 中说相关关键词
2. 观察 AI 是否选中正确的 Skill
3. 查看终端日志确认

### Skill 未被选中时检查：

1. Description 是否明确？
2. 关键词是否足够？
3. 是否有冲突的 Skill？
4. 是否需要手动指定？

## 相关资源

- [Claude Code Skills 官方文档](https://code.claude.com/docs/en/skills)
- [Skills 最佳实践](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/best-practices)
- [Skill Creator](https://github.com/anthropics/skills)

## 维护和更新

定期检查和更新：

1. **季度审查**：Skills 是否有效使用
2. **用户反馈**：收集同事使用体验
3. **功能增强**：根据实际需求改进
4. **文档更新**：保持手册最新

---

**最后更新**：2026-02-06
**维护者**：Swiftechie 开发团队
