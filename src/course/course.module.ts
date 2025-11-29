import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoursesService } from './course.service';
import { CoursesController } from './course.controller';
import { Course } from '../database/entities/course.entity';
import { CourseLecturer } from '../database/entities/course-lecturer.entity';
import { CourseDepartment } from '../database/entities/course-department.entity';
import { User } from '../database/entities/user.entity';
import { Enrollment } from '../database/entities/enrollment.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Course,
      CourseLecturer,
      CourseDepartment,
      User,
      Enrollment,
    ]),
  ],
  providers: [CoursesService],
  controllers: [CoursesController],
})
export class CoursesModule {}
