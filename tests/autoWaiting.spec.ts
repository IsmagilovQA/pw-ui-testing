import { expect, test } from '@playwright/test'


test.beforeEach(async ({ page }) => {
    await page.goto('http://uitestingplayground.com/ajax')
    await page.getByText('Button Triggering AJAX Request').click()
})


test('Auto-waiting', async ({ page }) => {
    const successButton = page.locator('.bg-success')

    // Case 1
    await successButton.click() // wait of element up to 30 sec by default. In pw config you can change it -> timeout: 10000

    // Case 2
    const text = await successButton.textContent() // also will wait up to 30 sec by default
    expect(text).toEqual('Data loaded with AJAX get request.')

    // Case 3
    // So we can do like this for waiting:
    await successButton.waitFor({ state: 'attached' }) // will wait to attached state 
    const text2 = await successButton.allTextContents() // it won't wait without previous waitFor code
    expect(text2).toContain('Data loaded with AJAX get request.')

    // Case 4 with locator assertions
    await expect(successButton).toHaveText('Data loaded with AJAX get request.', { timeout: 20000 }) // will wait only up to 5 sec by default if not use additionaly {timeout: 20000} as param
})


test('Alternative waits', async ({ page }) => {
    const successButton = page.locator('.bg-success')

    //___wait for element___
    // await page.waitForSelector('.bg-success') // will wait up to 30 sec by default

    //___wait for particular response___
    // await page.waitForResponse('http://uitestingplayground.com/ajaxdata')

    //___wait for network calls to be completed (NOT RECOMMENDED)
    // await page.waitForLoadState('networkidle')

    //___wait for timeout (HARD CODED option)
    // await page.waitForTimeout(7000)

    // await page.waitForURL('url')

    // await page.waitForEvent('download')

    // await page.waitForFunction('')

    // await page.waitForRequest('')

    const text = await successButton.allTextContents()
    expect(text).toContain('Data loaded with AJAX get request.')
})

/**
 * https://playwright.dev/docs/actionability
 * 
// These execute IMMEDIATELY with no waiting
await page.locator('.item').allTextContents(); // ❌ No wait
await page.locator('.item').allInnerTexts();   // ❌ No wait
await page.locator('.item').count();            // ❌ No wait
await page.evaluate(() => { ... });             // ❌ No wait
await page.locator('.item').isVisible();        // ❌ No wait (checks current state)
await page.locator('.item').isHidden();         // ❌ No wait
await page.locator('.item').isChecked();        // ❌ No wait
await page.locator('.item').isDisabled();       // ❌ No wait
await page.locator('.item').isEnabled();        // ❌ No wait
await page.locator('.item').isEditable();       // ❌ No wait

// These wait for element to be ATTACHED to DOM, but nothing else
await page.locator('.message').textContent();   // ⚠️ Waits for attached only
await page.locator('.message').innerText();     // ⚠️ Waits for attached only
await page.locator('.message').innerHTML();     // ⚠️ Waits for attached only
await page.locator('.input').inputValue();      // ⚠️ Waits for attached only
await page.locator('.element').getAttribute('class'); // ⚠️ Waits for attached only
 */