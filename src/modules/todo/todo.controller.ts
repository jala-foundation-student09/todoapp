import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { TodoService } from './todo.service';

@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post()
  async create(@Body() createTodoDto: CreateTodoDto) {
    return this.todoService.create(createTodoDto);
  }

  @Get()
  async findAll() {
    return this.todoService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.todoService.findOne(id);
  }

  @Patch('tasks')
  async completeTasks(@Body() ids: string[]) {
    return this.todoService.completeTasks(ids);
  }

  @Put()
  async update(@Body() updateTodoDtos: UpdateTodoDto[]) {
    return this.todoService.update(updateTodoDtos);
  }

  @Delete()
  async remove(@Body('ids') ids: string[]) {
    return this.todoService.remove(ids);
  }
}
