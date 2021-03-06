import {MigrationInterface, QueryRunner, TableForeignKey, TableColumn} from "typeorm";

export default class AddategoryIdToTransactions1632525446460 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            'transactions',
            new TableColumn({
                name: 'category_id',
                type: 'uuid',
                isNullable: true,
            }),
        );

            await queryRunner.createForeignKey(
                'transactions',
                new TableForeignKey({
                    columnNames: ['category_id'],
                    referencedColumnNames: ['id'],
                    referencedTableName: 'categories',
                    name: 'TransactionCategory',
                    onUpdate: 'CASCADE',
                    onDelete: 'SET NULL',
                }),
            );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('transactions', 'transactionCategory');
        await queryRunner.dropColumn('transactions', 'category_id');
    }

}
