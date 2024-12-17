import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Task {
  @PrimaryGeneratedColumn('uuid')
  entityId: string;

  @Column()
  id: string;

  @Column()
  projectID: string;

  @Column()
  name: string;

  @Column()
  completed: boolean;

  @Column()
  status: string;
}
