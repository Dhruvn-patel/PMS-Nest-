import { PassportStrategy } from "@nestjs/passport";
import { Injectable } from "@nestjs/common";
import { Strategy, VerifyCallback } from "passport-google-oauth20"
import { config } from 'dotenv';
import { Prisma, PrismaClient } from "@prisma/client";
config();
const prisma = new PrismaClient();
@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
    constructor() {
        super({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: [process.env.GOOGLE_CLIENT_SECRET],
            callbackURL: "http://localhost:3030/auth/google",
            scope: ['email', 'profile']
        })
    }

    async validate(accessToken: string, refreshToken: string, profile: any, done: VerifyCallback): Promise<any> {
        const { name, emails, photos } = profile

        console.log(name, emails, photos);

        const data = {
            name: name.givenName,
            email: emails[0].value,
            // picture: photos[0].value,
            password: profile.name.familyName,
        }
        const user = await prisma.user.create({
            data: {
                name: name.givenName,
                email: emails[0].value,
                // picture: photos[0].value,
                password: profile.name.familyName,
            }
        })
        done(null, user);
    }


}
