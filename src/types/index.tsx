export interface LoggedUser {
  token: string
  user: User
}
export interface User {
  firstName: string
  lastName: string
  email: string
}
