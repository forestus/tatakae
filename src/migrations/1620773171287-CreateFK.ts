import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateFK1620773171287 implements MigrationInterface {
  name = "CreateFK1620773171287";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "descriptions" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "type" character varying NOT NULL, "score" character varying NOT NULL, "nbEps" character varying NOT NULL, "startYear" character varying NOT NULL, "endYear" character varying NOT NULL, "imageUrl" character varying NOT NULL, "description" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_5000c6760d45a086993eec92ded" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "torrents" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "link" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "animeId" integer, CONSTRAINT "PK_66c7064578ef09f50dcb970e548" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "animes" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "link" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "descriptionsId" integer, CONSTRAINT "REL_5ad256945c23dfc893b7c5d1e1" UNIQUE ("descriptionsId"), CONSTRAINT "PK_16b5c3f560dac36ec440e340545" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `ALTER TABLE "torrents" ADD CONSTRAINT "FK_d1f03379127dbbefef8684c170c" FOREIGN KEY ("animeId") REFERENCES "animes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "animes" ADD CONSTRAINT "FK_5ad256945c23dfc893b7c5d1e18" FOREIGN KEY ("descriptionsId") REFERENCES "descriptions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "animes" DROP CONSTRAINT "FK_5ad256945c23dfc893b7c5d1e18"`
    );
    await queryRunner.query(
      `ALTER TABLE "torrents" DROP CONSTRAINT "FK_d1f03379127dbbefef8684c170c"`
    );
    await queryRunner.query(`DROP TABLE "animes"`);
    await queryRunner.query(`DROP TABLE "torrents"`);
    await queryRunner.query(`DROP TABLE "descriptions"`);
  }
}
