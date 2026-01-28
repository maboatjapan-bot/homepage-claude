# Swiftechie 官网 2026 - 设计系统文档

## 设计风格决策

**Apple 风格 + SmartDrive 配色**：借鉴 Apple 的高级设计手法，保持品牌色

| 元素 | 规格 |
|------|------|
| 风格参考 | Apple (设计手法) + SmartDrive (配色) |
| 整体感觉 | 高级、精致、专业、可信赖 |
| 目标受众 | B2B 企业客户 + B2C 消费者 |

**借鉴的 Apple 设计手法**：
- 戏剧性的大标题（64-80px）
- 大量留白（py-24, py-32）
- 产品聚焦布局
- 毛玻璃效果导航栏
- 细腻的阴影和光晕
- 渐变文字效果
- 圆润的 pill 按钮
- 优雅的滚动动画
- 深色背景区创造节奏感

---

## 配色系统

| 用途 | 颜色 | Hex | Tailwind |
|------|------|-----|----------|
| **主色** | 青绿色 | `#00BFA5` | `bg-[#00BFA5]` |
| **主色（暗）** | 青绿色暗 | `#00A890` | `hover:bg-[#00A890]` |
| **辅助色** | 蓝色 | `#3b82f6` | `bg-blue-600` |
| **渐变** | 青绿→蓝 | `#00BFA5 → #3b82f6` | `bg-gradient-to-br from-[#00BFA5] to-blue-600` |
| **背景** | 白色 | `#FFFFFF` | `bg-white` |
| **浅背景** | 浅灰 | `#F8FAFC` | `bg-slate-50` |
| **深色背景** | 深岩灰 | `#020617` | `bg-slate-950` |
| **边框** | 淡灰 | `#E2E8F0` | `border-slate-200` |
| **正文** | 深灰 | `#64748B` | `text-slate-500` |
| **标题** | 近黑 | `#0F172A` | `text-slate-900` |

---

## 字体系统

| 用途 | 字体 | 大小 | 字重 | 行高 |
|------|------|------|------|------|
| H1 标题 | Inter / Noto Sans JP | 64-80px | Bold | 1.05 |
| H2 标题 | Inter / Noto Sans JP | 48-64px | Bold | 1.1 |
| H3 标题 | Inter / Noto Sans JP | 20-24px | Semibold | - |
| 导航 | Inter / Noto Sans JP | 14px | Medium | - |
| 正文 | Inter / Noto Sans JP | 16-20px | Regular | 1.6 |
| 小字 | Inter / Noto Sans JP | 14px | Regular | - |

**CDN 引入**：
```html
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Noto+Sans+JP:wght@400;500;600;700;800&display=swap" rel="stylesheet">
```

---

## 组件规范

### 导航栏（毛玻璃效果）

```html
<nav class="fixed top-0 left-0 right-0 z-50 bg-white/70 backdrop-blur-xl border-b border-slate-200/50">
  <div class="max-w-7xl mx-auto px-6">
    <div class="flex items-center justify-between h-14">
      <!-- Logo -->
      <!-- 菜单 -->
      <!-- Pill shape CTA -->
    </div>
  </div>
</nav>
```

### 按钮

| 类型 | 样式 | 用途 |
|------|------|------|
| Primary | `bg-[#00BFA5] hover:bg-[#00A890] text-white rounded-full shadow-xl shadow-[#00BFA5]/25` | 主要 CTA |
| Secondary | `bg-slate-100 hover:bg-slate-200 text-slate-900 rounded-full` | 次要操作 |
| Pill CTA | `px-5 py-2 rounded-full` | 导航栏按钮 |

### 卡片

```html
<!-- 深色背景卡片（产品展示） -->
<div class="premium-card bg-gradient-to-b from-slate-800/50 to-slate-900/50 rounded-3xl p-10 border border-slate-700/50 glow-effect">
  <!-- content -->
</div>

<!-- 浅色背景卡片 -->
<div class="premium-card bg-white rounded-2xl p-8 border border-slate-200">
  <!-- content -->
</div>
```

**卡片悬停效果**：
```css
.premium-card {
  transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}
.premium-card:hover {
  transform: scale(1.02);
}
```

### 渐变文字

