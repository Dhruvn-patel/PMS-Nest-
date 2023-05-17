import { Module } from '@nestjs/common';
import { SignoutService } from './signout.service';
import { SignoutController } from './signout.controller';
import { JwtModule } from '@nestjs/jwt';

@Module({
  controllers: [SignoutController],
  providers: [SignoutService],
  imports: [JwtModule]
})
export class SignoutModule { }
