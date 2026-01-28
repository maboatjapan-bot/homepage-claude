# Swiftechie 官网 2026 - 动态效果技术方案

## 设计理念

在保持 Astro 静态站点性能优势的前提下，使用**客户端 JavaScript** 实现动态效果。

**核心原则**：
- ✅ 优先使用 CSS 动画和原生 API
- ✅ 按需加载动画库（只在需要时加载）
- ✅ 使用 `view-transition` 和 `Intersection Observer`
- ✅ 不影响 SEO 和首屏加载
- ❌ 避免强制 SSR hydration

---

## 推荐方案对比

| 方案 | 性能影响 | 功能 | 推荐度 |
|------|----------|------|--------|
| **CSS Scroll-driven Animations** | 无 | 滚动驱动动画 | ⭐⭐⭐⭐⭐ |
| **Astro View Transitions** | 极小 | 页面过渡 | ⭐⭐⭐⭐⭐ |
| **GSAP + ScrollTrigger** | 小 | 专业级滚动交互 | ⭐⭐⭐⭐ |
| **Lenis (平滑滚动)** | 极小 | 惯性滚动体验 | ⭐⭐⭐⭐ |

---

## 方案一：CSS Scroll-driven Animations（推荐首选）

**优点**：零 JS 依赖、原生性能最佳、零运行时开销

**示例**：元素进入视口时触发动画

```css
/* 使用 CSS @scroll-timeline */
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

**浏览器支持**：Chrome 115+, Edge 115+ (2024年起主流)

---

## 方案二：Astro View Transitions（页面过渡）

**优点**：Astro 原生支持、流畅的 SPA 式体验、保持 SSG 性能

**配置**：

```astro
---
// src/layouts/BaseLayout.astro
---

<html lang="ja">
  <head>
    <!-- 添加 View Transitions meta 标签 -->
    <meta name="view-transition" content="same-origin" />
  </head>
</html>
```

**使用示例**：

```astro
---
// 导航链接
---
<a href="/products" transition:animate>
  製品を見る
</a>
```

---

## 方案三：GSAP + ScrollTrigger（专业级交互）

**优点**：业界标准、功能强大、社区生态完善

**安装**：

```bash
npm install gsap
```

**使用方式**：客户端组件（`client:*` 指令）

```astro
---
// src/components/ScrollAnimations.astro
---

<div class="gsap-scroll-section" id="hero">
  <!-- 内容 -->
</div>

<script>
  import { gsap } from 'gsap';
  import { ScrollTrigger } from 'gsap/ScrollTrigger';

  // 只在客户端注册插件
  if (import.meta.env.CLIENT) {
    gsap.registerPlugin(ScrollTrigger);
  }

  // 滚动动画
  gsap.from('.gsap-hero-title', {
    scrollTrigger: {
      trigger: '.gsap-scroll-section',
      start: 'top 80%',
      end: 'bottom 20%',
      scrub: 1,
    },
    y: 100,
    opacity: 0,
  });
</script>
```

**性能优化**：
```astro
---
// 仅在客户端加载
<script>
  {`import('https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js')`}
  {`import('https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js')`}
</script>
```

---

## 方案四：Lenis（平滑滚动）

**优点**：接近原生滚动性能、无感体验

**安装**：

```bash
npm install @studio-freight/lenis
```

**使用**：

```astro
---
// src/components/SmoothScroll.astro
---

<script>
  import Lenis from '@studio-freight/lenis';

  const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    direction: 'vertical',
    gestureOrientation: 'vertical',
    smoothWheel: true,
    wheelMultiplier: 1,
    touchAction: false,
  });

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }

  requestAnimationFrame(raf);
</script>
```

---

## 推荐实现顺序

1. **Phase 1（基础）**：CSS Scroll-driven Animations
   - 淡入效果
   - 视差滚动

2. **Phase 2（进阶）**：Astro View Transitions
   - 页面过渡
   - 导航切换

3. **Phase 3（高级）**：GSAP + ScrollTrigger
   - 复杂滚动动画
   - 时间轴控制

4. **Phase 4（可选）**：Lenis 平滑滚动
   - 统一滚动体验

---

## 性能 Checklist

- [ ] 动画库使用 `defer` 或动态导入
- [ ] 图片使用 `loading="lazy"`
- [ ] 避免动画影响 LCP（Largest Contentful Paint）
- [ ] 使用 `will-change` 谨优动画元素
- [ ] 移动端使用 `prefers-reduced-motion` 检测

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## 示例：滚动触发动画组件

```astro
---
// src/components/FadeIn.astro
interface Props {
  delay?: number;
  duration?: number;
}

const { delay = 0, duration = 800 } = Astro.props;
---

<div class="fade-in" style={`animation-delay: ${delay}ms; animation-duration: ${duration}ms`}>
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
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
</script>
```

**使用**：

```astro
<FadeIn delay={0}>
  <h1>标题</h1>
</FadeIn>
<FadeIn delay={200}>
  <p>描述</p>
</FadeIn>
```
