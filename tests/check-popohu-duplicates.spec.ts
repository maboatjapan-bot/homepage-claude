import { test, expect } from '@playwright/test';

test.describe('Popohu Page Duplicate Check', () => {
  test('Check for duplicate rental sections', async ({ page }) => {
    await page.goto('http://localhost:4321/products/popohu');
    await page.waitForLoadState('networkidle');

    console.log('\n=== Popohu 页面重复检查 ===\n');

    // Check for rental section headers
    const rentalHeaders = page.locator('h2:has-text("レンタルをご希望の方はこちら")');
    const rentalCount = await rentalHeaders.count();

    console.log(`"レンタルをご希望の方はこちら" 区域数量: ${rentalCount}`);

    if (rentalCount === 0) {
      console.log('✗ 没有找到租赁区域');
    } else if (rentalCount === 1) {
      console.log('✓ 只有一个租赁区域（正确）');
    } else {
      console.log(`✗ 发现 ${rentalCount} 个重复的租赁区域！`);
    }

    // Check for series section
    const seriesHeaders = page.locator('h2:has-text("ポポフシリーズを見る")');
    const seriesCount = await seriesHeaders.count();
    console.log(`"ポポフシリーズを見る" 区域数量: ${seriesCount}`);

    // Check for partners section
    const partnersHeaders = page.locator('h2:has-text("正規販売代理店")');
    const partnersCount = await partnersHeaders.count();
    console.log(`"正規販売代理店" 区域数量: ${partnersCount}`);

    // Screenshot for visual verification
    await page.screenshot({
      path: 'screenshots/popohu-after-fix.png',
      fullPage: true
    });
    console.log('\n✓ 截图保存: screenshots/popohu-after-fix.png');

    console.log('\n=== 检查完成 ===\n');
  });
});
