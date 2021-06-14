import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

import { idColumn, timestampColumns } from '../utils';

export default class CreateFiles1599928619026 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'files',
        columns: [
          idColumn,
          {
            name: 'name',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'path',
            type: 'varchar',
            isNullable: false,
            isUnique: true,
          },
          {
            name: 'size',
            type: 'numeric',
          },
          {
            name: 'user_id_create',
            type: 'uuid',
          },
          {
            name: 'provider_id',
            type: 'uuid',
          },
          {
            name: 'schedule',
            type: 'timestamp with time zone',
          },
          {
            name: 'canceled',
            type: 'boolean',
            default: false,
          },
          {
            name: 'canceled_at',
            type: 'timestamp with time zone',
            default: null,
            isNullable: true,
          },
          {
            name: 'user_id_canceled',
            type: 'uuid',
            default: null,
            isNullable: true,
          },
          ...timestampColumns,
        ],
      }),
    );

    await queryRunner.createForeignKey(
      'files',
      new TableForeignKey({
        columnNames: ['user_id_create'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        name: 'FileUserCreate',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'files',
      new TableForeignKey({
        columnNames: ['user_id_canceled'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        name: 'FileUserCanceled',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'files',
      new TableForeignKey({
        columnNames: ['provider_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'providers',
        name: 'FileProvider',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('files', 'FileProvider');

    await queryRunner.dropForeignKey('files', 'FileUserCanceled');

    await queryRunner.dropForeignKey('files', 'FileUserCreate');

    await queryRunner.dropTable('files');
  }
}
