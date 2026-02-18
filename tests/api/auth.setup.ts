import { test as setup } from '@playwright/test'


const authFile = '.auth/user.json'

setup('authentication', async ({ page }) => {
    // Log in
    await page.goto('https://conduit.bondaracademy.com/')
    await page.getByRole('link', { name: 'Sign in' }).click()
    await page.getByRole('textbox', { name: 'Email' }).fill('vel.conduit@api.com')
    await page.getByRole('textbox', { name: 'Password' }).fill('Qwe_1111')
    await page.getByRole('button', { name: ' Sign in ' }).click()

    // to make sure application is loaded
    await page.waitForResponse('https://conduit-api.bondaracademy.com/api/tags')

    // store state in file
    await page.context().storageState({path: authFile})
})

