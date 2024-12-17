import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class ProjectStatus {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  projectId: string;

  @Column()
  status: string;
}
