import * as express from "express"
import { validationResult } from "express-validator"
import { sendError500, sendMessage200, sendMessage404 } from "../helpers/Response";
import { dbConfig as sequelize } from '../models/'

import { RequestForm } from "../models"

class RequestFormController {

    constructor() {

    }
    public async getUserRequestDenger(req: express.Request, res: express.Response) {
        const [results, metadata] = await sequelize.query(`SELECT * FROM public."RequestForms" 
        WHERE "ID_User"::text = '${req.body.ID_User}'`);
        console.log(results);
        return res.send(metadata);
    }

    public getUserRequest(req: express.Request, res: express.Response) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log(errors);
            return sendError500(res, 500, "Error", "You send bad parametrs");
        }
        RequestForm.findAll({
            attributes: { exclude: ['ID_User'] },
            where: { ID_User: req.body.ID_User }, raw: true
        })
            .then(items => {
                if (items.length === 0) {
                    return sendMessage404(res, 404, "Request didn't find", items)
                } else {
                    return sendMessage200(res, 200, "Request has benn found", items)
                }
            })
            .catch(err => {
                console.log(err);
                return sendError500(res, 500, "Error database");
            })
    }
    public createRequest(req: express.Request, res: express.Response) {
        const errors = validationResult(req);
        if (!errors.isEmpty())
            return sendError500(res, 500, "Error", "You send bad parametrs");
        RequestForm.create({
            ID_User: req.body.ID_User,
            Recipient: req.body.Recipient,
            Sum: req.body.Sum,
            Comment: req.body.Comment
        })
            .then(items => {
                return sendMessage200(res, 200, "Request was created", items)
            })
            .catch(err => {
                console.log(err);
                return sendError500(res, 500, "Error database");
            })
    }
    public deleteRequest(req: express.Request, res: express.Response) {
        const errors = validationResult(req);
        if (!errors.isEmpty())
            return sendError500(res, 500, "Error", "You send bad parametrs");
        RequestForm.destroy({ where: { ID_User: req.body.ID_User, ID_RequestForm: req.body.ID_RequestForm } })
            .then(item => {
                if (item === 1) {
                    return sendMessage200(res, 200, "Request has been deleted")
                } else {
                    return sendMessage404(res, 404, "Requesr han't been found")
                }
            })
            .catch(err => {
                console.log(err);
                return sendError500(res, 500, "Request hasn't been deleted", "Error database");
            })
    }
}

export default RequestFormController;