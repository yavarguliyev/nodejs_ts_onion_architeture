import {
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  Column
} from 'typeorm'
import { Field, Int } from 'type-graphql'

export abstract class BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  public readonly id: number

  @Field(() => Date)
  @CreateDateColumn({
    readonly: true,
    name: 'created_at',
    type: 'timestamptz'
  })
  public createdAt: Date

  @Field(() => Date)
  @UpdateDateColumn({
    readonly: true,
    name: 'updated_at',
    type: 'timestamptz'
  })
  public updatedAt: Date

  @Field(() => Boolean)
  @Column('boolean', { default: true })
  public status: Boolean
}
