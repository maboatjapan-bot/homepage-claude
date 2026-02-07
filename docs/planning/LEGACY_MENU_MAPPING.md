# Legacy Menu Mapping - WordPress to Astro

This document maps the legacy WordPress pages to the new Astro structure.

## To C Products (コンシューマー製品)

| Legacy Directory | Product Name | Status | New URL |
|------------------|--------------|--------|---------|
| `popohu_mini` | Popohu Mini | ✅ Confirmed | `/products/popohu-mini` |
| `popohu_minilite5` | Popohu MiniLite 5 | ✅ Confirmed | `/products/popohu-minilite5` |
| `product_pitopa` | Pitopa | ✅ Confirmed | `/products/pitopa` |
| `nubia-3d-pad` | Nubia 3D Pad | ❌ 不采用 | - |
| `product_pitoshixyu` | Pitoshiyu | ✅ Confirmed | `/products/pitoshiyu` |

**✅ 用户确认**: 三个主要 To C 产品为 Popohu、Pitopa、Pitoshiyu

---

## To B Services (法人ソリューション)

### Main Service (Core)
| Legacy Directory | Service Name | Status | New URL |
|------------------|--------------|--------|---------|
| `ai` | AI ソリューション | ⭐ **MAIN** | `/ai` |

### Other Services (Supporting)
| Legacy Directory | Service Name | New URL |
|------------------|--------------|---------|
| `system_development` | システム開発 | `/solutions/system-development` |
| `system_integration` | システム集成 | `/solutions/system-integration` |
| `infrastructure` | インフラ | `/solutions/infrastructure` |
| `system_operation` | システム運用 | `/solutions/system-operation` |
| `rpa` | RPA (secondary) | `/solutions/rpa` |

**Note**: AI is the primary/core service. Other services support the main AI offerings.

---

## Company Pages (会社情報)

| Legacy Directory | Page Title | New URL |
|------------------|------------|---------|
| `company` | 会社概要 | `/company` |
| `company_info` | 会社情報 | `/company/info` |
| `recruit` | 採用情報 | `/recruit` ✅ |
| `recruitment` | 採用 | 整合到 `/recruit` |
| `privacy_policy` | プライバシーポリシー | `/privacy` |
| `contact` | お問い合わせ | `/contact` |

---

## Navigation Structure

### Primary Navigation (Header)
```
Logo → AIソリューション (main) → 製品 → エンタープライズ → 会社情報 → [お問い合わせ CTA]
```

### Secondary Navigation (Footer)
```
[Brand]
├── AIソリューション
│   ├── AI 概要
│   └── AI サービス
├── 製品
│   ├── Popohu
│   ├── Pitopa
│   └── Nubia 3D Pad
├── エンタープライズ
│   ├── システム開発
│   ├── システム集成
│   └── インフラ
└── 会社情報
    ├── 会社概要
    ├── 採用情報
    └── お問い合わせ
```

---

## Content Migration Phases

### Phase 1 ✅ (Completed)
- [x] Project initialization
- [x] Base layout, Header, Footer
- [x] Homepage structure
- [x] Design system (Apple + SmartDrive)

### Phase 2 (Current)
- [ ] Create reusable components
  - [ ] HeroSection.astro
  - [ ] ProductCard.astro
  - [ ] ServiceCard.astro

### Phase 3: To C Products
- [ ] `/products` - Products listing page
- [ ] `/products/popohu-mini`
- [ ] `/products/popohu-minilite5`
- [ ] `/products/pitopa`
- [ ] `/products/pitoshiyu`

### Phase 4: To B Solutions
- [ ] `/ai` - AI main page (priority)
- [ ] `/ai/services` - AI service details
- [ ] `/solutions` - Solutions overview
- [ ] `/solutions/system-development`
- [ ] `/solutions/system-integration`
- [ ] `/solutions/infrastructure`
- [ ] `/solutions/system-operation`
- [ ] `/solutions/rpa` (lower priority)

### Phase 5: Company Pages
- [ ] `/company` - Main company page
- [ ] `/recruit` or `/recruitment` (consolidate?)
- [ ] `/privacy`
- [ ] `/contact` (contact form)

### Phase 6: Features
- [ ] Implement animations (GSAP/ScrollTrigger per ANIMATION_GUIDE.md)
- [ ] Search functionality (Pagefind)
- [ ] Sitemap
- [ ] RSS feed (for news)

---

## ✅ 用户已确认事项

1. **第三个 To C 产品**: Pitoshiyu ✅
2. **招聘页面整合**: 只保留 `/recruit` ✅
3. **AI 定位**: 为主力服务，优先创建 AI 页面

---

## Next Steps

1. **User confirms** third To C product
2. **Create Phase 2 components** (Hero, ProductCard, ServiceCard)
3. **Begin Phase 3** - Products pages migration
4. **Begin Phase 4** - AI page (priority) and other solutions
