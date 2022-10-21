import Role from 'Core/Entities/Role'

export type LoginResponse = {
  accessToken: string,
  userDetails: {
    id: number
    email: string
    firstName: string,
    lastName: string,
    role: Role
  }
}
