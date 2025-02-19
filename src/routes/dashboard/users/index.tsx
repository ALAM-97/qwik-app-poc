import { component$, useResource$, Resource } from '@builder.io/qwik'
import type { DocumentHead } from '@builder.io/qwik-city'
import { fetchUsers } from '~/actions/auth'
import Loader from '~/components/loader'
import {
   Table,
   TableBody,
   TableCell,
   TableHead,
   TableHeader,
   TableRow,
} from '~/components/ui/table'

export const head: DocumentHead = {
   title: 'Yeldo | Users',
   meta: [
      {
         name: 'description',
         content: 'All the users of the company',
      },
   ],
}

const Users = component$(() => {
   const usersData = useResource$<any[]>(async () => {
      return await fetchUsers()
   })

   return (
      <>
         <h1 class="mb-5 text-3xl font-bold underline">Users</h1>

         <Resource
            value={usersData}
            onPending={() => <Loader />}
            onRejected={(error) => {
               console.error('Error fetching users:', error)
               return <div>Error loading users</div>
            }}
            onResolved={(users) => {
               return (
                  <Table class="rounded-lg bg-gray-100">
                     <TableHeader>
                        <TableRow>
                           <TableHead>ID</TableHead>
                           <TableHead>Name</TableHead>
                           <TableHead>Email</TableHead>
                        </TableRow>
                     </TableHeader>
                     <TableBody>
                        {users.map((user) => (
                           <TableRow key={user.id}>
                              <TableCell>{user.id}</TableCell>
                              <TableCell>{user.firstName + ' ' + user.lastName}</TableCell>
                              <TableCell>{user.email}</TableCell>
                           </TableRow>
                        ))}
                     </TableBody>
                  </Table>
               )
            }}
         />
      </>
   )
})

export default Users
