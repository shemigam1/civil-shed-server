// src/database/entities/year.entity.ts
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('years')
export class Year {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;
}
