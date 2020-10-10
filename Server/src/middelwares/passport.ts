import { PassportStatic } from 'passport'
import {Strategy as JwtStrategy, ExtractJwt} from 'passport-jwt'
import * as dotenv from "dotenv"
dotenv.config();
import {User} from '../models'

const usePassport = (passport : PassportStatic) => {
    const options = {
        jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey : process.env.PRIVATE_KEY
    }
    passport.use(
        new JwtStrategy(options, (payload, done) => {
            console.log(payload);
            User.findAll({where : {ID_User : payload.ID_User}, raw : true})
            .then(res => {
                if (res.length !== 0){
                    done(null, true);
                }else{
                    done(null, false);
                }
            })
            .catch(err => {
                console.log(err);
            })
        })
    )
}

export default usePassport