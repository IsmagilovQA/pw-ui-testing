import { expect, test } from '@playwright/test'



test('Drag and drop in iframe', async ({ page }) => {
    await page.goto('https://www.globalsqa.com/demo-site/draganddrop/')

    // 1st option
    const iframe = page.frameLocator('[rel-title="Photo Manager"] iframe')
    const trash = iframe.locator('#trash')
    await iframe.locator('li', { hasText: 'High Tatras 2' }).dragTo(trash)

    // 2nd option (more precise control)
    await iframe.locator('li', { hasText: 'High Tatras 4' }).hover()
    await page.mouse.down()
    await trash.hover()
    await page.mouse.up()

    await expect(iframe.locator('#trash li h5')).toHaveText(['High Tatras 2', 'High Tatras 4'])
})