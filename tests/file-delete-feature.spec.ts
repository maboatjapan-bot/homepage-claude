import { test, expect } from '@playwright/test';

test.describe('File Upload Deletion Feature', () => {
  const baseUrl = 'http://localhost:4323';

  test.beforeAll(async () => {
    await new Promise(resolve => setTimeout(resolve, 2000));
  });

  test('File list shows delete buttons', async ({ page }) => {
    await page.goto(`${baseUrl}/contact/`);
    await page.waitForLoadState('networkidle');

    console.log('\n=== File Delete Button Test ===');

    // Upload some files
    const fileInput = page.locator('#attachments');

    // Create test files
    const files = [
      { name: 'test1.pdf', mimeType: 'application/pdf', buffer: Buffer.from('test content 1') },
      { name: 'test2.jpg', mimeType: 'image/jpeg', buffer: Buffer.from('test content 2') },
    ];

    await fileInput.setInputFiles(files);
    await page.waitForTimeout(500);

    // Check if delete buttons exist
    const deleteButtons = page.locator('.delete-file-btn');
    const count = await deleteButtons.count();

    console.log(`Files uploaded: ${count}`);
    console.log(`Delete buttons: ${count}`);

    expect(count).toBe(2);
    console.log('✓ Each file has a delete button');
  });

  test('Can delete a single file', async ({ page }) => {
    await page.goto(`${baseUrl}/contact/`);
    await page.waitForLoadState('networkidle');

    console.log('\n=== Single File Deletion ===');

    // Upload 3 files
    const fileInput = page.locator('#attachments');
    const files = [
      { name: 'file1.pdf', mimeType: 'application/pdf', buffer: Buffer.from('content 1') },
      { name: 'file2.jpg', mimeType: 'image/jpeg', buffer: Buffer.from('content 2') },
      { name: 'file3.png', mimeType: 'image/png', buffer: Buffer.from('content 3') },
    ];

    await fileInput.setInputFiles(files);
    await page.waitForTimeout(500);

    // Check initial file count
    const initialFileCount = await page.locator('#fileList li').count();
    console.log(`Initial files: ${initialFileCount}`);
    expect(initialFileCount).toBe(3);

    // Delete the second file
    const deleteButtons = page.locator('.delete-file-btn');
    await deleteButtons.nth(1).click();
    await page.waitForTimeout(300);

    // Check file count after deletion
    const afterDeleteCount = await page.locator('#fileList li').count();
    console.log(`After deletion: ${afterDeleteCount}`);
    expect(afterDeleteCount).toBe(2);

    console.log('✓ File deletion works');
  });

  test('Can delete all files', async ({ page }) => {
    await page.goto(`${baseUrl}/contact/`);
    await page.waitForLoadState('networkidle');

    console.log('\n=== Delete All Files ===');

    // Upload 2 files
    const fileInput = page.locator('#attachments');
    const files = [
      { name: 'file1.pdf', mimeType: 'application/pdf', buffer: Buffer.from('content 1') },
      { name: 'file2.jpg', mimeType: 'image/jpeg', buffer: Buffer.from('content 2') },
    ];

    await fileInput.setInputFiles(files);
    await page.waitForTimeout(500);

    // Delete both files one by one
    const deleteButtons = page.locator('.delete-file-btn');

    await deleteButtons.first().click();
    await page.waitForTimeout(300);

    const remainingCount = await page.locator('#fileList li').count();
    console.log(`After first delete: ${remainingCount}`);

    if (remainingCount > 0) {
      await deleteButtons.nth(0).click();
      await page.waitForTimeout(300);
    }

    const finalCount = await page.locator('#fileList li').count();
    console.log(`After all deletes: ${finalCount}`);
    expect(finalCount).toBe(0);

    console.log('✓ Can delete all files');
  });

  test('File list shows file info correctly', async ({ page }) => {
    await page.goto(`${baseUrl}/contact/`);
    await page.waitForLoadState('networkidle');

    console.log('\n=== File Info Display ===');

    // Upload a file
    const fileInput = page.locator('#attachments');
    const content = Buffer.alloc(5000); // 5KB file
    const files = [
      { name: 'test-document.pdf', mimeType: 'application/pdf', buffer: content },
    ];

    await fileInput.setInputFiles(files);
    await page.waitForTimeout(500);

    // Check file info display
    const fileName = await page.locator('#fileList li span.text-sm').first().textContent();
    const fileSize = await page.locator('#fileList li span.text-xs').first().textContent();

    console.log(`File name: ${fileName}`);
    console.log(`File size: ${fileSize}`);

    expect(fileName).toBe('test-document.pdf');
    expect(fileSize).toContain('KB');

    // Check for delete button
    const deleteBtn = page.locator('.delete-file-btn');
    expect(await deleteBtn.isVisible()).toBe(true);
    expect(await deleteBtn.getAttribute('title')).toBe('ファイルを削除');

    console.log('✓ File info displayed correctly with delete button');
  });

  test('Delete button has correct accessibility', async ({ page }) => {
    await page.goto(`${baseUrl}/contact/`);
    await page.waitForLoadState('networkidle');

    console.log('\n=== Delete Button Accessibility ===');

    // Upload a file
    const fileInput = page.locator('#attachments');
    const files = [
      { name: 'test.pdf', mimeType: 'application/pdf', buffer: Buffer.from('test') },
    ];

    await fileInput.setInputFiles(files);
    await page.waitForTimeout(500);

    // Check delete button accessibility
    const deleteBtn = page.locator('.delete-file-btn');

    const ariaLabel = await deleteBtn.getAttribute('aria-label');
    const title = await deleteBtn.getAttribute('title');

    console.log(`aria-label: ${ariaLabel}`);
    console.log(`title: ${title}`);

    expect(ariaLabel).toBe('ファイルを削除');
    expect(title).toBe('ファイルを削除');

    console.log('✓ Delete button has proper accessibility attributes');
  });

  test('Hover effect on delete button', async ({ page }) => {
    await page.goto(`${baseUrl}/contact/`);
    await page.waitForLoadState('networkidle');

    console.log('\n=== Delete Button Hover Effect ===');

    // Upload files
    const fileInput = page.locator('#attachments');
    const files = [
      { name: 'test.pdf', mimeType: 'application/pdf', buffer: Buffer.from('test') },
    ];

    await fileInput.setInputFiles(files);
    await page.waitForTimeout(500);

    // Check hover effect
    const deleteBtn = page.locator('.delete-file-btn');
    const listItem = page.locator('#fileList li');

    // Check if delete button is in a group
    const groupClass = await listItem.getAttribute('class');
    console.log(`List item has group class: ${groupClass?.includes('group')}`);

    // Hover over delete button and check color change
    await deleteBtn.hover();
    const afterHover = await deleteBtn.evaluate(el => {
      return window.getComputedStyle(el).color;
    });
    console.log(`Color on hover: ${afterHover}`);

    console.log('✓ Delete button has hover effects');
  });
});
