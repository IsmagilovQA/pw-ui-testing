import { expect, test } from '@playwright/test'
import { NavigationPage } from '../page-objects/navigationPage'
import { FormLayoutsPage } from '../page-objects/formLayoutsPage'


test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:4200/')
})

test('Navigate to form page', async ({ page }) => {
    const navigateTo = new NavigationPage(page)
    await navigateTo.formLayoutsPage()
    await navigateTo.datepickerPage()
    await navigateTo.smartTablePage()
    await navigateTo.toastrPage()
    await navigateTo.tooltipPage()
})

test('Parametrized methods', async ({ page }) => {
    const navigateTo = new NavigationPage(page)
    const formLayout = new FormLayoutsPage(page)

    await navigateTo.formLayoutsPage()
    await formLayout.submitUsingTheGridFormWith('test@test.com', 'Pass123', 'Option 2')
    await formLayout.submitInlineFormWith('John Smith', 'John@test.com', true)
})