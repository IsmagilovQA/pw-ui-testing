import { test as setup } from '@playwright/test'
import fs from 'fs'
import path from 'path'


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

    // Create the user authentication object
    const user = {
        cookies: [],
        origins: [
            {
                origin: 'https://conduit.bondaracademy.com',
                localStorage: [
                    {
                        name: 'jwtToken',
                        value: accessToken
                    }
                ]
            }
        ]
    }

    // Ensure .auth directory exists
    const authDir = path.dirname(authFile)
    if (!fs.existsSync(authDir)) {
        fs.mkdirSync(authDir, { recursive: true })
    }

    // Save accessToken to user file
    fs.writeFileSync(authFile, JSON.stringify(user))

    // Assign token to process environment variable for using it everywhere in all test where token is needed
    process.env['ACCESS_TOKEN'] = accessToken
})

