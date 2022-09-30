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
  @CreateDateColumn({ name: 'created_at' })
  public createdAt: Date

  @Field(() => Date)
  @UpdateDateColumn({ name: 'updated_at' })
  public updatedAt: Date

  @Field(() => Boolean)
  @Column('boolean', { default: true })
  public status: Boolean
}
