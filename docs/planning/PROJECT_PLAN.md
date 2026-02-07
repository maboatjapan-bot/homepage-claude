# Swiftechie 官网 2026 重构 - 项目管理文档

## 项目概述

将 Swiftechie（株式会社シーテック）的 WordPress 官网重构为 Astro 静态站点。

**目标：**
- 高性能静态网站（SSG）
- 清晰的 B/C 端业务分离
- 现代化技术栈
- 优秀的 SEO 和用户体验

**技术栈：**
- Astro 5.0+ (SSG)
- Tailwind CSS v4
- React/SolidJS (复杂交互)
- Astro Content Collections
- Pagefind (搜索)

---

## Legacy Data 映射表（已更新：AI 为主力服务）

| 类别 | Legacy 文件 | 新路由 | 优先级 | 状态 |
|------|------------|--------|--------|------|
| **首页** | `index.html` | `/` | P0 | ✅ |
| **AI 服务（主力）** | | | | |
| └─ AI ソリューション | `ai/` | `/ai` | **P0** | ✅ |
| **To C 产品** | | | | |
| ├─ Popohu Mini | `popohu_mini/` | `/products/popohu-mini` | P1 | ✅ |
| ├─ Pitopa | `product_pitopa/` | `/products/pitopa` | P1 | ✅ |
| └─ Pitoshiyu | - | `/products/pitoshiyu` | P1 | ✅ |
| **To B 解决方案** | | | | |
| ├─ 系统开发 | `system_development/` | `/solutions/system-development` | P1 | ✅ |
| ├─ 系统集成 | `system_integration/` | `/solutions/system-integration` | P1 | ✅ |
| ├─ 基础设施 | `infrastructure/` | `/solutions/infrastructure` | P1 | ✅ |
| ├─ 系统运业 | `system_operation/` | `/solutions/system-operation` | P2 | ❌ 可选 |
| └─ RPA | `rpa/` | `/solutions/rpa` | P2 | ❌ 可选 |
| **公司信息** | | | | |
| ├─ 关于我们 | `company/`, `company_info/` | `/company` | P2 | ✅ |
| ├─ 招聘 | `recruit/` | `/recruit` | P2 | ✅ |
| └─ 隐私政策 | `privacy_policy/` | `/privacy` | P2 | ✅ |
| **联系** | `contact/`, `inquiry/` | `/contact` | P0 | ✅ |
| **新闻/通知** | `notification/*` (14条) | `/news` | P2 | ❌ |

**图片资产：** `wp-content/uploads/` → `public/assets/images/`

---

## 任务分解

### 阶段一：项目初始化 ✅ 已完成

| 任务 | 描述 | 产出 | 状态 |
|------|------|------|------|
| 1.1 | 初始化 Astro 项目 | `npm init` + 手动安装依赖 | ✅ |
| 1.2 | 配置 Tailwind CSS v4 | `tailwind.config.mjs`，品牌色 #00BFA5 | ✅ |
| 1.3 | 创建 BaseLayout | `src/layouts/BaseLayout.astro`，SEO meta 标签 | ✅ |
| 1.4 | 配置 Content Collections | `src/content.config.ts`，products/solutions/news 类型定义 | ✅ |
| 1.5 | 创建基础组件 | Header.astro, Footer.astro | ✅ |
| 1.6 | 创建首页 | index.astro (Apple 风格 + SmartDrive 配色) | ✅ |
| 1.7 | 创建 favicon | `public/favicon.svg` (渐变品牌色) | ✅ |
| 1.8 | 动画方案文档 | `ANIMATION_GUIDE.md` (GSAP/Scroll 策略) | ✅ |
| 1.9 | Legacy 菜单映射 | `LEGACY_MENU_MAPPING.md` | ✅ |

---

### 阶段二：通用组件开发 ✅ 已完成

