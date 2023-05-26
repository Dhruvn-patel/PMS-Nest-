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
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.CLIENTSECRET,
            callbackURL: "http://localhost:3030/signin/redirect",
            scope: ['email', 'profile']
        })
    }

    async validate(accessToken: string, refreshToken: string, profile: any, done: VerifyCallback): Promise<any> {
        const { name, emails, photos, id } = profile

        // console.log(name, emails, photos);

        const user = {
            id: id,
            email: emails[0].value,
            firstName: name.givenName,
            lastName: name.familyName,
            picture: photos[0].value,
            accessToken
        }
    

        done(null, user);
    }


}
