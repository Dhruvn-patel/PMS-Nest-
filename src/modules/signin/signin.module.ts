import { Module } from '@nestjs/common';
import { SigninService } from './service/signin.service';
import { SigninController } from './controller/signin.controller';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';


@Module({
  imports: [PassportModule],
  controllers: [SigninController],
  providers: [SigninService, PrismaService, JwtService],

})
export class SigninModule { }
