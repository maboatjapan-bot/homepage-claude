# 部署清单 - Swiftechie 官网

## 📋 部署前检查

### 代码质量
- [x] 代码构建成功 (`npm run build`)
- [ ] 无 TypeScript 错误
- [ ] 无 ESLint 警告
- [ ] 所有页面可正常访问

### 内容检查
- [ ] 所有页面内容完整
- [ ] 图片正确显示
- [ ] 链接有效（无 404）
- [ ] 表单可正常提交

### SEO 检查
- [x] Sitemap 已生成 (`/sitemap.xml`)
- [ ] Meta 标签完整
- [ ] Open Graph 标签
- [ ] 结构化数据

### 性能检查
- [ ] Lighthouse 分数 > 90
- [ ] Core Web Vitals 良好
- [ ] 图片已优化
- [ ] CSS/JS 已压缩

### 功能检查
- [x] 搜索功能正常
- [ ] GA4 追踪已配置
- [ ] 联系表单可提交
- [ ] 移动端适配

## 🚀 部署步骤

### 1. 准备环境变量

创建 `.env` 文件（生产环境）：
```bash
# Google Analytics 4
PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX

# Web3Forms（联系表单）
# 在 contact 页面配置
```

### 2. 最终构建

```bash
# 清理旧的构建
rm -rf dist/

# 完整构建
npm run build

# 生成搜索索引
npm run build:search
```

### 3. 预览测试

```bash
# 本地预览
npm run preview

# 访问 http://localhost:4322
```

### 4. 部署选项

#### 选项 A: AWS Amplify（推荐）

```bash
# 1. 连接 GitHub 仓库
# 2. 配置构建设置
Build settings: npm run build
Base directory: /
Build command: npm run build && npx pagefind --site dist
Publish directory: dist

# 3. 配置环境变量
PUBLIC_GA_MEASUREMENT_ID
PUBLIC_SITE_URL=https://www.swiftechie.com
```

#### 选项 B: Vercel

```bash
# 安装 Vercel CLI
npm i -g vercel

# 部署
vercel --prod
```

#### 选项 C: Netlify

```bash
# netlify.toml
[build]
  command = "npm run build && npx pagefind --site dist"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

## ✅ 部署后验证

### 基本检查
- [ ] 网站可访问
- [ ] 所有页面可加载
- [ ] HTTPS 正常工作
- [ ] 域名正确解析

### 功能测试
- [ ] 导航菜单工作
- [ ] 搜索功能正常
- [ ] 表单可提交
- [ ] 移动端响应式

### SEO 验证
- [ ] `https://www.swiftechie.com/sitemap.xml` 可访问
- [ ] Google Search Console 提交 sitemap
- [ ] robots.txt 存在

### 分析验证
- [ ] GA4 实时数据
- [ ] 追踪代码已加载
- [ ] 事件追踪正常

## 🔧 故障排查

### 构建失败
```bash
# 清理缓存
rm -rf node_modules .astro dist
npm install
npm run build
```

### Pagefind 错误
```bash
# 单独运行 Pagefind
npx pagefind --site dist --verbose
```

### 图片不显示
- 检查文件路径
- 确认图片在 `public/` 目录
- 检查文件权限

## 📊 性能目标

### Core Web Vitals
- LCP (最大内容绘制): < 2.5s
- FID (首次输入延迟): < 100ms
- CLS (累积布局偏移): < 0.1

### Lighthouse 目标
- Performance: > 90
- Accessibility: > 90
- Best Practices: > 90
- SEO: > 90

## 🔄 回滚计划

如果部署出现问题：
```bash
# 1. AWS Amplify: 使用 "Rollbacks" 功能
# 2. Vercel: vercel rollback
# 3. Netlify: Deploy previous commit
```

## 📞 紧急联系

- 技术负责人: [联系方式]
- 部署负责人: [联系方式]
- AWS 支持: [账号信息]

---

**部署日期**: ___________
**部署人员**: ___________
**验证人员**: ___________
