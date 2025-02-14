import { component$ } from '@builder.io/qwik'

const Loader = component$(() => {
  return (
    <div class="flex items-center justify-center">
      <div class="loader h-12 w-12 rounded-full border-4 border-t-4 border-gray-200 ease-linear"></div>
    </div>
  )
})

export default Loader
