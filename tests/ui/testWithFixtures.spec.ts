import { test } from '../../test-options'
import { faker } from '@faker-js/faker'


test('Parametrized methods', async ({ pageManager }) => {
    const randomFullName = faker.person.fullName()
    const randomEmail = `${randomFullName.replace(' ', '')}${faker.number.int(50)}@test.com`

    await pageManager.onFormLayoursPage.submitUsingTheGridFormWith(process.env.USERNAME, process.env.PASSWORD, 'Option 2')
    await pageManager.onFormLayoursPage.submitInlineFormWith(randomFullName, randomEmail, true)
})
