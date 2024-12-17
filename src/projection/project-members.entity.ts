import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class ProjectMembers {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  projectId: string;

  @Column()
  userId: string;
}
