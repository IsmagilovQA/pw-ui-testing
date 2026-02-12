import { test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:4200/')
});

test.describe('First test suite', () => {
    test.beforeEach(async ({ page }) => {
        await page.getByText('Forms').click()
    });
    test('The first test', async ({ page }) => {
        await page.getByText('Form Layouts').click()
    });
});


test.describe('Second test suite', () => {
    test.beforeEach(async ({ page }) => {
        await page.getByText('Forms').click()
    });
    test('The second test', async ({ page }) => {
        await page.getByText('Form Layouts').click()
    });
});