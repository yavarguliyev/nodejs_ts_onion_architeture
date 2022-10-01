import { Service } from "typedi";
import {MigrationInterface, QueryRunner} from "typeorm";


@Service()
export class InsertDefaultUsers1664626756539 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            INSERT INTO users (created_at, updated_at, status, email, first_name, last_name, password, reset_token) 
            VALUES (
                    CURRENT_TIMESTAMP,
                    CURRENT_TIMESTAMP,
                    TRUE,
                    'guliyev.yavar@doccure.com', 
                    'Yavar', 
                    'Guliyev', 
                    '$2b$12$I1JqFpTHqFWlCR6A/.VYseYac16q9NmF/jOOE9xLn7fIJfM4MpuWS',
                    NULL
                );
        `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DELETE FROM users WHERE email='nuser@nedyx.com';`)
    }
}
