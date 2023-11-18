import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

@Injectable()
export class TodoService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createTodoDto: CreateTodoDto) {
    try {
      const todoExists = await this.prismaService.toDo.findFirst({
        where: {
          description: createTodoDto.description,
          active: true,
        },
      });

      if (todoExists) {
        throw new ConflictException('ToDo already exists!');
      }

      return this.prismaService.toDo.create({
        data: createTodoDto,
      });
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async findAll() {
    try {
      const todos = await this.prismaService.toDo.findMany();
      return todos;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async findOne(id: string) {
    try {
      const todoExists = await this.prismaService.toDo.findUnique({
        where: {
          id,
        },
      });

      if (!todoExists) {
        throw new NotFoundException('Todo not found!');
      }

      return todoExists;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async update(updateTodoDtos: UpdateTodoDto[]) {
    try {
      const updatedTodos = [];
      for (const updateTodoDto of updateTodoDtos) {
        const toDoExists = await this.prismaService.toDo.findUnique({
          where: {
            id: updateTodoDto.id,
          },
        });

        if (!toDoExists) {
          throw new NotFoundException('ToDo not found!');
        }

        updateTodoDto.status =
          updateTodoDto.status &&
          updateTodoDto.status.substring(0, 1).toUpperCase() +
            updateTodoDto.status.substring(1).toLowerCase();

        const updatedTodo = await this.prismaService.toDo.update({
          where: {
            id: updateTodoDto.id,
          },
          data: updateTodoDto,
        });

        updatedTodos.push(updatedTodo);
      }
      return updateTodoDtos;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async remove(ids: string[]) {
    try {
      for (const id of ids) {
        const toDoExists = await this.prismaService.toDo.findUnique({
          where: {
            id,
          },
        });

        if (!toDoExists) {
          throw new NotFoundException('ToDo not found!');
        }

        await this.prismaService.toDo.update({
          where: {
            id,
          },
          data: {
            active: false,
          },
        });
      }

      return `Successfully deleted ToDo(s)`;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async completeTasks(ids: string[]) {
    try {
      for (const id of ids) {
        const toDoExists = await this.prismaService.toDo.findUnique({
          where: {
            id,
          },
        });

        if (!toDoExists) {
          throw new NotFoundException('ToDo not found!');
        }

        await this.prismaService.toDo.update({
          where: {
            id,
          },
          data: {
            status: 'Completed',
            active: false,
          },
        });
      }

      return `Successfully completed ToDo(s)`;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
