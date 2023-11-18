import { Optional } from '@nestjs/common';
import {
  IsBoolean,
  IsDateString,
  IsNotEmpty,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateTodoDto {
  @IsString()
  @MinLength(5, { message: 'Description must be at least 5 characters!' })
  @IsNotEmpty({ message: 'Description is mandatory!' })
  description: string;

  @IsString()
  @MinLength(5, { message: 'Category must be at least 5 characters!' })
  @IsNotEmpty({ message: 'Category is mandatory!' })
  category: string;

  @IsDateString({}, { message: 'Invalid deadline!' })
  @IsNotEmpty({ message: 'Deadline is mandatory!' })
  deadline: string;

  @Optional()
  @IsBoolean()
  active: boolean;

  @IsString({ message: 'Invalid status!' })
  @MinLength(5, { message: 'Status must be at least 5 characters!' })
  @IsNotEmpty({ message: 'Status is mandatory!' })
  status: string;
}
