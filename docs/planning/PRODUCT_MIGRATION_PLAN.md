# 产品页面迁移与下载功能实施计划

> 创建日期: 2026-02-02
> 目标: 将旧网站的所有产品页面和素材迁移到新网站，并确保所有下载功能正常工作

---

## 一、产品页面对比分析

### 1.1 旧网站产品页面

| 旧网站路径 | 产品名称 | 新网站路径 | 状态 |
|-----------|---------|-----------|------|
| `/popohu_mini` | Popohu Mini (ポポフmini) | `/products/popohu-mini` | ✅ 存在 |
| `/popohu_minilite5` | Popohu Mini Lite 5 | ❌ 不存在 | ⚠️ 需创建 |
| `/product/popohu.html` | Popohu 标准版 (ポポフ) | ❌ 不存在 | ⚠️ 需创建 |
| `/product_pitopa` | Pitopa (ピッとパッ！) | `/products/pitopa` | ✅ 存在 |
| `/product_pitoshixyu` | Pitoshiyu (ピッとシュ！) | `/products/pitoshiyu` | ✅ 存在 |

### 1.2 页面对应关系

**现有新网站产品页面:**
- `/products/popohu-mini` ✅
- `/products/pitopa` ✅
- `/products/pitoshiyu` ✅

**需要创建的产品页面:**
- `/products/popohu-minilite5` (或考虑合并到 Popohu Mini)
- `/products/popohu` (标准版，与 Mini 区分开)

---

## 二、素材清单

### 2.1 旧网站使用的图片（wp-content/uploads）

#### Popohu Mini 页面图片:
| 文件路径 | 用途 | 大小 |
|---------|------|------|
| `2025/07/new_office.jpg` | 办公场景展示 | 1248x832 |
| `2025/07/new_meeting.jpg` | 会议室场景展示 | 1248x832 |
| `2025/07/new_caffee.jpg` | 咖啡厅场景展示 | 1248x832 |
| `2025/07/generation-776b87d9-3ad4-4c85-adcb-25bcb3e975ed.jpg` | 产品图片 | 1504x688 |
| `2025/07/generation-b7663557-1673-4917-8c82-da9b8b19f7c0.jpg` | 产品图片 | 1328x800 |
| `2024/11/カフェ-1.jpg` | 产品缩略图 | 562x562 |
| `2025/07/top_school.jpg` | 学校场景 | 1536x1024 |

#### Popohu Mini Lite 5 页面图片:
| 文件路径 | 用途 |
|---------|------|
| `2025/07/new_office.jpg` | 办公场景 |
| `2025/07/nurs.jpg` | 护理场景 |
| `2025/07/top_school.jpg` | 学校场景 |
| `2025/07/4ec8-b3d2-5431cd5407dd.jpg` | 产品图片 |
| `2025/07/WeChatd0568d46034ba0ac2482d08e02fdc7b3.jpg` | 产品图片 |

#### Popohu 标准版页面图片:
| 文件路径 | 用途 |
|---------|------|
| `2024/11/カフェ-1.jpg` | 咖啡厅场景 |
| `2024/11/キャンプ-1.jpg` | 露营场景 |
| `2024/11/ホテル-1.jpg` | 酒店场景 |
| `2024/11/メイン01-1.jpg` | 主图片 |
| `2024/11/会議室.jpg` | 会议室场景 |
| `2024/11/学校-1.jpg` | 学校场景 |
| `2024/11/防災-1.jpg` | 防灾场景 |
| `2025/07/generation-9baa45e6-bf1c-40bf-8384-5a0b0cacdcf5.jpg` | 产品图片 |
| `2025/07/top_school.jpg` | 学校场景 |
| `2025/10/11.jpg` | 产品图片 |

### 2.2 下载文件清单

| PDF文件 | 路径 | 使用页面 |
|---------|------|----------|
| Popohu Mini 说明书 | `2025/09/PoPoHu_mini_instruction-1.pdf` | popohu_mini ✅ |
| Popohu Mini Lite 5 传单 | `2025/08/ポポフミニLite5チラシ2.1.2.pdf` | popohu_minilite5 |
| Popohu 产品目录 | `2025/09/ポポフカタログDL1.4.1.pdf` | popohu |
| Popohu 说明书 | `2024/12/ポポフ取説A3_2.8.pdf` | popohu |
| 电池盒通知 | `2024/11/一部ロットの電池ボックスについて_20240626.pdf` | news |

---

## 三、实施方案

### 3.1 素材复制策略

由于 `wp-content/uploads` 文件夹已经复制到 `public/wp-content/uploads`，所有图片和PDF文件已经可以访问。

