import { BadRequestException, ForbiddenException, HttpStatus, Injectable, NotFoundException, Request, Response, UnauthorizedException, UseGuards } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { PrismaService } from 'src/modules/prisma/prisma.service';
import { AuthLoginDto } from '../dto/authlogin.dto';

@Injectable()
export class SigninService {
    constructor(private prismService: PrismaService,
        private jwtService: JwtService) { }

    /* signin */
    async signIn(authsignindto: AuthLoginDto, req: Request, res: Response): Promise<any> {
        const { email, password } = authsignindto;
        console.log(email, password);

        try {
            const user = await this.prismService.user.findUnique({
                where: {
                    email: email
                }
            })

            /* check user exists or not */
            if (user == null) {
                return new UnauthorizedException();
            }
            else {
                const hashedpassword = user.password;

                /* match password */
                const ismatch = await bcrypt.compare(password, hashedpassword);
                console.log("matches", ismatch);

                if (ismatch == false) {
                    return new BadRequestException();
                }
                const token = await this.addToken({ name: user.name, email: user.email, roles: user.rolesId });
                return { token: token, roles: user.rolesId };
            }
        } catch (error) {
            console.log(error.message);
            return error;
        }
    }

    async addToken(args: { name: string, email: string, roles: number }) {
        const payload = args;
        /* store token  */
        const token = await this.jwtService.signAsync(payload, {
            expiresIn: '2d',
            secret: process.env.JWT_SECRET,
        });
        return token;
    }


    async googleLogin(@Request() req, @Response({ passthrough: true }) res) {
        if (!req.user) {
            return 'No user from google'
        }
        return {
            message: 'User Info from Google',
            user: req.user
        }
    }
}
