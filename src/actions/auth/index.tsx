import { GET, POST } from '..'

export async function postLogInPassword(userCredentials: any) {
   return await POST('authapi/api/IdentityUsers/PostLogInPassword', userCredentials)
}

export async function fetchUsers() {
   return await GET('authapi/api/Users/fetchUsers')
}