```html
<h1 class="gradient-text">未来</h1>
```

```css
.gradient-text {
  background: linear-gradient(135deg, #00BFA5 0%, #3b82f6 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
```

---

## Tailwind 配置

```javascript
// tailwind.config.js
export default {
  theme: {
    extend: {
      colors: {
        brand: {
          teal: '#00BFA5',
          'teal-dark': '#00A890',
          blue: '#3b82f6',
        }
      },
      fontFamily: {
        sans: ['Inter', 'Noto Sans JP', 'sans-serif'],
      },
      boxShadow: {
        'glow': '0 0 60px rgba(0, 191, 165, 0.15)',
        'brand': '0 0 40px rgba(0, 191, 165, 0.25)',
      }
    }
  }
}
```

---

## 页面布局模式

### Hero 布局（左文右图，Apple 风格）

```html
<section class="py-20 px-6 bg-gradient-to-b from-slate-50 to-white">
  <div class="max-w-7xl mx-auto">
    <div class="grid lg:grid-cols-2 gap-16 items-center">
      <!-- 左侧：文案 -->
      <div>
        <!-- Badge -->
        <!-- 大标题 -->
        <!-- 描述 -->
        <!-- CTA 按钮 -->
      </div>
      <!-- 右侧：产品图（大而突出） -->
      <div>
        <!-- 产品图片 -->
      </div>
    </div>
  </div>
</section>
```

### 全屏 Hero（居中）

```html
<section class="pt-32 pb-24 px-6">
  <div class="max-w-5xl mx-auto text-center">
    <!-- Badge -->
    <!-- 超大标题 -->
    <!-- 描述 -->
    <!-- CTA 按钮 -->
  </div>
</section>
```

### 深色背景产品区

```html
<section class="py-32 px-6 bg-slate-950 text-white">
  <div class="max-w-7xl mx-auto">
    <div class="text-center mb-20">
      <h2 class="text-5xl md:text-6xl font-bold tracking-tight">製品・サービス</h2>
    </div>
    <!-- 卡片网格 -->
  </div>
</section>
```

---

## 间距规范（Apple 风格，更宽裕）

| 区域 | 上下间距 |
|------|----------|
| Hero Section | `py-24` ~ `py-32` (96-128px) |
| 标准 Section | `py-24` (96px) |
| 容器内边距 | `px-6` (24px) |
| 卡片内边距 | `p-10` (40px) |

---

## 动画效果

### 滚动淡入动画

```html
<div class="fade-in">内容</div>
```

```css
.fade-in {
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.8s ease, transform 0.8s ease;
}
.fade-in.visible {
  opacity: 1;
  transform: translateY(0);
}
```

```javascript
// JavaScript
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
```

### 光晕效果

```css
.glow-effect {
  box-shadow: 0 0 60px rgba(0, 191, 165, 0.15);
}
```

---

## 图片规格

| 类型 | 尺寸 | 格式 |
|------|------|------|
| Hero 产品图 | 800x800+ | WebP |
| 产品详情图 | 1200x1200+ | WebP |
| Logo | 200x200 | SVG |
| 图标 | 24x24, 48x48 | SVG |

---

## 圆角规范

| 元素 | 圆角 |
|------|------|
| 按钮（pill） | `rounded-full` |
| 卡片（大） | `rounded-3xl` (24px) |
| 卡片（标准） | `rounded-2xl` (16px) |
| 图标容器 | `rounded-2xl` / `rounded-3xl` |
| Badge | `rounded-full` |

---

## 阴影规范

```css
/* 品牌色阴影 */
shadow-[#00BFA5]/20
shadow-[#00BFA5]/25

/* 光晕 */
shadow-glow
box-shadow: 0 0 60px rgba(0, 191, 165, 0.15)

/* 深色卡片光晕 */
box-shadow: 0 0 60px rgba(0, 191, 165, 0.15)
```

---

## 渐变规范

```css
/* 品牌渐变 */
bg-gradient-to-br from-[#00BFA5] to-blue-600

/* CTA 渐变 */
bg-gradient-to-br from-[#00BFA5] via-[#00BFA5] to-blue-600

/* 背景渐变 */
bg-gradient-to-b from-slate-50 to-white
```
