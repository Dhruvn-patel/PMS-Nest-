import { Module } from '@nestjs/common';
import { ForgetemailService } from './forgetemail.service';
import { ForgetemailController } from './forgetemail.controller';
import { JwtService } from '@nestjs/jwt';
import { MailerModule } from '@nestjs-modules/mailer';
import { join } from 'path';
import { EjsAdapter } from '@nestjs-modules/mailer/dist/adapters/ejs.adapter';



@Module({
  imports: [
    MailerModule.forRoot({
      transport: 'smtps://user@domain.com:pass@smtp.domain.com',
      template: {
        dir: join(__dirname, '../../mail/templates'),
        adapter: new EjsAdapter(),
        options: {
          strict: false,
        },

      },
    })
  ],
  controllers: [ForgetemailController],
  providers: [ForgetemailService, JwtService]
})
export class ForgetemailModule { }
