import { component$, useStore, useContext, useResource$, Resource } from '@builder.io/qwik'
import { fetchUsers } from '~/actions/auth'
import Loader from '~/components/loeader'
import { SessionContext } from '~/contexts'

const Users = component$(() => {
  const sessionToken = useContext(SessionContext)

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
    track(() => sessionToken.value)
    if (sessionToken.value) {
      return fetchUsers(sessionToken.value)
    }
    return []
  })

  return (
    <>
      <h1 class="mb-5 text-2xl font-bold">Users</h1>
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
