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


test('User-facing locators', async ({ page }) => {
    await page.getByRole('textbox', { name: "Email" }).first().click()
    await page.getByRole('button', { name: "Sign in" }).first().click()
    await page.getByLabel('Email').first().click()
    await page.getByPlaceholder('Jane Doe').click()
    await page.getByText('Using the Grid').click()
    await page.getByTitle('IoT Dashboard').click()
    await page.getByTestId('directions').click() // data-testid="directions"
})


test('Locating child elements', async ({ page }) => {
    await page.locator('nb-card nb-radio :text-is("Option 1")').click()
    await page.locator('nb-card').locator('nb-radio').locator(':text-is("Option 2")').click()
    await page.locator('nb-card').getByRole('button', { name: "Sign in" }).first().click()
    await page.locator('nb-card').nth(3).getByRole('button').click() // by index try to avoid this approach
})


test('Locating parent elements', async ({ page }) => {
    await page.locator('nb-card', { hasText: "Using the Grid" }).getByRole('textbox', { name: "Email" }).click() // find parent element by text from child element

    await page.locator('nb-card', { has: page.locator('#inputEmail1') }).getByRole('textbox', { name: "Email" }).click() // find parent element by unique locator from any child element

    await page.locator('nb-card').filter({ hasText: "Basic form" }).getByRole('textbox', { name: "Email" }).click() // find parent element by filtering from any child element

    await page.locator('nb-card').filter({ has: page.locator('.status-danger') }).getByRole('textbox', { name: "Password" }).click() // find parent element by filtering using unique element inside parent of any child

    await page.locator('nb-card')
        .filter({ hasText: 'text in column 1' })
        .filter({ has: page.getByRole('button', { name: 'column 2 button' }) })
        .click() // chaining several filters

    await page.locator('nb-card')
        .filter({ has: page.locator('.custom-checkbox') })
        .filter({ hasText: "Sign in" })
        .getByRole('textbox', { name: "Email" })
        .click() // chaining several filters

    await page.locator(':text-is("Using the Grid")').locator('..').getByRole('textbox', { name: "Email" }).click() // when you want to go one level up from child to parent using XPath
})