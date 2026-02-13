import { test } from '@playwright/test';

const OLD_SITE = 'https://www.swiftechie.com/product/product_04.html';
const NEW_SITE = 'http://localhost:4321/products/pitopa';

test.describe('比较pitopa新旧网站内容', () => {
  test('获取旧网站完整内容', async ({ page }) => {
    console.log('=== 访问旧网站 ===');
    await page.goto(OLD_SITE, { waitUntil: 'networkidle', timeout: 15000 });

    // 提取所有section标题
    const sections = await page.evaluate(() => {
      const results: {title: string, content: string}[] = [];

      // Hero section
      const heroTitle = document.querySelector('section h1, section .text-4xl');
      if (heroTitle) {
        results.push({ section: 'Hero', title: heroTitle.textContent?.trim() || '' });
      }

      // Key Features
      const keyFeatures = document.querySelectorAll('section .inline-flex.gap-2');
      if (keyFeatures.length > 0) {
        results.push({ section: 'Key Features', title: '顔写真付き記録、クラウド管理、法対応完備'.substring(0, 30) });
      }

      // Why Pitopa section
      const whySection = document.querySelector('section h2.text-2xl');
      if (whySection && whySection.textContent.includes('なぜ')) {
        results.push({ section: 'Why Pitopa', title: whySection.textContent?.trim() || '' });
      }

      // 3x Features Grid
      const gridSection = document.querySelector('section .grid-cols-3');
      if (gridSection) {
        const h2 = gridSection.querySelector('h2');
        results.push({ section: '3x Grid', title: h2?.textContent?.trim() || '' });
      }

      // About Product
      const aboutSection = document.querySelector('section .grid.lg\\:grid-cols-2');
      if (aboutSection) {
        results.push({ section: 'About Product', title: '製品について' });
      }

      // J-BAC Banner
      const bannerSection = document.querySelector('img[alt*="J-BAC"]');
      if (bannerSection) {
        results.push({ section: 'J-BAC Banner', title: 'J-BAC Banner' });
      }

      return results;
    });

    console.log('\n旧网站主要内容结构:');
    sections.forEach(s => {
      console.log(`  [${s.section}] ${s.title}`);
    });
  });

  test('获取新网站完整内容', async ({ page }) => {
    console.log('\n=== 访问新网站 ===');
    await page.goto(NEW_SITE, { waitUntil: 'networkidle', timeout: 15000 });

    // 提取所有section标题
    const sections = await page.evaluate(() => {
      const results: {title: string, content: string}[] = [];

      // Hero section
      const heroTitle = document.querySelector('section h1');
      if (heroTitle) {
        results.push({ section: 'Hero', title: heroTitle.textContent?.trim() || '' });
      }

      // Key Features
      const keyFeatures = document.querySelectorAll('section .inline-flex.gap-3');
      if (keyFeatures.length > 0) {
        results.push({ section: 'Key Features', title: 'Key Features (图标)' });
      }

      // Why Pitopa section
      const whySection = document.querySelector('section');
      const whyH2 = Array.from(document.querySelectorAll('section h2')).find(h => h.textContent.includes('なぜ'));
      if (whyH2) {
        results.push({ section: 'Why Pitopa', title: whyH2.textContent?.trim() || '' });
      }

      // 3x Features Grid
      const gridSection = document.querySelector('section .grid.md\\:grid-cols-3');
      if (gridSection) {
        const h2 = gridSection.querySelector('h2');
        results.push({ section: '3x Grid', title: h2?.textContent?.trim() || '' });
      }

      // About Product
      const aboutSection = document.querySelector('section .grid.lg\\:grid-cols-2');
      if (aboutSection) {
        const h2 = aboutSection.querySelector('h2');
        results.push({ section: 'About Product', title: h2?.textContent?.trim() || '' });
      }

      // J-BAC Banner
      const bannerSection = document.querySelector('img[alt*="J-BAC"]');
      if (bannerSection) {
        results.push({ section: 'J-BAC Banner', title: 'J-BAC Banner' });
      }

      // System Overview
      const systemSection = document.querySelector('section h3.text-xl');
      if (systemSection) {
        const h2 = systemSection.parentElement?.querySelector('h2');
        results.push({ section: 'System Overview', title: h2?.textContent?.trim() || '' });
      }

      // App Screenshots
      const screenshotSection = document.querySelector('section h2.text-2xl');
      const screenshotH2 = Array.from(document.querySelectorAll('section h2')).find(h => h.textContent.includes('アプリ画面'));
      if (screenshotH2) {
        results.push({ section: 'App Screenshots', title: screenshotH2.textContent?.trim() || '' });
      }

      // Video section
      const videoSection = document.querySelector('section video');
      if (videoSection) {
        const h2 = videoSection.parentElement?.querySelector('h2');
        results.push({ section: 'Video', title: h2?.textContent?.trim() || '' });
      }

      // Specifications
      const specSection = document.querySelector('section[id="specifications"]');
      if (specSection) {
        const h2 = specSection.querySelector('h2');
        results.push({ section: 'Specifications', title: h2?.textContent?.trim() || '' });
      }

      return results;
    });

    console.log('\n新网站主要内容结构:');
    sections.forEach(s => {
      console.log(`  [${s.section}] ${s.title}`);
    });
  });

  test('截图对比', async ({ page }) => {
    console.log('\n=== 截图对比 ===');
    await page.goto(OLD_SITE, { waitUntil: 'networkidle', timeout: 15000 });
    await page.screenshot({ path: 'old-pitopa.png', fullPage: true });
    console.log('旧网站截图: old-pitopa.png');

    await page.goto(NEW_SITE, { waitUntil: 'networkidle', timeout: 15000 });
    await page.screenshot({ path: 'new-pitopa.png', fullPage: true });
    console.log('新网站截图: new-pitopa.png');
  });
});
