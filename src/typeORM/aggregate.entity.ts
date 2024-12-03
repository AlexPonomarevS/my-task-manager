import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('aggregates')
export class Aggregate {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'int', nullable: false })
  version: number;
}
