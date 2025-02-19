import { component$, Resource, useResource$, useVisibleTask$ } from '@builder.io/qwik'
import { type DocumentHead } from '@builder.io/qwik-city'
import Loader from '~/components/loader'
import { getInvestments } from '~/actions/investment'
import {
   TableHeader,
   Table,
   TableHead,
   TableBody,
   TableRow,
   TableCell,
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

const Investments = component$(() => {
   // const session = useContext(SessionContext)
   const investmentData = useResource$<any[]>(async () => {
      return await getInvestments({ take: 30 })
   })

   return (
      <>
         <h1 class="mb-5 text-3xl font-bold underline">Investments</h1>

         <Resource
            value={investmentData}
            onPending={() => <Loader />}
            onRejected={(error) => {
               console.error('Error fetching investments:', error)
               return <div>Error loading investments</div>
            }}
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
