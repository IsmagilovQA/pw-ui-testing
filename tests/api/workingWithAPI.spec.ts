import { expect, test, request } from '@playwright/test'
import tags from '../../test-data/tags-mock.json'

// let interceptedToken: string;

test.beforeEach(async ({ page }) => {
    // // Mocking API response
    // await page.route('*/**/api/tags', async route => {
    //     await route.fulfill({
    //         body: JSON.stringify(tags)
    //     })
    // })

    // // Modify API response
    // await page.route('*/**/api/articles*', async route => {
    //     const response = await route.fetch()
    //     const responseBody = await response.json()
    //     responseBody.articles[0].title = 'This is modified title from API'
    //     responseBody.articles[0].description = 'This is modified description from API'

    //     await route.fulfill({
    //         body: JSON.stringify(responseBody)
    //     })
    // })

    await page.goto('https://conduit.bondaracademy.com/')

    // Log in via UI
    // await page.getByRole('link', { name: 'Sign in' }).click()
    // await page.getByRole('textbox', { name: 'Email' }).fill('vel.conduit@api.com')
    // await page.getByRole('textbox', { name: 'Password' }).fill('Qwe_1111')
    // await page.getByRole('button', { name: ' Sign in ' }).click()

    // const userResponse = await page.waitForResponse('https://conduit-api.bondaracademy.com/api/users/login')
    // const userResponseBody = await userResponse.json()
    // interceptedToken = userResponseBody.user.token
})

test('mock API test', async ({ page }) => {
    await expect(page.locator('.navbar-brand')).toHaveText('conduit')
    await expect(page.locator('.sidebar')).toContainText('mock')
    await expect(page.locator('app-article-list h1').first()).toContainText('This is modified title from API')
    await expect(page.locator('app-article-list p').first()).toContainText('This is modified description from API')
})

test('Intercept Browser API response', async ({ page, request }) => {
    // Create article via UI
    await page.getByText('New Article').click()
    await page.getByRole('textbox', { name: 'Article Title' }).fill('New article via UI')
    await page.getByRole('textbox', { name: 'What\'s this article about?' }).fill('Title from UI test')
    await page.getByRole('textbox', { name: 'Write your article (in markdown)' }).fill('Description from UI test')
    await page.getByRole('button', { name: 'Publish Article' }).click()

    // Intersect browser API response (after creating article -> intercept POST article response -> save slagId and use it for article deletion via API)
    const articleResponse = await page.waitForResponse('https://conduit-api.bondaracademy.com/api/articles/')
    const articleResponseBody = await articleResponse.json()
    const slugId = articleResponseBody.article.slug

    await expect(page.locator('.article-page h1')).toContainText('New article via UI')

    await page.getByText('Home').click()
    await page.getByText('Global Feed').click()
    await expect(page.locator('app-article-list h1').first()).toContainText('New article via UI')

    // Delete article via API using intercepted response (where we extract and save slugId)
    const deleteArticleResponse = await request.delete(`https://conduit-api.bondaracademy.com/api/articles/${slugId}`)
    expect(deleteArticleResponse.status()).toEqual(204)
})