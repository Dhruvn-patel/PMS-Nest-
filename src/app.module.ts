import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SignupModule } from './modules/signup/signup.module';
import { PrismaService } from './modules/prisma/prisma.service';
import { SigninModule } from './modules/signin/signin.module';
import { JwtStrategy } from './modules/strategies/jwt.strategy';
import { SignoutModule } from './modules/signout/signout.module';





@Module({
  imports: [SignupModule, SigninModule, SignoutModule],
  controllers: [AppController],
  providers: [AppService, PrismaService, JwtStrategy],
})
export class AppModule { }
