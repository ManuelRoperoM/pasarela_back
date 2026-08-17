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
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Transactions')
@Controller('transactions')
export class TransactionsController {
  constructor(
    private readonly createTransactionUseCase: CreateTransactionUseCase,
    private readonly getTransactionUseCase: GetTransactionUseCase,
    private readonly processTransactionPaymentUseCase: ProcessTransactionPaymentUseCase,
    private readonly getTransactionPaymentStatusUseCase: GetTransactionPaymentStatusUseCase,
  ) {}

  @ApiOperation({
    summary: 'Crear una transacción',
    description: 'Crea una transacción en estado PENDING.',
  })
  @ApiResponse({
    status: 201,
    description: 'Transacción creada correctamente.',
  })
  @ApiResponse({
    status: 400,
    description: 'Datos de la transacción inválidos.',
  })
  @ApiResponse({
    status: 404,
    description: 'Usuario o producto no encontrado.',
  })
  @Post()
  async create(@Body() dto: CreateTransactionDto) {
    return this.createTransactionUseCase.execute(dto);
  }

  @ApiOperation({
    summary: 'Obtener una transacción',
  })
  @ApiResponse({
    status: 200,
    description: 'Transacción encontrada.',
  })
  @ApiResponse({
    status: 404,
    description: 'Transacción no encontrada.',
  })
  @Get(':id')
  async findById(@Param('id', ParseIntPipe) id: number) {
    return this.getTransactionUseCase.execute(id);
  }

  @ApiOperation({
    summary: 'Procesar el pago de una transacción',
    description: 'Tokeniza la tarjeta y procesa el pago mediante Wompi.',
  })
  @ApiResponse({
    status: 200,
    description: 'Pago procesado correctamente.',
  })
  @ApiResponse({
    status: 400,
    description: 'Datos de pago inválidos o error durante el procesamiento.',
  })
  @ApiResponse({
    status: 404,
    description: 'Transacción no encontrada.',
  })
  @Post(':id/payment')
  async processPayment(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: ProcessPaymentDto,
  ) {
    return this.processTransactionPaymentUseCase.execute(id, dto);
  }

  @ApiOperation({
    summary: 'Consultar estado del pago',
    description:
      'Consulta el estado actual de la transacción y actualiza el estado local cuando corresponde.',
  })
  @ApiResponse({
    status: 200,
    description: 'Estado de la transacción obtenido correctamente.',
  })
  @ApiResponse({
    status: 404,
    description: 'Transacción no encontrada.',
  })
  @Get(':id/payment/status')
  async getPaymentStatus(@Param('id', ParseIntPipe) id: number) {
    return this.getTransactionPaymentStatusUseCase.execute(id);
  }
}
