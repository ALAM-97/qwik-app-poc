import { component$, Resource, useContext, useResource$ } from '@builder.io/qwik'
import { type DocumentHead } from '@builder.io/qwik-city'
import Loader from '~/components/loader'
import { getInvestments } from '~/actions/investment'
import { SessionContext } from '~/contexts'

import {
   TableHeader,
   Table,
   TableHead,
   TableBody,
   TableRow,
   TableCell,
   TableCaption,
   TableFooter,
} from '~/components/ui/table'

export const head: DocumentHead = {
   title: 'Yeldo | Investments',
   meta: [
      {
         name: 'description',
         content: 'All the investments of the company',
      },
   ],
}

// export const useGetInvestments = routeLoader$(async () => {
//    const response = await fetch('http://localhost:5173/process-api/api/admin/getInvestments', {
//       headers: { Accept: 'application/json' },
//    })
//    return await response.json()
// })

const Investments = component$(() => {
   const session = useContext(SessionContext)

   const investmentData = useResource$<any[]>(({ track }) => {
      track(() => session.token)

      return getInvestments({ take: 30 }, session.token)
   })

   return (
      <>
         <h1 class="mb-5 text-3xl font-bold underline">Investments</h1>

         <Resource
            value={investmentData}
            onPending={() => <Loader />}
            onResolved={(investments) => {
               return (
                  <Table class="rounded-lg bg-gray-100">
                     <TableHeader>
                        <TableRow>
                           <TableHead>ID</TableHead>
                           <TableHead>Subscriber</TableHead>
                           <TableHead>Amount</TableHead>
                           <TableHead>Currency</TableHead>
                           <TableHead>Status</TableHead>
                        </TableRow>
                     </TableHeader>
                     <TableBody>
                        {investments.map((investment) => (
                           <TableRow key={investment.id}>
                              <TableCell>{investment.id}</TableCell>
                              <TableCell>{investment.subscriber.name}</TableCell>
                              <TableCell>{investment.amount}</TableCell>
                              <TableCell>{investment.project.currency}</TableCell>
                              <TableCell>{investment.status}</TableCell>
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

export default Investments
