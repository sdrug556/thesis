import { MigrationInterface, QueryRunner } from "typeorm"

export class Initial1676200473163 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      const query = `CREATE DATABASE pos`;
      await queryRunner.query(query);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
