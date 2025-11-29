// src/database/data-source.ts
import { DataSourceOptions } from 'typeorm';
import { User } from './entities/user.entity';
import { Department } from './entities/department.entity';
import { Year } from './entities/year.entity';
import { Course } from './entities/course.entity';
import { CourseDepartment } from './entities/course-department.entity';
import { CourseLecturer } from './entities/course-lecturer.entity';
import { Enrollment } from './entities/enrollment.entity';

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  url: process.env.DATABASE_URL, // ← Use the full connection string
  entities: [
    User,
    Department,
    Year,
    Course,
    CourseDepartment,
    CourseLecturer,
    Enrollment,
  ],
  synchronize: process.env.NODE_ENV !== 'production',
  logging: process.env.NODE_ENV === 'development',
  ssl: true, // ← Required for Neon
};
