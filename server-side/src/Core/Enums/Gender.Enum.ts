import { registerEnumType } from 'type-graphql'

export enum Gender {
  Other = 'Other',
  Male = 'Male',
  Female = 'Female'
}

registerEnumType(Gender, {
  name: 'Gender',
  description: 'List of Gender'
})
