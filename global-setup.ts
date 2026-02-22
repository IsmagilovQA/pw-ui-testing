import { request, expect } from "@playwright/test"
import user from './.auth/user.json'
import fs from 'fs'


async function globalSetup() {
    const authFile = '.auth/user.json'
    const context = await request.newContext()

    // Log in via API
    const responseToken = await context.post('https://conduit-api.bondaracademy.com/api/users/login', {
        data: {
            "user": {
                "email": "vel.conduit@api.com",
                "password": "Qwe_1111"
            }
        }
    })
    const responseBody = await responseToken.json()
    const accessToken = responseBody.user.token
    user.origins[0].localStorage[0].value = accessToken
    fs.writeFileSync(authFile, JSON.stringify(user))
    process.env['ACCESS_TOKEN'] = accessToken

    // Create article via API
    const articleResponse = await context.post('https://conduit-api.bondaracademy.com/api/articles/', {
        data: {
            "article": { "title": "Global likes test article title", "description": "Short description about article", "body": "Full text of article is here", "tagList": [] }
        },
        headers: {
            Authorization: `Token ${process.env.ACCESS_TOKEN}`
        }
    })
    expect(articleResponse.status()).toEqual(201)
    const response = await articleResponse.json()
    const slugId = response.article.slug
    process.env['SLUGID'] = slugId
}

export default globalSetup;