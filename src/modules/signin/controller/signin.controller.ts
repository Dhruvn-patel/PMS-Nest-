/* eslint-disable prettier/prettier */

import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Redirect,
  Render,
  Req,
  Request,
  Res,
  Response,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
// import { AuthGuard } from 'src/modules/guards/jwt.guard';
// import { AuthGuard } from '@nestjs/passport';
import { AuthLoginDto } from '../dto/authlogin.dto';
import { SigninService } from '../service/signin.service';
import { AuthGuard } from '@nestjs/passport';
@Controller('signin')
export class SigninController {
  constructor(
    private readonly signinService: SigninService,
    private readonly jwtService: JwtService,
  ) { }

  /* ejs of login */
  // @Get()
  // @Render('signin')
  // root() {
  //   return;
  // }

  @Get()
  showLogin(@Request() req, @Response() res) {
    res.render('signin');
  }

  // @Get('dash')
  /* use custom Guard  */
  // @UseGuards(AuthGuard)

  /* use passportjs Guard */
  // @UseGuards(AuthGuard('jwt'))

  @HttpCode(HttpStatus.ACCEPTED)
  @Post('/insert')
  async signIn(
    @Body(new ValidationPipe()) authsignin: AuthLoginDto,
    @Request() req,
    @Response({ passthrough: true }) res,
  ): Promise<any> {
    try {
      const responseToken = await this.signinService.signIn(
        authsignin,
        req,
        res,
      );


      if (responseToken.status === 401) {
        console.log('401');
        res.status(401).json({
          errmsg: 'email is not registered',
          data: null,
          status: 401,
        });
      } else if (responseToken.status == 400) {
        console.log('400');
        res.status(400).json({
          errmsg: 'password is not correct',
          data: null,
          status: 400,
        });
      } else {
        res.cookie('JWT_TOKEN', responseToken, { httpOnly: true });
        console.log('okk');
        res.status(200).json({
          errmsg: '',
          data: responseToken.token,
          roles: responseToken.roles,
          status: 200,
        });
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Req() req) { }

  @Get('redirect')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@Req() req, @Res({ passthrough: true }) res): Promise<any> {
    const googleres = await this.signinService.googleLogin(req, res);
    console.log(googleres);
    
    return res.redirect('/dashboard');

  }


}