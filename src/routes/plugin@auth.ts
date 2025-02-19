import type { RequestHandler } from '@builder.io/qwik-city'

export const onRequest: RequestHandler = async ({ request, next }) => {
   const cookie = request.headers.get('Cookie')
   let accessToken = ''

   if (cookie) {
      const cookies = Object.fromEntries(cookie.split('; ').map((c) => c.split('=')))
      accessToken = cookies['.AspNetCore.Identity.Application'] || ''
   }

   if (accessToken) {
      request.headers.set('Authorization', `Bearer ${accessToken}`)
   }

   const response = await next()

   return response
}
