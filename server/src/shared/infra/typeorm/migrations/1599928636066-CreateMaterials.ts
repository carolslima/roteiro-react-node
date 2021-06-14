import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

import { idColumn, timestampColumns } from '../utils';

export default class CreateMaterials1599928636066
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'materials',
        columns: [
          idColumn,
          {
            name: 'cm',
            type: 'numeric',
            isNullable: true,
          },
          {
            name: 'title',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'duration',
            type: 'numeric',
            isNullable: true,
          },
          {
            name: 'type',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'client',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'signal_id',
            type: 'uuid',
            isNullable: true,
          },
          {
            name: 'position',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'program',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'include',
            type: 'boolean',
            default: false,
            isNullable: false,
          },
          {
            name: 'user_id_create',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'user_id_update',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'status',
            type: 'boolean',
            default: true,
            isNullable: false,
          },
          {
            name: 'blank',
            type: 'boolean',
            default: false,
            isNullable: false,
          },
          {
            name: 'time_start',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'time_end',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'time_duration',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'details',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'provider_id',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'list_position',
            type: 'decimal',
            precision: 10,
            scale: 3,
            isNullable: false,
          },
          {
            name: 'file_id',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'schedule',
            type: 'timestamp with time zone',
            isNullable: false,
          },
          ...timestampColumns,
        ],
      }),
    );

    await queryRunner.createForeignKey(
      'materials',
      new TableForeignKey({
        columnNames: ['user_id_create'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        name: 'MaterialUserCreate',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'materials',
      new TableForeignKey({
        columnNames: ['user_id_update'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        name: 'MaterialUserUpdade',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'materials',
      new TableForeignKey({
        columnNames: ['provider_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'providers',
        name: 'MaterialProvider',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'materials',
      new TableForeignKey({
        columnNames: ['file_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'files',
        name: 'MaterialFile',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('materials', 'MaterialFile');

    await queryRunner.dropForeignKey('materials', 'MaterialProvider');

    await queryRunner.dropForeignKey('materials', 'MaterialUserUpdade');

    await queryRunner.dropForeignKey('materials', 'MaterialUserCreate');

    await queryRunner.dropTable('materials');
  }
}
