import { Service } from 'typedi'

import { MigrationInterface, QueryRunner } from "typeorm";

@Service()
export class CreateUserTable1664558469927 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE users(
                id SERIAL PRIMARY KEY,
                created_at timestamp NULL,
                updated_at timestamp NULL,
                status BOOLEAN DEFAULT TRUE,
                email VARCHAR UNIQUE NOT NULL,
                first_name varchar(128), 
                last_name varchar(64),
                gender gender_type NULL,
                password VARCHAR NOT NULL,
                reset_token VARCHAR DEFAULT NULL
            );`
        )

        await queryRunner.query(`ALTER TABLE users ADD COLUMN role_id INT`)
        await queryRunner.query(`
            ALTER TABLE users ADD 
            CONSTRAINT fk_user_role 
            FOREIGN KEY (role_id) REFERENCES roles (id)
        `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE users DROP CONSTRAINT fk_user_role`)
        await queryRunner.query(`ALTER TABLE users DROP COLUMN IF EXISTS role_id`)
        await queryRunner.query('DROP TABLE users;')
    }
}