import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

import { idColumn, timestampColumns } from '../utils';

export default class CreateInformations1599928652773
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'informations',
        columns: [
          idColumn,
          {
            name: 'content',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'user_id_send',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'user_id_from',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'provider_id',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'read',
            type: 'boolean',
            default: false,
            isNullable: false,
          },
          {
            name: 'type',
            type: 'varchar',
            isNullable: false,
          },
          ...timestampColumns,
        ],
      }),
    );

    await queryRunner.createForeignKey(
      'informations',
      new TableForeignKey({
        columnNames: ['user_id_send'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        name: 'InformationUserSend',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'informations',
      new TableForeignKey({
        columnNames: ['user_id_from'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        name: 'InformationUserFrom',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'informations',
      new TableForeignKey({
        columnNames: ['provider_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'providers',
        name: 'InformationProvider',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('informations', 'InformationProvider');

    await queryRunner.dropForeignKey('informations', 'InformationUserFrom');

    await queryRunner.dropForeignKey('informations', 'InformationUserSend');

    await queryRunner.dropTable('informations');
  }
}
