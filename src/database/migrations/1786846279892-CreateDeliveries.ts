import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateDeliveries1786846279892 implements MigrationInterface {
    name = 'CreateDeliveries1786846279892'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."deliveries_status_enum" AS ENUM('PENDING', 'PREPARING', 'SHIPPED', 'DELIVERED', 'CANCELLED')`);
        await queryRunner.query(`CREATE TABLE "deliveries" ("id" SERIAL NOT NULL, "transaction_id" integer NOT NULL, "address" character varying(255) NOT NULL, "city" character varying(100) NOT NULL, "department" character varying(100) NOT NULL, "postal_code" character varying(20) NOT NULL, "status" "public"."deliveries_status_enum" NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_e7b05ec8e2e60b4c3fea6cbc0bc" UNIQUE ("transaction_id"), CONSTRAINT "PK_a6ef225c5c5f0974e503bfb731f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "deliveries" ADD CONSTRAINT "FK_e7b05ec8e2e60b4c3fea6cbc0bc" FOREIGN KEY ("transaction_id") REFERENCES "transactions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "deliveries" DROP CONSTRAINT "FK_e7b05ec8e2e60b4c3fea6cbc0bc"`);
        await queryRunner.query(`DROP TABLE "deliveries"`);
        await queryRunner.query(`DROP TYPE "public"."deliveries_status_enum"`);
    }

}
