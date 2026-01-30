# Swiftechie 官网 - 运维操作手册

> 版本: v1.0
> 最后更新: 2026-01-30
> 维护者: Swiftechie 开发团队

---

## 📋 目录

1. [文档管理](#文档管理)
2. [联系表单配置](#联系表单配置)
3. [网站部署](#网站部署)
4. [内容更新](#内容更新)
5. [常用命令](#常用命令)
6. [故障排查](#故障排查)

---

## 📚 文档管理

### 文档结构

```
homepage-claude/
├── docs/                          # 运维文档
│   ├── OPERATIONS_MANUAL.md       # 本文档
│   └── RELEASE_NOTES.md           # 版本发布记录
├── DESIGN_SYSTEM.md               # 设计系统规范
├── ASSET_GUIDELINES.md            # 素材制作规范
├── OPTIMIZATION_TODO.md           # 优化清单
└── PROJECT_STATUS.md              # 项目状态
```

### 文档更新规范

**当进行以下操作时，必须更新对应文档**：

| 操作类型 | 更新文档 | 负责人 |
|---------|---------|--------|
| 新功能上线 | `docs/RELEASE_NOTES.md` | 开发者 |
| 修复 Bug | `docs/RELEASE_NOTES.md` | 开发者 |
| 配置变更 | 本文档 | 运维 |
| 内容更新 | 通知相关团队 | 内容编辑 |

### 版本发布记录模板

```markdown
## [版本号] - YYYY-MM-DD

### 新增
- 功能描述

### 修复
- 问题描述

### 变更
- 配置或设计变更

### 已知问题
- 待解决的问题
```

---

## 📧 联系表单配置

### Web3Forms 工作原理

```
用户填写表单
    ↓
前端提交到 Web3Forms API (https://api.web3forms.com/submit)
    ↓
Web3Forms 发送邮件到你配置的邮箱
    ↓
你收到邮件，可以回复用户
```

**关键点**：
- ✅ 无需自己配置邮件服务器
- ✅ 无需编写后端代码
- ✅ Web3Forms 免费提供邮件服务
- ✅ 支持附件、自定义字段

---

### 配置步骤

#### 步骤 1: 注册 Web3Forms 账号

1. 访问 https://web3forms.com/
2. 点击 "Sign Up" 注册
3. 使用邮箱注册（推荐使用公司邮箱 info@swiftechie.com）
4. 验证邮箱

#### 步骤 2: 创建 Form 获取 Access Key

1. 登录后进入 Dashboard
2. 点击 "New Form" 或 "Create Form"
3. 填写表单信息：
   - **Form Name**: Swiftechie お問い合わせ
   - **Email To**: 接收咨询的邮箱（如 info@swiftechie.com）
   - **Email Subject**: ウェブサイトからのお問い合わせ
4. 创建后会显示 **Access Key**（类似：`a1b2c3d4-e5f6-7890-abcd-ef1234567890`）
5. **保存这个 Access Key**，下一步需要用到

#### 步骤 3: 配置到网站

**方式 A: 通过 AWS Amplify 环境变量（推荐）**

1. 登录 AWS Amplify 控制台
2. 选择你的应用 `homepage-claude`
3. 进入 "App settings" → "Environment variables"
4. 添加新的环境变量：
   - **Key**: `PUBLIC_WEB3FORMS_ACCESS_KEY`
   - **Value**: 你的 Access Key
5. 点击 "Save"
6. 等待 Amplify 重新部署

**方式 B: 直接修改代码（不推荐）**

编辑 `src/pages/contact.astro:49`:
```astro
<!-- 将占位符替换为实际的 access_key -->
<input type="hidden" name="access_key" value="你的实际AccessKey">
```

然后提交并推送代码。

#### 步骤 4: 测试表单

1. 访问网站的联系我们页面
2. 填写表单并提交
3. 检查配置的邮箱是否收到邮件
4. 验证邮件内容包含用户填写的信息

---

### 常见问题

**Q: 提交后没有收到邮件？**

检查清单：
- [ ] Access Key 是否正确配置
- [ ] Web3Forms Dashboard 中表单的 "Email To" 是否正确
- [ ] 检查垃圾邮件文件夹
- [ ] 查看 Web3Forms Dashboard 的 "Submissions" 是否有记录

**Q: 如何查看表单提交记录？**

1. 登录 Web3Forms
2. 进入 Dashboard
3. 点击你的 Form
4. 查看 "Submissions" 标签

**Q: 可以修改接收邮箱吗？**

可以：
1. 登录 Web3Forms
2. 选择你的 Form
3. 点击 "Settings"
4. 修改 "Email To" 地址
5. 保存

**Q: 免费版有什么限制？**

- 每月 250 次表单提交
- 1 个 Form
- 适合小型网站使用

**Q: 如何升级？**

如需更多表单提交次数，可以升级到 Pro 版本 ($9/月)

---

## 🚀 网站部署

### 部署流程

```
本地修改 → Git 提交 → Push 到 GitHub → Amplify 自动构建 → 部署完成
```

### 触发部署

**自动部署**（推荐）：
```bash
git add .
git commit -m "描述你的更改"
git push origin main
```

**手动部署**：
1. 登录 AWS Amplify 控制台
2. 选择应用
3. 点击 "Deploy" → "Redeploy this version"

### 部署监控

**查看部署状态**：
- Amplify 控制台 → 选择应用 → 查看 "Deployments"
- 部署时间：通常 2-3 分钟

**部署失败排查**：
1. 点击失败的部署
2. 查看 "Build logs"
3. 检查错误信息

---

## ✏️ 内容更新

### 新闻文章添加

**位置**: `src/content/news/`

**步骤**：
1. 创建新的 Markdown 文件，命名格式：`YYYY-MM-DD-title.md`
2. 添加 Frontmatter：
```yaml
---
title: "新闻标题"
date: 2026-01-30
category: "お知らせ"
description: "新闻简介"
---
```

3. 编写新闻内容（Markdown 格式）
4. 提交代码：
```bash
git add src/content/news/新文件.md
git commit -m "add: 新的新闻"
git push
```

### 产品信息更新

**位置**: `src/pages/products/`

**产品图片**：
- 放置到 `public/assets/images/products/`
- 更新对应页面中的图片路径

### 页面文本修改

**步骤**：
1. 找到对应的 `.astro` 文件
2. 修改文本内容
3. 本地测试：`npm run dev`
4. 提交并推送

---

## 💻 常用命令

### 本地开发

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 构建并生成搜索索引
npm run build:search

# 预览生产构建
npm run preview
```

### Git 操作

```bash
# 查看状态
git status

# 查看修改
git diff

# 添加所有修改
git add .

# 提交
git commit -m "描述"

# 推送
git push

# 拉取最新代码
git pull
```

---

## 🔍 故障排查

### 问题 1: 页面显示 404

**可能原因**：
- 文件路径错误
- 文件未提交到 Git

**解决**：
```bash
# 检查文件是否存在
git ls-files | grep 文件名

# 如果不存在，添加并提交
git add 文件路径
git commit -m "add: 添加缺失的文件"
git push
```

### 问题 2: 样式不生效

**可能原因**：
- 构建缓存问题
- CSS 文件路径错误

**解决**：
1. 在 Amplify 控制台清除缓存
2. 或强制重新部署：
```bash
git commit --allow-empty -m "force: 重新部署"
git push
```

### 问题 3: 搜索功能不工作

**检查**：
1. Pagefind 索引是否生成：`dist/pagefind/` 目录是否存在
2. `amplify.yaml` 中是否包含 `npm run build:search`
3. 浏览器控制台是否有错误

### 问题 4: 图片加载失败

**检查**：
1. 图片路径是否正确
2. 图片文件是否存在
3. 文件名大小写是否匹配（Linux 区分大小写）

---

## 📞 联系信息

### 开发团队
- **代码仓库**: https://github.com/maboatjapan-bot/homepage-claude.git
- **问题反馈**: GitHub Issues

### 服务提供商

| 服务 | 用途 | 链接 |
|------|------|------|
| AWS Amplify | 网站托管 | https://console.aws.amazon.com/amplify/ |
| GitHub | 代码托管 | https://github.com/ |
| Web3Forms | 表单服务 | https://web3forms.com/ |

---

## 📝 变更记录

| 日期 | 版本 | 变更内容 |
|------|------|----------|
| 2026-01-30 | v1.0 | 初始版本，包含基础运维操作 |

---

**文档维护**: 如有疑问或需要更新，请联系开发团队
