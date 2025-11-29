// src/database/entities/course-department.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Course } from './course.entity';

@Entity('course_departments')
export class CourseDepartment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  course_id: string;

  @Column()
  department_id: string;

  @Column()
  year_id: string;

  @ManyToOne(() => Course, (course) => course.courseDepartments, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'course_id' })
  course: Course;
}
