import { type PropsOf, component$, Slot } from '@builder.io/qwik'
import { Modal as HeadlessModal } from '@qwik-ui/headless'
import { cn } from '@qwik-ui/utils'

export const DialogTitle = component$<PropsOf<typeof HeadlessModal.Title>>(
   ({ class: className, ...props }) => (
      <HeadlessModal.Title
         class={cn('text-lg leading-none font-semibold tracking-tight', className)}
         {...props}
      >
         <Slot />
      </HeadlessModal.Title>
   )
)