| 任务 | 描述 | 产出 | 状态 |
|------|------|------|------|
| 2.1 | Header 组件 | `src/components/Header.astro`，AI优先导航，毛玻璃效果 | ✅ 完成 |
| 2.2 | Footer 组件 | `src/components/Footer.astro`，Sitemap 结构 | ✅ 完成 |
| 2.3 | 移动端菜单 | 完整汉堡菜单，展开/收起动画 | ✅ 完成 |
| 2.4 | FadeIn 组件 | `src/components/FadeIn.astro`，淡入动画 | ✅ 完成 |
| 2.5 | SlideIn 组件 | `src/components/SlideIn.astro`，滑入动画 | ✅ 完成 |
| 2.6 | ScaleIn 组件 | `src/components/ScaleIn.astro`，缩放动画 | ✅ 完成 |

**动画实现：方案 A（渐进增强）**
- ✅ 原生 Intersection Observer API
- ✅ 支持自定义延迟和持续时间
- ✅ 移动端性能优化
- ✅ prefers-reduced-motion 支持

---

### 阶段三：To C 产品迁移 ✅ 已完成

| 任务 | 描述 | 产出 | 状态 |
|------|------|------|------|
| 3.1 | 迁移 Popohu Mini | Popohu Mini 产品页（ABW便携电源） | ✅ 完成 |
| 3.2 | 迁移 Pitopa | Pitopa AI同伴产品页 | ✅ 完成 |
| 3.3 | 迁移 Pitoshiyu | Pitoshiyu 创意支持工具产品页 | ✅ 完成 |
| 3.4 | 创建产品列表页 | `src/pages/products/index.astro` | ✅ 完成 |

**创建的文件：**
- `src/pages/products/index.astro` - 产品列表页
- `src/pages/products/popohu-mini.astro` - Popohu Mini 产品详情
- `src/pages/products/pitopa.astro` - Pitopa AI同伴产品详情
- `src/pages/products/pitoshiyu.astro` - Pitoshiyu 创意工具产品详情

---

### 阶段四：To B 解决方案迁移 ✅ 已完成

| 任务 | 描述 | 产出 | 状态 |
|------|------|------|------|
| 4.1 | 迁移系统开发 | 系统开发服务页 | ✅ 完成 |
| 4.2 | 迁移系统集成 | 系统集成服务页 | ✅ 完成 |
| 4.3 | 迁移基础设施 | 基础设施/运维服务页 | ✅ 完成 |
| 4.4 | 创建解决方案列表页 | `src/pages/solutions/index.astro` | ✅ 完成 |

**创建的文件：**
- `src/pages/solutions/index.astro` - 解决方案列表页
- `src/pages/solutions/system-development.astro` - 系统开发服务详情
- `src/pages/solutions/system-integration.astro` - 系统集成服务详情
- `src/pages/solutions/infrastructure.astro` - 基础设施服务详情

**注：** 系统运维（system-operation）和 RPA 服务可在后续添加

---

### 阶段五：AI 创新实验室 ✅ 已完成

| 任务 | 描述 | 产出 | 状态 |
|------|------|------|------|
| 5.1 | 创建 AI 页面 | `/ai` - AI ソリューション主页面 | ✅ 完成 |

**AI 页面包含：**
- Hero 区块（品牌渐变背景）
- AI 介绍（3 个技术领域）
- AI 服务（4 个服务卡片）
- CTA 区块

---

### 阶段六：公司信息页面 ✅ 已完成

| 任务 | 描述 | 产出 | 状态 |
|------|------|------|------|
| 6.1 | 迁移招聘页面 | `/recruit` 採用情報ページ | ✅ 完成 |
| 6.2 | 迁移隐私政策 | `/privacy` プライバシーポリシーページ | ✅ 完成 |
| 6.3 | 创建公司概要页 | `/company` 会社概要ページ | ✅ 完成 |
| 6.4 | 创建联系页面 | `/contact` お問い合わせページ | ✅ 完成 |

