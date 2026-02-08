import { test, expect } from '@playwright/test';

test.describe('Detailed Carousel Loop Check', () => {
  test('Check actual DOM for cloned slides', async ({ page }) => {
    await page.goto('http://localhost:4321/recruit/');

    // Wait for page to load
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(3000);

    // Check DOM for actual swiper slides
    const domInfo = await page.evaluate(() => {
      const swiperWrapper = document.querySelector('#year-end-party-swiper .swiper-wrapper');
      if (!swiperWrapper) return null;

      const slides = Array.from(swiperWrapper.querySelectorAll('.swiper-slide'));
      return {
        totalSlides: slides.length,
        slideClasses: slides.map((slide, index) => ({
          index,
          className: slide.className,
          isDuplicate: slide.classList.contains('swiper-slide-duplicate'),
        })),
        html: swiperWrapper.innerHTML.substring(0, 500),
      };
    });

    console.log('DOM Info:', JSON.stringify(domInfo, null, 2));

    expect(domInfo).not.toBeNull();
  });

  test('Manual swipe/drag test for seamless loop', async ({ page }) => {
    await page.goto('http://localhost:4321/recruit/');

    // Wait for page to load
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(3000);

    const carousel = page.locator('#year-end-party-swiper');

    // Get initial state
    const initialState = await page.evaluate(() => {
      const swiperEl = document.querySelector('#year-end-party-swiper');
      // @ts-ignore
      return swiperEl?.swiper?.activeIndex;
    });
    console.log('Initial activeIndex:', initialState);

    // Simulate swipe/drag to the right multiple times
    for (let i = 0; i < 10; i++) {
      const box = await carousel.boundingBox();
      if (box) {
        // Drag from right to left (next)
        await page.mouse.move(box.x + box.width - 50, box.y + box.height / 2);
        await page.mouse.down();
        await page.mouse.move(box.x + 50, box.y + box.height / 2, { steps: 10 });
        await page.mouse.up();
        await page.waitForTimeout(800);
      }

      const currentIndex = await page.evaluate(() => {
        const swiperEl = document.querySelector('#year-end-party-swiper');
        // @ts-ignore
        return swiperEl?.swiper?.activeIndex;
      });
      console.log(`After swipe ${i + 1}: activeIndex = ${currentIndex}`);
    }
  });
});
