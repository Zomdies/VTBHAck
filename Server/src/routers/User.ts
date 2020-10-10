import * as express from 'express'
import {body} from "express-validator"

import {UserCtrl} from "../controllers/"

const UserRouter = () : express.Router => {
    const route : express.Router = express.Router();
    const UserController : UserCtrl = new UserCtrl();

    route.post('/login',[
        body("Email").isString().isEmail(),
        body("Password").isString()
    ], UserController.login);

    route.post("/auth",[ body("code").isNumeric() ], UserController.auth);

    route.post("/registration", [
        body("Email").isString().isEmail(),
        body("Password").isLength({min : 10})
    ],UserController.registration)

    return route;
}

export default UserRouter