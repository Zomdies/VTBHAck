import * as express from "express"
import { validationResult } from "express-validator"

import { sendError500, sendMessage200, sendMessage404 } from '../helpers/Response'

// import { UserModel } from '../models'
import { User } from "../models/User"

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
                return sendMessage200(res, 200, "User has been connection");
            }
        })
        .catch(err => {
            return sendError500(res, 500, "Error database");
        })
    }
    public auth(req: express.Request, res: express.Response): any {
        //TODO CHECK CODE FROM USER eq DB
    }
    public registration(req: express.Request, res: express.Response): any {
        const errors = validationResult(req);
        if (!errors.isEmpty())
            return sendError500(res, 500, "Error", "You send bad parametrs");
        User.create({
            Email : req.body.Email,
            Password : req.body.Password,
            Salt : "1231adsa"
        }).then(response => {
            console.log(response);
            sendMessage200(res,200, "User Created", response )
        })

    }
}

export default UserController;