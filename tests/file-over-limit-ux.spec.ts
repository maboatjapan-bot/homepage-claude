import { test, expect } from '@playwright/test';

test.describe('File Upload UX - Over Limit Handling', () => {
  const baseUrl = 'http://localhost:4323';

  test.beforeAll(async () => {
    await new Promise(resolve => setTimeout(resolve, 2000));
  });

  test('When selecting 4 files, all files are shown with error message', async ({ page }) => {
    await page.goto(`${baseUrl}/contact/`);
    await page.waitForLoadState('networkidle');

    console.log('\n=== Selecting 4 Files ===');

    // Upload 4 files (over limit)
    const fileInput = page.locator('#attachments');
    const files = [
      { name: 'file1.pdf', mimeType: 'application/pdf', buffer: Buffer.from('content 1') },
      { name: 'file2.jpg', mimeType: 'image/jpeg', buffer: Buffer.from('content 2') },
      { name: 'file3.png', mimeType: 'image/png', buffer: Buffer.from('content 3') },
      { name: 'file4.pdf', mimeType: 'application/pdf', buffer: Buffer.from('content 4') },
    ];

    await fileInput.setInputFiles(files);
    await page.waitForTimeout(500);

    // Check if all 4 files are shown
    const fileCount = await page.locator('#fileList li').count();
    console.log(`Files shown: ${fileCount}`);

    expect(fileCount).toBe(4);
    console.log('✓ All 4 files are visible in the list');

    // Check if error message is shown
    const statusEl = page.locator('#status');
    const statusText = await statusEl.textContent();
    console.log(`Error message: ${statusText}`);

    expect(statusText).toContain('4個のファイルが選択されています');
    expect(statusText).toContain('削除ボタンで');
    console.log('✓ Error message tells user to delete extra files');
  });

  test('User can delete files to get under the limit', async ({ page }) => {
    await page.goto(`${baseUrl}/contact/`);
    await page.waitForLoadState('networkidle');

    console.log('\n=== Delete Files to Meet Limit ===');

    // Upload 4 files
    const fileInput = page.locator('#attachments');
    const files = [
      { name: 'file1.pdf', mimeType: 'application/pdf', buffer: Buffer.from('content 1') },
      { name: 'file2.jpg', mimeType: 'image/jpeg', buffer: Buffer.from('content 2') },
      { name: 'file3.png', mimeType: 'image/png', buffer: Buffer.from('content 3') },
      { name: 'file4.pdf', mimeType: 'application/pdf', buffer: Buffer.from('content 4') },
    ];

    await fileInput.setInputFiles(files);
    await page.waitForTimeout(500);

    let fileCount = await page.locator('#fileList li').count();
    console.log(`Initial files: ${fileCount}`);
    expect(fileCount).toBe(4);

    // Delete 1 file to get to 3 (the limit)
    const deleteButtons = page.locator('.delete-file-btn');
    await deleteButtons.nth(0).click();
    await page.waitForTimeout(300);

    fileCount = await page.locator('#fileList li').count();
    console.log(`After deletion: ${fileCount}`);
    expect(fileCount).toBe(3);

    // Check if error message is gone or updated
    const statusEl = page.locator('#status');
    const statusText = await statusEl.textContent();
    console.log(`Status after deletion: ${statusText}`);

    console.log('✓ User can delete files to meet the limit');
  });

  test('Drag and drop with existing files shows all files', async ({ page }) => {
    await page.goto(`${baseUrl}/contact/`);
    await page.waitForLoadState('networkidle');

    console.log('\n=== Drag and Drop Over Limit ===');

    // First upload 2 files
    const fileInput = page.locator('#attachments');
    const initialFiles = [
      { name: 'existing1.pdf', mimeType: 'application/pdf', buffer: Buffer.from('content 1') },
      { name: 'existing2.jpg', mimeType: 'image/jpeg', buffer: Buffer.from('content 2') },
    ];

    await fileInput.setInputFiles(initialFiles);
    await page.waitForTimeout(500);

    let fileCount = await page.locator('#fileList li').count();
    console.log(`Initial files: ${fileCount}`);
    expect(fileCount).toBe(2);

    // Now drag 2 more files (total would be 4, over limit)
    const dropzone = page.locator('#dropzone');
    const additionalFiles = [
      { name: 'new1.pdf', mimeType: 'application/pdf', buffer: Buffer.from('new content 1') },
      { name: 'new2.jpg', mimeType: 'image/jpeg', buffer: Buffer.from('new content 2') },
    ];

    // Create a DataTransfer object for the files
    await dropzone.evaluate((el, files) => {
      const dataTransfer = new DataTransfer();
      files.forEach(f => {
        const file = new File([f.buffer], f.name, { type: f.mimeType });
        dataTransfer.items.add(file);
      });

      // Create a drop event
      const event = new DragEvent('drop', {
        bubbles: true,
        cancelable: true,
        dataTransfer: dataTransfer
      });

      el.dispatchEvent(event);
    }, additionalFiles);

    await page.waitForTimeout(500);

    fileCount = await page.locator('#fileList li').count();
    console.log(`After adding more files: ${fileCount}`);

    // All 4 files should be shown
    expect(fileCount).toBe(4);

    // Check error message
    const statusEl = page.locator('#status');
    const statusText = await statusEl.textContent();
    console.log(`Status: ${statusText}`);

    expect(statusText).toContain('4個のファイル');
    console.log('✓ Drag and drop shows all files even over limit');
  });

  test('Error message is clear and actionable', async ({ page }) => {
    await page.goto(`${baseUrl}/contact/`);
    await page.waitForLoadState('networkidle');

    console.log('\n=== Error Message Quality ===');

    // Upload 5 files (2 over limit)
    const fileInput = page.locator('#attachments');
    const files = [
      { name: 'one.pdf', mimeType: 'application/pdf', buffer: Buffer.from('1') },
      { name: 'two.jpg', mimeType: 'image/jpeg', buffer: Buffer.from('2') },
      { name: 'three.png', mimeType: 'image/png', buffer: Buffer.from('3') },
      { name: 'four.pdf', mimeType: 'application/pdf', buffer: Buffer.from('4') },
      { name: 'five.jpg', mimeType: 'image/jpeg', buffer: Buffer.from('5') },
    ];

    await fileInput.setInputFiles(files);
    await page.waitForTimeout(500);

    const statusEl = page.locator('#status');
    const statusText = await statusEl.textContent();

    console.log(`Error message: ${statusText}`);

    // Check message quality
    expect(statusText).toContain('5個のファイルが選択されています');
    expect(statusText).toContain('最大3個まで');
    expect(statusText).toContain('削除ボタンで');
    expect(statusText).toContain('2個のファイルを削除してください');

    console.log('✓ Error message clearly states:');
    console.log('  - How many files are selected (5)');
    console.log('  - What the limit is (3)');
    console.log('  - What action to take (delete 2 files)');
  });

  test('Files remain selectable after error is shown', async ({ page }) => {
    await page.goto(`${baseUrl}/contact/`);
    await page.waitForLoadState('networkidle');

    console.log('\n=== Files Remain After Error ===');

    // Upload 4 files
    const fileInput = page.locator('#attachments');
    const files = [
      { name: 'file1.pdf', mimeType: 'application/pdf', buffer: Buffer.from('1') },
      { name: 'file2.jpg', mimeType: 'image/jpeg', buffer: Buffer.from('2') },
      { name: 'file3.png', mimeType: 'image/png', buffer: Buffer.from('3') },
      { name: 'file4.pdf', mimeType: 'application/pdf', buffer: Buffer.from('4') },
    ];

    await fileInput.setInputFiles(files);
    await page.waitForTimeout(500);

    // Check files are still visible
    const fileItems = page.locator('#fileList li');
    const fileCount = await fileItems.count();
    console.log(`Files visible: ${fileCount}`);

    // Check each file has a delete button
    const deleteButtons = page.locator('.delete-file-btn');
    const buttonCount = await deleteButtons.count();

    expect(fileCount).toBe(4);
    expect(buttonCount).toBe(4);

    console.log('✓ Files remain visible and deletable after error');
  });
});
