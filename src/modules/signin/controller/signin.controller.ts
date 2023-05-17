import { Body, Controller, Get, Post, Render, Req, Request, Response, UseGuards, ValidationPipe } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';
import { AuthLoginDto } from '../dto/authlogin.dto';
import { SigninService } from '../service/signin.service';

@Controller('signin')
export class SigninController {
  constructor(private readonly signinService: SigninService,
    private readonly jwtService: JwtService) { }

  /* ejs of login */
  // @Get()
  // @Render('signin')
  // root() {
  //   return;
  // }

  @UseGuards(AuthGuard('jwt'))
  @Get('dash')
  @Render('dashboard')
  root() {
    return
  }



  @Post()
  async signIn(@Body(new ValidationPipe()) authsignin: AuthLoginDto, @Request() req, @Response({ passthrough: true }) res) {
    const getToken = await this.signinService.signIn(authsignin, req, res);
    res.cookie('JWT_TOKEN', getToken, { httpOnly: true })
    const verfiytoken = await this.jwtService.verifyAsync(
      getToken,
      {
        secret: process.env.JWT_SECRET,
      }
    );

    return getToken;
  }

  // @Get('/google')
  // @UseGuards(AuthGuard('google'))
  // async googleAuth(@Req() req) { }

  // @Get('auth/google/callback')
  // @UseGuards(AuthGuard('google'))
  // googleAuthRedirect(@Req() req) {
  //   return this.signinService.googleLogin(req)
  // }

}

