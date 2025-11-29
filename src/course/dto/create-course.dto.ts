import { IsString, IsUUID, IsArray, IsNumber } from 'class-validator';

export class CreateCourseDto {
  @IsString()
  name: string;

  @IsString()
  code: string;

  @IsString()
  description: string;

  @IsNumber()
  semester: number;

  @IsArray()
  @IsUUID('4', { each: true })
  lecturers: string[]; // lecturer user IDs

  @IsArray()
  departmentYears: Array<{ department_id: string; year_id: string }>;
}
