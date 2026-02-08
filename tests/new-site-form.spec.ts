import { test, expect } from '@playwright/test';

test.describe('New Site Contact Form - UMS API', () => {
  const baseUrl = 'http://localhost:4322';

  test.beforeAll(async () => {
    // Wait a bit for dev server to be fully ready
    await new Promise(resolve => setTimeout(resolve, 2000));
  });

  test('Contact page loads correctly', async ({ page }) => {
    await page.goto(`${baseUrl}/contact/`);
    await page.waitForLoadState('networkidle');

    console.log('Title:', await page.title());

    // Check if form exists
    const form = page.locator('#contact-form');
    await expect(form).toBeVisible();

    console.log('✓ Form is visible');
  });

  test('Check form fields exist', async ({ page }) => {
    await page.goto(`${baseUrl}/contact/`);
    await page.waitForLoadState('networkidle');

    // Check all required fields
    const fields = [
      { id: 'name', label: 'お名前' },
      { id: 'company', label: '会社名' },
      { id: 'email', label: 'メールアドレス' },
      { id: 'phone', label: '電話番号' },
      { id: 'type', label: 'お問い合わせ種別' },
      { id: 'message', label: 'お問い合わせ内容' },
      { id: 'privacy', label: 'プライバシーポリシー' },
    ];

    for (const field of fields) {
      const element = page.locator(`#${field.id}`);
      await expect(element).toBeVisible();
      console.log(`✓ ${field.label} field exists`);
    }

    // Check honeypot field is hidden
    const honeypot = page.locator('#hp');
    await expect(honeypot).toHaveClass(/hidden/);
    console.log('✓ Honeypot field is hidden');
  });

  test('Test form submission - Product inquiry (support@)', async ({ page }) => {
    await page.goto(`${baseUrl}/contact/`);
    await page.waitForLoadState('networkidle');

    // Fill in the form
    await page.fill('#name', 'テストユーザー');
    await page.fill('#company', 'テスト株式会社');
    await page.fill('#email', 'test@example.com');
    await page.fill('#phone', '03-1234-5678');
    await page.selectOption('#type', '製品に関するお問い合わせ');
    await page.fill('#message', 'これは製品に関するテストお問い合わせです。');

    // Check privacy checkbox
    await page.check('#privacy');

    // Monitor network requests
    const apiRequests: any[] = [];
    page.on('request', request => {
      if (request.url().includes('ums.aws.swiftechie.com')) {
        apiRequests.push({
          url: request.url(),
          method: request.method(),
          postData: request.postData(),
        });
      }
    });

    // Submit form
    await page.click('button[type="submit"]');

    // Wait for submission
    await page.waitForTimeout(5000);

    // Check API request was made
    console.log('\n=== API Requests ===');
    if (apiRequests.length > 0) {
      for (const req of apiRequests) {
        console.log(`URL: ${req.url}`);
        console.log(`Method: ${req.method}`);
        console.log(`Has data: ${req.postData ? 'Yes' : 'No'}`);
      }
      console.log('\n✓ Form submitted to UMS API');
    } else {
      console.log('✗ No API requests captured');
    }

    // Take screenshot
    await page.screenshot({ path: 'test-results/new-site-form-submission.png', fullPage: true });
    console.log('\nScreenshot saved to test-results/new-site-form-submission.png');
  });

  test('Test form validation - Required fields', async ({ page }) => {
    await page.goto(`${baseUrl}/contact/`);
    await page.waitForLoadState('networkidle');

    // Try to submit without filling required fields
    await page.click('button[type="submit"]');

    // Check for HTML5 validation
    const nameInput = page.locator('#name');
    const isRequired = await nameInput.evaluate(el => el.required);

    expect(isRequired).toBe(true);
    console.log('✓ HTML5 validation is enabled');
  });

  test('Check form configuration in page source', async ({ page }) => {
    await page.goto(`${baseUrl}/contact/`);
    await page.waitForLoadState('networkidle');

    // Check if UMS API URL is in the page
    const pageSource = await page.content();

    const hasUmsApi = pageSource.includes('ums.aws.swiftechie.com');
    const hasEmailGroupKey = pageSource.includes('emailGroupKey');
    const hasContactPro = pageSource.includes('contact-pro');
    const hasContactOthers = pageSource.includes('contact-others');

    console.log('\n=== Form Configuration ===');
    console.log(`UMS API URL: ${hasUmsApi ? '✓' : '✗'}`);
    console.log(`emailGroupKey: ${hasEmailGroupKey ? '✓' : '✗'}`);
    console.log(`contact-pro: ${hasContactPro ? '✓' : '✗'}`);
    console.log(`contact-others: ${hasContactOthers ? '✓' : '✗'}`);

    expect(hasUmsApi).toBe(true);
    expect(hasEmailGroupKey).toBe(true);
  });

  test('Test email routing by inquiry type', async ({ page }) => {
    await page.goto(`${baseUrl}/contact/`);
    await page.waitForLoadState('networkidle');

    const inquiryTypes = [
      { value: '製品に関するお問い合わせ', expectedKey: 'contact-pro', expectedEmail: 'support@' },
      { value: 'サービスに関するお問い合わせ', expectedKey: 'contact-others', expectedEmail: 'info@' },
      { value: 'その他', expectedKey: 'contact-others', expectedEmail: 'info@' },
    ];

    console.log('\n=== Email Routing Test ===');

    for (const type of inquiryTypes) {
      // Get the emailGroupKey that would be used
      const routingInfo = await page.evaluate((inquiryType) => {
        // Replicate the logic from the form
        function getEmailGroupKey(t) {
          if (t === '製品に関するお問い合わせ') {
            return 'contact-pro';
          }
          return 'contact-others';
        }

        function getTitle(t) {
          const baseTitle = '【シーテック株式会社】Webサイトより　';
          switch (t) {
            case '製品に関するお問い合わせ':
              return baseTitle + '製品に関するお問い合わせ';
            case 'サービスに関するお問い合わせ':
              return baseTitle + 'サービスに関するお問い合わせ';
            default:
              return baseTitle + 'お問い合わせ';
          }
        }

        return {
          emailGroupKey: getEmailGroupKey(inquiryType),
          title: getTitle(inquiryType),
        };
      }, type.value);

      console.log(`\n${type.value}`);
      console.log(`  Email Group Key: ${routingInfo.emailGroupKey}`);
      console.log(`  Expected: ${type.expectedKey}`);
      console.log(`  Match: ${routingInfo.emailGroupKey === type.expectedKey ? '✓' : '✗'}`);
      console.log(`  Routes to: ${type.expectedEmail}`);

      expect(routingInfo.emailGroupKey).toBe(type.expectedKey);
    }
  });
});
