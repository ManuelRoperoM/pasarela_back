import { Body, Controller, Post } from '@nestjs/common';
import { CreateTransactionDto } from 'src/transactions/application/dto/create-transaction.dto';
import { CreateTransactionUseCase } from 'src/transactions/application/use-cases/create-transaction.use-case';

@Controller('transactions')
export class TransactionsController {
  constructor(
    private readonly createTransactionUseCase: CreateTransactionUseCase,
  ) {}

  @Post()
  async create(@Body() dto: CreateTransactionDto) {
    return this.createTransactionUseCase.execute(dto);
  }
}
