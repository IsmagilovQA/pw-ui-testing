import { Page } from "@playwright/test";


export class FormLayoutsPage {

    readonly page: Page

    constructor(page: Page) {
        this.page = page
    }


    /**
     * This method fill out The Grid form with user credentials
     * @param email - user email
     * @param password - user password
     * @param optionText - radio button
     */
    async submitUsingTheGridFormWith(email: string, password: string, optionText: string) {
        const gridForm = this.page.locator('nb-card', { hasText: 'Using the Grid' })
        await gridForm.getByRole('textbox', { name: 'Email' }).fill(email)
        await gridForm.getByRole('textbox', { name: 'Password' }).fill(password)
        await gridForm.getByRole('radio', { name: optionText }).check({ force: true })
        await gridForm.getByRole('button', { name: 'Sign in' }).click()
    }

    /**
     * This method fill out the Inline form with user details
     * @param name - should be first and last name
     * @param email - email
     * @param rememberMe - checkbox
     */
    async submitInlineFormWith(name: string, email: string, rememberMe: boolean) {
        const inlineForm = this.page.locator('nb-card', { hasText: 'Inline form' })
        await inlineForm.getByRole('textbox', { name: 'Jane Doe' }).fill(name)
        await inlineForm.getByRole('textbox', { name: 'Email' }).fill(email)
        if (rememberMe)
            await inlineForm.getByRole('checkbox').check({ force: true })
        await inlineForm.getByRole('button', { name: 'Submit' }).click()
    }



}