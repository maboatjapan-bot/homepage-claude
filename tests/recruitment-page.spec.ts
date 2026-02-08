import { test, expect } from '@playwright/test';

test.describe('Recruitment Page on Amplify', () => {
  const baseUrl = 'https://main.d3572wh1uqcd5u.amplifyapp.com';

  test('Photo Carousels are visible', async ({ page }) => {
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

    // Take screenshot of year-end party carousel
    const yearEndCarousel = page.locator('#year-end-party-wrapper').first();
    if (await yearEndCarousel.isVisible()) {
      await yearEndCarousel.screenshot({ path: 'screenshots/year-end-party-carousel.png' });
      console.log('✓ Year-end party carousel screenshot saved');
    }

    // Take screenshot of company trip carousel
    const companyTripCarousel = page.locator('#company-trip-wrapper').first();
    if (await companyTripCarousel.isVisible()) {
      await companyTripCarousel.screenshot({ path: 'screenshots/company-trip-carousel.png' });
      console.log('✓ Company trip carousel screenshot saved');
    }
  });

  test('Photo carousel images are loading', async ({ page }) => {
    await page.goto(`${baseUrl}/recruit/`);

    // Wait for page to load
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);

    // Check year-end party images
    const yearEndImages = page.locator('#year-end-party-swiper img');
    const yearEndCount = await yearEndImages.count();
    console.log(`✓ Year-end party carousel has ${yearEndCount} images`);
    expect(yearEndCount).toBeGreaterThan(0);

    // Check company trip images
    const companyTripImages = page.locator('#company-trip-swiper img');
    const companyTripCount = await companyTripImages.count();
    console.log(`✓ Company trip carousel has ${companyTripCount} images`);
    expect(companyTripCount).toBeGreaterThan(0);

    // Verify images are actually loaded (not broken)
    for (let i = 0; i < Math.min(yearEndCount, 3); i++) {
      const img = yearEndImages.nth(i);
      const naturalWidth = await img.evaluate(el => (el as HTMLImageElement).naturalWidth);
      expect(naturalWidth).toBeGreaterThan(0);
      console.log(`✓ Year-end party image ${i + 1} loaded successfully`);
    }

    for (let i = 0; i < Math.min(companyTripCount, 3); i++) {
      const img = companyTripImages.nth(i);
      const naturalWidth = await img.evaluate(el => (el as HTMLImageElement).naturalWidth);
      expect(naturalWidth).toBeGreaterThan(0);
      console.log(`✓ Company trip image ${i + 1} loaded successfully`);
    }
  });

  test('Full page screenshot', async ({ page }) => {
    await page.goto(`${baseUrl}/recruit/`);

    // Wait for page to fully load
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);

    // Take full page screenshot
    await page.screenshot({
      path: 'screenshots/recruitment-page-full.png',
      fullPage: true
    });

    console.log('✓ Full page screenshot saved to screenshots/recruitment-page-full.png');
  });

  test('Check image paths match legacy website', async ({ page }) => {
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

    console.log('Year-end party images found:');
    for (let i = 0; i < yearEndCount; i++) {
      const src = await yearEndImgs.nth(i).getAttribute('src');
      console.log(`  ${i + 1}. ${src}`);
      const filename = src?.split('/').pop();
      const isExpected = expectedYearEndImages.some(path => path.includes(filename || ''));
      if (isExpected) {
        console.log(`     ✓ Matches expected image`);
      }
    }

    // Check company trip images
    const companyTripImgs = page.locator('#company-trip-swiper img');
    const companyTripCount = await companyTripImgs.count();

    console.log('Company trip images found:');
    for (let i = 0; i < companyTripCount; i++) {
      const src = await companyTripImgs.nth(i).getAttribute('src');
      console.log(`  ${i + 1}. ${src}`);
      const filename = src?.split('/').pop();
      const isExpected = expectedCompanyTripImages.some(path => path.includes(filename || ''));
      if (isExpected) {
        console.log(`     ✓ Matches expected image`);
      }
    }
  });
});
