import { component$, Slot, useContextProvider, useStore, useVisibleTask$ } from '@builder.io/qwik'
// import type { RequestHandler } from '@builder.io/qwik-city'
import type { LoggedUser } from '~/types'
import { SessionContext } from '~/contexts'
import '../global.css'

// export const onRequest: RequestHandler = async ({ request, next, cookie }) => {
//    // Recupera il token dal cookie
//    const token = cookie.get('AccessToken')?.value

//    if (token) {
//       // Aggiungi l'header Authorization alla richiesta
//       request.headers.set('Authorization', `Bearer ${token}`)
//    }

//    // Passa al prossimo middleware o gestore
//    await next()
// }

export default component$(() => {
   const session = useStore<LoggedUser>({
      token: '',
      user: {
         firstName: '',
         lastName: '',
         email: '',
      },
   })

   // eslint-disable-next-line qwik/no-use-visible-task
   useVisibleTask$(({ track }) => {
      if (typeof window !== 'undefined') {
         const storedSession = localStorage.getItem('session')

         const parsedSession = storedSession && JSON.parse(storedSession)

         if (parsedSession) {
            session.token = parsedSession.token
            session.user.firstName = parsedSession.user.firstName
            session.user.lastName = parsedSession.user.lastName
            session.user.email = parsedSession.user.email
         }
      }

      track(() => session)
   })

   useContextProvider(SessionContext, session)
   return (
      <div class="">
         <Slot />
      </div>
   )
})
