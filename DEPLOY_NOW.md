# 🚀 AWS Amplify 部署 - 快速指南

## ✅ 部署准备已完成

所有必要的配置文件已创建并验证：
- ✅ `amplify.yaml` - Amplify 配置
- ✅ `robots.txt` - 搜索引擎爬虫配置
- ✅ `sitemap.xml` - 站点地图（自动生成）
- ✅ 构建验证成功（18 页面）

---

## 📋 部署清单

### 第一步：准备 GitHub 仓库

```bash
# 1. 确保代码已提交
git add .
git commit -m "Ready for AWS Amplify deployment"
git push origin main
```

### 第二步：在 AWS Amplify 创建应用

**方法 A: 浏览器部署（推荐）**

1. 访问: https://console.aws.amazon.com/amplify/
2. 点击: "New app" → "Host web app"
3. 选择: GitHub（点击并授权）
4. 选择仓库: `homepage-claude`
5. 选择分支: `main`

**构建设置**:
```
Build command: npm run build:search
Publish directory: dist
Base directory: (留空)
```

**环境变量**:
```
PUBLIC_GA_MEASUREMENT_ID = (稍后配置)
PUBLIC_SITE_URL = https://www.swiftechie.com
```

6. 点击: "Save and deploy"

### 第三步：验证部署

等待 2-3 分钟后，访问提供的 URL:
```
https://main.xxxxxxxxxx.amplifyapp.com
```

**检查清单**:
- [ ] 首页正常显示
- [ ] 导航菜单工作
- [ ] 搜索功能正常（Cmd/Ctrl + K）
- [ ] 移动端适配
- [ ] 所有页面可访问

### 第四步：配置自定义域名（可选）

1. 在 Amplify Console → Domain management
2. 点击 "Add domain"
3. 输入: `www.swiftechie.com`

**DNS 配置**:
```
类型: CNAME
名称: www
值: xxxxxxxxxx.amplifyapp.com
```

---

## 🔧 配置环境变量

部署后，添加以下环境变量：

**在 Amplify Console: App settings → Environment variables**

```bash
# Google Analytics 4
PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX

# 网站URL
PUBLIC_SITE_URL=https://www.swiftechie.com

# Node 版本（可选，自动检测）
NODE_VERSION=20
```

---

## 📊 部署统计

| 项目 | 数值 |
|------|------|
| 总页面数 | 18 |
| 构建时间 | ~5 秒 |
| 搜索索引 | 997 词 |
| 输出大小 | ~2 MB |

---

## 🔄 更新部署

每次代码更新后：

```bash
# 自动部署
git push origin main

# 或手动触发
# Amplify Console → Deployments → "Redeploy this version"
```

---

## 📱 部署后 URL

**临时 URL** (部署后获得):
```
https://main.xxxxxxxxxx.amplifyapp.com
```

**生产 URL** (配置域名后):
```
https://www.swiftechie.com
```

---

## 🆘 遇到问题？

查看完整部署文档:
- `docs/AMPLIFY_DEPLOYMENT.md` - 详细部署指南
- `docs/DEPLOYMENT_CHECKLIST.md` - 部署清单

---

**准备就绪！开始部署吧！** 🚀

1. 打开 https://console.aws.amazon.com/amplify/
2. 点击 "New app"
3. 按照本指南操作
