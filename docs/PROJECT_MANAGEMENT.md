# Swiftechie 官网 - 项目管理文档

> 最后更新: 2026-02-09

---

## 📋 项目概览

### 技术栈
- **Astro 5.16.15** - 静态站点生成器 (SSG)
- **Tailwind CSS v3.4** - 实用优先 CSS 框架
- **React + Three.js** - 3D 图形组件
- **原生 JavaScript** - 无框架依赖
- **Playwright** - E2E 测试框架

### 部署
- **AWS Amplify** - 静态站点托管
- **域名**: www.swiftechie.com
- **预览环境**: main.d3572wh1uqcd5u.amplifyapp.com

---

## 🏗️ 项目结构

```
homepage-claude/
├── src/
│   ├── components/        # 可复用组件
│   │   ├── 3d/            # Three.js 3D 组件
│   │   ├── Header.astro
│   │   ├── Footer.astro
│   │   └── *.astro        # 动画组件 (FadeIn, ScaleIn, etc.)
│   ├── content/           # Markdown 内容
│   │   ├── news/          # 新闻文章
│   │   ├── products/      # 产品信息
│   │   └── solutions/     # 解决方案
│   ├── layouts/           # 页面布局
│   ├── pages/             # 页面路由
│   │   ├── *.astro        # 页面文件
│   │   ├── ai/            # AI 服务
│   │   ├── news/          # 新闻页面
│   │   ├── products/      # 产品页面
│   │   └── solutions/     # 解决方案页面
│   └── styles/            # 全局样式
├── public/                # 静态资源
│   └── assets/           # 图片、字体、视频
├── docs/                  # 项目文档
├── tests/                 # E2E 测试
├── amplify.yaml          # Amplify 部署配置
└── package.json          # 依赖配置
```

---

## 📄 页面清单

| 路由 | 页面标题 | 分类 | 状态 |
|------|----------|------|------|
| `/` | ホーム | 首页 | ✅ |
| `/ai` | AIソリューション | AI服务 | ✅ |
| `/products` | 製品一覧 | 产品列表 | ✅ |
| `/products/*` | Popohu Mini, Pitopa, Pitoshiyu | 产品详情 | ✅ |
| `/solutions` | エンタープライズ | 解决方案列表 | ✅ |
| `/solutions/*` | システム開発, システム集成, インフラ構築 | 解决方案详情 | ✅ |
| `/news` | ニュース | 新闻列表 | ✅ |
| `/company` | 会社概要 | 公司信息 | ✅ |
| `/recruit` | 採用情報 | 招聘 | ✅ |
| `/privacy` | プライバシーポリシー | 隐私政策 | ✅ |
| `/contact` | お問い合わせ | 联系表单 | ✅ |

---

## 🔧 表单配置 (UMS API)

### API 端点
```
https://ums.aws.swiftechie.com/api/operation/sendByEmail
```

### 邮箱路由

| 表单页面 | Email Group Key | 目标邮箱 |
|---------|-----------------|----------|
| `/contact` | `contact-others` | info@swiftechie.com |
| 产品咨询 | `contact-pro` | support@swiftechie.com |
| V咨询 | `contact-others` + 标题含 "Virtuozzo" | no-reply@swiftechie.com |

### 表单字段

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| company | text | ✅ | 会社名 |
| dept | text | - | 所属名 |
| name | text | ✅ | 氏名 |
| phone | tel | ✅ | 電話番号 |
| email | email | ✅ | メールアドレス |
| content | textarea | ✅ | お問い合わせ内容 |
| attachments | file | - | 最大3个，8MB/文件 |

### 反垃圾保护（静默）

- **Honeypot 字段**: 隐藏的 #hp 字段
- **最小提交时间**: 3秒
- **频率限制**: 每分钟1次提交

### ⚠️ CORS 问题（暂时搁置）

**问题**: Amplify 预览域名被 UMS API CORS 阻止

**临时解决方案**:
- 部署到生产环境 (`www.swiftechie.com`) 后测试
- 或联系 UMS API 管理员添加预览域名到白名单

**永久解决方案**:
- 添加 Amplify Function 作为 API 代理
- 或配置 UMS API CORS 允许所有 Amplify 域名

---

## 🚀 开发命令

```bash
# 开发服务器
npm run dev

# 构建生产版本
npm run build

# 预览生产构建
npm run preview

# 运行 E2E 测试
npx playwright test

# 运行特定测试
npx playwright test tests/file-delete-feature.spec.ts
```

