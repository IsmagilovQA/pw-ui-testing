import { expect, test } from '@playwright/test'
import { PageManager } from '../../page-objects/pageManager'
import { faker } from '@faker-js/faker'


test.beforeEach(async ({ page }) => {
    await page.goto('/')
})

test('Navigate to form page @smoke @regression', async ({ page }) => {
    const app = new PageManager(page)
    await app.navigateTo.formLayoutsPage()
    await app.navigateTo.datepickerPage()
    await app.navigateTo.smartTablePage()
    await app.navigateTo.toastrPage()
    await app.navigateTo.tooltipPage()
})

test('Parametrized methods @smoke', async ({ page }) => {
    const app = new PageManager(page)
    const randomFullName = faker.person.fullName()
    const randomEmail = `${randomFullName.replace(' ', '')}${faker.number.int(50)}@test.com`

    await app.navigateTo.formLayoutsPage()
    await app.onFormLayoursPage.submitUsingTheGridFormWith(process.env.USERNAME, process.env.PASSWORD, 'Option 2')

    await page.screenshot({path: 'screenshots/formlayoutsPage.png'})
    
    // save screenshot as binary to sending somewhere
    const buffer = await page.screenshot()
    console.log(buffer.toString('base64'))

    await app.onFormLayoursPage.submitInlineFormWith(randomFullName, randomEmail, true)

    await page.locator('nb-card', {hasText: 'Inline form'}).screenshot({path: 'screenshots/inlineForm.png'})

    await app.navigateTo.datepickerPage()
    await app.onDatepickerPage.selectDateWithOffset(10)
    await app.onDatepickerPage.selectDateWithRange(5, 25)

    await app.onDatepickerPage.waitForNumberOfSeconds(2)
})

// npm run pageObjects-chrome
// "pageObjects-all": "npm run pageObjects-chrome && npm run pageObjects-firefox" - sequential
// "pageObjects-all": "npm run pageObjects-chrome & npm run pageObjects-firefox" - parallel

// Run by tag:  npx playwright test --project=chromium --grep @smoke
// Run by tags:  npx playwright test --project=chromium --grep "@smoke|@functional"