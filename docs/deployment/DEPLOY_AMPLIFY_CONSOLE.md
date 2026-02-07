# 🚀 AWS Amplify 部署 - Amplify Console 方式

## 第一步：登录 AWS Amplify Console

1. 打开浏览器，访问: **https://console.aws.amazon.com/amplify/**

2. 如果需要登录 AWS：
   - 点击 "Sign in to the Console"
   - 使用 AWS 账号登录
   - （如无账号，点击 "Create an AWS Account" 注册）

## 第二步：创建新应用

1. 在 Amplify Console 点击 **"New app"**

2. 选择 **"Host web app"**

3. 选择 **GitHub** 作为代码仓库
   - 点击 "GitHub" 按钮
   - 如首次使用，点击 "Authorize AWS"
   - 登录 GitHub 并授权 AWS 访问

## 第三步：选择仓库

1. 从列表中选择: **homepage-claude**
2. 选择分支: **main**

## 第四步：配置构建设置

Amplify 会自动检测配置，确认以下设置：

```
┌─────────────────────────────────────────────┐
│ Build settings                              │
├─────────────────────────────────────────────┤
│ Branch:                main                 │
│ Build command:         npm run build:search│
│ Publish directory:     dist                 │
│ Base directory:        (留空)               │
└─────────────────────────────────────────────┘
```

## 第五步：配置环境变量（可选，稍后也可添加）

点击 "Advanced settings" → "Environment variables"

添加以下变量（稍后配置）:
```
PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
PUBLIC_SITE_URL=https://www.swiftechie.com
```

## 第六步：开始部署

1. 点击 **"Save and deploy"**

2. 等待部署完成（约 2-3 分钟）
   - 您会看到构建进度
   - 构建日志会显示
   - 完成后会显示 "Deploy successful"

## 第七步：访问网站

部署成功后，您会获得一个临时 URL：

```
https://main.xxxxxxxxxx.amplifyapp.com
```

点击此链接验证网站是否正常工作。

---

## ✅ 验证清单

访问临时 URL，检查：

- [ ] 首页正常显示
- [ ] 导航菜单工作
- [ ] 搜索功能正常（按 Cmd/Ctrl + K）
- [ ] 移动端适配正常
- [ ] 所有页面链接有效

---

## 🌐 配置自定义域名（可选）

### 步骤 1：添加域名

1. 在 Amplify Console 左侧菜单点击 **"Domain management"**
2. 点击 **"Add domain"**

### 步骤 2：输入域名

输入: `www.swiftechie.com`

### 步骤 3：配置 DNS

**选项 A: 使用 Route 53**（如果域名在 AWS）
- Amplify 会自动配置
- 自动创建 SSL 证书

**选项 B: 使用其他域名注册商**

在您的域名注册商添加 CNAME 记录：

```
类型: CNAME
名称: www
值: xxxxxxxxxx.amplifyapp.com
TTL: 300
```

### 步骤 4：等待 DNS 生效

- 通常需要几分钟到几小时
- Amplify 会监控并自动配置 SSL

---

## 🔄 后续更新

### 自动部署

每次推送到 GitHub 分支会自动部署：

```bash
git add .
git commit -m "Update content"
git push
# → 自动触发部署
```

### 手动重新部署

在 Amplify Console:
1. 选择应用
2. 点击 "Deployments"
3. 选择最近的部署
4. 点击 "Redeploy this version"

---

## 🆘 常见问题

### Q: 构建失败怎么办？
A: 查看 "Build logs" 中的错误信息，检查：
- Node 版本是否正确（应该是 20 或更高）
- 构建命令是否为 `npm run build:search`
- 依赖是否正确安装

### Q: 搜索功能不工作？
A: 确保：
- Pagefind 目录已生成
- `/pagefind/pagefind.js` 可访问
- 浏览器控制台没有错误

### Q: 如何回滚？
A: 在 "Deployments" 中选择之前的版本，点击 "Rollback"

---

## 📊 部署状态

查看部署状态:
1. Amplify Console → 选择应用
2. 查看部署历史和状态

---

**准备就绪！开始部署吧！** 🚀

访问: https://console.aws.amazon.com/amplify/
