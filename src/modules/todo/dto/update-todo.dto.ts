import { Optional } from '@nestjs/common';
import { PartialType } from '@nestjs/mapped-types';
import {
  IsBoolean,
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import { CreateTodoDto } from './create-todo.dto';

export class UpdateTodoDto extends PartialType(CreateTodoDto) {
  @IsString()
  @IsNotEmpty({ message: 'ID is mandatory!' })
  id: string;

  @IsOptional()
  @IsString()
  @MinLength(5, { message: 'Description must be at least 5 characters!' })
  description: string;

  @IsOptional()
  @IsString()
  @MinLength(5, { message: 'Category must be at least 5 characters!' })
  category: string;

  @IsOptional()
  @IsDateString({}, { message: 'Invalid deadline!' })
  deadline: string;

  @Optional()
  @IsBoolean()
  active: boolean;

  @IsOptional()
  @IsString({ message: 'Invalid status!' })
  @MinLength(5, { message: 'Status must be at least 5 characters!' })
  status: string;
}
