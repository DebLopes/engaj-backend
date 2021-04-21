import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

import Goal from './Goal';

@Entity('task')
class Task {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  description: string;

  @Column()
  done: boolean;

  @Column()
  goal_id: string;

  @ManyToOne(() => Goal)
  @JoinColumn({ name: 'goal_id' })
  goal: Goal;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Task;
