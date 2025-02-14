import { component$ } from '@builder.io/qwik'
import { type DocumentHead, useNavigate, routeLoader$ } from '@builder.io/qwik-city'

export const useGetInvestments = routeLoader$(async () => {
  const response = await fetch('http://localhost:5173/process-api/api/admin/getInvestments', {
    headers: { Accept: 'application/json' },
  })
  return await response.json()
})

const Index = component$(() => {
  const navigate = useNavigate()

  const investmentsSignal = useGetInvestments()

  return (
    <>
      <h1 class="text-3xl font-bold underline hover:text-red-500">Server side example page</h1>

      <div>
        <button
          onClick$={() => navigate('/dashboard')}
          class="rounded-md bg-blue-500 p-2 text-white"
        >
          Go to dashboard
        </button>

        <div>
          {/* <p class="w-1/2 bg-red-300">client Investments: {JSON.stringify(investments.value)}</p> */}
          <div>server Investments:</div>
          <ul>
            {investmentsSignal.value.map((investment: any) => (
              <li key={investment.id}>{investment.id}</li>
            ))}
          </ul>
        </div>
      </div>
    </>
  )
})

export default Index

export const head: DocumentHead = {
  title: 'Welcome to Qwik',
  meta: [
    {
      name: 'description',
      content: 'Qwik site description',
    },
  ],
}
