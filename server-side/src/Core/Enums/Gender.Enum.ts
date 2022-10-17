import { registerEnumType } from 'type-graphql'

export enum Gender {
  Other = 'other',
  Male = 'male',
  Female = 'female'
}

registerEnumType(Gender, {
  name: 'Gender',
  description: 'List of Gender'
})
