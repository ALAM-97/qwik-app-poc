import { type PropsOf, component$, Slot, useStylesScoped$ } from '@builder.io/qwik'
import { Modal as HeadlessModal } from '@qwik-ui/headless'
import { LuX } from '@qwikest/icons/lucide'
import { cn } from '@qwik-ui/utils'

export const DialogContent = component$<PropsOf<typeof HeadlessModal.Panel>>(
   ({ class: className, ...props }) => {
      useStylesScoped$(`
      .modal-backdrop::backdrop {
         /* changing background */
         background: rgba(0, 0, 0, 0.);

         /* providing multiple filters */
         backdrop-filter: grayscale(90%) blur(10px);
      }
   `)

      return (
         <>
            <HeadlessModal.Panel
               class={cn(
                  'bg-background fixed z-50 mx-auto my-auto w-full max-w-lg gap-4 border p-6 shadow-lg sm:rounded-lg',
                  className
               )}
               {...props}
            >
               <Slot />
               <HeadlessModal.Close class="ring-offset-background focus:ring-ring data-[state=open]:bg-accent data-[state=open]:text-muted-foreground absolute top-4 right-4 rounded-sm opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-none disabled:pointer-events-none">
                  <LuX class="h-4 w-4" />
                  <span class="sr-only">Close</span>
               </HeadlessModal.Close>
            </HeadlessModal.Panel>
         </>
      )
   }
)
