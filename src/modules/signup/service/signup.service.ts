/* eslint-disable prettier/prettier */
import { HttpStatus, Injectable } from '@nestjs/common';
import { Prisma, User, PrismaClient } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { AuthSignUpDto } from '../dto/authsignup.dto';
import { AuthLoginDto } from '../../signin/dto/authlogin.dto';
const prisma = new PrismaClient()

@Injectable()
export class SignupService {
    constructor(private prismService: PrismaService) { }

    async signUp(authsignupdto: AuthSignUpDto, googleId: string): Promise<any> {
        const { name, email, password } = authsignupdto
        const hashpassword = await bcrypt.hash(password, 10)
        try {
            /* find email */
            const emailExists = await this.prismService.user.findFirst({
                where: { email: email }
            })
            if (!emailExists) {
                const createUser = await this.prismService.user.create({
                    data: {
                        email: email,
                        googleId: googleId,
                        name: name,
                        password: hashpassword,
                    }
                })
                return {
                    errorCode: 200,
                    createUser
                };
            }
            else {
                return {
                    errorCode: 409
                }
            }

        } catch (error) {
            console.log(error.message);
            return error;
        }
    }

}