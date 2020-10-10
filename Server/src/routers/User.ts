import * as express from 'express'
import {body} from "express-validator"

import {UserCtrl} from "../controllers/"

const UserRouter = (bruteforce : any) : express.Router => {
    const route : express.Router = express.Router();
    const UserController : UserCtrl = new UserCtrl();

    route.post('/login',bruteforce.prevent,[
        body("Email").isString().isEmail(),
        body("Password").isString()
    ], UserController.login);

    route.post("/registration", [
        body("Email").isString().isEmail(),
        body("Password").isLength({min : 10})
    ],UserController.registration)

    return route;
}

export default UserRouter