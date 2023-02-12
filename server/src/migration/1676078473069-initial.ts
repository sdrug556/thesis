import { MigrationInterface, QueryRunner } from "typeorm"

export class initial1676078473069 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      const createDBQuery = `CREATE DATABASE pos;`;
      await queryRunner.query(createDBQuery);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
