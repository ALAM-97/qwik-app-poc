import { component$, Slot, useContextProvider, useSignal } from '@builder.io/qwik'
import type { RequestHandler } from '@builder.io/qwik-city'
import type { Person } from '~/types'
import { SessionContext, UserContext } from '~/contexts'
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
  const sessionToken = useSignal<string | null>(null)

  const users = useSignal<Array<Person>>([])

  useContextProvider(UserContext, users)
  useContextProvider(SessionContext, sessionToken)
  return (
    <div class="">
      <Slot />
    </div>
  )
})
