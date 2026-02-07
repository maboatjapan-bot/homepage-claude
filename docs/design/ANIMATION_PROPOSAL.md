# 动画实现方案提案

## 项目需求回顾

**目标**：在保持 Astro SSG 性能优势的前提下，为网站添加动态效果和滚动交互

**核心原则**：
- ✅ 不影响首屏加载 (LCP)
- ✅ 不影响 SEO
- ✅ 按需加载动画库
- ✅ 移动端性能友好

---

## 方案对比总览

| 方案 | 性能 | 功能 | 复杂度 | 推荐度 | 成本 |
|------|------|------|--------|--------|------|
| **A. 渐进增强** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ | 简单 | ⭐⭐⭐⭐⭐ | 免费 |
| **B. CSS Native** | ⭐⭐⭐⭐⭐ | ⭐⭐ | 非常简单 | ⭐⭐⭐⭐ | 免费 |
| **C. GSAP 专业版** | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | 中等 | ⭐⭐⭐ | 免费 |
| **D. 完整体验** | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ | 较复杂 | ⭐⭐⭐ | 免费 |

---

## 方案 A: 渐进增强方案 ⭐⭐⭐⭐⭐ 推荐

**适合**: 大多数企业官网，平衡性能和效果

### 技术栈
```javascript
// 1. 基础: CSS + Intersection Observer (原生)
// 2. 进阶: 按需加载 GSAP (仅在需要复杂动画的页面)
// 3. 页面过渡: Astro View Transitions
```

### 实现内容

#### 第一阶段: 基础滚动动画 (所有页面)
```css
/* 元素进入视口时淡入 */
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
// 轻量级 Intersection Observer (原生 API)
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1 });
```

#### 第二阶段: 页面过渡 (全局)
```astro
<!-- BaseLayout.astro -->
<meta name="view-transition" content="same-origin" />
```

#### 第三阶段: 复杂动画 (仅特定页面)
```javascript
// 仅在 AI 页面或产品详情页加载 GSAP
if (document.body.classList.contains('page-ai')) {
  import('https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js');
  import('https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js');
}
```

### 优点
- ✅ 首屏零影响 (动画按需加载)
- ✅ 渐进增强 (基础效果保证)
- ✅ 灵活控制 (复杂页面可选)
- ✅ 学习成本低

### 缺点
- ⚠️ 需要手动管理页面级别的动画加载

### 实现示例

```astro
---
// src/components/FadeIn.astro
---

<div class="fade-in">
  <slot />
</div>

<style>
  .fade-in {
    opacity: 0;
    transform: translateY(30px);
    transition: opacity 0.8s ease, transform 0.8s ease;
  }
  .fade-in.visible {
    opacity: 1;
    transform: translateY(0);
  }
</style>

<script>
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target); // 只触发一次
      }
    });
  }, { threshold: 0.1 });

  // 观察当前组件
  observer.observe(document.currentScript.parentElement?.previousElementSibling || document.currentScript.previousElementSibling);
</script>
```

### 使用方式

```astro
---
import FadeIn from '../components/FadeIn.astro';
---

<FadeIn>
  <h1>标题</h1>
</FadeIn>

<FadeIn delay={200}>
  <p>内容</p>
</FadeIn>
```

---

## 方案 B: CSS Native 方案 ⭐⭐⭐⭐

**适合**: 追求极致性能，简单淡入效果即可

### 技术栈
```css
/* 纯 CSS，零 JavaScript 依赖 */
@scroll-timeline + animation-timeline
```

### 实现内容

```css
/* CSS Scroll-driven Animations */
@keyframes fade-in {
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
}

.animate-on-scroll {
  animation: fade-in linear both;
  animation-timeline: view();
  animation-range: entry 0% cover 30%;
}
```

### 优点
- ✅ 零 JS 依赖
- ✅ 原生性能最佳
- ✅ 零运行时开销

### 缺点
- ⚠️ 浏览器支持较新 (Chrome 115+, 2023年9月起)
- ⚠️ 功能相对简单
- ⚠️ Safari 暂不支持 (需 fallback)

### 浏览器兼容性

| 浏览器 | 支持 | 份额 |
|--------|------|------|
| Chrome 115+ | ✅ | ~65% |
| Edge 115+ | ✅ | ~5% |
| Safari | ❌ | ~20% |
| Firefox | ❌ | ~3% |

### 实现 (带 Fallback)

```astro
---
// src/components/FadeIn.astro
---

<div class="animate-on-scroll fade-in-fallback">
  <slot />
</div>

<style>
  /* 现代浏览器: CSS Scroll-driven */
  @supports (animation-timeline: view()) {
    @keyframes fade-in {
      from { opacity: 0; transform: translateY(30px); }
      to { opacity: 1; transform: translateY(0); }
    }

    .animate-on-scroll {
      animation: fade-in linear both;
      animation-timeline: view();
      animation-range: entry 0% cover 30%;
    }
  }

  /* Safari/Fallback: Intersection Observer */
  @supports not (animation-timeline: view()) {
    .fade-in-fallback {
      opacity: 0;
      transform: translateY(30px);
      transition: opacity 0.8s ease, transform 0.8s ease;
    }
    .fade-in-fallback.visible {
      opacity: 1;
      transform: translateY(0);
    }
  }
</style>

<script>
  // 仅在不支持 CSS Scroll-driven 时执行
  if (!CSS.supports('animation-timeline', 'view()')) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.fade-in-fallback').forEach(el => observer.observe(el));
  }
</script>
```

---

## 方案 C: GSAP 专业版 ⭐⭐⭐

**适合**: 需要复杂滚动交互、视差效果、时间轴控制