**注意事项:**
- 图片路径保持为 `/wp-content/uploads/YYYY/MM/filename.ext`
- PDF下载链接路径保持一致
- QR码链接将自动工作（因为路径已保留）

### 3.2 页面创建计划

#### 阶段1: 创建 Popohu Mini Lite 5 页面
- 文件路径: `src/pages/products/popohu-minilite5.astro`
- 内容参考: `legacy-data/www.swiftechie.com/popohu_minilite5/index.html`
- 下载功能: `ポポフミニLite5チラシ2.1.2.pdf`

#### 阶段2: 创建 Popohu 标准版页面
- 文件路径: `src/pages/products/popohu.astro`
- 内容参考: `legacy-data/www.swiftechie.com/product/popohu.html`
- 下载功能:
  - `ポポフカタログDL1.4.1.pdf` (产品目录)
  - `ポポフ取説A3_2.8.pdf` (说明书)

#### 阶段3: 更新 Popohu Mini 页面
- 使用旧网站图片替换SVG占位符
- 图片列表:
  - `new_office.jpg`
  - `new_meeting.jpg`
  - `new_caffee.jpg`
  - `generation-776b87d9-3ad4-4c85-adcb-25bcb3e975ed.jpg`
  - `generation-b7663557-1673-4917-8c82-da9b8b19f7c0.jpg`

#### 阶段4: 更新新闻页面
- 更新 `2024-06-26-pitopa-battery-box.md`
- 添加PDF下载链接

#### 阶段5: 更新产品列表页面
- 添加新创建的产品到列表

---

## 四、页面内容模板

### 4.1 产品页面结构

每个产品页面应包含以下部分:
1. **Hero区** - 产品名称 + 主要图片
2. **产品特点** - 特性列表
3. **使用场景** - 场景图片展示
4. **规格参数** - 技术规格表
5. **下载区域** - PDF下载链接（如果有）

### 4.2 下载区域模板

```html
<!-- 下载区域 -->
<section class="py-24 px-6 bg-white">
  <div class="max-w-4xl mx-auto">
    <h2 class="text-4xl sm:text-5xl font-bold mb-6">資料ダウンロード</h2>
    <p class="text-xl text-slate-600 mb-8">製品情報のPDFをダウンロードできます</p>

    <div class="grid md:grid-cols-1 gap-6">
      <!-- 下载项1 -->
      <a href="/wp-content/uploads/2025/09/example.pdf" target="_blank">
        <div class="flex items-center gap-6 p-6 border rounded-2xl">
          <div class="w-16 h-16 bg-red-50 rounded-xl">PDF图标</div>
          <div class="flex-1">
            <span class="font-semibold">取扱説明書（PDF）</span>
          </div>
          <svg>下载图标</svg>
        </div>
      </a>
    </div>
  </div>
</section>
```

---

## 五、执行检查清单

- [ ] 复制所有 wp-content/uploads 图片到新网站 ✅ (已完成)
- [ ] 创建 `/products/popohu-minilite5.astro` 页面
- [ ] 创建 `/products/popohu.astro` 页面
- [ ] 更新 Popohu Mini 页面使用真实图片
- [ ] 为 Popohu Mini Lite 5 添加下载功能
- [ ] 为 Popohu 标准版添加下载功能
- [ ] 更新电池盒通知新闻添加PDF链接
- [ ] 更新产品列表页面
- [ ] 测试所有PDF下载链接
- [ ] 测试所有QR码链接
- [ ] 验证响应式布局

---

## 六、URL映射表

| 旧网站URL | 新网站URL | 说明 |
|-----------|----------|------|
| `/popohu_mini` | `/products/popohu-mini` | ✅ 已存在 |
| `/popohu_minilite5` | `/products/popohu-minilite5` | ⚠️ 需创建 |
| `/product/popohu.html` | `/products/popohu` | ⚠️ 需创建 |
| `/product_pitopa` | `/products/pitopa` | ✅ 已存在 |
| `/product_pitoshixyu` | `/products/pitoshiyu` | ✅ 已存在 |

---

## 七、重定向规则

为确保旧链接和QR码继续工作，在 `public/_redirects` 添加:

```
# 产品页面重定向
/popohu_mini /products/popohu-mini 301
/popohu_minilite5 /products/popohu-minilite5 301
/product/popohu.html /products/popohu 301
/product_pitopa /products/pitopa 301
/product_pitoshixyu /products/pitoshiyu 301
```

---

## 八、注意事项

1. **图片优化**: 旧网站图片未经优化，考虑后续使用 Astro Image 组件
2. **PDF文件**: 确保PDF文件名中的日文字符在服务器上正确处理
3. **QR码**: 所有QR码指向的wp-content路径已保留，应自动工作
4. **SEO**: 确保旧URL通过301重定向传递SEO价值
