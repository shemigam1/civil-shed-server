// src/database/entities/course.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { CourseDepartment } from './course-department.entity';
import { Enrollment } from './enrollment.entity';
import { CourseLecturer } from './course-lecturer.entity';

@Entity('courses')
export class Course {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  code: string;

  @Column()
  description: string;

  @Column()
  semester: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @OneToMany(() => CourseDepartment, (cd) => cd.course)
  courseDepartments: CourseDepartment[];

  @OneToMany(() => CourseLecturer, (cl) => cl.course)
  courseLecturers: CourseLecturer[];

  @OneToMany(() => Enrollment, (e) => e.course)
  enrollments: Enrollment[];
}
