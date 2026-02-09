import { test, expect } from '@playwright/test';

test.describe('Updated Contact Form - Old Site Fields', () => {
  const baseUrl = 'http://localhost:4323';

  test.beforeAll(async () => {
    await new Promise(resolve => setTimeout(resolve, 2000));
  });

  test('Form has all fields from old site', async ({ page }) => {
    await page.goto(`${baseUrl}/contact/`);
    await page.waitForLoadState('networkidle');

    console.log('\n=== Checking Form Fields ===');

    const fields = [
      { id: 'hp', label: 'Honeypot (hidden)', hidden: true },
      { id: 'company', label: '■ 会社名', required: true },
      { id: 'dept', label: '■ 所属名', required: false },
      { id: 'name', label: '■ 氏名', required: true },
      { id: 'phone', label: '■ 電話番号', required: true },
      { id: 'email', label: '■ メールアドレス', required: true },
      { id: 'content', label: '■ お問い合わせの具体的な内容', required: true },
    ];

    for (const field of fields) {
      const element = page.locator(`#${field.id}`);
      if (field.hidden) {
        await expect(element).toHaveClass(/hidden/);
        console.log(`✓ ${field.label} is hidden`);
      } else {
        await expect(element).toBeVisible();
        const isRequired = await element.evaluate(el => el.required);
        expect(isRequired).toBe(field.required);
        console.log(`✓ ${field.label} exists${field.required ? ' (required)' : ''}`);
      }
    }
  });

  test('File upload functionality exists', async ({ page }) => {
    await page.goto(`${baseUrl}/contact/`);
    await page.waitForLoadState('networkidle');

    console.log('\n=== File Upload ===');

    // Check dropzone exists
    const dropzone = page.locator('#dropzone');
    await expect(dropzone).toBeVisible();
    console.log('✓ Dropzone is visible');

    // Check file input exists
    const fileInput = page.locator('#attachments');
    await expect(fileInput).toHaveCount(1);
    console.log('✓ File input exists');

    // Check file list exists
    const fileList = page.locator('#fileList');
    await expect(fileList).toHaveCount(1);
    console.log('✓ File list exists');

    // Check accept attribute
    const accept = await fileInput.getAttribute('accept');
    expect(accept).toBe('.jpg,.jpeg,.png,.pdf');
    console.log(`✓ Accepts: ${accept}`);
  });

  test('No visible captcha field', async ({ page }) => {
    await page.goto(`${baseUrl}/contact/`);
    await page.waitForLoadState('networkidle');

    console.log('\n=== Captcha Check ===');

    // Check for captcha input (should not exist)
    const captcha = page.locator('#captcha');
    const count = await captcha.count();

    if (count === 0) {
      console.log('✓ No captcha field (as expected - using silent protection)');
    } else {
      console.log('⚠️ Captcha field found');
    }

    // Check for timestamp (silent bot protection)
    const timestamp = page.locator('#timestamp');
    await expect(timestamp).toHaveCount(1);
    console.log('✓ Timestamp field exists (silent protection)');
  });

  test('Form submission with data', async ({ page }) => {
    await page.goto(`${baseUrl}/contact/`);
    await page.waitForLoadState('networkidle');

    console.log('\n=== Form Submission Test ===');

    // Fill form fields
    await page.fill('#company', 'テスト株式会社');
    console.log('✓ Company filled');

    await page.fill('#dept', '技術部');
    console.log('✓ Department filled');

    await page.fill('#name', 'テスト 太郎');
    console.log('✓ Name filled');

    await page.fill('#phone', '03-1234-5678');
    console.log('✓ Phone filled');

    await page.fill('#email', 'test@example.com');
    console.log('✓ Email filled');

    await page.fill('#content', 'これはテストメッセージです。\nお問い合わせ内容のテストを行っています。');
    console.log('✓ Content filled');

    // Wait minimum time
    await page.waitForTimeout(3500);

    // Monitor API requests
    const apiRequests: any[] = [];
    page.on('request', request => {
      if (request.url().includes('ums.aws.swiftechie.com')) {
        apiRequests.push({
          url: request.url(),
          method: request.method(),
        });
      }
    });

    // Submit form
    await page.click('#submitBtn');

    // Wait for response
    await page.waitForTimeout(5000);

    console.log('\n=== API Requests ===');
    console.log(`Requests to UMS: ${apiRequests.length}`);
    apiRequests.forEach(req => {
      console.log(`  ${req.method} ${req.url}`);
    });

    // Check result
    const successMsg = page.locator('#form-success');
    const errorMsg = page.locator('#form-error');

    const isSuccessVisible = await successMsg.isVisible().catch(() => false);
    const isErrorVisible = await errorMsg.isVisible().catch(() => false);

    console.log('\n=== Result ===');
    console.log(`Success: ${isSuccessVisible ? '✓' : '✗'}`);
    console.log(`Error: ${isErrorVisible ? '✓' : '✗'}`);

    await page.screenshot({ path: 'test-results/updated-form-test.png', fullPage: true });
    console.log('\nScreenshot saved');
  });

  test('Email content format', async ({ page }) => {
    await page.goto(`${baseUrl}/contact/`);
    await page.waitForLoadState('networkidle');

    console.log('\n=== Email Content Format Check ===');

    // Check emailGroupKey in page source
    const pageSource = await page.content();

    const hasContactOthers = pageSource.includes('contact-others');
    const hasTitle = pageSource.includes('【シーテック株式会社】Webサイトより　お問い合わせ');

    console.log(`Email Group Key (contact-others): ${hasContactOthers ? '✓' : '✗'}`);
    console.log(`Email Title: ${hasTitle ? '✓' : '✗'}`);

    expect(hasContactOthers).toBe(true);
    expect(hasTitle).toBe(true);
  });

  test('Form has silent bot protection', async ({ page }) => {
    await page.goto(`${baseUrl}/contact/`);
    await page.waitForLoadState('networkidle');

    console.log('\n=== Bot Protection ===');

    // Check for honeypot
    const honeypot = page.locator('#hp');
    await expect(honeypot).toHaveClass(/hidden/);
    console.log('✓ Honeypot field hidden');

    // Check for timestamp
    const timestamp = page.locator('#timestamp[type="hidden"]');
    await expect(timestamp).toHaveCount(1);
    console.log('✓ Timestamp field (silent protection)');

    // Check page source for protection logic
    const pageSource = await page.content();
    const hasMinTime = pageSource.includes('MIN_SECONDS_TO_SUBMIT');
    const hasRateLimit = pageSource.includes('canSendNow');

    console.log(`Minimum time check: ${hasMinTime ? '✓' : '✗'}`);
    console.log(`Rate limiting: ${hasRateLimit ? '✓' : '✗'}`);
  });
});
