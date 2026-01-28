# AWS Amplify 部署指南

Swiftechie 官网 AWS Amplify 部署完整指南

---

## 📋 前置要求

### 账户准备
- [ ] AWS 账户（如无，请注册 https://aws.amazon.com）
- [ ] GitHub 账户（推荐）或 GitLab/Bitbucket
- [ ] 域名 www.swiftechie.com（可选）

### 本地准备
- [ ] 项目代码已推送到 GitHub
- [ ] 环境变量已配置（`.env.example` → `.env`）

---

## 🚀 部署步骤

### 方法 1: 通过 AWS Amplify Console（推荐）

#### 步骤 1: 登录 AWS Amplify

1. 访问 https://console.aws.amazon.com/amplify/
2. 点击 "New app" → "Host web app"

#### 步骤 2: 连接代码仓库

**选项 A: GitHub（推荐）**
1. 点击 "GitHub" 按钮
2. 授权 AWS 访问您的 GitHub
3. 选择仓库: `homepage-claude`
4. 选择分支: `main` 或 `master`

**选项 B: 其他 Git 提供商**
- GitLab: 点击 "GitLab"
- Bitbucket: 点击 "Bitbucket"
- CodeCommit: 使用 AWS CodeCommit

#### 步骤 3: 配置构建设置

**基本配置**:
```
构建配置: Detect build settings (自动检测) 或 Use custom settings

如果选择自定义设置:
┌─────────────────────────────────────────────────┐
│ App settings                                     │
├─────────────────────────────────────────────────┤
│ Branch: main                                    │
│ Build settings:                                 │
│   Build command: npm run build:search          │
│   Publish directory: dist                       │
│   Base directory: /                             │
└─────────────────────────────────────────────────┘
```

**环境变量**（在 App settings → Environment variables）:
```
PUBLIC_GA_MEASUREMENT_ID = G-XXXXXXXXXX
PUBLIC_SITE_URL = https://www.swiftechie.com
NODE_VERSION = 20
```

#### 步骤 4: 开始部署

1. 点击 "Save and deploy"
2. 等待部署完成（约 2-3 分钟）
3. 部署完成后，您将获得一个 Amplify URL:
   ```
   https://main.xxxxxxxxxx.amplifyapp.com
   ```

#### 步骤 5: 验证部署

访问临时 URL 并检查：
- [ ] 首页正常加载
- [ ] 所有页面可访问
- [ ] 搜索功能工作
- [ ] 移动端适配正常

---

### 方法 2: 使用 AWS CLI（高级用户）

#### 安装 AWS CLI

```bash
# macOS
brew install awscli

# Linux
sudo apt-get install awscli

# Windows
# 下载安装程序: https://aws.amazon.com/cli/

# 验证安装
aws --version
```

#### 配置 AWS 凭证

```bash
aws configure
# 输入 AWS Access Key ID
# 输入 AWS Secret Access Key
# 默认区域: us-east-1 或 ap-northeast-1（东京）
# 默认输出格式: json
```

#### 初始化 Amplify

```bash
# 安装 Amplify CLI
npm install -g @aws-amplify/cli

# 初始化项目
amplify init

# 按提示操作:
# - 选择环境: dev
# - 选择编辑器: None (或您喜欢的编辑器)
# - 选择应用类型: javascript
# - 选择框架: Astro (或选择 "No framework" 和 "静态网站")
```

#### 添加托管

```bash
amplify add hosting

# 选择:
# ? Select the plugin module to execute: Hosting with Amplify Console
# ? Choose a type: Static website hosting (推荐) 或 Single Page App (SPA)
# ? Custom domain: (可选) 稍后配置
```

#### 发布

```bash
amplify publish

# 这将:
# 1. 构建项目
# 2. 上传到 AWS Amplify
# 3. 提供一个云端 URL
```

---

## 🌐 配置自定义域名

### 在 Amplify Console 中配置

1. 进入 Amplify Console
2. 选择您的应用
3. 导航到: Domain management
4. 点击 "Add domain"

#### 选项 A: 使用 Amplify 域名（免费）

```
www.swiftechie.amplifyapp.com
```

#### 选项 B: 使用自己的域名

1. 输入域名: `www.swiftechie.com`
2. 选择:
   - **新域名**: 在 Route 53 注册（如果未注册）
   - **现有域名**: 在其他注册商处

3. 配置 DNS

**如果在 Route 53 管理**:
- 自动创建 A 记录
- 自动配置 SSL 证书

**如果在其他注册商**:
- 添加 CNAME 记录:

```
Type: CNAME
Name: www
Value: xxxxxxxxxx.amplifyapp.com
TTL: 300
```

### SSL 证书

Amplify 自动为您的域名提供免费的 SSL 证书（通过 AWS Certificate Manager）

---

## 🔧 高级配置

### 环境变量

在 Amplify Console: App settings → Environment variables

