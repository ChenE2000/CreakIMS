import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  user_id: number;

  @Column()
  user_name: string;

  @Column()
  user_passwd: string;

  @Column()
  user_avatar: string;

  @Column()
  user_status: number;

  @Column()
  user_perm: string;

  @Column()
  user_created_time: Date;

  @Column()
  user_last_login_time: Date;
}
