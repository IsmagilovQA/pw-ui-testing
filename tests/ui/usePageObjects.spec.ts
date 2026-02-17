import { expect, test } from '@playwright/test'
import { PageManager } from '../../page-objects/pageManager'


test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:4200/')
})

test('Navigate to form page', async ({ page }) => {
    const app = new PageManager(page)
    await app.navigateTo.formLayoutsPage()
    await app.navigateTo.datepickerPage()
    await app.navigateTo.smartTablePage()
    await app.navigateTo.toastrPage()
    await app.navigateTo.tooltipPage()
})

test('Parametrized methods', async ({ page }) => {
    const app = new PageManager(page)
    await app.navigateTo.formLayoutsPage()
    await app.onFormLayoursPage.submitUsingTheGridFormWith('test@test.com', 'Pass123', 'Option 2')
    await app.onFormLayoursPage.submitInlineFormWith('John Smith', 'John@test.com', true)

    await app.navigateTo.datepickerPage()
    await app.onDatepickerPage.selectDateWithOffset(10)
    await app.onDatepickerPage.selectDateWithRange(5, 25)

    await app.onDatepickerPage.waitForNumberOfSeconds(2)
})