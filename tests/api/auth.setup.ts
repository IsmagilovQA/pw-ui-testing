import { test as setup } from '@playwright/test'
import user from '../../.auth/user.json'
import fs from 'fs'


const authFile = '.auth/user.json'

setup('authentication', async ({ request }) => {
    // Log in via API
    const response = await request.post('https://conduit-api.bondaracademy.com/api/users/login', {
        data: {
            "user": {
                "email": "vel.conduit@api.com",
                "password": "Qwe_1111"
            }
        }
    })
    const responseBody = await response.json()
    const accessToken = responseBody.user.token

    // accessToken from our api call save to user file
    user.origins[0].localStorage[0].value = accessToken
    fs.writeFileSync(authFile, JSON.stringify(user))

    // Assign token to process environment variable for using it everywhere in all test where token is needed
    process.env['ACCESS_TOKEN'] = accessToken
})

