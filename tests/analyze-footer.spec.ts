import { test, expect } from '@playwright/test';

test.describe('Analyze Homepage Footer', () => {
  test('Screenshot and analyze footer design', async ({ page }) => {
    await page.goto('http://localhost:4321/');
    await page.waitForLoadState('networkidle');

    // Scroll to footer
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(1000);

    console.log('\n=== 页脚设计分析 ===\n');

    // Screenshot footer
    const footer = page.locator('footer');
    const box = await footer.boundingBox();

    await page.screenshot({
      path: 'screenshots/footer-analysis.png',
      clip: {
        x: 0,
        y: Math.max(0, (box?.y || 0) - 100),
        width: 1280,
        height: ((box?.height || 0) + 200)
      }
    });
    console.log('✓ 截图保存: screenshots/footer-analysis.png');

    // Analyze footer elements
    console.log('\n--- 元素分析 ---\n');

    // Background color
    const bgColor = await footer.evaluate(el => {
      return window.getComputedStyle(el).backgroundColor;
    });
    console.log(`背景色: ${bgColor}`);

    // Logo
    const logo = footer.locator('img').first();
    const logoExists = await logo.count();
    if (logoExists > 0) {
      const logoAlt = await logo.getAttribute('alt');
      console.log(`✓ Logo 存在 (${logoAlt})`);
    } else {
      console.log('✗ Logo 不存在');
    }

    // Headings
    const headings = footer.locator('h4');
    const headingCount = await headings.count();
    console.log(`\n标题数量: ${headingCount}`);
    for (let i = 0; i < headingCount; i++) {
      const text = await headings.nth(i).textContent();
      const color = await headings.nth(i).evaluate(el => {
        return window.getComputedStyle(el).color;
      });
      console.log(`  - ${text}: ${color}`);
    }

    // Links
    const links = footer.locator('a');
    const linkCount = await links.count();
    console.log(`\n链接数量: ${linkCount}`);

    // Check first few link colors
    for (let i = 0; i < Math.min(3, linkCount); i++) {
      const text = await links.nth(i).textContent();
      const color = await links.nth(i).evaluate(el => {
        return window.getComputedStyle(el).color;
      });
      console.log(`  - ${text}: ${color}`);
    }

    // Copyright
    const copyright = footer.locator('p').last();
    const copyrightText = await copyright.textContent();
    const copyrightColor = await copyright.evaluate(el => {
      return window.getComputedStyle(el).color;
    });
    console.log(`\n版权: ${copyrightText}`);
    console.log(`  颜色: ${copyrightColor}`);

    // Contrast check (simple check)
    console.log('\n--- 对比度检查 ---\n');

    const headingColor = await headings.first().evaluate(el => {
      return window.getComputedStyle(el).color;
    });

    // Check if text is readable on slate-400 background
    const isReadable = headingColor === 'rgb(255, 255, 255)' ||
                      headingColor.includes('255') ||
                      headingColor === '#ffffff' ||
                      headingColor === 'white';

    if (isReadable) {
      console.log('✓ 标题使用白色文字');
    } else {
      console.log('⚠ 标题可能需要调整颜色');
      console.log(`  当前颜色: ${headingColor}`);
    }

    // Spacing check
    console.log('\n--- 间距检查 ---\n');

    const footerPadding = await footer.evaluate(el => {
      const styles = window.getComputedStyle(el);
      return {
        paddingTop: styles.paddingTop,
        paddingBottom: styles.paddingBottom,
        paddingLeft: styles.paddingLeft,
        paddingRight: styles.paddingRight
      };
    });
    console.log(`内边距: ${JSON.stringify(footerPadding)}`);

    // Mobile responsive check
    console.log('\n--- 响应式检查 ---\n');

    // Test on mobile size
    await page.setViewportSize({ width: 375, height: 667 });
    await page.waitForTimeout(500);

    await page.screenshot({
      path: 'screenshots/footer-mobile.png'
    });
    console.log('✓ 移动端截图保存: screenshots/footer-mobile.png');

    const mobileGridCols = await footer.locator('.grid').first().evaluate(el => {
      return window.getComputedStyle(el).gridTemplateColumns;
    });
    console.log(`移动端网格: ${mobileGridCols}`);

    // Restore desktop view
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.waitForTimeout(500);

    console.log('\n=== 分析完成 ===\n');
  });
});
