import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { User } from '../database/entities/user.entity';
import { Department } from '../database/entities/department.entity';
import { Year } from '../database/entities/year.entity';
import { Course } from '../database/entities/course.entity';
import { Enrollment } from '../database/entities/enrollment.entity';
import { CourseDepartment } from '../database/entities/course-department.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
      Department,
      Year,
      Course,
      Enrollment,
      CourseDepartment,
    ]),
    JwtModule.register({}),
  ],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
