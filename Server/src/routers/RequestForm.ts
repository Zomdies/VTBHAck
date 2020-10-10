import * as express from 'express'
import * as passport from "passport"
import {body} from "express-validator"

import {RequestFromCtrl} from "../controllers/"

const RequesstForm = () : express.Router => {
    const route : express.Router = express.Router();
    const RequestFromController : RequestFromCtrl = new RequestFromCtrl();

    route.post('/RequsetFrom/get',passport.authenticate("jwt",{session : false}),RequestFromController.getUserRequest)
    route.post('/RequsetFrom/create',passport.authenticate("jwt",{session : false}),RequestFromController.createRequest)
    route.delete('/RequsetFrom/delete',passport.authenticate("jwt",{session : false}),RequestFromController.deleteRequest)

    return route;
}

export default RequesstForm