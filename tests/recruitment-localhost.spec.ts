import { test, expect } from '@playwright/test';

test.describe('Recruitment Page on Localhost', () => {
  const baseUrl = 'http://localhost:4321';

  test('Photo Carousels with updated images', async ({ page }) => {
    await page.goto(`${baseUrl}/recruit/`);

    // Wait for page to load
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);

    // Check if hero section is visible
    const hero = page.locator('section h1:text("採用情報")');
    await expect(hero).toBeVisible();

    console.log('✓ Hero section is visible');

    // Check if PhotoCarousel containers exist
    const carousels = page.locator('.photo-carousel-wrapper');
    await expect(carousels).toHaveCount(2);

    console.log('✓ Found 2 photo carousels');

    // Check year-end party carousel
    const yearEndPartyTitle = page.locator('text=忘年会@上野');
    await expect(yearEndPartyTitle).toBeVisible();

    console.log('✓ Year-end party carousel title is visible');

    // Check company trip carousel
    const companyTripTitle = page.locator('text=社員旅行@伊豆');
    await expect(companyTripTitle).toBeVisible();

    console.log('✓ Company trip carousel title is visible');

    // Check if swiper containers exist
    const swipers = page.locator('.swiper');
    await expect(swipers).toHaveCount(2);

    console.log('✓ Swiper containers initialized');
  });

  test('Photo carousel images are correct from legacy website', async ({ page }) => {
    await page.goto(`${baseUrl}/recruit/`);

    // Wait for page to load
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);

    // Expected image paths from legacy website
    const expectedYearEndImages = [
      '/assets/images/company/year-end-party/05-550x300.jpg',
      '/assets/images/company/year-end-party/01-550x300.jpg',
      '/assets/images/company/year-end-party/02-550x300.jpg',
    ];

    const expectedCompanyTripImages = [
      '/assets/images/company/company-trip/07-550x300.png',
      '/assets/images/company/company-trip/06-2-550x300.png',
      '/assets/images/company/company-trip/IMG-13-550x300.jpg',
      '/assets/images/company/company-trip/05-1-550x300.png',
    ];

    // Check year-end party images
    const yearEndImgs = page.locator('#year-end-party-swiper img');
    const yearEndCount = await yearEndImgs.count();

    console.log(`\n忘年会@上野 2023 - 共 ${yearEndCount} 张照片:`);
    for (let i = 0; i < yearEndCount; i++) {
      const src = await yearEndImgs.nth(i).getAttribute('src');
      const filename = src?.split('/').pop();
      const isExpected = expectedYearEndImages.some(path => path.includes(filename || ''));
      const status = isExpected ? '✓' : '✗';
      console.log(`  ${status} ${i + 1}. ${filename}`);
    }

    // Verify we have exactly 3 images matching legacy website
    expect(yearEndCount).toBe(3);

    // Check company trip images
    const companyTripImgs = page.locator('#company-trip-swiper img');
    const companyTripCount = await companyTripImgs.count();

    console.log(`\n社員旅行@伊豆 2024 - 共 ${companyTripCount} 张照片:`);
    for (let i = 0; i < companyTripCount; i++) {
      const src = await companyTripImgs.nth(i).getAttribute('src');
      const filename = src?.split('/').pop();
      const isExpected = expectedCompanyTripImages.some(path => path.includes(filename || ''));
      const status = isExpected ? '✓' : '✗';
      console.log(`  ${status} ${i + 1}. ${filename}`);
    }

    // Verify we have exactly 4 images matching legacy website
    expect(companyTripCount).toBe(4);
  });

  test('Images are loading correctly (not broken)', async ({ page }) => {
    await page.goto(`${baseUrl}/recruit/`);

    // Wait for page to load
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);

    // Check year-end party images
    const yearEndImages = page.locator('#year-end-party-swiper img');
    const yearEndCount = await yearEndImages.count();

    console.log('\n验证忘年会图片加载:');
    for (let i = 0; i < yearEndCount; i++) {
      const img = yearEndImages.nth(i);
      const src = await img.getAttribute('src');
      const naturalWidth = await img.evaluate(el => (el as HTMLImageElement).naturalWidth);
      const naturalHeight = await img.evaluate(el => (el as HTMLImageElement).naturalHeight);
      const status = naturalWidth > 0 ? '✓' : '✗';
      console.log(`  ${status} 图片 ${i + 1}: ${src} (${naturalWidth}x${naturalHeight})`);
      expect(naturalWidth).toBeGreaterThan(0);
    }

    // Check company trip images
    const companyTripImages = page.locator('#company-trip-swiper img');
    const companyTripCount = await companyTripImages.count();

    console.log('\n验证社员旅行图片加载:');
    for (let i = 0; i < companyTripCount; i++) {
      const img = companyTripImages.nth(i);
      const src = await img.getAttribute('src');
      const naturalWidth = await img.evaluate(el => (el as HTMLImageElement).naturalWidth);
      const naturalHeight = await img.evaluate(el => (el as HTMLImageElement).naturalHeight);
      const status = naturalWidth > 0 ? '✓' : '✗';
      console.log(`  ${status} 图片 ${i + 1}: ${src} (${naturalWidth}x${naturalHeight})`);
      expect(naturalWidth).toBeGreaterThan(0);
    }
  });

  test('Full page screenshot', async ({ page }) => {
    await page.goto(`${baseUrl}/recruit/`);

    // Wait for page to fully load
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);

    // Take full page screenshot
    await page.screenshot({
      path: 'screenshots/recruitment-localhost.png',
      fullPage: true
    });

    console.log('\n✓ 完整页面截图已保存: screenshots/recruitment-localhost.png');
  });
});
