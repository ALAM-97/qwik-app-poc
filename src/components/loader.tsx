import { component$ } from '@builder.io/qwik'

type LoaderProps = {
  size?: 'small' | 'medium' | 'large'
}

const Loader = component$<LoaderProps>(({ size = 'medium' }) => {
  const purpleLoader = size === 'small' ? 'h-8 w-8' : size === 'medium' ? 'h-16 w-16' : 'h-32 w-32'
  const greenLoader = size === 'small' ? 'h-6 w-6' : size === 'medium' ? 'h-12 w-12' : 'h-24 w-24'
  return (
    <div class="flex w-full flex-col items-center justify-center gap-4">
      <div
        class={`${purpleLoader} flex animate-spin items-center justify-center rounded-full border-4 border-transparent border-t-purple-400 text-4xl text-purple-400`}
      >
        <div
          class={`${greenLoader} flex animate-spin items-center justify-center rounded-full border-4 border-transparent border-t-green-400 text-2xl text-green-400`}
        ></div>
      </div>
    </div>
  )
})

export default Loader
