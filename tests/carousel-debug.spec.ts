import { test, expect } from '@playwright/test';

test.describe('Carousel Debug Logs', () => {
  test('Capture console logs on page load', async ({ page }) => {
    // Collect all console messages
    const messages: string[] = [];
    page.on('console', msg => {
      messages.push(`[${msg.type()}] ${msg.text()}`);
    });

    await page.goto('http://localhost:4321/recruit/');

    // Wait for page to load
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(3000);

    console.log('\n=== Console Messages from Browser ===');
    for (const msg of messages) {
      console.log(msg);
    }
    console.log('=====================================\n');

    expect(messages.length).toBeGreaterThan(0);
  });
});
