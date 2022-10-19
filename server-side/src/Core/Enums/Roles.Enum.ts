import { registerEnumType } from 'type-graphql'

export enum Roles {
  GlobalAdmin = 'Global Admin',
  Admin = 'Admin',
  Doctor = 'Doctor',
  Patient = 'Patient',
}

registerEnumType(Roles, {
  name: 'Roles',
  description: 'List of Roles for the whole project'
})
