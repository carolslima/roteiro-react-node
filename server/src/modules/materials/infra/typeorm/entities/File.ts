import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import uploadConfig from '../../../../../config/upload';

import { Expose } from 'class-transformer';

import User from '../../../../users/infra/typeorm/entities/User';
import Provider from '../../../../providers/infra/typeorm/entities/Provider';

@Entity('files')
class File {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  path: string;

  @Column('numeric')
  size: number;

  @Column()
  user_id_create: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id_create' })
  user_create: User;

  @Column()
  provider_id: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'provider_id' })
  provider: Provider;

  @Column('timestamp with time zone')
  schedule: Date;

  @Column('boolean')
  canceled: boolean;

  @Column()
  user_id_canceled: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id_canceled' })
  user_canceled: User;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Expose({ name: 'path_url' })
  getPathUrl(): string | null {
    if (!this.path) return null;

    switch (uploadConfig.driver) {
      case 'disk':
        return `${process.env.APP_API_URL}/files/${this.path}`;
      case 's3':
        return `https://${uploadConfig.config.aws.bucket}.s3.amazonaws.com/${this.path}`;
      default:
        return null;
    }
  }
}

export default File;
