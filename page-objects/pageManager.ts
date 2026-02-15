import { Page } from "@playwright/test";
import { NavigationPage } from '../page-objects/navigationPage'
import { FormLayoutsPage } from '../page-objects/formLayoutsPage'
import { DatePickerPage } from '../page-objects/datepickerPage'


export class PageManager {

    private readonly page: Page
    private readonly navigationPage: NavigationPage
    private readonly formLayoutsPage: FormLayoutsPage
    private readonly datepickerPage: DatePickerPage

    constructor(page: Page) {
        this.page = page
        this.navigationPage = new NavigationPage(this.page)
        this.formLayoutsPage = new FormLayoutsPage(this.page)
        this.datepickerPage = new DatePickerPage(this.page)
    }

    
    get navigateTo() {
        return this.navigationPage
    }

    get onFormLayoursPage() {
        return this.formLayoutsPage
    }

    get onDatepickerPage() {
        return this.datepickerPage
    }

}