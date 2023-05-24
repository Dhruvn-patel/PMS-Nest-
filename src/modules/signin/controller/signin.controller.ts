import { Body, Controller, Get, HttpCode, HttpStatus, Post, Render, Req, Request, Res, Response, UseGuards, ValidationPipe } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from 'src/modules/guards/jwt.guard';
// import { AuthGuard } from '@nestjs/passport';
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

  @Get()
  showLogin(@Request() req, @Response() res) {
    res.render('signin', { emailerror: "" })
  }

  // @Get('dash')
  /* use custom Guard  */
  // @UseGuards(AuthGuard)

  /* use passportjs Guard */
  // @UseGuards(AuthGuard('jwt)) 


  @HttpCode(HttpStatus.ACCEPTED)
  @Post()
  async signIn(@Body(new ValidationPipe()) authsignin: AuthLoginDto, @Request() req, @Response({ passthrough: true }) res) {
    const responseToken = await this.signinService.signIn(authsignin, req, res);
    res.cookie('JWT_TOKEN', responseToken, { httpOnly: true })
    // const verfiytoken = await this.jwtService.verifyAsync(
    //   responseToken,
    //   {
    //     secret: process.env.JWT_SECRET,
    //   }
    // );

    if (responseToken.status === 401) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        errmsg: "email is not registered",
        data: null,
        status: HttpStatus.BAD_REQUEST
      })
    }
    else if (responseToken.status === 400) {
      return res.status(HttpStatus.NOT_ACCEPTABLE).json({
        errmsg: "password is not correct",
        data: null,
        status: HttpStatus.NOT_ACCEPTABLE
      })
    }
    else if (responseToken.statusCode === 400) {
      return res.status(HttpStatus.NOT_ACCEPTABLE).json({
        errmsg: "password is empty",
        data: null,
        status: HttpStatus.NOT_ACCEPTABLE
      })
    }
    else {
      return res.status(HttpStatus.ACCEPTED).json({
        errmsg: "",
        data: responseToken,
        status: HttpStatus.ACCEPTED
      })
    }

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

