import { IsNotEmpty, IsString } from 'class-validator';

export class LoginRequestDto {
  email: string;
  password: string;
}

export class RegisterRequestDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  retypePassword: string;
}

export class RegisterResponseDto {
  status: number;
  msg: string;
}
