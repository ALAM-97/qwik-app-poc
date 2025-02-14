import { createContextId, type Signal } from '@builder.io/qwik'
import type { Person } from '~/types'

export const ThemeContext = createContextId<Signal<string>>('docs.theme-context')

export const UserContext = createContextId<Signal<Person[]>>('docs.user-context')

export const SessionContext = createContextId<Signal<string | null>>('docs.session-context')
