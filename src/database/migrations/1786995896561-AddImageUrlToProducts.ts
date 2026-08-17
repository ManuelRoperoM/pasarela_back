import { MigrationInterface, QueryRunner } from "typeorm";

export class AddImageUrlToProducts1786995896561 implements MigrationInterface {
    name = 'AddImageUrlToProducts1786995896561'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" ADD "image_url" character varying(500)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "image_url"`);
    }

}
