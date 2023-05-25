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
    res.render('signin')
  }

  // @Get('dash')
  /* use custom Guard  */
  // @UseGuards(AuthGuard)

  /* use passportjs Guard */
  // @UseGuards(AuthGuard('jwt)) 


  @HttpCode(HttpStatus.ACCEPTED)
  @Post('/insert')
  async signIn(@Body(new ValidationPipe()) authsignin: AuthLoginDto, @Request() req, @Response({ passthrough: true }) res): Promise<any> {
    try {

      const responseToken = await this.signinService.signIn(authsignin, req, res);

      // const verfiytoken = await this.jwtService.verifyAsync(
      //   responseToken,
      //   {
      //     secret: process.env.JWT_SECRET,
      //   }
      // );


      if (responseToken.status === 401) {
        console.log("401");
        res.status(401).json({
          errmsg: "email is not registered",
          data: null,
          status: 401

        })

      }
      else if (responseToken.status == 400) {
        console.log("400");
        res.status(400).json({
          errmsg: "password is not correct",
          data: null,
          status: 400
        })
      }
      else {
        res.cookie('JWT_TOKEN', responseToken, { httpOnly: true })
        console.log("okk");
        res.status(200).json({
          errmsg: "",
          data: responseToken.token,
          roles: responseToken.roles,
          status: 200
        })

      }
    } catch (error) {
      console.log(error.message);

    }


  }



  async googleAuth(@Req() req) { }
  @Get('auth/googlesignin')
  googleAuthRedirect(@Request() req, @Response({ passthrough: true }) res) {

    return res.redirect('/dashboard')
  }

  /* 
   const findUser = await prisma.users.findUnique({
        where: {
          email: loginDetails.email,
        },
        include: {
          Users_has_Roles: true,
        },
      });

      if (findUser == null) {
        return new UnauthorizedException();
      } else {
        const compare = await bcrypt.compare(
          loginDetails.password,
          findUser.password,
        );

        if (compare) {
          const payload = {
            id: findUser.id,
            role: findUser.Users_has_Roles[0].roleId,
          };

          return {
            token: await this.jwtService.sign(payload, {
              expiresIn: ACCESS_TOKEN_EXPIRES_IN,
              algorithm: 'HS256',
              secret: process.env.JWT_SECRET,
            }),
            userData: findUser,
            userRole: findUser.Users_has_Roles[0].roleId,
          };
        } else {
          return new BadRequestException();
        }
      }
    } catch (error) {
      console.log(
        '🚀 ~ file: login.service.ts:10 ~ LoginService ~ getLogin ~ error:',
        error,
      );
    }
  }

   */


}

