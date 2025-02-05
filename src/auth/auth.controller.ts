import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { RegisterRequestDto, RegisterResponseDto } from './dto/auth.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/register')
  public async register(
    @Body() registerRequestDto: RegisterRequestDto,
  ): Promise<RegisterResponseDto> {
    // check password and retype password is same or not
    if (registerRequestDto.password !== registerRequestDto.retypePassword) {
      throw new BadRequestException('Password and retype password is not same');
    }

    return this.authService.register(registerRequestDto);
  }

  // @Post()
  // public async login(@Body() loginRequestDto: LoginRequestDto) {}
}
