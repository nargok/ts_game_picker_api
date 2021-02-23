import {MigrationInterface, QueryRunner, Table, TableIndex, TableColumn, TableForeignKey } from "typeorm";

export class CreateGames1614050044366 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "games",
            columns: [
                {
                    name: "id",
                    type: "int",
                    isPrimary: true
                },
                {
                    name: "title",
                    type: "varchar",
                },
                {
                    name: "url",
                    type: "varchar",
                },
                {
                    name: "price",
                    type: "integer",
                },
                {
                    name: "memo",
                    type: "text", 
                },
            ]
        }), true);

        await queryRunner.createIndex("games", new TableIndex({
            name: "IDX_GAME_TITLE",
            columnNames: ["title"]
        }));

        await queryRunner.addColumn("games", new TableColumn({
            name: "authorId",
            type: "int"
        }));

        await queryRunner.createForeignKey("games", new TableForeignKey({
            columnNames: ["authorId"],
            referencedColumnNames: ["id"],
            referencedTableName: "user",
            onDelete: "CASCADE"
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const table = await queryRunner.getTable("games");
        const foreignKey = table!.foreignKeys.find(fk => fk.columnNames.indexOf("authorId") !== -1);
        await queryRunner.dropForeignKey("games", foreignKey!);
        await queryRunner.dropColumn("games", "authorId");
        await queryRunner.dropIndex("games", "IDX_GAME_TITLE");
        await queryRunner.dropTable("games");
    }

}
