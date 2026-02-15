import { Page } from "@playwright/test";


export class HelperBase {

    readonly page: Page

    constructor(page: Page) {
        this.page = page
    }

    /**
     * Helper method that is available across all app
     * @param timeInSec 
     */
    async waitForNumberOfSeconds(timeInSec: number) {
        await this.page.waitForTimeout(timeInSec * 1000)
    }

}