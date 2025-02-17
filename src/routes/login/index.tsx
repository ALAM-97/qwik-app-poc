import { component$, $, useContext, useSignal } from '@builder.io/qwik'
import { useNavigate } from '@builder.io/qwik-city'
import { postLogInPassword } from '~/actions/auth'
// import Loader from '~/components/loader'
// import { Button, Input } from '~/components/ui'
import { SessionContext } from '~/contexts'

export interface UserCredentials {
   email: string | null
   password: string | null
}

const Login = component$(() => {
   const session = useContext(SessionContext)
   const loading = useSignal(false)
   const navigate = useNavigate()

   const userCredentials = useSignal<UserCredentials>({
      email: 'alexamara97@gmail.com',
      password: 'Alevalefra1',
   })

   const handleLogin = $(async () => {
      loading.value = true
      const response = await postLogInPassword(userCredentials.value)

      if (response.status && response.status !== 200) {
         // TODO: ERROR MESSAGE
         console.error('Errore nella richiesta:', response)
         loading.value = false
         return
      }

      if (response) {
         session.user.firstName = response.firstName
         session.user.lastName = response.lastName
         session.user.email = response.email
         session.token = response.token
         sessionStorage.setItem('session', JSON.stringify(session))
         navigate('/dashboard')
      }
   })

   return (
      <div class="flex h-screen w-screen items-center justify-center">
         <div class="flex w-1/5 flex-col items-center justify-center rounded-sm bg-gray-100 p-10">
            <h1 class="mb-5 text-2xl font-bold">Effettua il login</h1>
            <form class="w-full" method="POST" onSubmit$={handleLogin} preventdefault:submit>
               {/* <Input
                  label="Email"
                  name="email"
                  placeholder="Email"
                  class="mb-5"
                  value={'alexamara97@gmail.com'}
                  onChange$={(e) =>
                     (userCredentials.value.email = (e.target as HTMLInputElement).value)
                  }
               />
               <Input
                  class="mb-5"
                  label="Password"
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={'Alevalefra1'}
                  onChange$={(e) =>
                     (userCredentials.value.password = (e.target as HTMLInputElement).value)
                  }
               />
                */}
               <button class="w-full cursor-pointer bg-blue-500 text-white">Login</button>
               {/* <Button
                  class="w-full cursor-pointer bg-blue-500 text-white"
                  disabled={loading.value}
               >
                  {loading.value ? <Loader size="small" /> : 'Login'}
               </Button> */}
            </form>
         </div>
      </div>
   )
})

export default Login
