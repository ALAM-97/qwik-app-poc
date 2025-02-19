import { useVisibleTask$ } from '@builder.io/qwik'

export function useLog(resource: any, logName?: string) {
   // eslint-disable-next-line qwik/no-use-visible-task
   useVisibleTask$(({ track }) => {
      track(() => resource)

      const isString = typeof resource === 'string'
      const isObject = typeof resource === 'object'

      const logMessage = logName ? `Logging ${logName}:` : 'Logging resource:'

      if (isString) {
         console.log(logMessage, resource)
      }

      if (isObject) {
         console.log(logMessage, JSON.parse(JSON.stringify(resource)))
      }
   })
}
