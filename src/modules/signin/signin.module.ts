import { Module } from '@nestjs/common';
import { SigninService } from './service/signin.service';
import { SigninController } from './controller/signin.controller';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GoogleStrategy } from '../strategies/google.strategy';
@Module({
  imports: [PassportModule, ConfigModule],
  controllers: [SigninController],
  providers: [SigninService, PrismaService, JwtService, GoogleStrategy],

})
export class SigninModule { }
