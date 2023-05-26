/* eslint-disable prettier/prettier */
import { Global, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SignupModule } from './modules/signup/signup.module';
import { PrismaService } from './modules/prisma/prisma.service';
import { SigninModule } from './modules/signin/signin.module';
import { JwtStrategy } from './modules/strategies/jwt.strategy';
import { SignoutModule } from './modules/signout/signout.module';
import { DashboardModule } from './modules/dashboard/dashboard.module';
import { HomeModule } from './modules/home/home.module';
import { ForgetemailModule } from './modules/forgetemail/forgetemail.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { EjsAdapter } from '@nestjs-modules/mailer/dist/adapters/ejs.adapter';
import { join } from 'path';
import { ProductsModule } from './modules/products/products.module';
import { CategoryModule } from './modules/category/category.module';
import { CartModule } from './modules/cart/cart.module';
import { GoogleStrategy } from './modules/strategies/google.strategy';
import { UserModule } from './modules/user/user.module';




@Global()
@Module({
  imports: [SignupModule, SigninModule, SignoutModule, DashboardModule, HomeModule, ForgetemailModule
    , ConfigModule.forRoot({
      isGlobal: true,
    }), ProductsModule, CategoryModule, CartModule, UserModule,
    // MailerModule.forRoot({

    //   transport: 'smtps://user@domain.com:pass@smtp.domain.com',
    //   template: {
    //     dir: join(__dirname, 'templates'),
    //     adapter: new EjsAdapter(),
    //     options: {
    //       strict: false,
    //     },

    //   },
    // })
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService, JwtStrategy, GoogleStrategy],
})
export class AppModule { }
