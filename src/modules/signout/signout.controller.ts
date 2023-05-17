import { Controller, Get, Request, Response } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { SignoutService } from './signout.service';

@Controller('signout')
export class SignoutController {
  constructor(private readonly signoutService: SignoutService,
    private readonly jwtService: JwtService) { }
  @Get()
  signOut(@Request() req, @Response({ passthrough: true }) res) {
    res.clearCookie('JWT_TOKEN');
    res.redirect('/signin');
  }
}
