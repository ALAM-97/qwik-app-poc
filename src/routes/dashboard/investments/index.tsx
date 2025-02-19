import { component$, Resource, useResource$ } from '@builder.io/qwik'
import { Link, type DocumentHead } from '@builder.io/qwik-city'
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
import {
   DropdownMenuItem,
   DropdownMenuPopover,
   DropdownMenuRoot,
   DropdownMenuSeparator,
   DropdownMenuTrigger,
} from '~/components/ui/dropdown-menu'
import {
   DialogRoot,
   DialogTrigger,
   DialogContent,
   DialogTitle,
   DialogHeader,
   DialogDescription,
   DialogFooter,
   DialogClose,
} from '~/components/ui/dialog'
import { Button } from '~/components/ui/button/button'

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
                              <TableCell>
                                 <DropdownMenuRoot>
                                    <DropdownMenuTrigger>
                                       <div class="flex h-7 w-7 cursor-pointer items-center justify-center rounded-md bg-purple-200">
                                          <span class="material-symbols-outlined">more_vert</span>
                                       </div>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuPopover>
                                       <DropdownMenuItem>
                                          <Link
                                             href={`/dashboard/investments/${investment.project.id}/${investment.id}/edit`}
                                          >
                                             Edit
                                          </Link>
                                       </DropdownMenuItem>
                                       <DropdownMenuSeparator class="mx-2 my-1 bg-neutral-400" />
                                       <DropdownMenuItem>Delete</DropdownMenuItem>
                                    </DropdownMenuPopover>
                                 </DropdownMenuRoot>
                              </TableCell>
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
