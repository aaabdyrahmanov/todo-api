import {
 Entity,
 PrimaryGeneratedColumn,
 Column,
 CreateDateColumn,
 UpdateDateColumn,
} from 'typeorm';
import {IsNotEmpty} from 'class-validator';

import {TaskStatusType} from './task.interface';

@Entity({name: 'tasks'})
export class Task {
  @PrimaryGeneratedColumn('uuid')
   id!: string;

  @Column()
  @IsNotEmpty()
   name!: string;

  @Column({
   type: 'enum',
   enum: ['to-do', 'in-progress', 'completed'],
   default: 'to-do',
  })
   status!: TaskStatusType;

  @Column({
   default: true,
   select: false,
  })
   isActive?: boolean;

  @CreateDateColumn()
   createdAt!: Date;

  @UpdateDateColumn()
   updatedAt!: Date;
}
