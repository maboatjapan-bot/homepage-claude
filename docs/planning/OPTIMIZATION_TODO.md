# Swiftechie 官网 - 优化清单

> 生成日期: 2026-01-30
> 最后更新: 2026-02-09

---

## ⚠️ 待解决问题

### 🚧 表单 CORS 问题（暂时搁置）
**状态**: 待解决
**优先级**: P0
**问题描述**:
- 表单提交时遇到 CORS 错误
- UMS API 不允许从 Amplify 预览域名 (`*.amplifyapp.com`) 访问
- 错误信息: `Access to fetch at 'https://ums.aws.swiftechie.com/api/operation/sendByEmail' from origin 'https://main.d3572wh1uqcd5u.amplifyapp.com' has been blocked by CORS policy`

**临时解决方案**:
1. 部署到生产环境 (`www.swiftechie.com`) 后测试 - UMS API 已允许该域名
2. 联系 UMS API 管理员添加预览域名到 CORS 白名单

**永久解决方案**:
- [ ] 添加 Amplify Function 作为 API 代理
- [ ] 或使用 CloudFront Functions 转发请求
- [ ] 或配置 UMS API CORS 允许所有 Amplify 域名

**参考文件**:
- `src/pages/contact.astro` - 表单页面
- `amplify.yaml` - Amplify 部署配置

---

## ✅ 已完成的优化

## ✅ 已完成的优化

- [x] **SEO基础**
  - [x] Meta标签配置
  - [x] Sitemap生成 (`/sitemap.xml`)
  - [x] robots.txt配置
- [x] **Analytics**
  - [x] Google Analytics 4集成
- [x] **缓存策略**
  - [x] Amplify静态资源缓存配置
  - [x] Pagefind索引缓存
- [x] **搜索功能**
  - [x] Pagefind全文搜索
  - [x] UI样式优化

---

## 🚀 推荐实施的优化

### 优先级 P0 (显著性能提升)

#### 1. 图片优化 ⚡ 重要
**当前状态**: ❌ 未使用Astro Image组件
**影响**: 图片加载慢，未使用现代图片格式
**方案**:
```astro
---
import { Image } from 'astro:assets';
import heroImage from '~/assets/images/hero.png';
---
<Image src={heroImage} format="webp" widths={[800, 1200, 1600]} />
```
**预期收益**:
- 图片文件大小减少50-70%
- 自动响应式加载
- 自动WebP转换

---

#### 2. 结构化数据 (Schema.org) 🔍 SEO
**当前状态**: ❌ 未配置
**影响**: 搜索引擎无法理解页面结构，富媒体搜索结果缺失
**方案**: 添加JSON-LD结构化数据
```astro
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "株式会社シーテック",
  "url": "https://www.swiftechie.com",
  "logo": "https://www.swiftechie.com/logo.png",
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+81-XX-XXXX-XXXX",
    "contactType": "sales"
  }
}
</script>
```
**预期收益**: Google搜索结果中显示logo、联系信息等

---

#### 3. 关键资源预加载 ⚡ 性能
**当前状态**: ❌ 未配置
**影响**: 首屏渲染延迟
**方案**:
```astro
<!-- 在<head>中添加 -->
<link rel="preload" href="/fonts/Inter.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="/_astro/main.css" as="style">
```
**预期收益**: LCP (Largest Contentful Paint) 减少200-500ms

---

### 优先级 P1 (用户体验提升)

#### 4. 联系表单后端集成 📧 功能
**当前状态**: ⚠️ 前端UI完成，无后端
**影响**: 用户提交后无反馈
**推荐方案**:
- **选项A**: Web3Forms (免费，简单)
- **选项B**: Formspree (免费层)
- **选项C**: AWS Lambda + SES

**选项A实现**:
```astro
<form action="https://api.web3forms.com/submit" method="POST">
  <input type="hidden" name="access_key" value="YOUR_ACCESS_KEY">
  <!-- 表单字段 -->
</form>
```

---

#### 5. 404页面 🎨 UX
**当前状态**: 使用默认404
**方案**: 创建 `src/pages/404.astro`
```astro
---
const title = "ページが見つかりません | Swiftechie";
---
<link rel="canonical" href={Astro.url}>
<div class="min-h-screen flex items-center justify-center">
  <div class="text-center">
    <h1 class="text-6xl font-bold text-slate-900">404</h1>
    <p class="mt-4 text-slate-600">お探しのページは見つかりませんでした。</p>
    <a href="/" class="mt-8 inline-block px-6 py-3 bg-brand-teal text-white rounded-full">
      トップへ戻る
    </a>
  </div>
</div>
```

