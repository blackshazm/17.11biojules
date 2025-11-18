import { Controller, Post, Body, ConflictException, HttpStatus, HttpCode } from '@nestjs/common';
import { CreateUserUseCase } from 'core-users';
import { CreateUserDto } from './create-user.dto';

@Controller('auth')
export class UserController {
  constructor(private readonly createUserUseCase: CreateUserUseCase) {}

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() createUserDto: CreateUserDto) {
    try {
      const user = await this.createUserUseCase.execute(createUserDto);
      return {
        id: user.id,
        name: user.name,
        email: user.email,
        cpf: user.cpf,
        commissionRate: user.commissionRate,
        accountStatus: user.accountStatus,
      };
    } catch (error: any) {
      if (error.message.includes('already exists')) {
        throw new ConflictException(error.message);
      }
      throw error;
    }
  }
}
