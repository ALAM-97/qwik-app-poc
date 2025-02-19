import { component$, useSignal, $, useResource$, Resource } from '@builder.io/qwik'
import { useLocation } from '@builder.io/qwik-city'
import { Input } from '~/components/ui/input/input'
import { Button } from '~/components/ui/button/button'
import Loader from '~/components/loader'
import { getInvestment } from '~/actions/investment'
import { useLog } from '~/utils'

const EditInvestment = component$(() => {
   const location = useLocation()
   const investmentId = location.params.investmentId
   const dealId = location.params.dealId
   const amount = useSignal('')

   const handleSubmit = $(() => {
      console.log('Updated amount:', amount.value)
      // Add logic to update the investment amount
   })

   const investmentData = useResource$<any>(async ({ track }) => {
      track(() => investmentId)
      track(() => dealId)
      const response = await getInvestment({
         investmentId: Number(investmentId),
         dealId: Number(dealId),
      })
      amount.value = response.amount
      return response
   })

   useLog(investmentData)
   return (
      <div>
         <h1 class="mb-5 text-2xl font-bold underline">Edit Investment: {investmentId}</h1>
         <Resource
            value={investmentData}
            onPending={() => <Loader />}
            onRejected={(error) => {
               console.error('Error fetching investment:', error)
               return <div>Error loading investment</div>
            }}
            onResolved={() => {
               return (
                  <form onSubmit$={handleSubmit} preventdefault:submit>
                     <Input
                        id="amount"
                        type="number"
                        value={amount.value}
                        class="mb-3"
                        onInput$={(e) => (amount.value = (e.target as HTMLInputElement).value)}
                     />
                     <Button variant="outline" type="submit">
                        Update
                     </Button>
                  </form>
               )
            }}
         />
      </div>
   )
})

export default EditInvestment
