import { Service } from "typedi";
import {MigrationInterface, QueryRunner} from "typeorm";


@Service()
export class InsertDefaultUsers1664626756539 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            INSERT INTO users (created_at, updated_at, status, email, first_name, last_name, gender, password, token, reset_token, role_id) 
            VALUES (
                    CURRENT_TIMESTAMP,
                    CURRENT_TIMESTAMP,
                    TRUE,
                    'guliyev.yavar@doccure.com', 
                    'Yavar', 
                    'Guliyev',
                    'Male',
                    '$2b$10$uB8DMBtv1j/J0/Ocf7g3Z.uxXTcOchQPtU9J37Lfvoj8bWNAFWHTO',
                    NULL,
                    NULL,
                    1
                );
        `)

        await queryRunner.query(`UPDATE users SET role_id = 1 WHERE email = 'guliyev.yavar@doccure.com'`)
        await queryRunner.query(`UPDATE users SET role_id = 2 WHERE email <> 'guliyev.yavar@doccure.com'`)
        await queryRunner.query(`ALTER TABLE users ALTER COLUMN role_id SET NOT NULL`)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DELETE FROM users WHERE email='guliyev.yavar@doccure.com';`)
    }
}