---

#### 6. 骨架屏加载 🎨 UX
**当前状态**: ⚠️ 白屏等待
**方案**: 为产品页面添加加载状态
```astro
{# 产品页 #}
{loading && (
  <div class="animate-pulse">
    <div class="h-64 bg-slate-200 rounded-3xl mb-8"></div>
    <div class="h-8 bg-slate-200 rounded w-3/4 mb-4"></div>
    <div class="h-4 bg-slate-200 rounded w-full mb-2"></div>
    <div class="h-4 bg-slate-200 rounded w-2/3"></div>
  </div>
)}
```

---

### 优先级 P2 (锦上添花)

#### 7. PWA支持 📱 功能
**当前状态**: ⚠️ 未配置
**方案**: 添加 `public/site.webmanifest`
```json
{
  "name": "Swiftechie",
  "short_name": "Swiftechie",
  "description": "技術で未来をつなぐ",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#ffffff",
  "theme_color": "#00BFA5",
  "icons": [
    {
      "src": "/favicon.png",
      "sizes": "192x192",
      "type": "image/png"
    }
  ]
}
```

---

#### 8. TypeScript严格模式 🔧 代码质量
**当前状态**: ⚠️ 未开启
**方案**: 修改 `astro.config.mjs`
```js
vite: {
  build: {
    rollupOptions: {
      onwarn(warning, warn) {
        // 忽略一些警告
      }
    }
  }
}
```
在 tsconfig.json 中添加:
```json
{
  "compilerOptions": {
    "strict": true
  }
}
```

---

#### 9. 图片懒加载优化 ⚡ 性能
**当前状态**: ⚠️ 仅1张图片配置
**方案**: 为所有非首屏图片添加 `loading="lazy"`
```astro
<img src={image.src} loading="lazy" decoding="async" />
```

---

#### 10. Open Graph社交媒体优化 📱 分享
**当前状态**: ⚠️ 部分配置
**方案**: 为每个页面添加完整OG标签
```astro
---
const title = "AIソリューション | Swiftechie";
const description = "最先端のAI技術でビジネス課題を解決します";
const image = "/og-ai.jpg";
---
<meta property="og:type" content="website" />
<meta property="og:title" content={title} />
<meta property="og:description" content={description} />
<meta property="og:image" content={new URL(image, Astro.url)} />
<meta name="twitter:card" content="summary_large_image" />
```

---

## 📊 优先级矩阵

```
高影响 │ ①图片优化     ②结构化数据
      │ ③资源预加载
      │
─────┼──────────────────────
      │ ④联系表单     ⑤404页面
低影响 │ ⑦PWA         ⑧TS严格模式
      │ ⑨懒加载      ⑩OG优化
      └───────────────────────
        低成本          高成本
```

---

## 🎯 推荐实施顺序

### 第一批 (本周内)
1. **图片优化** - 最大性能收益
2. **结构化数据** - SEO直接收益
3. **资源预加载** - LCP改善

### 第二批 (下周)
4. **联系表单后端** - 功能完整性
5. **404页面** - UX完整性
6. **OG优化** - 社交分享

### 第三批 (有时间时)
7. **PWA支持** - 移动端体验
8. **TypeScript严格模式** - 代码质量

---

## 💡 快速实现指南

### 图片优化 - 最快5分钟
```bash
# 1. 安装sharp (图片处理)
npm install sharp

# 2. 将产品图片移到 public/assets/images/

# 3. 在组件中使用
import { Image } from 'astro:assets';
import productImage from '~/assets/images/product.png';
<Image src={productImage} format="webp" />
```

### 结构化数据 - 最快10分钟
复制上面的JSON-LD模板到 `src/layouts/Layout.astro` 的 `<head>` 中

### 联系表单 - 最快5分钟
1. 注册 https://web3forms.com/
2. 获取access_key
3. 修改 `<form>` 标签添加action属性

---

## 📈 预期改善

实施后预期指标改善：

| 指标 | 当前 | 目标 | 改善 |
|------|------|------|------|
| LCP | ~2.5s | <1.5s | ⬇️ 40% |
| 图片大小 | 原始 | WebP | ⬇️ 60% |
| Lighthouse SEO | ~85 | >95 | ⬆️ 10% |
| 用户体验 | 基础 | 完整 | ⬆️ 功能 |

---

**文档维护**: 如有新增优化项，请及时更新此清单
