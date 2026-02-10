import { test, expect } from '@playwright/test';

test.describe('Check Footer Design', () => {
  test('Screenshot footer with white text on slate-400', async ({ page }) => {
    await page.goto('http://localhost:4321/');
    await page.waitForLoadState('networkidle');

    // Scroll to bottom
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(1000);

    console.log('\n=== Footer Screenshot ===\n');

    // Screenshot just the footer area
    const footer = page.locator('footer');
    const box = await footer.boundingBox();

    if (box) {
      await page.screenshot({
        path: 'screenshots/footer-white-text.png',
        clip: {
          x: 0,
          y: box.y - 50,
          width: 1280,
          height: box.height + 100
        }
      });
      console.log('✓ Footer screenshot: screenshots/footer-white-text.png');
      console.log(`  Footer position: y=${box.y}, height=${box.height}`);
    }

    // Also get footer text colors
    const headings = await footer.locator('h4').allTextContents();
    const links = await footer.locator('a').count();
    const copyright = await footer.locator('p').last().textContent();

    console.log(`\nHeadings: ${headings.join(', ')}`);
    console.log(`Links count: ${links}`);
    console.log(`Copyright: ${copyright}`);
  });
});
