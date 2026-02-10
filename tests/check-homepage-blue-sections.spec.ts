import { test, expect } from '@playwright/test';

test.describe('Check Homepage Blue Sections', () => {
  test('Screenshot Products & Services and Stats with blue-900 background', async ({ page }) => {
    await page.goto('http://localhost:4321/');
    await page.waitForLoadState('networkidle');

    console.log('\n=== 首页蓝色背景区域 ===\n');

    // Scroll to Products & Services section
    await page.evaluate(() => window.scrollTo(0, 1400));
    await page.waitForTimeout(500);

    await page.screenshot({
      path: 'screenshots/homepage-products-blue.png',
      clip: { x: 0, y: 0, width: 1280, height: 1000 }
    });
    console.log('✓ Products & Services: screenshots/homepage-products-blue.png');

    // Scroll to Stats section
    await page.evaluate(() => window.scrollTo(0, 2400));
    await page.waitForTimeout(500);

    await page.screenshot({
      path: 'screenshots/homepage-stats-blue.png',
      clip: { x: 0, y: 100, width: 1280, height: 500 }
    });
    console.log('✓ Stats: screenshots/homepage-stats-blue.png');

    // Analyze background colors
    const productsSection = page.locator('section').filter({ hasText: '製品・サービス' }).first();
    const bgColor = await productsSection.evaluate(el => {
      return window.getComputedStyle(el).backgroundColor;
    });
    console.log(`\nProducts & Services 背景色: ${bgColor}`);

    const statsSection = page.locator('section').filter({ hasText: '導入企業数' }).first();
    const statsBgColor = await statsSection.evaluate(el => {
      return window.getComputedStyle(el).backgroundColor;
    });
    console.log(`Stats 背景色: ${statsBgColor}`);

    // Check if both are blue-900 (rgb(30, 64, 175))
    const expectedBlue = 'rgb(30, 64, 175)';
    if (bgColor === expectedBlue && statsBgColor === expectedBlue) {
      console.log('\n✓ 两个区域都使用 blue-900 背景色');
    } else {
      console.log(`\n⚠ 背景色不匹配`);
      console.log(`  期望: ${expectedBlue}`);
      console.log(`  Products: ${bgColor}`);
      console.log(`  Stats: ${statsBgColor}`);
    }

    console.log('\n=== 完成 ===\n');
  });
});
