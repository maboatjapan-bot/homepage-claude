# 公司照片调研报告

## 📸 照片使用情况分析

### 原网站照片展示方式

**使用的插件**: MetaSlider (Flex Slider)
- 轮播图形式展示
- 尺寸: 550x300px
- 支持自动轮播、导航点、悬停暂停

---

## 1. 忘年会@上野 (2023)

### 原网站照片清单

| 文件名 | 尺寸 | 大小 | 说明 |
|--------|------|------|------|
| 05-550x300.jpg | 550x300 | 50KB | 照片 1 |
| 01-550x300.jpg | 550x300 | 41KB | 照片 2 |
| 02-550x300.jpg | 550x300 | 50KB | 照片 3 |

### 已复制的原始文件

| 文件名 | 尺寸 | 大小 | 位置 |
|--------|------|------|------|
| 01-550x300.jpg | 550x300 | 41KB | `year-end-party/` |
| 01-2-768x396.jpg | 768x396 | 32KB | `year-end-party/` |
| 02-550x300.jpg | 550x300 | 50KB | `year-end-party/` |
| 02-1-1-768x396.jpg | 768x396 | 33KB | `year-end-party/` |
| 02-1.jpg | 原尺寸 | 185KB | `year-end-party/` |
| 02-1-2.jpg | 原尺寸 | 335KB | `year-end-party/` |

### 建议使用方案

**方案 A: 使用轮播图（推荐）**
- ✅ 还原原网站体验
- ✅ 节省页面空间
- ❌ 需要集成轮播插件（如 Swiper）

**方案 B: 网格布局**
- ✅ 所有照片可见
- ✅ 现代化设计
- ❌ 占用空间较多

**方案 C: 精选 2-3 张代表性照片**
- ✅ 简洁美观
- ✅ 加载快速
- ❌ 展示不全

---

## 2. 社員旅行@伊豆 (2024)

### 原网站照片清单

| 文件名 | 尺寸 | 大小 | 格式 | 说明 |
|--------|------|------|------|------|
| 07-550x300.png | 550x300 | - | PNG | 照片 1 |
| 06-2-550x300.png | 550x300 | - | PNG | 照片 2 |
| 可能还有其他照片... |

### 已复制的文件

| 文件名 | 尺寸 | 大小 | 位置 |
|--------|------|------|------|
| 03-01.jpg | 原尺寸 | 133KB | `company-trip/` |
| 03-1-1024x721.jpg | 1024x721 | 75KB | `company-trip/` |
| 03.jpg | 原尺寸 | 159KB | `company-trip/` |
| 05-550x300.jpg | 550x300 | 51KB | `company-trip/` |

### ⚠️ 发现的问题

原网站使用 PNG 格式照片（07-550x300.png, 06-2-550x300.png），但当前 legacy-data 文件夹中没有找到这些文件。

**需要确认**:
- [ ] 是否需要从原网站下载这些 PNG 文件
- [ ] 或使用现有的 JPG 文件替代

---

## 3. 技术实现建议

### 轮播图实现（推荐使用 Swiper）

```javascript
// 安装 Swiper
// npm install swiper

// 在 recruit.astro 中使用
import Swiper from 'swiper';
import 'swiper/css';

<Swiper
  spaceBetween={30}
  slidesPerView={1}
  autoplay={{
    delay: 3000,
    disableOnInteraction: false,
  }}
  pagination={{
    clickable: true,
  }}
  className="mySwiper"
>
  <SwiperSlide>
    <img src="/assets/images/company/year-end-party/01-550x300.jpg" alt="忘年会@上野 2023" />
  </SwiperSlide>
  <SwiperSlide>
    <img src="/assets/images/company/year-end-party/02-550x300.jpg" alt="忘年会@上野 2023" />
  </SwiperSlide>
  <SwiperSlide>
    <img src="/assets/images/company/year-end-party/05-550x300.jpg" alt="忘年会@上野 2023" />
  </SwiperSlide>
</Swiper>
```

### 简化方案（使用 CSS Grid）

```astro
<div class="grid grid-cols-1 md:grid-cols-3 gap-6">
  <img src="/assets/images/company/year-end-party/01-550x300.jpg" alt="忘年会@上野" loading="lazy" />
  <img src="/assets/images/company/year-end-party/02-550x300.jpg" alt="忘年会@上野" loading="lazy" />
  <img src="/assets/images/company/year-end-party/05-550x300.jpg" alt="忘年会@上野" loading="lazy" />
</div>
```

---

## 4. 照片整理建议

### 重命名方案

将文件名改为更易识别的名称：

**忘年会照片**:
```
01-550x300.jpg → year-end-party-2023-01.jpg
02-550x300.jpg → year-end-party-2023-02.jpg
05-550x300.jpg → year-end-party-2023-03.jpg
```

**社員旅行照片**:
```
03-01.jpg → company-trip-2024-01.jpg
03.jpg → company-trip-2024-02.jpg
05-550x300.jpg → company-trip-2024-03.jpg
```

### 图片优化

使用 Astro 的 Image 组件自动优化：
- 自动转换为 WebP
- 响应式尺寸
- 懒加载
- 压缩优化

---

## 5. 待办事项

### 高优先级
- [ ] 确认是否需要原网站的 PNG 格式照片
- [ ] 决定照片展示方式（轮播/网格）
- [ ] 整理并重命名照片文件

### 中优先级
- [ ] 实现照片轮播功能
- [ ] 添加照片 alt 文字描述
- [ ] 优化图片加载性能

### 低优先级
- [ ] 添加照片查看器（Lightbox）
- [ ] 添加照片元数据（拍摄时间、地点等）
- [ ] 考虑添加更多公司活动照片

---

## 6. 原网站 MetaSlider 配置参考

```javascript
// 原配置（仅供参考）
{
  "type": "flexslider",
  "theme": "clarity",
  "carousel": true,
  "nav": "dots",
  "arrows": "onhover",
  "animation": "slide",
  "smoothHeight": true,
  "pauseOnHover": true,
  "autoplay": true,
  "delay": "5000"
}
```

---

## 7. 技术选型

### 选项 A: Swiper.js（推荐）
**优点**:
- 现代化轮播库
- 移动端友好
- 触摸滑动支持
- 丰富的配置选项

**缺点**:
- 需要额外安装依赖
- 文件大小增加

### 选项 B: 纯 CSS 方案
**优点**:
- 无额外依赖
- 性能好
- 实现简单

**缺点**:
- 功能有限
- 交互体验较差

---

## 结论

**当前状态**: 照片文件已复制，但未集成到页面

**建议方案**:
1. 使用 Swiper.js 实现轮播效果（最接近原网站）
2. 或使用 CSS Grid 简化方案（现代化设计）

**下一步**: 等待您的决策后实施

---

**调研日期**: 2026-01-29
**调研人**: Claude Code
**状态**: 待确认
