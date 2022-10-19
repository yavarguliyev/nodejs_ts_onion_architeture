import { Service } from 'typedi'
import { MigrationInterface, QueryRunner } from 'typeorm'

@Service()
export class CreateRolesTable1664180014594 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE roles (
        id SERIAL PRIMARY KEY, 
        name VARCHAR(32) UNIQUE NOT NULL
      )
    `)
    
    await queryRunner.query(`
      INSERT INTO roles (id, name) VALUES 
        (1, 'Global Admin'), 
        (2, 'Admin'), 
        (3, 'Doctor'), 
        (4, 'Patient')
    `)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE roles`)
  }
}
