import { test as setup, expect } from '@playwright/test'


setup('creare new article as precondition', async ({ request }) => {
    const articleResponse = await request.post('https://conduit-api.bondaracademy.com/api/articles/', {
        data: {
            "article": { "title": "Likes test article title", "description": "Short description about article", "body": "Full text of article is here", "tagList": [] }
        }
    })
    expect(articleResponse.status()).toEqual(201)
    const response = await articleResponse.json()
    const slugId = response.article.slug
    process.env['SLUGID'] = slugId
})