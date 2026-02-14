import { expect, test } from '@playwright/test'


test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:4200/')
})


test.describe('Form layouts page', () => {
    test.beforeEach(async ({ page }) => {
        await page.getByText('Forms').click()
        await page.getByText('Form Layouts').click()
    })

    test('Input fields', async ({ page }) => {
        const gridEmailInput = page.locator('nb-card', { hasText: 'Using the Grid' }).getByRole('textbox', { name: 'Email' })
        await gridEmailInput.fill('test@test.com')
        await gridEmailInput.clear()
        await gridEmailInput.pressSequentially('test2@test.com', { delay: 500 })

        // generic assertion
        const inputValue = await gridEmailInput.inputValue()
        expect(inputValue).toEqual('test2@test.com')

        // locator assertion
        await expect(gridEmailInput).toHaveValue('test2@test.com')
    })






})