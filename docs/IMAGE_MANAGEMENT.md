# 图片资产管理指南

## 目录结构

```
public/assets/images/
├── products/          # 产品图片
│   ├── popohu-hero.svg
│   ├── pitopa-hero.svg
│   └── pitoshiyu-hero.svg
├── ai/                # AI 解决方案图片
│   └── ai-solutions-hero.svg
├── solutions/         # 解决方案图片
├── company/           # 公司信息图片
│   └── office.svg
└── news/              # 新闻图片
    ├── news-01.png
    └── news-02.png
```

## Astro 图片优化

### 配置

`astro.config.mjs`:
```javascript
image: {
  service: {
    entrypoint: 'astro/assets/services/sharp',
  },
}
```

### 使用方法

#### 方式 1: 使用 Image 组件（推荐）

```astro
---
import { Image } from 'astro:assets';
import myImage from '../assets/my-image.png';
---

<Image src={myImage} alt="Description" width={800} height={600} format="webp" />
```

#### 方式 2: 使用 OptimizedImage 组件

```astro
---
import OptimizedImage from '../components/OptimizedImage.astro';
---

<OptimizedImage
  src="products/popohu-hero.svg"
  alt="Popohu Mini"
  width={800}
  height={600}
/>
```

#### 方式 3: 直接引用 public 目录

```html
<img src="/assets/images/products/popohu-hero.svg" alt="Product" />
```

## 图片格式建议

- **SVG**: 用于图标、插图、品牌元素
- **WebP**: 用于照片（自动转换）
- **PNG**: 用于需要透明度的图片
- **JPEG**: 用于复杂照片

## Legacy 图片迁移

### WordPress uploads 位置

```
legacy-data/www.swiftechie.com/wp-content/uploads/
├── 2024/
│   ├── 10/
│   ├── 11/
│   └── 12/
└── 2025/
    └── 03/
```

### 迁移脚本示例

```bash
# 复制产品图片
cp legacy-data/www.swiftechie.com/wp-content/uploads/YYYY/MM/product-name.jpg public/assets/images/products/

# 复制新闻图片
cp legacy-data/www.swiftechie.com/wp-content/uploads/YYYY/MM/news-image.png public/assets/images/news/
```

## 占位图片

当前使用的 SVG 占位图片：
- `/assets/images/products/popohu-hero.svg` - Popohu Mini 产品图
- `/assets/images/products/pitopa-hero.svg` - Pitopa AI 同伴图
- `/assets/images/products/pitoshiyu-hero.svg` - Pitoshiyu 创意工具图
- `/assets/images/ai/ai-solutions-hero.svg` - AI 解决方案主图
- `/assets/images/company/office.svg` - 办公室图片

## 替换占位图片

1. 准备新图片（建议 WebP 或 PNG 格式）
2. 放置到对应目录：
   ```bash
   cp your-image.png public/assets/images/products/popohu-hero.png
   ```
3. 更新页面中的引用（如果需要）

## 图片优化最佳实践

1. **尺寸**: 使用实际需要的尺寸，避免过大图片
2. **格式**: 优先使用 WebP，浏览器兼容时使用 AVIF
3. **压缩**: JPEG 质量 80-85%，PNG 使用 pngquant
4. **响应式**: 为不同屏幕尺寸提供多个版本
5. **延迟加载**: 非首屏图片使用 `loading="lazy"`

## 当前状态

- ✅ 目录结构已创建
- ✅ SVG 占位图片已创建
- ✅ Astro Image 组件已配置
- ✅ 示例图片已从 legacy 迁移
- ⏳ 待完成: 迁移所有产品/公司真实图片

## 下一步

1. 从 WordPress 识别并提取所有需要的图片
2. 重命名为语义化文件名
3. 优化图片格式和尺寸
4. 更新页面引用
