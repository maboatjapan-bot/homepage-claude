# Web3Forms 配置指南

## 配置步骤（约5-10分钟）

### 步骤 1: 注册 Web3Forms

1. 访问 **https://web3forms.com/**
2. 点击右上角 **"Sign Up"** 或 **"Get Started"**
3. 填写注册信息：
   - **Email**: 建议使用公司邮箱（如 info@swiftechie.com）
   - **Password**: 设置密码
4. 点击 **"Sign Up"**
5. 检查邮箱，点击验证链接验证账户

---

### 步骤 2: 创建表单获取 Access Key

1. 登录后进入 **Dashboard**
2. 点击 **"New Form"** 或 **"Create Form"** 按钮
3. 填写表单信息：

   | 字段 | 填写内容 |
   |------|----------|
   | **Form Name** | `Swiftechie お問い合わせ` |
   | **Email To** | `info@swiftechie.com`（接收咨询的邮箱） |
   | **Email Subject** | `ウェブサイトからのお問い合わせ` |
   | **From Name** | `Swiftechie ウェブサイト` |

4. 点击 **"Create Form"**
5. 创建后会显示 **Access Key**，类似：
   ```
   a1b2c3d4-e5f6-7890-abcd-ef1234567890
   ```
6. **复制这个 Access Key**（下一步需要用到）

---

### 步骤 3: 配置到 AWS Amplify

有两种方式，推荐使用 **方式 A**

#### 方式 A: 环境变量（推荐）

1. 登录 **AWS Console**
2. 进入 **Amplify** 服务
3. 选择你的应用：`homepage-claude`
4. 点击左侧菜单 **"App settings"**
5. 选择 **"Environment variables"**
6. 点击 **"Add variable"**
7. 填写：
   - **Key**: `PUBLIC_WEB3FORMS_ACCESS_KEY`
   - **Value**: 粘贴你的 Access Key
8. 点击 **"Save"**
9. Amplify 会自动重新部署（2-3分钟）

#### 方式 B: 直接修改代码（不推荐）

只在无法使用环境变量时使用。

---

### 步骤 4: 测试表单

1. 等待 Amplify 部署完成
2. 访问 **https://www.swiftechie.com/contact**
3. 填写测试表单并提交
4. 检查 `info@swiftechie.com` 是否收到邮件

---

## 常见问题

### Q: 提交后没有收到邮件？

**检查清单**:
- [ ] Access Key 是否正确复制（没有多余空格）
- [ ] Amplify 环境变量是否保存
- [ ] 等待 Amplify 部署完成（约3分钟）
- [ ] 检查垃圾邮件文件夹
- [ ] Web3Forms Dashboard → Submissions（查看提交记录）

### Q: 免费版有什么限制？

- **每月提交次数**: 250次
- **表单数量**: 1个
- 对于小型企业网站完全够用

### Q: 如何查看表单提交记录？

1. 登录 Web3Forms
2. 进入 Dashboard
3. 点击你的 Form
4. 查看 **Submissions** 标签

### Q: 可以修改接收邮箱吗？

可以，无需改代码：
1. 登录 Web3Forms
2. 选择你的 Form
3. 点击 **Settings**
4. 修改 **Email To** 地址
5. 保存

---

## 费用说明

| 版本 | 价格 | 提交次数 | 表单数 |
|------|------|----------|--------|
| **Free** | ¥0 | 250次/月 | 1个 |
| Pro | $9/月 | 2500次/月 | 5个 |

免费版足够使用。

---

## 完成后

配置完成后，告诉我：
- ✅ 配置成功
- ⚠️ 遇到问题（描述问题）

我会帮你验证或排查。
