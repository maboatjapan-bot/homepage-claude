import { test, expect } from '@playwright/test';

test.describe('Popohu Product Pages Image Check', () => {
  test('Check images on popohu-mini and popohu-minilite5 pages', async ({ page }) => {
    console.log('\n=== Popohu 产品页面图片检查 ===\n');

    const pages = [
      { name: 'popohu-mini', url: 'http://localhost:4321/products/popohu-mini' },
      { name: 'popohu-minilite5', url: 'http://localhost:4321/products/popohu-minilite5' }
    ];

    for (const pageInfo of pages) {
      await page.goto(pageInfo.url);
      await page.waitForLoadState('networkidle');
      await page.waitForTimeout(500);

      console.log(`\n【${pageInfo.name}】`);

      // Find all images
      const images = page.locator('img');
      const imageCount = await images.count();
      console.log(`  图片总数: ${imageCount}`);

      // Check for broken images
      let brokenCount = 0;
      for (let i = 0; i < imageCount; i++) {
        const src = await images.nth(i).getAttribute('src');
        const alt = await images.nth(i).getAttribute('alt');

        // Check naturalWidth to detect broken images
        const naturalWidth = await images.nth(i).evaluate(img => img.naturalWidth);
        const naturalHeight = await images.nth(i).evaluate(img => img.naturalHeight);

        if (naturalWidth === 0 || naturalHeight === 0) {
          console.log(`  ✗ 破损图片: ${alt} (${src})`);
          brokenCount++;
        } else {
          console.log(`  ✓ ${alt || '(无alt)'}: ${naturalWidth}x${naturalHeight}`);
        }
      }

      if (brokenCount === 0) {
        console.log(`  ✓ 所有图片正常`);
      } else {
        console.log(`  ✗ 发现 ${brokenCount} 个破损图片`);
      }

      // Screenshot
      await page.screenshot({
        path: `screenshots/${pageInfo.name}-image-check.png`,
        fullPage: true
      });
      console.log(`  截图: screenshots/${pageInfo.name}-image-check.png`);
    }

    console.log('\n=== 检查完成 ===\n');
  });
});
