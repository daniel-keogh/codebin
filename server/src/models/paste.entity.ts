import {
  BaseEntity,
  Entity,
  Column,
  ManyToOne,
  PrimaryColumn,
  BeforeInsert,
} from 'typeorm';
import { User } from './user.entity';
import { RandomId } from '../utils/random-id.util';

@Entity()
export class Paste extends BaseEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  content: string;

  @Column({ default: 'text/plain' })
  mimeType: string;

  @Column({ default: () => `now()` })
  createdAt: Date;

  @Column({ nullable: true })
  expireAfterMinutes: number;

  @ManyToOne(
    type => User,
    user => user.pastes,
    { eager: false },
  )
  user: User;

  @Column({ default: null })
  userId: number;

  @BeforeInsert()
  private beforeInsert() {
    this.id = RandomId.generate(this.mimeType);
  }
}
