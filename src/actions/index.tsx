// import { getServerSession } from 'next-auth'
// import { authOptions } from '../lib/auth'

export async function GET(url = '', queryParams = {}) {
   try {
      // Start of Selection
      const headers: HeadersInit = {
         Clientid: 'yeldo-test',
         // The Authorization header is already set by the middleware
      }

      const params = new URLSearchParams(queryParams)

      const response = await fetch(`${import.meta.env.PUBLIC_BASE_URL}/` + url + '?' + params, {
         method: 'GET',
         headers,
      })

      return await response.json()
   } catch (e) {
      console.error(e)
   }
}

export async function POST(
   url = '',
   body = {},
   sessionToken: string | null = null,
   includeFile = false,
   receiveJson = true
) {
   try {
      // const session = await getServerSession(authOptions)
      // Default options are marked with *
      const headers: HeadersInit = {
         Clientid: 'yeldo-test',
         // The Authorization header is already set by the middleware
      }
      if (!includeFile) headers['Content-Type'] = 'application/json'
      if (sessionToken) headers.Authorization = `Bearer ${sessionToken}`

      const response = await fetch(`${import.meta.env.PUBLIC_BASE_URL}/` + url, {
         method: 'POST',
         mode: 'cors', // no-cors, *cors, same-origin
         cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
         credentials: 'same-origin', // include, *same-origin, omit
         headers,
         redirect: 'follow', // manual, *follow, erro
         referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url

         body: JSON.stringify(body), // body data type must match "Content-Type" header
      })
      return receiveJson ? await response.json() : response // parses JSON response into native JavaScript objects
   } catch (e) {
      console.error(e)
   }
}

// http://localhost:5173/authapi/api/Users/fetchUsers?
// http://localhost:5173/authapi/api/Users/PostLogInPassword

// export async function POSTFILE(url = '', data: any, includeFile = false, receiveJson = true) {
//   try {
//     const session = await getServerSession(authOptions)

//     // Default options are marked with *
//     const headers: HeadersInit = {}
//     if (!includeFile) headers['Content-Type'] = 'application/json'
//     if (session?.accessToken) headers.Authorization = `Bearer ${session.accessToken}`
//     const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api` + url, {
//       method: 'POST',
//       mode: 'cors', // no-cors, *cors, same-origin
//       cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
//       credentials: 'same-origin', // include, *same-origin, omit
//       headers,
//       redirect: 'follow', // manual, *follow, error
//       referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
//       body: data, // body data type must match "Content-Type" header
//     })
//     return receiveJson ? await response.json() : response // parses JSON response into native JavaScript objects
//   } catch (e) {
//     console.error(e)
//   }
// }

// export async function PUT(url = '', data = {}, includeFile = false, receiveJson = true) {
//   try {
//     const session = await getServerSession(authOptions)

//     // Default options are marked with *
//     const headers: HeadersInit = {}
//     if (!includeFile) headers['Content-Type'] = 'application/json'
//     if (session?.accessToken) headers.Authorization = `Bearer ${session.accessToken}`
//     const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api` + url, {
//       method: 'PUT',
//       mode: 'cors', // no-cors, *cors, same-origin
//       cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
//       credentials: 'same-origin', // include, *same-origin, omit
//       headers,
//       redirect: 'follow', // manual, *follow, error
//       referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
//       body: JSON.stringify(data), // body data type must match "Content-Type" header
//     })
//     return receiveJson ? await response.json() : response // parses JSON response into native JavaScript objects
//   } catch (e) {
//     console.error(e)
//   }
// }

// export async function PATCH(url = '', data = {}, includeFile = false, receiveJson = false) {
//   try {
//     const session = await getServerSession(authOptions)

//     // Default options are marked with *
//     const headers: HeadersInit = {}
//     if (!includeFile) headers['Content-Type'] = 'application/json'
//     if (session?.accessToken) headers.Authorization = `Bearer ${session.accessToken}`
//     const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api` + url, {
//       method: 'PATCH',
//       mode: 'cors', // no-cors, *cors, same-origin
//       cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
//       credentials: 'same-origin', // include, *same-origin, omit
//       headers,
//       redirect: 'follow', // manual, *follow, error
//       referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
//       body: JSON.stringify(data), // body data type must match "Content-Type" header
//     })
//     return receiveJson ? await response.json() : response // parses JSON response into native JavaScript objects
//   } catch (e) {
//     console.error(e)
//   }
// }

// export async function DELETE(url = '', data = {}, includeFile = false, receiveJson = true) {
//   try {
//     const session = await getServerSession(authOptions)
//     // Default options are marked with *
//     const headers: HeadersInit = {}
//     if (!includeFile) headers['Content-Type'] = 'application/json'
//     if (session?.accessToken) headers.Authorization = `Bearer ${session.accessToken}`
//     const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api` + url, {
//       method: 'DELETE',
//       mode: 'cors', // no-cors, *cors, same-origin
//       cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
//       credentials: 'same-origin', // include, *same-origin, omit
//       headers,
//       redirect: 'follow', // manual, *follow, error
//       referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
//       body: JSON.stringify(data), // body data type must match "Content-Type" header
//     })
//     return receiveJson ? await response.json() : response // parses JSON response into native JavaScript objects
//   } catch (e) {
//     console.error(e)
//   }
// }
