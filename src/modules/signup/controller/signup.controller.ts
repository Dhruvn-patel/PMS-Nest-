import { Body, Controller, Get, Post, Render } from '@nestjs/common';
import { AuthSignUpDto } from '../dto/authsignup.dto';
import { SignupService } from '../service/signup.service';

@Controller('signup')
export class SignupController {
  constructor(private readonly signupService: SignupService) { }

  @Get()
  @Render('signup')
  root() {
    return
  }

  @Post()
  signUp(@Body() authsignup: AuthSignUpDto): Promise<any> {
    return this.signupService.signUp(authsignup)


  }
}
