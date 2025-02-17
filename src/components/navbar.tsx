import { component$, useContext } from '@builder.io/qwik'
import { Link } from '@builder.io/qwik-city'
import { SessionContext } from '~/contexts'

const Navbar = component$(() => {
  const session = useContext(SessionContext)

  // const session = JSON.parse(JSON.stringify(sessionContext))

  return (
    <header class="bg-white">
      <nav
        class="mx-auto flex items-center justify-between bg-purple-200 p-6 lg:px-8"
        aria-label="Global"
      >
        <div class="flex lg:flex-1">
          <a href="#" class="-m-1.5 p-1.5">
            <span class="sr-only">Your Company</span>
            {/* <img class="h-8 w-auto" src="https://tailwindui.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600" alt=""> */}
          </a>
        </div>
        <div class="hidden lg:flex lg:gap-x-12">
          <Link href="/dashboard" class="text-lg font-semibold text-gray-900">
            Dashboard
          </Link>
          <Link href="/dashboard/server-side-example" class="text-lg font-semibold text-gray-900">
            Investments
          </Link>
          <Link href="/dashboard/users" class="text-lg font-semibold text-gray-900">
            Users
          </Link>
        </div>
        <div class="hidden lg:flex lg:flex-1 lg:justify-end">
          {session.token ? (
            <div>{session.user.firstName + ' ' + session.user.lastName}</div>
          ) : (
            <Link href="/login" class="text-md/6 font-semibold text-gray-900">
              Log in <span aria-hidden="true">&rarr;</span>
            </Link>
          )}
        </div>
      </nav>
    </header>
  )
})

export default Navbar
