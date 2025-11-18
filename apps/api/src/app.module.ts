import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { PrismaClient } from '@prisma/client';

@Module({
  imports: [UserModule],
  providers: [
    {
      provide: PrismaClient,
      useValue: new PrismaClient(),
    },
  ],
})
export class AppModule {}
