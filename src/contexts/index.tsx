import { createContextId, type Signal } from '@builder.io/qwik'

import type { LoggedUser } from '~/types'

export const ThemeContext = createContextId<Signal<string>>('docs.theme-context')

export const SessionContext = createContextId<LoggedUser>('docs.session-context')
