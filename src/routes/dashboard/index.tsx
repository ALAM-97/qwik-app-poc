import { component$ } from '@builder.io/qwik'
import { useNavigate } from '@builder.io/qwik-city'
import { Button } from '~/components/ui/button/button'

export default component$(() => {
  const navigate = useNavigate()

  return (
    <>
      <h1 class="mb-5 text-3xl font-bold underline">Dashboard</h1>
      <div class="flex gap-5">
        <Button class="bg-amber-300" onClick$={() => navigate('/dashboard/server-side-example')}>
          Go to server side example
        </Button>
        <Button class="bg-amber-300" onClick$={() => navigate('/dashboard/users')}>
          Go to users
        </Button>
      </div>
    </>
  )
})
