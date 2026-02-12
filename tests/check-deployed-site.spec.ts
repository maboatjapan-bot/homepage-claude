import { test, expect } from '@playwright/test';

test.describe('Deployed Site Verification', () => {
  test.beforeAll(async () => {
    console.log('\n=== 部署网站验证 ===\n');
    console.log('目标: https://main.d3572wh1uqcd5u.amplifyapp.com\n');
  });

  test('Check deployed homepage and product pages', async ({ page }) => {
    const pages = [
      { name: '首页', url: 'https://main.d3572wh1uqcd5u.amplifyapp.com/' },
      { name: 'Popohu Mini', url: 'https://main.d3572wh1uqcd5u.amplifyapp.com/products/popohu-mini' },
      { name: 'Popohu Mini Lite 5', url: 'https://main.d3572wh1uqcd5u.amplifyapp.com/products/popohu-minilite5' },
      { name: 'Pitopa', url: 'https://main.d3572wh1uqcd5u.amplifyapp.com/products/pitopa' },
      { name: 'Pitoshiyu', url: 'https://main.d3572wh1uqcd5u.amplifyapp.com/products/pitoshiyu' }
    ];

    for (const pageInfo of pages) {
      console.log(`\n【${pageInfo.name}】`);
      await page.goto(pageInfo.url);
      await page.waitForLoadState('networkidle');
      await page.waitForTimeout(2000);

      // Check page title
      const title = await page.title();
      console.log(`  页面标题: ${title}`);

      // Check for Japanese product names
      const bodyText = await page.locator('body').textContent();
      const hasPopohuKatakana = bodyText.includes('ポポフ');
      const hasPopohuMini = bodyText.includes('ポポフmini');
      const hasPopohuLite5 = bodyText.includes('ポポフmini Lite5');
      const hasPittoppa = bodyText.includes('ピッとパッ');
      const hasPittoshu = bodyText.includes('ピッとシュ');

      console.log(`  产品名称检查:`);
      console.log(`    ポポフ: ${hasPopohuKatakana ? '✓' : '✗'}`);
      console.log(`    ポポフmini: ${hasPopohuMini ? '✓' : '✗'}`);
      console.log(`    ポポフmini Lite5: ${hasPopohuLite5 ? '✓' : '✗'}`);
      console.log(`    ピッとパッ！: ${hasPittoppa ? '✓' : '✗'}`);
      console.log(`    ピッとシュ！: ${hasPittoshu ? '✓' : '✗'}`);

      // Check for cafe image
      if (pageInfo.name === 'Popohu Mini' || pageInfo.name === 'Popohu Mini Lite 5') {
        const cafeImage = page.locator('img[alt*="カフェ"], img[alt*="cafe"]');
        const cafeCount = await cafeImage.count();
        if (cafeCount > 0) {
          const altText = await cafeImage.first().getAttribute('alt');
          const src = await cafeImage.first().getAttribute('src');
          console.log(`  cafe图片: ✓ ${altText} (${src})`);
        } else {
          console.log(`  cafe图片: ✗ 未找到`);
        }
      }

      // Screenshot for visual verification
      await page.screenshot({
        path: `screenshots/deployed-${pageInfo.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}.png`,
        fullPage: true
      });
      console.log(`  截图: screenshots/deployed-${pageInfo.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}.png`);
    }

    console.log('\n=== 验证完成 ===\n');
  });
});
