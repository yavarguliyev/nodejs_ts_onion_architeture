import { Service } from 'typedi'

import { MigrationInterface, QueryRunner } from "typeorm";

@Service()
export class CreateUserTable1664558469927 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE users(
                      id SERIAL PRIMARY KEY,
                      created_at timestamp NOT NULL,
                      updated_at timestamp NOT NULL,
                      status BOOLEAN DEFAULT TRUE,
                      email VARCHAR UNIQUE NOT NULL,
                      first_name varchar(128), 
                      last_name varchar(64),
                      password VARCHAR NOT NULL,
                      reset_token VARCHAR(200) NULL
                  );`
          )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('DROP TABLE users;')
    }
}