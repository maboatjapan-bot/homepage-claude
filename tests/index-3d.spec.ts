import { test, expect } from '@playwright/test';

test('index-3d page loads correctly', async ({ page }) => {
  // Navigate to the page
  await page.goto('http://localhost:4321/index-3d');

  // Wait for page to load
  await page.waitForLoadState('networkidle');

  // Check title
  await expect(page).toHaveTitle(/Swiftechie/);

  // Check main heading exists (use first h1)
  const heading = page.locator('h1').first();
  await expect(heading).toContainText('技術で');

  // Check AI Solution section (use h2)
  const aiSection = page.locator('h2').filter({ hasText: 'AI ソリューション' });
  await expect(aiSection).toBeVisible();

  // Check 3D container exists
  const container = page.locator('.neural-sphere-wrapper');
  await expect(container).toBeVisible();

  // Check if canvas is rendered (wait for Three.js to initialize)
  const canvas = page.locator('.neural-sphere-wrapper canvas');
  await expect(canvas).toHaveCount(1, { timeout: 5000 });

  // Take screenshot
  await page.screenshot({ path: 'screenshots/index-3d.png', fullPage: true });

  console.log('✓ index-3d page loaded successfully with 3D component');
});
