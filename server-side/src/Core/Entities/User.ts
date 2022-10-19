import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm'
import { Field, ObjectType } from 'type-graphql'
import { IsEmail, IsString, Length } from 'class-validator'

import { BaseEntity } from 'Helpers/Utils/BaseEntity'
import { Gender } from 'Core/Enums/Gender.Enum'
import Role from 'Core/Entities/Role'

@Entity('users')
@ObjectType()
export default class User extends BaseEntity { 
  @Field(() => String)
  @Column({ type: 'varchar', length: 128 })
  @Length(8, 128)
  @IsEmail()
  public email: string

  @Field(() => String)
  @Column({ name: 'first_name', type: 'varchar', length: 128 })
  @IsString()
  @Length(3, 64)
  public firstName: string

  @Field(() => String)
  @Column({ name: 'last_name', type: 'varchar', length: 64 })
  @IsString()
  @Length(3, 64)
  public lastName: string

  @Field(() => Gender)
  @Column({
    type: 'enum',
    enum: Gender,
    default: Gender.Other
  })
  public gender: Gender

  @Column({ name: 'password', type: 'varchar' })
  @IsString()
  @Length(8, 256)
  public password: string

  @Column({ name: 'token', type: 'varchar', nullable: true })
  @IsString()
  token: string | null

  @Column({ name: 'reset_token', type: 'varchar', nullable: true })
  @IsString()
  resetToken: string | null

  @Field(() => Role)
  @ManyToOne(() => Role, role => role.id)
  @JoinColumn({ name: 'role_id' })
  public role: Role
}
