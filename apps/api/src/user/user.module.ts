import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { CreateUserUseCase } from 'core-users';
import { PrismaUserRepository } from '../prisma-user.repository';
import { IUserRepository } from 'core-users';
import { PrismaClient } from '@prisma/client';

@Module({
  controllers: [UserController],
  providers: [
    {
      provide: PrismaClient,
      useValue: new PrismaClient(),
    },
    {
      provide: 'IUserRepository',
      useClass: PrismaUserRepository,
    },
    {
      provide: CreateUserUseCase,
      useFactory: (userRepository: IUserRepository) => {
        return new CreateUserUseCase(userRepository);
      },
      inject: ['IUserRepository'],
    },
  ],
})
export class UserModule {}
