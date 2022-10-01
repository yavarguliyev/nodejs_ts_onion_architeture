import { Column, Entity } from 'typeorm'
import { Field, ObjectType } from 'type-graphql'
import { IsEmail, IsString, Length } from 'class-validator'

import { BaseEntity } from 'Helpers/Utils/BaseEntity'

@Entity('users')
@ObjectType()
export default class User extends BaseEntity {
  @Field(() => String)
  @Column({ type: 'varchar', length: 128 })
  @Length(8, 128)
  @IsEmail()
  email: string

  @Field(() => String)
  @Column({ name: 'first_name', type: 'varchar', length: 128 })
  @IsString()
  @Length(3, 64)
  firstName: string

  @Field(() => String)
  @Column({ name: 'last_name', type: 'varchar', length: 64 })
  @IsString()
  @Length(3, 64)
  lastName: string

  @Field(() => String)
  @Column({ name: 'password', type: 'varchar', nullable: true })
  @IsString()
  @Length(8, 256)
  password: string

  @Field(() => String)
  @Column({ name: 'reset_token', type: 'varchar', nullable: true })
  @IsString()
  resetToken: string | null
}