---

## 📝 开发指南

### 添加新页面

1. 在 `src/pages/` 创建新的 `.astro` 文件
2. 使用 `BaseLayout` 包装
3. 添加 `Header` 和 `Footer` 组件

### 添加新组件

1. 在 `src/components/` 创建 `.astro` 或 `.tsx` 文件
2. 在页面中导入使用

### 样式规范

- **不使用** 传统 CSS 文件
- **使用** Tailwind CSS 实用类
- **自定义样式** 在 `<style>` 标签中定义（仅在必要时）

### 3D 效果

使用 `/swiftechie-skills` 技能快速添加：
```bash
/skills/add-news      # 添加新闻文章
/skills/add-product   # 添加产品信息
/skills/update-page-content  # 更新页面内容
```

---

## 🧪 测试策略

### 保留的测试文件

| 测试文件 | 用途 |
|---------|------|
| `file-delete-feature.spec.ts` | 文件删除功能 |
| `file-over-limit-ux.spec.ts` | 超限文件 UX |
| `homepage-3d-effects.spec.ts` | 3D 效果验证 |
| `recruitment-*.spec.ts` | 招聘页面 |
| `carousel-*.spec.ts` | 轮播效果 |

### 临时调查测试（可删除）

- `current-old-site-forms.spec.ts`
- `current-site-js-analysis.spec.ts`
- `form-submission-logic.spec.ts`
- `old-site-*.spec.ts`
- `ums-api-investigation.spec.ts`
- `v-inquiry-*.spec.ts`
- `vhi-info-check.spec.ts`
- `find-all-forms.spec.ts`

---

## 📦 依赖管理

### 主要依赖

```json
{
  "@astrojs/react": "^4.4.2",
  "@astrojs/tailwind": "^6.0.2",
  "@react-three/fiber": "^8.0.0",
  "@react-three/drei": "^9.0.0",
  "three": "^0.170.0",
  "swiper": "^12.1.0",
  "playwright": "^1.40.0"
}
```

### 安装新依赖

```bash
npm install <package-name>
```

---

## 🔄 部署流程

### 自动部署（Git 推送）

```bash
git add .
git commit -m "message"
git push
# Amplify 自动构建和部署
```

### 手动部署

1. 登录 AWS Amplify Console
2. 选择应用 `homepage-claude`
3. 点击 "Deploy"

### 环境变量

在 Amplify Console 中配置：
- `PUBLIC_WEB3FORMS_ACCESS_KEY` (已废弃，使用 UMS API)

---

## 🎯 当前任务与问题

### ✅ 已完成
- [x] 表单迁移到 UMS API
- [x] 文件删除功能
- [x] 文件超限 UX 改进
- [x] 轮播无缝循环
- [x] TiltCard 3D 效果
- [x] 招聘页面照片同步

### ⚠️ 待解决
- [ ] CORS 问题（见上方说明）
- [ ] 图片优化（使用 Astro Image 组件）
- [ ] 结构化数据 (Schema.org)

### 📋 优化建议

详见 `docs/planning/OPTIMIZATION_TODO.md`

---

## 📚 相关文档

### 设计系统
- `docs/design/DESIGN_SYSTEM.md`
- `docs/design/ASSET_GUIDELINES.md`

### 部署
- `docs/deployment/DEPLOY_AMPLIFY_CONSOLE.md`
- `docs/AMPLIFY_DEPLOYMENT.md`
- `amplify.yaml`

### 操作手册
- `docs/OPERATIONS_MANUAL.md`
- `docs/SKILLS_MANUAL.md`

---

## 🔍 故障排查

### 构建失败

```bash
# 清理构建缓存
rm -rf .astro dist node_modules/.cache
npm run build
```

### 表单提交失败

1. 检查浏览器控制台错误
2. 确认部署环境（预览 vs 生产）
3. 查看文档上方的 CORS 问题说明

### 3D 效果不显示

1. 检查浏览器兼容性
2. 查看 JavaScript 控制台错误
3. 确认 `@react-three/fiber` 正确导入

---

## 📞 联系方式

- **技术支持**: support@swiftechie.com
- **一般咨询**: info@swiftechie.com
- **电话**: 03-6228-8452（平日 9:00-18:00）

---

**文档维护**: 如有项目变更，请及时更新此文档
