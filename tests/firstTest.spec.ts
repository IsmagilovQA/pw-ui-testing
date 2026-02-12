import { test } from '@playwright/test'


test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:4200/')
    await page.getByText('Forms').click()
    await page.getByText('Form Layouts').click()
})


test('Locator syntax rules', async ({ page }) => {
    // By tag name
    page.locator('input')

    // By id
    page.locator('#inputEmail1')

    // Buy Class value
    page.locator('.shape-rectangle')

    // By attribute
    page.locator('[placeholder="Email"]')

    // By Class value (full) as attribute
    page.locator('[class="input-full-width size-medium status-basic shape-rectangle nb-transition"]')

    // Combinations
    page.locator('input[placeholder="Email"].shape-rectangle')

    // By XPAth (NOT RECOMMENDED)
    page.locator('//*[id="inputEmail1"]')

    // By partial text match
    page.locator(':text("Partial text here")')

    // By exact text match
    page.locator(':text-is("Exact full text here")')

})