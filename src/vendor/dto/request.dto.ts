import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class VendorCreateRequestDto {
  @IsNotEmpty({ message: 'Name cannot be empty' })
  @IsString({ message: 'Name must be a string' })
  name: string;

  @IsNotEmpty({ message: 'Name cannot be empty' })
  @IsString({ message: 'Name must be a string' })
  phone: string;

  @IsOptional()
  @IsString()
  address: string;
}

export class VendorUpdateRequestDto {
  name: string;
  phone: string;
  address: string;
}
