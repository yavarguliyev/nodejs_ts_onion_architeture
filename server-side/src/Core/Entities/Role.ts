import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { Field, Int, ObjectType } from 'type-graphql'
import { Length } from 'class-validator'

import User from 'Core/Entities/User'
import { Roles } from 'Core/Enums/Roles.Enum'

@ObjectType()
@Entity('roles')
export default class Role {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  readonly id: number

  @Field(() => Roles)
  @Column({ type: 'varchar', length: 32 })
  @Length(4, 32)
  name: string

  @Field(() => [User])
  @OneToMany(() => User, user => user.role)
  public users: User[]
}
