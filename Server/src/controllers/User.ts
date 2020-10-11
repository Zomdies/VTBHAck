import * as express from "express"
import * as bcrypt from "bcryptjs"
import * as CryptoJS from 'crypto-js'
import * as JWT from 'jsonwebtoken'
import { validationResult } from "express-validator"
import * as dotenv from "dotenv"
dotenv.config();

import { sendError500, sendMessage200, sendMessage404 } from '../helpers/Response'

// import { UserModel } from '../models'

import { User } from "../models"

class UserController {


    public constructor() {
    }
    public login(req: express.Request, res: express.Response): any {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log(errors);
            return sendError500(res, 500, "Error sign in", "Email or Password failed");
        }
        User.findAll({where : {Email : req.body.Email}, raw: true}).then(response => {  
            if (response.length === 0){
                return sendMessage404(res, 404, "User hasn't found");
            }else{
                const password : string = bcrypt.hashSync(req.body.Password,response[0].Salt);
                if (response[0].Password === password){
                    const token = JWT.sign({
                        ID_User : response[0].ID_User
                    },process.env.PRIVATE_KEY,{expiresIn : 60*60})
                    return sendMessage200(res, 200, "User has been connection", {
                        ID_User : response[0].ID_User,
                        token : `Bearer ${token}`
                    });
                }else{
                    return sendError500(res,500, "Error", "Error")
                }
            }
        })
        .catch(err => {
            console.log(err);
            return sendError500(res, 500, "Error database");
        })
    }
    public registration(req: express.Request, res: express.Response): any {
        const errors = validationResult(req);
        if (!errors.isEmpty())
            return sendError500(res, 500, "Error", "You send bad parametrs");
        const salt : string = bcrypt.genSaltSync(10);
        const passwordHash : string = CryptoJS.SHA256(req.body.Password).toString();
        const password : string = bcrypt.hashSync(passwordHash,salt);
        User.create({
            Email : req.body.Email,
            Password :  password,
            Salt : salt
        }).then(response => {
            sendMessage200(res,200, "User Created", response )
        })
        .catch(err => {
            console.log(err);
            return sendError500(res,500,"Error", "Error database");
        })

    }
}

export default UserController;