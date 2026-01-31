# Swiftechie 官网 - 版本发布记录

本文档记录网站的主要版本更新和重要变更。

---

## [v1.4.0] - 2026-01-30

### 新增
- **自定义404页面** - 用户友好的错误页面
  - 日语错误消息和导航
  - 返回首页和产品的快速链接
  - 帮助链接区域
- **环境变量测试页面** - `/debug-env` 用于验证配置
- **_redirects配置** - 404重定向规则

### 变更
- **Logo统一方案 (Plan D)** - 深色Header + 浅色Footer
  - Header: `slate-900` 背景 + 白色 `logo.png`
  - Footer: `slate-50` 背景 + 深色 `logo.png` (CSS invert)
  - 统一Logo尺寸 `h-12` (48px)
- **联系表单配置** - Web3Forms完成配置
  - Access key: `09e5cc5b-a31b-40ee-b00f-f5eb9a47350c`
  - 接收邮箱: `maboatjapan@gmail.com`
  - 表单成功/错误反馈
  - 加载状态显示

### 优化
- 移除Amplify SPA fallback重定向规则
- 完善表单交互体验（禁用按钮、加载动画）

### 文档
- 新增 `PLAN_3_DESIGN.md` - 设计方案3文档
- 更新 `PROJECT_STATUS.md` - v1.4.0状态更新（健康评分85/100）
- 更新 `DESIGN_SYSTEM.md` - 深浅对比设计

### 修复
- Footer logo可见性（CSS invert确保深色在浅色背景可见）

---

## [v1.3.0] - 2026-01-30

### 新增
- **联系表单后端集成** - 使用 Web3Forms 实现表单提交
  - 表单提交成功/错误反馈
  - 加载状态显示
  - 环境变量配置支持
- **结构化数据 (Schema.org)** - SEO 优化
  - Organization、WebSite、LocalBusiness schema
  - 可复用的 StructuredData 组件
  - 支持 Product、Article、Breadcrumb、Service 类型
- **图片优化基础** - 创建 OptimizedImage 组件
  - 为将来使用 Astro Image 组件做准备
- **运维文档** - 完整的操作手册
  - Web3Forms 配置指南
  - 部署流程
  - 故障排查

### 修复
- **搜索 UI** - 隐藏放大镜图标，解决输入遮挡问题

### 文档
- 新增 `ASSET_GUIDELINES.md` - 素材制作规范
- 新增 `PROJECT_STATUS.md` - 项目状态跟踪
- 新增 `OPTIMIZATION_TODO.md` - 优化清单
- 新增 `docs/OPERATIONS_MANUAL.md` - 运维操作手册

---

## [v1.2.0] - 2026-01-29

### 新增
- **全文搜索功能** - 使用 Pagefind 实现
  - 支持日语分词
  - 实时搜索建议
  - 键盘快捷键 (Cmd+K)
- **新闻内容迁移** - 12 篇新闻文章从 WordPress 迁移
- **Contact 集合** - Astro Content Collections

### 修复
- **新闻 Schema** - 更新 content.config.ts 支持新字段
- **文件权限** - 修复新闻文件权限问题

---

## [v1.1.0] - 2026-01-28

### 新增
- **响应式导航栏** - 移动端汉堡菜单
- **滚动动画** - FadeIn、ScaleIn、SlideIn 组件
- **产品页面** - Popohu Mini、Pitopa、Pitoshiyu
- **解决方案页面** - 系统开发、系统集成、基础架构
- **公司页面** - 公司概要、招聘、隐私政策、联系我们

### 变更
- **设计系统** - 更新为 Apple 风格 + SmartDrive 配色
- **首页重构** - 全新 Hero 设计

---

## [v1.0.0] - 2026-01-XX

### 新增
- **网站上线** - 从 WordPress 迁移到 Astro
- **核心页面** - 首页、产品列表、解决方案列表
- **基础组件** - Header、Footer、Section
- **SEO 优化** - Meta 标签、Sitemap、robots.txt
- **Google Analytics** - 集成 GA4
- **AWS Amplify 部署** - 自动 CI/CD

---

## 即将发布

### [v1.5.0] - 计划中
- [ ] 图片优化（Astro Image 组件）
- [ ] 多语言支持（英文版）
- [ ] 客户案例展示
- [ ] 产品对比功能
- [ ] FAQ页面

---

**维护说明**:
- 每次发布后更新此文档
- 遵循语义化版本规范 (Semantic Versioning)
- 重大变更需要通知相关团队
