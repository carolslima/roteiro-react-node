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

@Entity('informations')
class Information {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  content: string;

  @Column('uuid')
  user_id_send: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id_send' })
  user_send: User;

  @Column('uuid')
  user_id_from: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id_from' })
  user_from: User;

  @Column()
  provider_id: string;

  @ManyToOne(() => Provider)
  @JoinColumn({ name: 'provider_id' })
  provider: Provider;

  @Column('boolean')
  read: boolean;

  @Column()
  type: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Information;