### 技术栈
```javascript
// GSAP 3.12.5 + ScrollTrigger + Lenis (平滑滚动)
```

### 实现内容

#### 安装
```bash
npm install gsap @studio-freight/lenis
```

#### 核心功能

```astro
---
// src/pages/index.astro (首页使用完整 GSAP)
---

<script>
  import { gsap } from 'gsap';
  import { ScrollTrigger } from 'gsap/ScrollTrigger';
  import Lenis from '@studio-freight/lenis';

  // 仅在客户端
  if (import.meta.env.CLIENT) {
    gsap.registerPlugin(ScrollTrigger);

    // 1. 平滑滚动
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // 2. Hero 文字动画
    gsap.from('.hero-title', {
      y: 100,
      opacity: 0,
      duration: 1.2,
      ease: 'power3.out'
    });

    // 3. 产品卡片滚动触发
    gsap.utils.toArray('.product-card').forEach((card, i) => {
      gsap.from(card, {
        scrollTrigger: {
          trigger: card,
          start: 'top 85%',
          end: 'bottom 15%',
          toggleActions: 'play none none reverse'
        },
        y: 60,
        opacity: 0,
        duration: 0.8,
        delay: i * 0.1
      });
    });

    // 4. AI Section 视差效果
    gsap.to('.ai-section-bg', {
      scrollTrigger: {
        trigger: '.ai-section',
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1
      },
      y: 100,
      opacity: 0.5
    });

    // 5. 数字滚动动画
    gsap.utils.toArray('.stat-number').forEach(stat => {
      const value = stat.dataset.value;
      gsap.to(stat, {
        scrollTrigger: {
          trigger: stat,
          start: 'top 80%'
        },
        innerHTML: value,
        duration: 2,
        snap: { innerHTML: 1 }
      });
    });
  }
</script>
```

### 优点
- ✅ 业界标准，生态成熟
- ✅ 功能最强大
- ✅ 时间轴控制精确
- ✅ 性能优化完善

### 缺点
- ⚠️ 首次加载需加载 GSAP (约 100KB gzipped)
- ⚠️ 学习曲线较陡
- ⚠️ 可能过度工程化

### 优化策略

```astro
<!-- 仅在需要的页面动态导入 -->
<script>
  // 动态导入，减少首屏负担
  const initGSAP = async () => {
    if ('IntersectionObserver' in window) {
      const { default: gsap } = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);
      // ... 动画逻辑
    }
  };

  // 页面加载完成后初始化
  window.addEventListener('load', initGSAP);
</script>
```

---

## 方案 D: 完整体验方案 ⭐⭐⭐

**适合**: 追求极致体验，不介意额外加载时间

### 技术栈
```javascript
// GSAP + ScrollTrigger + Lenis + View Transitions + Three.js (可选)
```

### 实现内容

包含方案 C 的所有内容，额外增加：

#### 1. 页面过渡动画
```astro
<!-- 为不同页面添加过渡效果 -->
<a href="/ai" transition:animate="fade">
  AI ソリューション
</a>
```

#### 2. 3D 效果 (可选，仅在 AI 页面)
```javascript
// 仅在 AI 页面加载 Three.js
if (document.body.classList.contains('page-ai')) {
  import('three').then(({ Scene, PerspectiveCamera, WebGLRenderer }) => {
    // 创建 3D AI 神经网络可视化
  });
}
```

#### 3. 光标跟随效果
```javascript
// 自定义光标
const cursor = document.querySelector('.custom-cursor');
document.addEventListener('mousemove', (e) => {
  gsap.to(cursor, {
    x: e.clientX,
    y: e.clientY,
    duration: 0.1
  });
});
```

### 优点
- ✅ 视觉效果最震撼
- ✅ 体验最流畅
- ✅ 品牌感最强

### 缺点
- ⚠️ 首屏加载影响最大
- ⚠️ 维护成本高
- ⚠️ 移动端性能需谨慎优化

---

## 推荐决策矩阵

### 选择方案 A (渐进增强) 如果：
- ✅ 需要平衡性能和效果
- ✅ 首屏加载速度优先
- ✅ 未来可能需要扩展复杂动画
- ✅ **推荐：大多数企业官网**

### 选择方案 B (CSS Native) 如果：
- ✅ 追求极致性能
- ✅ 只需要简单淡入效果
- ✅ 目标用户主要是 Chrome 用户
- ✅ 开发资源有限

### 选择方案 C (GSAP 专业版) 如果：
- ✅ 需要复杂的滚动交互
- ✅ 需要精确的时间轴控制
- ✅ 有专业的动画设计师
- ✅ 品牌定位需要"高科技感"

### 选择方案 D (完整体验) 如果：
- ✅ 追求极致体验
- ✅ 首屏加载不是最优先
- ✅ 有专门的动画开发资源
- ✅ 品牌定位需要"创意领先"

---

## 性能对比数据

| 指标 | 方案 A | 方案 B | 方案 C | 方案 D |
|------|--------|--------|--------|--------|
| 首屏 JS 增加 | ~2KB | 0KB | ~100KB | ~200KB |
| LCP 影响 | 无 | 无 | +50-100ms | +100-200ms |
| 首次内容绘制 | 无影响 | 无影响 | 轻微 | 中等 |
| 交互响应 | 即时 | 即时 | 即时 | 可能延迟 |
| 移动端性能 | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐ |

---

## 我的推荐排序

1. **首选: 方案 A (渐进增强)** - 最佳平衡
2. **备选: 方案 B (CSS Native)** - 性能优先
3. **高端: 方案 C (GSAP 专业版)** - 效果优先
4. **极致: 方案 D (完整体验)** - 体验至上

---

## 请选择方案

请告诉我您倾向哪个方案，或是否有特殊需求需要调整？
