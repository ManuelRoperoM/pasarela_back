import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { CreateTransactionDto } from 'src/transactions/application/dto/create-transaction.dto';
import { CreateTransactionUseCase } from 'src/transactions/application/use-cases/create-transaction.use-case';
import { GetTransactionUseCase } from 'src/transactions/application/use-cases/get-transaction.use-case';

@Controller('transactions')
export class TransactionsController {
  constructor(
    private readonly createTransactionUseCase: CreateTransactionUseCase,
    private readonly getTransactionUseCase: GetTransactionUseCase,
  ) {}

  @Post()
  async create(@Body() dto: CreateTransactionDto) {
    return this.createTransactionUseCase.execute(dto);
  }

  @Get(':id')
  async findById(@Param('id', ParseIntPipe) id: number) {
    return this.getTransactionUseCase.execute(id);
  }
}
