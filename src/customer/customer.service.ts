import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Customer } from './repository/customer.entity';
import { Repository } from 'typeorm';
import {
  CustomerCreateRequestDto,
  CustomerUpdateRequestDto,
} from './dto/request.dto';

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>,
  ) {}

  async getCustomers(): Promise<Customer[]> {
    return this.customerRepository.find();
  }

  async createCustomer(
    customerCreateRequestDto: CustomerCreateRequestDto,
  ): Promise<Customer> {
    return this.customerRepository.save(customerCreateRequestDto);
  }

  async getCustomer(id: string): Promise<Customer> {
    return this.customerRepository.findOneBy({ id });
  }

  async updateCustomer(
    id: string,
    customerUpdateRequestDto: CustomerUpdateRequestDto,
  ): Promise<Customer> {
    const customer = await this.customerRepository.findOneBy({ id });
    customer.name = customerUpdateRequestDto.name || customer.name;
    customer.phone = customerUpdateRequestDto.phone || customer.phone;
    customer.address = customerUpdateRequestDto.address || customer.address;
    customer.isStore = customerUpdateRequestDto.isStore || customer.isStore;
    return this.customerRepository.save(customer);
  }

  async deleteCustomer(id: string): Promise<Customer> {
    return this.customerRepository.remove(
      await this.customerRepository.findOneBy({ id }),
    );
  }
}
