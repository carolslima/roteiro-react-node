import { MigrationInterface, QueryRunner, Table } from 'typeorm';

import { idColumn, timestampColumns } from '../utils';

export default class CreateUsers1599928606587 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'users',
        columns: [
          idColumn,
          {
            name: 'name',
            type: 'varchar',
          },
          {
            name: 'email',
            type: 'varchar',
            isUnique: true,
          },
          {
            name: 'password',
            type: 'varchar',
          },
          {
            name: 'role',
            type: 'numeric',
          },
          {
            name: 'status',
            type: 'boolean',
            default: true,
          },
          {
            name: 'provider_id',
            type: 'uuid',
          },
          {
            name: 'avatar',
            type: 'varchar',
            default: null,
            isNullable: true,
          },
          ...timestampColumns,
        ],
        foreignKeys: [
          {
            name: 'UserProvider',
            columnNames: ['provider_id'],
            referencedTableName: 'providers',
            referencedColumnNames: ['id'],
            onDelete: 'SET NULL',
            onUpdate: 'CASCADE',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('users');
  }
}
