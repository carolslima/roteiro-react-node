import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

import { idColumn, timestampColumns } from '../utils';

export default class CreateSignals1600366904805 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'signals',
        columns: [
          idColumn,
          {
            name: 'name',
            type: 'varchar',
          },
          {
            name: 'type',
            type: 'varchar',
          },
          ...timestampColumns,
        ],
      }),
    );

    await queryRunner.createForeignKey(
      'materials',
      new TableForeignKey({
        columnNames: ['signal_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'signals',
        name: 'MaterialSignal',
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('materials', 'MaterialSignal');

    await queryRunner.dropTable('signals');
  }
}
