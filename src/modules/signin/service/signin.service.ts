import { HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { AuthLoginDto } from '../dto/authlogin.dto';

@Injectable()
export class SigninService {
    constructor(private prismService: PrismaService) { }

    /* signin */
    async signIn(authsignindto: AuthLoginDto): Promise<any> {
        const { email, password } = authsignindto;

        const isemailexists = await this.prismService.user.findUnique({
            where: {
                email: email
            }
        })

        try {
            if (!isemailexists) {
                return {
                    status: HttpStatus.NOT_FOUND,
                    msg: "email is not exists"
                }
            }


        } catch (error) {

        }
    }
}
