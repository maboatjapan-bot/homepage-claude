import { test, expect } from '@playwright/test';

const AMP_URL = 'https://main.d3572wh1uqcd5u.amplifyapp.com';

test.describe('Amplify部署检索功能验证', () => {
  test('桌面端：只有AI检索选项', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto(AMP_URL);

    // 等待页面加载
    await page.waitForLoadState('networkidle');

    // 点击检索图标
    const searchTrigger = page.locator('#search-trigger');
    await searchTrigger.click();
    await page.waitForTimeout(500);

    // PageFind按钮不应该存在
    const pagefindBtn = page.locator('#pagefind-search-btn');
    const pagefindExists = await pagefindBtn.count();
    expect(pagefindExists).toBe(0);

    // Google AI按钮应该存在
    const googleAiBtn = page.locator('#google-ai-search-btn');
    const googleExists = await googleAiBtn.count();
    expect(googleExists).toBeGreaterThan(0);

    // 截图
    await page.screenshot({ path: 'search-menu-desktop-amp.png', fullPage: false });
    console.log('✓ 桌面端：只有AI检索');
  });

  test('手机端：点击检索打开AI检索', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(AMP_URL);

    // 等待页面加载
    await page.waitForLoadState('networkidle');

    // 先点击汉堡菜单按钮展开菜单
    const menuButton = page.locator('#mobile-menu-button');
    await menuButton.click();
    await page.waitForTimeout(500);

    // 点击移动端检索图标
    const mobileSearchTrigger = page.locator('#search-trigger-mobile');
    await mobileSearchTrigger.click();
    await page.waitForTimeout(2000);

    // 应该有Google AI widget容器
    const googleWidget = page.locator('gen-search-widget');
    const widgetExists = await googleWidget.count();
    expect(widgetExists).toBeGreaterThan(0);

    // 截图
    await page.screenshot({ path: 'search-menu-mobile-amp.png', fullPage: false });
    console.log('✓ 手机端：打开AI检索');
  });
});
