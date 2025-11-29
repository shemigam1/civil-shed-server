// src/auth/auth.service.ts
import {
  Injectable,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User, UserRole } from '../database/entities/user.entity';
import { Department } from '../database/entities/department.entity';
import { Year } from '../database/entities/year.entity';
import { Enrollment } from '../database/entities/enrollment.entity';
import { Course } from '../database/entities/course.entity';
import { CourseDepartment } from '../database/entities/course-department.entity';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Department)
    private departmentRepository: Repository<Department>,
    @InjectRepository(Year)
    private yearRepository: Repository<Year>,
    @InjectRepository(Enrollment)
    private enrollmentRepository: Repository<Enrollment>,
    @InjectRepository(Course)
    private courseRepository: Repository<Course>,
    @InjectRepository(CourseDepartment)
    private courseDepartmentRepository: Repository<CourseDepartment>,
    private jwtService: JwtService,
  ) {}

  async register(dto: RegisterDto) {
    // Validate department and year exist
    const dept = await this.departmentRepository.findOne({
      where: { id: dto.department_id },
    });
    if (!dept) throw new BadRequestException('Department not found');

    const year = await this.yearRepository.findOne({
      where: { id: dto.year_id },
    });
    if (!year) throw new BadRequestException('Year not found');

    // Check if matric number or email already exists
    const existingMatric = await this.userRepository.findOne({
      where: { matric_number: dto.matric_number },
    });
    if (existingMatric)
      throw new BadRequestException('Matric number already registered');

    const existingEmail = await this.userRepository.findOne({
      where: { email: dto.email },
    });
    if (existingEmail)
      throw new BadRequestException('Email already registered');

    // Hash password
    const hashedPassword = await bcrypt.hash(dto.password, 10);

    // Create user
    const user = this.userRepository.create({
      matric_number: dto.matric_number,
      email: dto.email,
      password: hashedPassword,
      name: dto.name,
      role: UserRole.STUDENT,
      department_id: dto.department_id,
      year_id: dto.year_id,
    });

    await this.userRepository.save(user);

    // Auto-enroll in courses for this department + year
    const courseDepts = await this.courseDepartmentRepository.find({
      where: {
        department_id: dto.department_id,
        year_id: dto.year_id,
      },
    });

    for (const cd of courseDepts) {
      const enrollment = this.enrollmentRepository.create({
        user_id: user.id,
        course_id: cd.course_id,
        role: 'student',
      });
      await this.enrollmentRepository.save(enrollment);
    }

    return this.generateTokens(user);
  }

  async login(dto: LoginDto) {
    const user = await this.userRepository.findOne({
      where: { email: dto.email },
    });
    if (!user) throw new UnauthorizedException('Invalid credentials');

    const passwordMatch = await bcrypt.compare(dto.password, user.password);
    if (!passwordMatch) throw new UnauthorizedException('Invalid credentials');

    return this.generateTokens(user);
  }

  generateTokens(user: User) {
    const accessToken = this.jwtService.sign(
      { sub: user.id, email: user.email, role: user.role },
      { expiresIn: '15m' },
    );

    const refreshToken = this.jwtService.sign(
      { sub: user.id },
      { expiresIn: '7d', secret: process.env.REFRESH_TOKEN_SECRET },
    );

    return { accessToken, refreshToken };
  }

  async validateRefreshToken(token: string) {
    try {
      const payload = this.jwtService.verify(token, {
        secret: process.env.REFRESH_TOKEN_SECRET,
      });
      return payload;
    } catch {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }
}
