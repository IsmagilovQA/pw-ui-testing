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

    test('Radio buttons', async ({ page }) => {
        const gridForm = page.locator('nb-card', { hasText: 'Using the Grid' })

        // Option 1
        // await gridForm.getByLabel('Option 1').check({force: true}) // forse is here because input with radio button is hidden in DOM by class 'visually-hidden'
        // Option 2
        // await gridForm.getByRole('radio', { name: 'Option 1' }).check({ force: true })
        // Option 3
        // await gridForm.locator('label', { hasText: 'Option 2' }).click()


        await gridForm.getByRole('radio', { name: 'Option 1' }).check({ force: true })
        // generic asserion
        const radioStatus = await gridForm.getByRole('radio', { name: 'Option 1' }).isChecked() // returns boolean
        expect(radioStatus).toBeTruthy()
        // locator assertion
        await expect(gridForm.getByRole('radio', { name: 'Option 1' })).toBeChecked()


        await gridForm.getByLabel('Option 2').check({ force: true })
        expect(await gridForm.getByRole('radio', { name: 'Option 1' }).isChecked()).toBeFalsy()
        expect(await gridForm.getByRole('radio', { name: 'Option 2' }).isChecked()).toBeTruthy()
    })
})


test('Checkboxes', async ({ page }) => {
    await page.getByText('Modal & Overlays').click()
    await page.getByText('Toastr').click()

    // Option 1
    await page.getByRole('checkbox', { name: 'Hide on click' }).click({ force: true }) // forse here becuse class inside input has 'visually-hidden'. Method click() doesn't check the state of checkbox, so it will clicks always
    // Option 2
    await page.getByRole('checkbox', { name: 'Prevent arising of duplicate toast' }).check({ force: true }) // with .check() will check the state of checkox, if the checkbox was already checked - this method won't change to unchecked state
    await page.getByRole('checkbox', { name: 'Hide on click' }).uncheck({ force: true })


    await page.getByRole('checkbox', { name: 'Prevent arising of duplicate toast' }).check({ force: true })


    // Check/Uncheck all checkboxes
    const allBoxes = page.getByRole('checkbox');
    for (const box of await allBoxes.all()) { // .all() array of locators
        await box.uncheck({ force: true })
        expect(await box.isChecked()).toBeFalsy()
    }
})