import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { CreateTransactionDto } from 'src/transactions/application/dto/create-transaction.dto';
import { ProcessPaymentDto } from 'src/transactions/application/dto/process-payment.dto';
import { CreateTransactionUseCase } from 'src/transactions/application/use-case/create-transaction.use-case';
import { GetTransactionUseCase } from 'src/transactions/application/use-case/get-transaction.use-case';
import { ProcessTransactionPaymentUseCase } from 'src/transactions/application/use-case/process-transaction-payment.use-case';
// import { GetTransactionPaymentStatusUseCase } from '../../application/use-cases/'
import { GetTransactionPaymentStatusUseCase } from 'src/transactions/application/use-case/get-transaction-paymentstatus.use-case';

@Controller('transactions')
export class TransactionsController {
  constructor(
    private readonly createTransactionUseCase: CreateTransactionUseCase,
    private readonly getTransactionUseCase: GetTransactionUseCase,
    private readonly processTransactionPaymentUseCase: ProcessTransactionPaymentUseCase,
    private readonly getTransactionPaymentStatusUseCase: GetTransactionPaymentStatusUseCase,
  ) {}

  @Post()
  async create(@Body() dto: CreateTransactionDto) {
    return this.createTransactionUseCase.execute(dto);
  }

  @Get(':id')
  async findById(@Param('id', ParseIntPipe) id: number) {
    return this.getTransactionUseCase.execute(id);
  }

  @Post(':id/payment')
  async processPayment(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: ProcessPaymentDto,
  ) {
    return this.processTransactionPaymentUseCase.execute(id, dto);
  }

  @Get(':id/payment/status')
  async getPaymentStatus(@Param('id', ParseIntPipe) id: number) {
    return this.getTransactionPaymentStatusUseCase.execute(id);
  }
}
