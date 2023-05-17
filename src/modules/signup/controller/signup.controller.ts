import { Body, Controller, Get, Post, Render, Request, UseGuards, ValidationPipe } from '@nestjs/common';

import { AuthSignUpDto } from '../dto/authsignup.dto';
import { SignupService } from '../service/signup.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('signup')
export class SignupController {
  constructor(private readonly signupService: SignupService) { }

  @Get()
  @Render('signup')
  root() {
    return
  }

  @Post()
  signUp(@Body(new ValidationPipe()) authsignup: AuthSignUpDto): Promise<any> {
    return this.signupService.signUp(authsignup)
  }
}
