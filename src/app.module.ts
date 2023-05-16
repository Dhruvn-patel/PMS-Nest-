import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SignupModule } from './modules/signup/signup.module';
import { PrismaService } from './modules/prisma/prisma.service';
import { SigninModule } from './modules/signin/signin.module';


@Module({
  imports: [SignupModule, SigninModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule { }
