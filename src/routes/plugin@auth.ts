// import { QwikAuth$ } from '@auth/qwik'
// import CredentialsProvider from '@auth/qwik/providers/credentials'

// import { postLogInPassword } from '~/actions/auth'
// export const { onRequest, useSession, useSignIn, useSignOut } = QwikAuth$(() => ({
//   providers: [
//     CredentialsProvider({
//       name: 'credentials',
//       credentials: {
//         username: { label: 'Username', type: 'text' },
//         password: { label: 'Password', type: 'password' },
//       },
//       authorize: async (credentials) => {
//         // Implementa la logica per chiamare le tue API di autenticazione
//         const existingUser = await postLogInPassword(credentials)

//         console.log('existingUser =>', existingUser)

//         if (existingUser.ok && existingUser) {
//           return {
//             id: existingUser.id,
//             name: existingUser.name,
//             surname: existingUser.surname,
//             email: existingUser.email,
//             role: existingUser.role,
//           }
//         } else {
//           return null
//         }
//       },
//     }),
//   ],
//   pages: {
//     signIn: '/login', // Percorso alla tua pagina di login personalizzata
//   },
//   callbacks: {
//     async jwt({ token, user }) {
//       if (user) {
//         const accessToken = signJwtAccessToken(user)
//         // expires in 3 minutes
//         const expiresIn = 3 * 60 * 1000
//         token.id = user.id
//         token.role = user.role
//         token.name = user.name
//         token.surname = user.surname
//         token.accessToken = accessToken
//         token.expiresAt = Date.now() + expiresIn // Store the expiration time
//       }
//       // if (user) {
//       //   token.accessToken = user.accessToken
//       // }
//       return token
//     },
//     async session({ session, token }) {
//       session.accessToken = token.accessToken
//       return session
//     },
//   },
//   session: {
//     strategy: 'jwt',
//     // add maxAge 8 hours
//     maxAge: 8 * 60 * 60,
//   },
//   secret: import.meta.env.AUTH_SECRET,
// }))
