// src/auth/dtos/register.dto.ts
import { IsEmail, IsString, IsUUID, MinLength } from 'class-validator';

export class RegisterDto {
  @IsString()
  matric_number: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8)
  password: string;

  @IsString()
  name: string;

  @IsUUID()
  department_id: string;

  @IsUUID()
  year_id: string;
}
