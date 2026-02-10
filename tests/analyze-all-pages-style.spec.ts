import { test, expect } from '@playwright/test';

test.describe('All Pages Style Coordination Analysis', () => {
  test.setTimeout(120000); // 2 minutes timeout

  const pages = [
    { name: 'Homepage', path: '/' },
    { name: 'AI', path: '/ai' },
    { name: 'Products', path: '/products' },
    { name: 'Solutions', path: '/solutions' },
    { name: 'Company', path: '/company' },
    { name: 'Recruit', path: '/recruit' },
    { name: 'Contact', path: '/contact' }
  ];

  const homepageReferenceColors = {
    aiSection: 'teal → blue gradient',
    ctaSection: 'teal → blue gradient',
    productsSection: 'blue-900',
    statsSection: 'blue-900 → teal gradient'
  };

  test('Analyze all main pages for style coordination', async ({ page }) => {
    console.log('\n=== 全页面风格协调性分析 ===\n');

    const results = [];

    for (const pageInfo of pages) {
      await page.goto(`http://localhost:4321${pageInfo.path}`, { waitUntil: 'domcontentloaded' });
      await page.waitForLoadState('networkidle', { timeout: 8000 }).catch(() => {});
      await page.waitForTimeout(300);

      // Screenshot with timeout handling
      try {
        await page.screenshot({
          path: `screenshots/page-${pageInfo.name.toLowerCase()}.png`,
          fullPage: true,
          timeout: 12000
        });
      } catch (e) {
        // Fallback to viewport screenshot if fullPage times out
        await page.screenshot({
          path: `screenshots/page-${pageInfo.name.toLowerCase()}.png`,
          timeout: 8000
        });
      }

      // Analyze first section (hero)
      const firstSection = page.locator('section').first();
      const firstSectionBg = await firstSection.evaluate(el => {
        const styles = window.getComputedStyle(el);
        return {
          background: styles.background,
          backgroundColor: styles.backgroundColor,
          backgroundImage: styles.backgroundImage
        };
      });

      // Check for gradient usage
      const hasGradient = firstSectionBg.backgroundImage.includes('gradient');
      const bgColor = firstSectionBg.backgroundColor;

      // Count sections with gradients
      const allSections = page.locator('section');
      const sectionCount = await allSections.count();
      let gradientCount = 0;
      let darkBgCount = 0;

      for (let i = 0; i < sectionCount; i++) {
        const section = allSections.nth(i);
        const bg = await section.evaluate(el => {
          const styles = window.getComputedStyle(el);
          return {
            image: styles.backgroundImage,
            color: styles.backgroundColor
          };
        });

        if (bg.image.includes('gradient')) {
          gradientCount++;
        }
        if (bg.color.includes('30, 58, 138') || // blue-900
            bg.color.includes('30, 64, 175') || // brand-blue
            bg.color.includes('20, 184, 166') || // brand-teal
            bg.color.includes('15, 23, 42') || // slate-900
            bg.color.includes('71, 85, 105')) { // slate-600
          darkBgCount++;
        }
      }

      results.push({
        name: pageInfo.name,
        path: pageInfo.path,
        firstSectionBg: bgColor,
        hasGradient,
        gradientCount,
        darkBgCount,
        totalSections: sectionCount
      });

      console.log(`✓ ${pageInfo.name}: screenshots/page-${pageInfo.name.toLowerCase()}.png`);
      console.log(`  Hero背景: ${hasGradient ? '渐变' : bgColor}`);
      console.log(`  渐变区域: ${gradientCount}/${sectionCount}`);
      console.log(`  深色区域: ${darkBgCount}/${sectionCount}\n`);
    }

    // Summary analysis
    console.log('=== 风格协调性总结 ===\n');

    console.log('首页参考风格:');
    console.log(`  - AI区域: ${homepageReferenceColors.aiSection}`);
    console.log(`  - CTA区域: ${homepageReferenceColors.ctaSection}`);
    console.log(`  - Products区域: ${homepageReferenceColors.productsSection}`);
    console.log(`  - Stats区域: ${homepageReferenceColors.statsSection}\n`);

    // Check which pages use similar gradient patterns
    const pagesWithBrandGradients = results.filter(r =>
      r.hasGradient || r.gradientCount > 0
    );

    const pagesWithBrandColors = results.filter(r =>
      r.darkBgCount > 0
    );

    console.log(`使用品牌渐变的页面 (${pagesWithBrandGradients.length}/${results.length}):`);
    pagesWithBrandGradients.forEach(r => {
      console.log(`  ✓ ${r.name}: ${r.gradientCount}个渐变区域`);
    });

    console.log(`\n使用品牌深色背景的页面 (${pagesWithBrandColors.length}/${results.length}):`);
    pagesWithBrandColors.forEach(r => {
      console.log(`  ✓ ${r.name}: ${r.darkBgCount}个深色区域`);
    });

    // Coordination score
    const coordinationScore = Math.round(
      ((pagesWithBrandGradients.length + pagesWithBrandColors.length) / results.length / 2) * 100
    );

    console.log(`\n=== 风格协调度: ${coordinationScore}% ===\n`);

    if (coordinationScore >= 80) {
      console.log('✓ 优秀: 所有页面都与首页风格保持一致');
    } else if (coordinationScore >= 60) {
      console.log('⚠ 良好: 大部分页面风格一致，少数页面需要调整');
    } else {
      console.log('✗ 需要改进: 部分页面与首页风格不协调');
    }

    // Recommendations
    console.log('\n=== 改善建议 ===\n');

    results.forEach(r => {
      if (r.gradientCount === 0 && r.darkBgCount === 0) {
        console.log(`⚠ ${r.name}: 建议添加品牌色渐变或深色背景区域`);
      }
    });

    console.log('\n=== 分析完成 ===\n');
  });
});
