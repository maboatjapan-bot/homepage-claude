import { test, expect } from '@playwright/test';

test.describe('Visual Style Elements Analysis', () => {
  test.setTimeout(120000);

  const pages = [
    { name: 'Homepage', path: '/' },
    { name: 'AI', path: '/ai' },
    { name: 'Products', path: '/products' },
    { name: 'Solutions', path: '/solutions' },
    { name: 'Company', path: '/company' },
    { name: 'Recruit', path: '/recruit' },
    { name: 'Contact', path: '/contact' }
  ];

  test('Detailed visual analysis of each page', async ({ page }) => {
    console.log('\n=== 各页面视觉风格详细分析 ===\n');

    for (const pageInfo of pages) {
      await page.goto(`http://localhost:4321${pageInfo.path}`, { waitUntil: 'domcontentloaded' });
      await page.waitForLoadState('networkidle', { timeout: 8000 }).catch(() => {});
      await page.waitForTimeout(300);

      // Hero section analysis
      const heroSection = page.locator('section').first();
      const heroBg = await heroSection.evaluate(el => {
        const styles = window.getComputedStyle(el);
        return {
          backgroundImage: styles.backgroundImage,
          backgroundColor: styles.backgroundColor,
          color: styles.color
        };
      });

      const hasHeroGradient = heroBg.backgroundImage.includes('gradient');
      const isBrandTeal = heroBg.backgroundColor.includes('0, 191, 165') ||
                         heroBg.backgroundImage.includes('teal');
      const isBrandBlue = heroBg.backgroundColor.includes('30, 64, 175') ||
                         heroBg.backgroundImage.includes('#1e40af');

      // Check for CTA sections
      const ctaSections = await page.locator('section').filter({ hasText: 'ご相談' }).count();

      // Check for cards with brand styling
      const cards = await page.locator('[class*="card"], [class*="Card"]').count();
      const cardsWithGlow = await page.locator('[class*="glow"]').count();

      // Check for 3D elements
      const hasNeuralSphere = await page.locator('canvas').count() > 0;

      console.log(`【${pageInfo.name}】(${pageInfo.path})`);
      console.log(`  Hero区域:`);
      console.log(`    - 渐变: ${hasHeroGradient ? '✓' : '✗'}`);
      console.log(`    - 品牌teal: ${isBrandTeal ? '✓' : '-'}`);
      console.log(`    - 品牌blue: ${isBrandBlue ? '✓' : '-'}`);
      console.log(`  其他元素:`);
      console.log(`    - CTA区域数: ${ctaSections}`);
      console.log(`    - 卡片总数: ${cards} (发光效果: ${cardsWithGlow})`);
      console.log(`    - 3D元素: ${hasNeuralSphere ? '✓' : '-'}`);
      console.log('');
    }

    console.log('=== 与首页风格元素对比 ===\n');

    console.log('首页关键风格元素:');
    console.log('  1. Hero区域: 白色背景 + HeroGradient装饰');
    console.log('  2. AI区域: teal→blue渐变 + NeuralSphere 3D');
    console.log('  3. Products区域: blue-900深色背景');
    console.log('  4. Stats区域: blue-900→teal渐变');
    console.log('  5. CTA区域: teal→blue渐变 + 发光卡片');
    console.log('  6. Footer: slate-600深色背景\n');

    // Check homepage specifically for reference
    await page.goto('http://localhost:4321/');
    await page.waitForLoadState('networkidle');

    const sections = page.locator('section');
    const sectionCount = await sections.count();

    console.log(`首页共有 ${sectionCount} 个主要区域\n`);

    // Check which sections have gradients
    let gradientCount = 0;
    const gradientTypes = [];

    for (let i = 0; i < Math.min(sectionCount, 10); i++) {
      const section = sections.nth(i);
      const bg = await section.evaluate(el => {
        const styles = window.getComputedStyle(el);
        return styles.backgroundImage;
      });

      if (bg.includes('gradient')) {
        gradientCount++;
        const type = bg.includes('to-br') ? '斜向渐变' :
                    bg.includes('to-b') ? '垂直渐变' :
                    bg.includes('to-r') ? '水平渐变' : '其他';
        gradientTypes.push(`区域${i+1}: ${type}`);
      }
    }

    console.log(`首页渐变区域 (${gradientCount}个):`);
    gradientTypes.forEach(t => console.log(`  - ${t}`));

    console.log('\n=== 分析完成 ===\n');
  });
});
