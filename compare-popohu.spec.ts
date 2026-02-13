import { test } from '@playwright/test';

const OLD_SITE = 'https://www.swiftechie.com/product/popohu.html';
const NEW_SITE = 'http://localhost:4321/products/popohu';

test.describe('比较popohu新旧网站内容', () => {
  test('获取旧网站内容', async ({ page }) => {
    console.log('=== 访问旧网站 ===');
    await page.goto(OLD_SITE, { waitUntil: 'networkidle', timeout: 15000 });

    // 提取所有h1-h3标题
    const headings = await page.evaluate(() => {
      const results: {level: string, text: string}[] = [];
      document.querySelectorAll('h1, h2, h3').forEach(h => {
        results.push({
          level: h.tagName,
          text: h.textContent?.trim() || ''
        });
      });
      return results;
    });

    console.log('\n旧网站标题结构:');
    headings.forEach(h => {
      console.log(`  ${h.level}: ${h.text}`);
    });

    // 提取主要段落内容
    const mainContent = await page.evaluate(() => {
      const paragraphs = Array.from(document.querySelectorAll('p'));
      return paragraphs.map(p => p.textContent?.trim()).filter(t => t && t.length > 50);
    });

    console.log('\n旧网站主要内容段落 (前20个):');
    mainContent.slice(0, 20).forEach((p, i) => {
      console.log(`  ${i + 1}. ${p.substring(0, 80)}...`);
    });
  });

  test('获取新网站内容', async ({ page }) => {
    console.log('\n=== 访问新网站 ===');
    await page.goto(NEW_SITE, { waitUntil: 'networkidle', timeout: 15000 });

    // 提取所有h1-h3标题
    const headings = await page.evaluate(() => {
      const results: {level: string, text: string}[] = [];
      document.querySelectorAll('h1, h2, h3').forEach(h => {
        results.push({
          level: h.tagName,
          text: h.textContent?.trim() || ''
        });
      });
      return results;
    });

    console.log('\n新网站标题结构:');
    headings.forEach(h => {
      console.log(`  ${h.level}: ${h.text}`);
    });

    // 提取主要段落内容
    const mainContent = await page.evaluate(() => {
      const paragraphs = Array.from(document.querySelectorAll('p'));
      return paragraphs.map(p => p.textContent?.trim()).filter(t => t && t.length > 50);
    });

    console.log('\n新网站主要内容段落 (前20个):');
    mainContent.slice(0, 20).forEach((p, i) => {
      console.log(`  ${i + 1}. ${p.substring(0, 80)}...`);
    });
  });

  test('对比内容差异', async ({ page }) => {
    console.log('\n=== 对比新旧网站差异 ===');

    // 先获取旧网站内容
    await page.goto(OLD_SITE, { waitUntil: 'networkidle', timeout: 15000 });
    const oldHeadings = await page.evaluate(() => {
      const results: string[] = [];
      document.querySelectorAll('h1, h2, h3').forEach(h => {
        const text = h.textContent?.trim() || '';
        if (text) results.push(text);
      });
      return results;
    });

    // 获取新网站内容
    await page.goto(NEW_SITE, { waitUntil: 'networkidle', timeout: 15000 });
    const newHeadings = await page.evaluate(() => {
      const results: string[] = [];
      document.querySelectorAll('h1, h2, h3').forEach(h => {
        const text = h.textContent?.trim() || '';
        if (text) results.push(text);
      });
      return results;
    });

    console.log('\n标题对比:');
    console.log(`旧网站有 ${oldHeadings.length} 个标题`);
    console.log(`新网站有 ${newHeadings.length} 个标题`);

    const onlyInOld = oldHeadings.filter(h => !newHeadings.includes(h));
    const onlyInNew = newHeadings.filter(h => !oldHeadings.includes(h));

    if (onlyInOld.length > 0) {
      console.log('\n只在旧网站中存在的标题:');
      onlyInOld.forEach(h => console.log(`  - ${h}`));
    }

    if (onlyInNew.length > 0) {
      console.log('\n只在新网站中存在的标题:');
      onlyInNew.forEach(h => console.log(`  - ${h}`));
    }

    // 截图对比
    await page.goto(OLD_SITE, { waitUntil: 'networkidle', timeout: 15000 });
    await page.screenshot({ path: 'old-popohu.png', fullPage: true });
    console.log('\n旧网站截图已保存: old-popohu.png');

    await page.goto(NEW_SITE, { waitUntil: 'networkidle', timeout: 15000 });
    await page.screenshot({ path: 'new-popohu.png', fullPage: true });
    console.log('新网站截图已保存: new-popohu.png');
  });
});
