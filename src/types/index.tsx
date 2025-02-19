export interface LoggedUser {
   token: string | null
   user: User
}
export interface User {
   firstName: string
   lastName: string
   email: string
}
