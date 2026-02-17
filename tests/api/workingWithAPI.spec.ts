import { expect, test } from '@playwright/test'
import tags from '../../test-data/tags-mock.json'


test.beforeEach(async ({ page }) => {
    // Mocking API response
    await page.route('*/**/api/tags', async route => {
        await route.fulfill({
            body: JSON.stringify(tags)
        })
    })

    // Modify API response
    await page.route('*/**/api/articles*', async route => {
        const response = await route.fetch()
        const responseBody = await response.json()
        responseBody.articles[0].title = 'This is modified title from API'
        responseBody.articles[0].description = 'This is modified description from API'

        await route.fulfill({
            body: JSON.stringify(responseBody)
        })
    })

    await page.goto('https://conduit.bondaracademy.com/')
})

test('mock API test', async ({ page }) => {
    await expect(page.locator('.navbar-brand')).toHaveText('conduit')
    await expect(page.locator('.sidebar')).toContainText('mock')
    await expect(page.locator('app-article-list h1').first()).toContainText('This is modified title from API')
    await expect(page.locator('app-article-list p').first()).toContainText('This is modified description from API')
})