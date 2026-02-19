import { expect, test } from '@playwright/test'


test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:4200/')
})


test.describe.only('Form layouts page', () => {
    test.describe.configure({ retries: 2 }) // set retries on test or describle level
    test.beforeEach(async ({ page }) => {
        await page.getByText('Forms').click()
        await page.getByText('Form Layouts').click()
    })

    test('Input fields', async ({ page, testInfo }) => {
        if (testInfo.retry) {
            // some ,logic here that can be done before retry (for ex. clean up smth before retry)
        }

        const gridEmailInput = page.locator('nb-card', { hasText: 'Using the Grid' }).getByRole('textbox', { name: 'Email' })
        await gridEmailInput.fill('test@test.com')
        await gridEmailInput.clear()
        await gridEmailInput.pressSequentially('test2@test.com', { delay: 500 })

        // generic assertion
        const inputValue = await gridEmailInput.inputValue()
        expect(inputValue).toEqual('test2@test.com1')

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

test('Lists and Dropdowns', async ({ page }) => {
    await page.getByRole('button', { name: 'Light' }).click()
    const dropdownMenu = page.locator('ngx-header nb-select')
    await dropdownMenu.click()

    page.getByRole('list') // when the list has a UL tag
    page.getByRole('listitem') // when list has a LI tag
    //const optionList = page.getByRole('list').locator('nb-option')
    const optionList = page.locator('nb-option-list nb-option')
    await expect(optionList).toHaveText(['Light', 'Dark', 'Cosmic', 'Corporate'])

    await optionList.filter({ hasText: 'Cosmic' }).click()
    const header = page.locator('nb-layout-header')
    await expect(header).toHaveCSS('background-color', 'rgb(50, 50, 89)')

    // Validate each color for each item
    const colors = {
        "Light": "rgb(255, 255, 255)",
        "Dark": "rgb(34, 43, 69)",
        "Cosmic": "rgb(50, 50, 89)",
        "Corporate": "rgb(255, 255, 255)"
    }

    for (const color in colors) {
        await dropdownMenu.click()
        await optionList.filter({ hasText: color }).click()
        await expect(header).toHaveCSS('background-color', colors[color])
    }
})

test('Tooltips', async ({ page }) => {
    await page.getByText('Modal & Overlays').click()
    await page.getByText('Tooltip').click()

    // to freeze the DOM (for catching and inspecting tooltip element) -> press 'COMMAND + \' on Sources tab (devtools)

    const tooltipCard = page.locator('nb-card', { hasText: 'Tooltip Placements' })
    const topButton = await tooltipCard.getByRole('button', { name: 'Top' }).hover()
    //page.getByRole('tooltip') // wll work only if you have a role tooltip created
    const tooltip = await page.locator('nb-tooltip').textContent()
    expect(tooltip).toEqual('This is a tooltip')
})

test('Dialog boxes', async ({ page }) => {
    await page.getByText('Tables & Data').click()
    await page.getByText('Smart Table').click()

    // 1st type: Web dialog box 
    // -> no special things, it's a part of DOM so interact as usual.

    // 2nd type: Browser tialog box:
    // await page.locator('tbody tr', {hasText: 'mdo@gmail.com'}).locator('.nb-trash').click()
    // create a listener for browser dialog:
    page.on('dialog', dialog => {
        expect(dialog.message()).toEqual('Are you sure you want to delete?')
        dialog.accept()
    })
    await page.getByRole('table').locator('tr', { hasText: 'mdo@gmail.com' }).locator('.nb-trash').click()
    // await expect(page.getByRole('table').locator('tr', { hasText: 'mdo@gmail.com' })).not.toBeVisible()
    await expect(page.locator('tbody tr').first()).not.toHaveText('mdo@gmail.com')
})

test('Web tables', async ({ page }) => {
    await page.getByText('Tables & Data').click()
    await page.getByText('Smart Table').click()

    // 1 case: Get row by any text in this row
    const targetRow = page.getByRole('row', { name: 'twitter@outlook.com' }) // can be used if it's unique info. Note: we can use email here till it's a text (before edit mode). In edit mode this field becomes as input and we can't use it later as locator in edit mode
    await targetRow.locator('.nb-edit').click()
    await page.locator('input-editor').getByPlaceholder('Age').clear()
    await page.locator('input-editor').getByPlaceholder('Age').fill('100')
    await page.locator('.nb-checkmark').click()

    // 2 case: Get the row based on the value in the specific column (ex. ID column)
    // await page.locator('.ng2-smart-pagination-nav', { hasText: '2' }).click()
    await page.locator('.ng2-smart-pagination-nav').getByText('2').click()
    const targetRowById = page.getByRole('row', { name: '11' }).filter({ has: page.locator('td').nth(1).getByText('11') }) // in case 11 info not unique, then we can filter out it
    await targetRowById.locator('.nb-edit').click()
    await page.locator('input-editor').getByPlaceholder('E-mail').clear()
    await page.locator('input-editor').getByPlaceholder('E-mail').fill('test@test.com')
    await page.locator('.nb-checkmark').click()
    await expect(targetRowById.locator('td').nth(5)).toHaveText('test@test.com')

    // 2 case: Test filter of the table
    // Loop through tables rows with validations. Searching by age = 20 -> validate result in table that all rows have only 20 as age
    const ages = ['20', '30', '40', '200']

    for (let age of ages) {
        await page.locator('input-filter').getByPlaceholder('Age').clear()
        await page.locator('input-filter').getByPlaceholder('Age').fill(age)
        await page.waitForTimeout(500)
        const ageRows = page.locator('tbody tr')

        for (let row of await ageRows.all()) {
            const cellValue = await row.locator('td').last().textContent()
            if (age == '200') {
                expect(await page.getByRole('table').textContent()).toContain('No data found')
            } else {
                expect(cellValue).toEqual(age)
            }
        }
    }
})

test('Date pickers', async ({ page }) => {
    await page.getByText('Forms').click()
    await page.getByText('Datepicker').click()

    // const datePickerForm = page.locator('nb-card', {hasText: 'Common Datepicker'})
    // await datePickerForm.getByRole('textbox').click()

    // const calendarInputField = page.getByPlaceholder('Form Picker')
    // await calendarInputField.click()

    // await page.locator('[class="day-cell ng-star-inserted"]').getByText('1', {exact: true}).click()
    // await expect(calendarInputField).toHaveValue('Feb 1, 2026')



    // More smart and flaxible approach based on current day and handling next month switch
    const calendarInputField = page.getByPlaceholder('Form Picker')
    await calendarInputField.click()

    let date = new Date()
    date.setDate(date.getDate() + 7) // current date + ofset
    const expectedDate = date.getDate().toString()
    const expectedMonthShort = date.toLocaleString('En-US', { month: 'short' })
    const expectedMonthLong = date.toLocaleString('En-US', { month: 'long' })
    const expectedYear = date.getFullYear()
    const dateToAssert = `${expectedMonthShort} ${expectedDate}, ${expectedYear}`

    let calendarMonthAndYear = await page.locator('nb-calendar-view-mode').textContent()
    const expectedMonthAndYear = `${expectedMonthLong} ${expectedYear}`
    while (!calendarMonthAndYear.includes(expectedMonthAndYear)) {
        await page.locator('nb-calendar-pageable-navigation [data-name="chevron-right"]').click()
        calendarMonthAndYear = await page.locator('nb-calendar-view-mode').textContent()
    }

    await page.locator('[class="day-cell ng-star-inserted"]').getByText(expectedDate, { exact: true }).click()
    await expect(calendarInputField).toHaveValue(dateToAssert)
})

test('Sliders', async ({ page }) => {
    // Option 1: updating slider attribute by executing js code on page
    const tempGauge = page.locator('[tabtitle="Temperature"] ngx-temperature-dragger circle')
    await tempGauge.evaluate(node => {
        node.setAttribute('cx', '232.630')
        node.setAttribute('cy', '232.630')
    })
    await tempGauge.click() // make action to chamge the state and finish evaluation of js event


    // Option 2: to sipulate mouse movement as real user does
    const tempBoxGauge = page.locator('[tabtitle="Temperature"] ngx-temperature-dragger')
    await tempBoxGauge.scrollIntoViewIfNeeded() // will sroll to place our slider fully visible on browser view

    const box = await tempBoxGauge.boundingBox() // to create coordinates axes around bounding box (for our slider element box, ex. element 300x300) starting in top left corner of element
    // starting point in the center of element
    const x = box.x + box.width / 2
    const y = box.y + box.height / 2

    // put mouse on our midlle of element
    await page.mouse.move(x, y)

    // moving mouse
    await page.mouse.down() // pressing the mouse
    await page.mouse.move(x + 100, y)
    await page.mouse.move(x + 100, y + 100)
    await page.mouse.up // releasing the mouse

    await expect(tempBoxGauge).toContainText('30')
})