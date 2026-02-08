import { test, expect } from '@playwright/test';

test.describe('Real Form Submission Test', () => {
  const baseUrl = 'http://localhost:4322';

  test('Detailed form submission test', async ({ page }) => {
    await page.goto(`${baseUrl}/contact/`);
    await page.waitForLoadState('networkidle');

    console.log('\n=== Filling out form ===');

    // Fill all fields
    await page.fill('#name', 'テストユーザー');
    console.log('✓ Name filled');

    await page.fill('#company', 'テスト株式会社');
    console.log('✓ Company filled');

    await page.fill('#email', 'test@example.com');
    console.log('✓ Email filled');

    await page.fill('#phone', '03-1234-5678');
    console.log('✓ Phone filled');

    await page.selectOption('#type', '製品に関するお問い合わせ');
    console.log('✓ Type selected: Product inquiry');

    await page.fill('#message', 'これはテストメッセージです。\n製品に関するお問い合わせをテストしています。');
    console.log('✓ Message filled');

    await page.check('#privacy');
    console.log('✓ Privacy checkbox checked');

    // Wait at least 3 seconds (MIN_SECONDS_TO_SUBMIT requirement)
    console.log('\nWaiting 4 seconds to meet minimum time requirement...');
    await page.waitForTimeout(4000);

    // Set up detailed monitoring
    const requests: any[] = [];
    page.on('request', request => {
      const url = request.url();
      if (url.includes('ums') || url.includes('swiftechie')) {
        requests.push({
          url: url,
          method: request.method(),
          headers: request.headers(),
        });
        console.log(`\n[REQUEST] ${request.method()} ${url}`);
      }
    });

    page.on('response', async (response) => {
      const url = response.url();
      if (url.includes('ums') || url.includes('swiftechie')) {
        console.log(`\n[RESPONSE] ${response.status()} ${url}`);
        if (response.status() !== 200) {
          console.log(`Response text: ${await response.text()}`);
        }
      }
    });

    console.log('\n=== Submitting form ===');

    // Click submit button
    const submitButton = page.locator('button[type="submit"]');
    await submitButton.click();

    // Wait for potential API call and response
    await page.waitForTimeout(5000);

    console.log('\n=== Requests captured ===');
    console.log(`Total requests to UMS/swiftechie: ${requests.length}`);
    requests.forEach((req, i) => {
      console.log(`\n${i + 1}. ${req.method} ${req.url}`);
    });

    // Check for success or error message
    const successMsg = page.locator('#form-success');
    const errorMsg = page.locator('#form-error');

    const isSuccessVisible = await successMsg.isVisible().catch(() => false);
    const isErrorVisible = await errorMsg.isVisible().catch(() => false);

    console.log('\n=== Form Status ===');
    console.log(`Success message visible: ${isSuccessVisible}`);
    console.log(`Error message visible: ${isErrorVisible}`);

    if (isErrorVisible) {
      const errorText = await errorMsg.textContent();
      console.log(`Error message: ${errorText}`);
    }

    // Take final screenshot
    await page.screenshot({ path: 'test-results/form-after-submit.png', fullPage: true });
    console.log('\nScreenshot saved: test-results/form-after-submit.png');

    // Check form state
    const form = page.locator('#contact-form');
    const nameValue = await page.locator('#name').inputValue();

    console.log(`\nForm reset: ${nameValue === '' ? 'Yes (✓)' : 'No'}`);
  });

  test('Test service inquiry (should route to info@)', async ({ page }) => {
    await page.goto(`${baseUrl}/contact/`);
    await page.waitForLoadState('networkidle');

    console.log('\n=== Testing Service Inquiry (info@) ===');

    await page.fill('#name', 'サービステスト');
    await page.fill('#company', 'テスト会社');
    await page.fill('#email', 'service@test.com');
    await page.fill('#phone', '03-9876-5432');
    await page.selectOption('#type', 'サービスに関するお問い合わせ');
    await page.fill('#message', 'サービスについてのお問い合わせです。');
    await page.check('#privacy');

    // Wait minimum time
    await page.waitForTimeout(3500);

    // Monitor for contact-others emailGroupKey
    let capturedKey = 'not captured';

    page.on('request', request => {
      const url = request.url();
      if (url.includes('ums.aws.swiftechie.com')) {
        const postData = request.postData();
        if (postData && postData.includes('emailGroupKey')) {
          const match = postData.match(/emailGroupKey=([^&]+)/);
          if (match) {
            capturedKey = decodeURIComponent(match[1]);
          }
        }
      }
    });

    await page.click('button[type="submit"]');
    await page.waitForTimeout(4000);

    console.log(`Captured emailGroupKey: ${capturedKey}`);
    console.log(`Expected: contact-others → info@swiftechie.com`);

    await page.screenshot({ path: 'test-results/service-inquiry-submit.png', fullPage: true });
  });
});
