import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import User from '../../../../users/infra/typeorm/entities/User';
import Provider from '../../../../providers/infra/typeorm/entities/Provider';
import Signal from '../../../../signals/infra/typeorm/entities/Signal';
import File from './File';

@Entity('materials')
class Material {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('numeric')
  cm: number;

  @Column()
  title: string;

  @Column('numeric')
  duration: number;

  @Column()
  type: string;

  @Column()
  client: string;

  @Column()
  signal_id: string;

  @ManyToOne(() => Signal)
  @JoinColumn({ name: 'signal_id' })
  signal: Signal;

  @Column()
  position: string;

  @Column()
  program: string;

  @Column('boolean')
  include: boolean;

  @Column()
  user_id_create: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id_create' })
  user_create: User;

  @Column()
  user_id_update: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id_update' })
  user_update: User;

  @Column('boolean')
  status: boolean;

  @Column('boolean')
  blank: boolean;

  @Column()
  time_start: string;

  @Column()
  time_duration: string;

  @Column()
  time_end: string;

  @Column()
  details: string;

  @Column()
  provider_id: string;

  @ManyToOne(() => Provider)
  @JoinColumn({ name: 'provider_id' })
  provider: Provider;

  @Column('decimal')
  list_position: number;

  @Column()
  file_id: string;

  @ManyToOne(() => File)
  @JoinColumn({ name: 'file_id' })
  file: File;

  @Column('timestamp with time zone')
  schedule: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Material;
