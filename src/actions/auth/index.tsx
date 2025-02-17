import { GET, POST } from '..'

export async function postLogInPassword(userCredentials: any) {
  const response = await POST('authapi/api/IdentityUsers/PostLogInPassword', userCredentials)
  return await response
}

export async function fetchUsers(sessionToken: string) {
  const response = await GET('authapi/api/Users/fetchUsers', {}, sessionToken)
  return await response
}
