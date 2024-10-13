import { PassportStrategy } from '@nestjs/passport'
import { Strategy, VerifyCallback } from 'passport-google-oauth20'
import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
    constructor(configService: ConfigService) {
        super({
            clientID: configService.get('google.clientId'),
            clientSecret: configService.get('google.clientSecret'),
            callbackURL: configService.get('baseUrl') + '/api/auth/google-redirect',
            scope: ['email', 'profile'],
        })
    }

    async validate(accessToken: string, refreshToken: string, profile: any, done: VerifyCallback): Promise<any> {
        const { name, emails, photos, id } = profile
        const user = {
            email: emails[0].value,
            name: name.givenName + ' ' + name.familyName,
            picture: photos[0].value,
            accessToken,
            refreshToken,
            externalId: id
        }
        return user
    }
}
