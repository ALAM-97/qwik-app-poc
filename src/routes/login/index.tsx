import { component$, $, useContext, useSignal } from '@builder.io/qwik'
import { useNavigate } from '@builder.io/qwik-city'
import { Button, Input } from '~/components/ui'
import { SessionContext } from '~/contexts'

export interface UserCredentials {
  email: string | null
  password: string | null
}

const Login = component$(() => {
  const sessionToken = useContext(SessionContext)

  const userCredentials = useSignal<UserCredentials>({
    email: '',
    password: '',
  })

  const navigate = useNavigate()

  const login = $(async () => {
    const response = await fetch(`/authapi/api/IdentityUsers/PostLogInPassword`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Clientid: 'yeldo-test',
      },
      body: JSON.stringify(userCredentials.value),
    })

    if (!response.ok) {
      console.error('Errore nella richiesta:', response.statusText)
      return
    }

    const res = await response.json()
    if (res) {
      sessionStorage.setItem('authToken', res.token)
      sessionToken.value = res.token
      navigate('/dashboard')
    }
  })

  return (
    <div class="flex h-screen w-screen items-center justify-center">
      <div class="flex w-1/5 flex-col items-center justify-center rounded-sm bg-gray-100 p-10">
        <h1 class="mb-5 text-2xl font-bold">Effetua il login</h1>
        <Input
          label="Email"
          name="email"
          placeholder="Email"
          class="mb-5"
          onChange$={(e) => (userCredentials.value.email = (e.target as HTMLInputElement).value)}
        />
        <Input
          class="mb-5"
          label="Password"
          type="password"
          name="password"
          placeholder="Password"
          onChange$={(e) => (userCredentials.value.password = (e.target as HTMLInputElement).value)}
        />
        <Button type="submit" class="w-full cursor-pointer bg-blue-500 text-white" onClick$={login}>
          Login
        </Button>
      </div>
    </div>
  )
})

export default Login
