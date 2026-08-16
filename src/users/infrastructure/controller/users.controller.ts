import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { CreateUserDto } from 'src/users/application/dto/create-user.dto';
import { CreateUserUseCase } from 'src/users/application/use-cases/create-user.use.case';
import { GetUserByIdUseCase } from 'src/users/application/use-cases/get-user-byId.use-case';

@Controller('users')
export class UsersController {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly getUserByIdUseCase: GetUserByIdUseCase,
  ) {}

  @Post()
  async Create(@Body() dto: CreateUserDto) {
    return this.createUserUseCase.execute(dto);
  }

  @Get(':id')
  async GetUserById(@Param('id', ParseIntPipe) id: number) {
    return this.getUserByIdUseCase.execute(id);
  }
}
