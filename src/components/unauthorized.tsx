import { component$ } from '@builder.io/qwik'
import { Button } from './ui'

const Unauthorized = component$(() => {
  return (
    <>
      <div class="text-center">
        <p class="mb-4 text-xl font-bold">Not logged in</p>
        <Button class="bg-blue-500 text-white" onClick$={() => (window.location.href = '/login')}>
          Go to Login
        </Button>
      </div>
    </>
  )
})

export default Unauthorized
