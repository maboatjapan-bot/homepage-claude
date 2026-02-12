import { test, expect } from '@playwright/test';

test('check PDF download icon on popohu-minilite5 page', async ({ page }) => {
  await page.goto('https://main.d3572wh1uqcd5u.amplifyapp.com/products/popohu-minilite5/');

  // 滚动到页面底部找到 PDF 下载部分
  await page.waitForLoadState('networkidle');

  // 查找 PDF 下载区域
  const downloadSection = page.locator('section').filter({ hasText: /PDF|ダウンロード|download/i }).first();
  if (await downloadSection.count() > 0) {
    await downloadSection.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);

    // 截图整个下载区域
    await downloadSection.screenshot({ path: 'test-results/pdf-download-section.png' });
    console.log('Screenshot saved: test-results/pdf-download-section.png');

    // 查找所有下载链接/按钮
    const downloadLinks = await page.locator('a[href*="pdf"], a[href*="PDF"], a[download]').all();
    console.log(`Found ${downloadLinks.length} PDF download links`);

    for (let i = 0; i < downloadLinks.length; i++) {
      const link = downloadLinks[i];
      const text = await link.textContent();
      const href = await link.getAttribute('href');
      const className = await link.getAttribute('class');
      console.log(`Link ${i + 1}: text="${text?.trim()}", href="${href}", class="${className}"`);

      // 截图每个下载按钮
      await link.screenshot({ path: `test-results/pdf-download-link-${i + 1}.png` });
    }
  } else {
    // 查找包含 PDF 的链接
    const pdfLinks = page.locator('a[href*="pdf" i], a[href*="PDF" i]');
    const count = await pdfLinks.count();
    console.log(`Found ${count} PDF links without section`);

    for (let i = 0; i < count; i++) {
      const link = pdfLinks.nth(i);
      await link.scrollIntoViewIfNeeded();
      const text = await link.textContent();
      const href = await link.getAttribute('href');
      const className = await link.getAttribute('class');
      const innerHTML = await link.innerHTML();
      console.log(`\nLink ${i + 1}:`);
      console.log(`  text: "${text?.trim()}"`);
      console.log(`  href: "${href}"`);
      console.log(`  class: "${className}"`);
      console.log(`  innerHTML: ${innerHTML}`);

      // 截图每个链接
      await link.screenshot({ path: `test-results/pdf-link-${i + 1}.png` });
    }

    // 截图整个页面底部
    await page.screenshot({ path: 'test-results/page-bottom.png', fullPage: true });
  }

  // 等待用户查看
  console.log('\nScreenshots saved in test-results/ directory');
});
