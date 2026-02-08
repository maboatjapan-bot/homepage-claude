import { test, expect } from '@playwright/test';

test.describe('Manual Carousel Loop Test', () => {
  test('Check Swiper instance configuration', async ({ page }) => {
    await page.goto('http://localhost:4321/recruit/');

    // Wait for page to load
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(3000);

    // Check Swiper configuration in page
    const swiperConfig = await page.evaluate(() => {
      const swiperEl = document.querySelector('#year-end-party-swiper');
      if (!swiperEl) return null;

      // @ts-ignore - Swiper attaches instance to element
      const swiper = swiperEl.swiper;
      if (!swiper) return null;

      return {
        loop: swiper.params.loop,
        rewind: swiper.params.rewind,
        loopedSlides: swiper.params.loopedSlides,
        loopAdditionalSlides: swiper.params.loopAdditionalSlides,
        slidesPerView: swiper.params.slidesPerView,
        slidesCount: swiper.slides.length,
        wrapperWidth: swiper.width,
        allowSlideNext: swiper.allowSlideNext,
        allowSlidePrev: swiper.allowSlidePrev,
      };
    });

    console.log('Swiper Configuration:', JSON.stringify(swiperConfig, null, 2));

    expect(swiperConfig).not.toBeNull();
    // Check if either loop or rewind is enabled for continuous navigation
    const hasContinuousNavigation = (swiperConfig?.loop === true) || (swiperConfig?.rewind === true);
    expect(hasContinuousNavigation).toBe(true);
    console.log(`✓ Continuous navigation enabled (loop: ${swiperConfig?.loop}, rewind: ${swiperConfig?.rewind})`);
  });

  test('Manually test carousel navigation', async ({ page }) => {
    await page.goto('http://localhost:4321/recruit/');

    // Wait for page to load
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(3000);

    const nextButton = page.locator('.year-end-party-next');
    const prevButton = page.locator('.year-end-party-prev');

    // Get initial active slide index
    let initialIndex = await page.evaluate(() => {
      const swiperEl = document.querySelector('#year-end-party-swiper');
      // @ts-ignore
      return swiperEl?.swiper?.activeIndex;
    });
    console.log('Initial active index:', initialIndex);

    // Click next 5 times and check indices
    for (let i = 1; i <= 5; i++) {
      await nextButton.click();
      await page.waitForTimeout(500);
      const currentIndex = await page.evaluate(() => {
        const swiperEl = document.querySelector('#year-end-party-swiper');
        // @ts-ignore
        return swiperEl?.swiper?.activeIndex;
      });
      console.log(`After next click ${i}: active index = ${currentIndex}`);
    }

    // Click prev 5 times and check indices
    for (let i = 1; i <= 5; i++) {
      await prevButton.click();
      await page.waitForTimeout(500);
      const currentIndex = await page.evaluate(() => {
        const swiperEl = document.querySelector('#year-end-party-swiper');
        // @ts-ignore
        return swiperEl?.swiper?.activeIndex;
      });
      console.log(`After prev click ${i}: active index = ${currentIndex}`);
    }
  });

  test('Take screenshot after navigation', async ({ page }) => {
    await page.goto('http://localhost:4321/recruit/');

    // Wait for page to load
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(3000);

    const nextButton = page.locator('.year-end-party-next');

    // Navigate to different slides and take screenshots
    for (let i = 0; i < 3; i++) {
      await nextButton.click();
      await page.waitForTimeout(500);

      const carousel = page.locator('#year-end-party-wrapper');
      await carousel.screenshot({ path: `screenshots/carousel-slide-${i + 1}.png` });
    }

    console.log('✓ Screenshots saved');
  });
});
