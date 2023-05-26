import { Body, Controller, Get, Post, Redirect, Render, Req, Request, Res, UseGuards, ValidationPipe } from '@nestjs/common';

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

  async signUp(@Body(new ValidationPipe()) authsignup: AuthSignUpDto, @Req() req, @Res() res) {
    try {
      const resdata = await this.signupService.signUp(authsignup, authsignup.googleId)

      if (resdata.errorCode === 409) {
        res.status(409).json({
          errmsg: 'Email is already registered',
          data: null,
          status: 409,
        });
      }
      else if (resdata.errorCode === 200) {
        return res.redirect('/signin')
      }
    } catch (error) {
      console.log(error.message);
      return error;
    }

  }
}