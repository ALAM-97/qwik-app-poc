import { component$, useContext, useResource$, Resource } from '@builder.io/qwik'
import { fetchUsers } from '~/actions/auth'
import Loader from '~/components/loader'
import { SessionContext } from '~/contexts'

const Users = component$(() => {
  const session = useContext(SessionContext)

  // const usersData = useStore<{ users: any[] }>({
  //   users: [],
  // })

  // useTask$(async ({ track }) => {
  //   if (sessionToken.value) {
  //     const response = await fetchUsers(sessionToken.value)
  //     usersData.users = response
  //   }
  //   track(() => sessionToken.value)
  // })

  // eslint-disable-next-line qwik/no-use-visible-task
  // useVisibleTask$(async ({ track }) => {
  //   if (sessionToken.value) {
  //     const response = await fetchUsers(sessionToken.value)
  //     usersData.users = response
  //   }
  //   track(() => sessionToken.value)
  // })

  const usersData = useResource$<any[]>(({ track }) => {
    track(() => session.token)
    if (session.token) {
      return fetchUsers(session.token)
    }
    return []
  })

  return (
    <>
      <h1 class="mb-5 text-3xl font-bold underline">Users</h1>

      <Resource
        value={usersData}
        onPending={() => <Loader />}
        onResolved={(users) => {
          return users.map((user: any) => <div key={user.id}>{user.email}</div>)
        }}
      />
    </>
  )
})

export default Users
