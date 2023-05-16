import { Module } from '@nestjs/common';
import { SignupService } from './service/signup.service';
import { SignupController } from './controller/signup.controller';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [SignupController],
  providers: [SignupService, PrismaService],

})
export class SignupModule { }
