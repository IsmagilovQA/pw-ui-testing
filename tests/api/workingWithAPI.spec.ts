import { expect, test } from '@playwright/test'
import tags from '../../test-data/tags-mock.json'


test.beforeEach(async ({ page }) => {
    // Mocking API response
    await page.route('*/**/api/tags', async route => {
        await route.fulfill({
            body: JSON.stringify(tags)
        })
    })

    await page.goto('https://conduit.bondaracademy.com/')
})

test('mock API test', async ({ page }) => {
    await expect(page.locator('.navbar-brand')).toHaveText('conduit')
    await expect(page.locator('.sidebar')).toContainText('mock')
})