import {
  BaseEntity,
  Entity,
  Column,
  ManyToOne,
  PrimaryColumn,
  BeforeInsert,
} from 'typeorm';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { User } from './user.entity';
import { RandomId } from '../utils/random-id.util';
import { Exclude } from 'class-transformer';

@Entity()
export class Paste extends BaseEntity {
  @PrimaryColumn()
  @ApiProperty({
    description: "The paste's ID.",
    example: 'cabaracave',
  })
  id: string;

  @Column()
  @ApiProperty({
    description: "The paste's content.",
    example: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
  })
  content: string;

  @Column({ default: 'text/plain' })
  @ApiPropertyOptional({
    description: 'The MIME type of this paste.',
    default: 'text/plain',
  })
  mimeType: string;

  @Column({ default: () => `now()` })
  @ApiProperty()
  createdAt: Date;

  @Column({ nullable: true })
  @ApiPropertyOptional({
    description: 'Number of minutes until this paste is automatically deleted.',
    default: null,
    minimum: 1,
    example: 10,
  })
  expireAfterMinutes: number;

  @ManyToOne(
    type => User,
    user => user.pastes,
    { eager: false },
  )
  @Exclude({ toPlainOnly: true })
  user: User;

  @Column({ default: null })
  @Exclude({ toPlainOnly: true })
  userId: number;

  @BeforeInsert()
  private beforeInsert() {
    this.id = RandomId.generate(this.mimeType);
  }
}
