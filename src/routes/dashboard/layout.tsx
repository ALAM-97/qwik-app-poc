import { component$, Slot, useContext, useTask$, useVisibleTask$ } from '@builder.io/qwik'
import type { RequestHandler } from '@builder.io/qwik-city'
import Navbar from '~/components/navbar'
import Unauthorized from '~/components/unauthorized'
import { SessionContext } from '~/contexts'

export const onGet: RequestHandler = async ({ cacheControl }) => {
  // Control caching for this request for best performance and to reduce hosting costs:
  // https://qwik.dev/docs/caching/
  cacheControl({
    // Always serve a cached response by default, up to a week stale
    staleWhileRevalidate: 60 * 60 * 24 * 7,
    // Max once every 5 seconds, revalidate on the server to get a fresh version of this page
    maxAge: 5,
  })
}

export default component$(() => {
  const session = useContext(SessionContext)

  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(({ track }) => {
    if (typeof window !== 'undefined') {
      const storedSession = sessionStorage.getItem('session')
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

  return (
    <>
      {session.token ? (
        <>
          <Navbar />
          <div class="p-10">
            <Slot />
          </div>
        </>
      ) : (
        <div class="flex min-h-screen items-center justify-center">
          <Unauthorized />
        </div>
      )}
    </>
  )
})
