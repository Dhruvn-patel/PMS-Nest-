import { Module } from '@nestjs/common';
import { SigninService } from './service/signin.service';
import { SigninController } from './controller/signin.controller';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [SigninController],
  providers: [SigninService, PrismaService]
})
export class SigninModule { }
