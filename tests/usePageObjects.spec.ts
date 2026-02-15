import { expect, test } from '@playwright/test'
import { NavigationPage } from '../page-objects/navigationPage'
import { FormLayoutsPage } from '../page-objects/formLayoutsPage'
import { DatePickerPage } from '../page-objects/datepickerPage'


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
    const formLayoutPage = new FormLayoutsPage(page)
    const datePickerPage = new DatePickerPage(page)

    await navigateTo.formLayoutsPage()
    await formLayoutPage.submitUsingTheGridFormWith('test@test.com', 'Pass123', 'Option 2')
    await formLayoutPage.submitInlineFormWith('John Smith', 'John@test.com', true)

    await navigateTo.datepickerPage()
    await datePickerPage.selectDateWithOffset(10)
    await datePickerPage.selectDateWithRange(5, 25)
})