import { BadRequestException, ForbiddenException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { AuthLoginDto } from '../dto/authlogin.dto';

@Injectable()
export class SigninService {
    constructor(private prismService: PrismaService,
        private jwtService: JwtService) { }

    /* signin */
    async signIn(authsignindto: AuthLoginDto, req: Request, res: Response): Promise<any> {
        const { email, password } = authsignindto;
        try {

            const user = await this.prismService.user.findUnique({
                where: {
                    email: email
                }
            })
            /* check user exists or not */
            if (!user) {
                throw new BadRequestException('Wrong credentials');
            }
            const hashedpassword = user.password;
            console.log(hashedpassword);
            /* match password */
            const ismatch = await bcrypt.compare(password, hashedpassword);
            if (!ismatch) {
                throw new BadRequestException('Wrong password');
            }

            const token = await this.addToken({ userId: user.id, name: user.name, email: user.email });
            if (!token) {
                throw new ForbiddenException('Counld not signin')
            }
            return token;
        } catch (error) {

        }
    }

    async addToken(args: { userId: Number, name: string, email: string }) {
        const payload = args;
        /* store token  */
        const token = await this.jwtService.signAsync(payload, {
            expiresIn: '2d',
            secret: process.env.JWT_SECRET,
        });
        return token;
    }


    async googleLogin(req: Request) {
        if (!req.user) {
            return 'No user from google'
        }
        return {
            message: 'User Info from Google',
            user: req.user
        }
    }
}
