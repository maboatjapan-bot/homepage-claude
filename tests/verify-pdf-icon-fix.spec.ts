import { test, expect } from '@playwright/test';

test('verify PDF download icon alignment fix', async ({ page }) => {
  await page.goto('https://main.d3572wh1uqcd5u.amplifyapp.com/products/popohu-minilite5/');
  await page.waitForLoadState('networkidle');

  // 滚动到 PDF 下载区域
  const downloadSection = page.locator('section').filter({ hasText: /資料ダウンロード/ });
  await downloadSection.scrollIntoViewIfNeeded();
  await page.waitForTimeout(500);

  // 截图整个下载区域
  await downloadSection.screenshot({ path: 'test-results/pdf-download-section-fixed.png' });

  // 截图单个下载卡片 (选择卡片样式，不是按钮)
  const downloadCard = page.locator('a.group').filter({ hasText: /製品資料（PDF）/ });
  await downloadCard.screenshot({ path: 'test-results/pdf-download-card-fixed.png' });

  console.log('Screenshots saved:');
  console.log('  - test-results/pdf-download-section-fixed.png');
  console.log('  - test-results/pdf-download-card-fixed.png');
});
