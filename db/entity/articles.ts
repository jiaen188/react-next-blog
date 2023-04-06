import {BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn, JoinColumn} from 'typeorm';
import {User} from './user';

@Entity({name: 'articles'})
export class Articles extends BaseEntity {
  @PrimaryGeneratedColumn()
  readonly id!: number;

  @Column()
  title!: string;

  @Column()
  content!: string;

  @Column()
  views!: number;

  @Column()
  create_time!: Date;

  @Column()
  update_time!: Date;

  @Column()
  is_delete!: number;

  @ManyToOne(() => User, {
    cascade: true,
  })
  @JoinColumn({name: 'user_id'})
  user!: User;
}
