import { Body, Controller, Post } from '@nestjs/common';
import { AuthLoginDto } from '../dto/authlogin.dto';
import { SigninService } from '../service/signin.service';

@Controller('signin')
export class SigninController {
  constructor(private readonly signinService: SigninService) { }

  @Post('login')
  signIn(@Body() authsignin: AuthLoginDto) {
    return this.signinService.signIn(authsignin);
  }
}
