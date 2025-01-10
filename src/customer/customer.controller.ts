import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CustomerService } from './customer.service';
import { Customer } from './repository/customer.entity';
import {
  CustomerCreateRequestDto,
  CustomerUpdateRequestDto,
} from './dto/request.dto';

@Controller('customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Get('/')
  @HttpCode(200)
  public async getCustomers(): Promise<Customer[]> {
    return this.customerService.getCustomers();
  }

  @Post('/')
  @HttpCode(201)
  public async createCustomer(
    @Body() customerCreateRequestDto: CustomerCreateRequestDto,
  ): Promise<Customer> {
    return this.customerService.createCustomer(customerCreateRequestDto);
  }

  @Get('/:id')
  @HttpCode(200)
  public async getCustomer(@Param('id') id: string): Promise<Customer> {
    return this.customerService.getCustomer(id);
  }

  @Put('/:id')
  @HttpCode(200)
  public async updateCustomer(
    @Param('id') id: string,
    @Body() customerUpdateRequestDto: CustomerUpdateRequestDto,
  ): Promise<Customer> {
    return this.customerService.updateCustomer(id, customerUpdateRequestDto);
  }

  @Delete('/:id')
  @HttpCode(200)
  public async deleteCustomer(@Param('id') id: string): Promise<Customer> {
    return this.customerService.deleteCustomer(id);
  }
}
