import {MigrationInterface, QueryRunner} from "typeorm";

export class UserFullName1613312096982 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" RENAME "name" to "fullName"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" RENAME "fullName" to "name"`);
    }

}
