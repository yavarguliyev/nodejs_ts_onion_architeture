import { Service } from 'typedi'

import { MigrationInterface, QueryRunner } from "typeorm";

@Service()
export class CreateUserTable1664558469927 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE users(
                      id SERIAL PRIMARY KEY,
                      email VARCHAR UNIQUE NOT NULL,
                      password VARCHAR NOT NULL
                  );`
          )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('DROP TABLE users;')
    }
}