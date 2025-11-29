// src/database/entities/course-lecturer.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Course } from './course.entity';
import { User } from './user.entity';

@Entity('course_lecturers')
export class CourseLecturer {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  course_id: string;

  @Column()
  lecturer_id: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @ManyToOne(() => Course, (course) => course.courseLecturers, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'course_id' })
  course: Course;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'lecturer_id' })
  lecturer: User;
}
