import { Controller, Get, Post, Request, Response } from '@nestjs/common';
import { ForgetemailService } from './forgetemail.service';
import { JwtService } from '@nestjs/jwt';
import { MailerService } from '@nestjs-modules/mailer';
@Controller('forgetemail')
export class ForgetemailController {
  constructor(private readonly forgetemailService: ForgetemailService,
    private readonly jwtService: JwtService,
    private readonly mailerService: MailerService) { }

  @Get()
  async forgetMail(@Request() req, @Response({ passthrough: true }) res) {
    const getToken = req.cookies['JWT_TOKEN'];
    const dataget = await this.jwtService.verifyAsync(
      getToken,
      {
        secret: process.env.JWT_SECRET,
      }
    );
    const { email, name } = dataget;
    // return res.render('forgetpass', { data: email })
    return this.forgetemailService.sendMail(email, name);
  }
  @Post()
  async resetpassword() {
  }
}