```bash
# 必需
PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
PUBLIC_SITE_URL=https://www.swiftechie.com

# 可选
NODE_VERSION=20
NPM_VERSION=10
```

### 构建设置（amplify.yaml）

项目已包含 `amplify.yaml` 配置文件，包括:
- 自定义 HTTP 头
- 缓存策略
- 重定向规则

### 预览部署

**启用分支预览**:

1. App settings → Branch settings
2. 为每个分支启用预览:
   ```
   main → production
   dev → development
   feature/* → preview
   ```

**Pull Request 预览**:
- 每次创建 PR 会自动生成预览 URL
- 便于在合并前测试更改

---

## 📊 监控和日志

### 查看构建日志

1. Amplify Console → 选择应用
2. 选择 "Build logs"
3. 查看最近的构建记录

### 查看部署状态

```bash
# 使用 Amplify CLI
amplify status

# 输出:
# Current Environment: dev
# ┌──────────────────────┬─────────────────┬───────────────┐
# │ Category             │ Resource        │ Status        │
# ├──────────────────────┼─────────────────┼───────────────┤
# │ Hosting              │ Amplify Hosting │ Provisioned   │
# └──────────────────────┴─────────────────┴───────────────┘
```

### CloudWatch 日志

1. CloudWatch → Log groups
2. 找到 `/aws/amplify/...`
3. 查看应用日志

---

## 🔄 CI/CD 工作流

### 自动部署

配置完成后，每次推送到分支会自动触发部署：

```
git push origin main
# → 自动构建
# → 自动部署
# → 新版本上线
```

### 手动部署

```bash
# 推送更改
git add .
git commit -m "Update content"
git push origin main

# 或使用 Amplify CLI
amplify publish
```

### 回滚部署

**在 Amplify Console**:
1. Deployments → Recent deployments
2. 选择之前的版本
3. 点击 "Rollback"
4. 确认回滚

---

## 🎯 部署后检查清单

### 功能测试
- [ ] 首页加载正常
- [ ] 所有导航链接有效
- [ ] 搜索功能工作
- [ ] 联系表单可提交
- [ ] 移动端响应式正常
- [ ] 动画效果正常

### SEO 检查
- [ ] Sitemap 可访问: `/sitemap.xml`
- [ ] robots.txt 存在（如有配置）
- [ ] Meta 标签完整
- [ ] Open Graph 标签存在

### 性能检查
- [ ] 运行 Lighthouse 测试
- [ ] Core Web Vitals 良好
- [ ] 图片已优化

### 分析检查
- [ ] GA4 实时数据显示
- [ ] 页面浏览追踪正常
- [ ] 事件追踪工作（如配置）

---

## 🛠️ 故障排查

### 构建失败

**常见问题**:
```bash
# 错误: Node version too old
# 解决: 在环境变量设置 NODE_VERSION=20

# 错误: Build timeout
# 解决: 在 amplify.yaml 中增加超时时间

# 错误: Pagefind not found
# 解决: 确保使用 npm run build:search
```

### 页面 404

**检查**:
- 构建输出目录是否为 `dist`
- 文件是否正确生成
- 路由配置是否正确

### 搜索不工作

**检查**:
- Pagefind 目录是否存在于 `dist/pagefind`
- `pagefind.js` 是否可访问
- 浏览器控制台是否有错误

### 图片不显示

**检查**:
- 图片路径是否正确
- 文件是否在 `public/` 目录
- 文件权限是否正确

---

## 📱 Amplify Console 应用

**安装 Amplify Console 移动应用**:
- iOS: App Store
- Android: Google Play

**功能**:
- 查看部署状态
- 接收构建通知
- 查看实时日志
- 回滚部署

---

## 💰 成本估算

### AWS Amplify 免费套餐

**构建时间**:
- 免费: 1000 分钟/月
- 超出: $0.01/分钟

**存储**:
- 免费: 5 GB
- 超出: $0.15/GB

**带宽**:
- 免费: 100 GB/月
- 超出: $0.15/GB

### 预估月成本（小型网站）

```
构建: ~100 分钟 → 免费
存储: ~50 MB → 免费
带宽: ~10 GB → 免费
────────────────────────────
总计: $0/月（免费套餐内）
```

---

## 🔗 有用链接

- [AWS Amplify 文档](https://docs.aws.amazon.com/amplify/)
- [Amplify 控制台](https://console.aws.amazon.com/amplify/)
- [Amplify CLI 文档](https://docs.amplify.aws/cli/)
- [Route 53 文档](https://docs.aws.amazon.com/Route53/)

---

## 📞 支持

如遇到问题:
1. 查看 [Amplify 故障排查指南](https://docs.aws.amazon.com/amplify/latest/userguide/troubleshooting.html)
2. 检查 CloudWatch 日志
3. 联系 AWS 支持

---

**部署完成后，请更新本文档记录实际部署配置。**
