import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class ProjectTasks {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  projectId: string;

  @Column()
  taskId: string;
}
