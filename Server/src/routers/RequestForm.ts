import * as express from 'express'
import * as passport from "passport"
import { body } from "express-validator"

import { RequestFromCtrl } from "../controllers/"

const RequesstForm = (): express.Router => {
    const route: express.Router = express.Router();
    const RequestFromController: RequestFromCtrl = new RequestFromCtrl();

    route.post('/RequsetFrom/get', passport.authenticate("jwt", { session: false }), [
        body("ID_User").isString().isLength({ min: 36, max: 36 })
    ], RequestFromController.getUserRequest);

    route.post('/RequsetFrom/create', passport.authenticate("jwt", { session: false }), [
        body("ID_User").isString().isLength({ min: 36, max: 36 }),
        body("Recipient").isString().trim().isLength({ min: 1, max: 15 }),
        body("Sum").isNumeric(),
        body("Comment").isString().trim().isLength({ min: 1, max: 150 })
    ], RequestFromController.createRequest);

    route.delete('/RequsetFrom/delete', passport.authenticate("jwt", { session: false }), [
        body("ID_User").isString().isLength({ min: 36, max: 36 }),
        body("ID_RequestForm").isString().isLength({ min: 36, max: 36 }),
    ],RequestFromController.deleteRequest)

    return route;
}

export default RequesstForm