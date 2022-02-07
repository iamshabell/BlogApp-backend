import {PassportStrategy} from '@nestjs/passport'
import { Injectable } from '@nestjs/common';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { jwt } from '../constants';
;

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

    constructor(
    ){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: jwt.secretKey
        });
    }

    validate(payload: {sub: string, email: string}){
        return {id: payload.sub, email: payload.email}
    }
}