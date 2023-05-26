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

    async signUp(authsignupdto: AuthSignUpDto): Promise<any> {
        const { name, email, password,googleId } = authsignupdto
        const hashpassword = await bcrypt.hash(password, 10)
        try {
            const createUser = await this.prismService.user.create({
                data: {
                    email: email,
                    name: name,
                    password: hashpassword,
                    googleId:"",
                }
            })
            return createUser;
        } catch (error) {
            console.log(error.message);
            return error;
        }
    }

}
