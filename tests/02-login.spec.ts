import { test, expect } from '@playwright/test';
import path from 'path';
test('Top-Down STUB: Login REAL -> Inventory REAL -> card.html STUB', async ({ page }) => {

    // =====================================================
    // REAL A : Login จริง
    // =====================================================
    await page.goto('/');

    await page.locator('#user-name')
        .fill('standard_user');

    await page.locator('#password')
        .fill('secret_sauce');

    // รอ navigation หลังจาก login
    await Promise.all([
        page.waitForURL(/inventory\.html/),
        page.locator('#login-button').click(),
    ]);

    console.log('Current URL:', page.url());


    // =====================================================
    // REAL B : Inventory จริง
    // =====================================================
    await expect(
        page.locator('.inventory_list')
    ).toBeVisible();


    // =====================================================
    // DRIVER : เรียก card.html
    // =====================================================
    await page.goto(`file://${path.resolve('card.html')}`);

    // =====================================================
    // STUB C : card.html
    // =====================================================
    await expect(
        page.locator('#cart')
    ).toBeVisible();

    await expect(
        page.locator('#cart')
    ).toContainText('Shopping Cart Stub');


    // =====================================================
    // Assert : ตรวจสอบชื่อและนามสกุล
    // =====================================================
    await expect(
        page.locator('#student')
    ).toContainText('ศิริโชค');

    await expect(
        page.locator('#student')
    ).toContainText('ใจมะโน');

});