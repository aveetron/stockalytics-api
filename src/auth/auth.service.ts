import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Auth } from './repository/auth.entity';
import { Repository } from 'typeorm';
import { RegisterRequestDto, RegisterResponseDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Auth) private readonly authRepository: Repository<Auth>,
  ) {}

  async register(
    registerRequestDto: RegisterRequestDto,
  ): Promise<RegisterResponseDto> {
    // find user by email
    const user = await this.authRepository.findOne({
      where: { email: registerRequestDto.email },
    });

    // check user exists or not
    if (user) {
      return {
        status: 400,
        msg: 'User already exist',
      };
    }

    // create user
    const newUser = this.authRepository.create(registerRequestDto);
    newUser.isActive = true;
    await this.authRepository.save(newUser);

    return {
      status: 200,
      msg: 'User created successfully',
    };
  }
}
