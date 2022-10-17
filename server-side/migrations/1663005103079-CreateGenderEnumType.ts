import { Service } from "typedi"

import { MigrationInterface, QueryRunner } from "typeorm"

@Service()
export class CreateGenderEnumType1663005103079 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE gender_type AS ENUM('other', 'male', 'female');`)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('DROP TYPE gender_type;')
    }
}