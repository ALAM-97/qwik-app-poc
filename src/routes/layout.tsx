import { component$, Slot, useContextProvider, useStore, useTask$ } from '@builder.io/qwik'
import type { RequestHandler } from '@builder.io/qwik-city'
import type { LoggedUser } from '~/types'
import { SessionContext } from '~/contexts'
import '../global.css'

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
  const session = useStore<LoggedUser>({
    token: '',
    user: {
      firstName: '',
      lastName: '',
      email: '',
    },
  })

  useContextProvider(SessionContext, session)
  return (
    <div class="">
      <Slot />
    </div>
  )
})