**创建的文件：**
- `src/pages/recruit.astro` - 採用情報ページ（会社雰囲気写真スライダー）
- `src/pages/privacy.astro` - プライバシーポリシーページ（8項目）
- `src/pages/company.astro` - 会社概要ページ（会社情報詳細）
- `src/pages/contact.astro` - お問い合わせページ（Web3Forms）

---

### 阶段七：首页与新闻 ✅ 已完成

| 任务 | 描述 | 产出 | 状态 |
|------|------|------|------|
| 7.1 | 创建首页 | Hero + 三大入口卡片 + 最新动态 | ✅ 完成 |
| 7.2 | 创建新闻系统 | 新闻列表页 + 详情页 + 示例内容 | ✅ 完成 |
| 7.3 | 创建新闻列表页 | `src/pages/news/index.astro` |
| 7.4 | 创建新闻详情页 | `src/pages/news/[slug].astro` |

---

### 阶段八：功能增强 ✅ 已完成

| 任务 | 描述 | 产出 | 状态 |
|------|------|------|------|
| 8.1 | 实现联系表单 | `/contact` - Web3Forms 集成 | ✅ 完成 |
| 8.2 | 添加全局搜索 | 集成 Pagefind 全站搜索 | ✅ 完成 |
| 8.3 | Google Analytics 4 | 集成 GA4 追踪 | ✅ 完成 |
| 8.4 | Sitemap 自动生成 | 动态 Sitemap 生成 | ✅ 完成 |

---

### 阶段九：图片资产处理 ✅ 已完成

| 任务 | 描述 | 产出 | 状态 |
|------|------|------|------|
| 9.1 | 提取并整理图片 | `wp-content/uploads/` → `public/assets/images/` | ✅ 完成 |
| 9.2 | 重命名图片 | 语义化命名（如 `popohu-hero.svg`） | ✅ 完成 |
| 9.3 | 配置图片优化 | Astro Image 组件，Sharp 服务 | ✅ 完成 |

---

### 阶段十：测试与部署 ✅ 已完成

| 任务 | 描述 | 产出 | 状态 |
|------|------|------|------|
| 10.1 | 全站功能测试 | 18 页面构建验证 | ✅ 完成 |
| 10.2 | 性能优化检查 | 图片优化 + 构建优化 | ✅ 完成 |
| 10.3 | 生产构建验证 | `npm run build:search` | ✅ 完成 |
| 10.4 | 部署配置 | 部署清单文档 | ✅ 完成 |

---

## 执行顺序建议

```
阶段一（初始化）
   ↓
阶段二（组件）
   ↓
阶段七（首页） ← 提前构建首页框架
   ↓
阶段三（To C 产品） + 阶段四（To B 解决方案） ← 并行
   ↓
阶段五（AI） + 阶段六（公司信息） ← 并行
   ↓
阶段八（功能增强）
   ↓
阶段九（图片优化） ← 贯穿全程
   ↓
阶段十（测试部署）
```

---

## 内容迁移检查清单

每迁移一个页面，确认：

- [ ] 提取语义化内容（`<p>`, `<h1>-<h6>`, `<ul>`, `<img>`）
- [ ] 移除 WordPress 类名和样式
- [ ] 提取并移动相关图片到 `public/assets/images/`
- [ ] 创建 Content Collection 条目（Frontmatter）
- [ ] 验证页面路由正确
- [ ] 检查响应式布局

---

## 开发命令

```bash
# 开发
npm run dev

# 构建
npm run build

# 预览生产构建
npm run preview
```

---

## 设计系统参考

**颜色：**
- Primary: Swiftechie 品牌蓝
- Dark: Slate-900 (B2B)
- Light: Slate-50 (B2C)
- Accent: Amber-500 (CTA)

**字体：**
- Inter (sans-serif) - 正文
- Cardo (serif) - 标题/强调

**组件规范：**
- Section: `py-16 px-4 max-w-7xl mx-auto`
