import { IsNotEmpty, IsString } from 'class-validator';
import { PaginationRequestDto } from 'src/types/pagination';

export class UomCreateRequestDto {
  @IsNotEmpty({ message: 'Name cannot be empty' })
  @IsString({ message: 'Name must be a string' })
  name: string;
}

export class UomUpdateRequestDto extends UomCreateRequestDto {}

export class UomRequestDto extends PaginationRequestDto {
  @IsString({ message: 'Name must be a string' })
  name: string;
}
