import * as express from "express"
import { validationResult } from "express-validator"


class RequestFromController {
    constructor () {

    }
    getUserRequest(req: express.Request, res: express.Response){
        res.send("GET")
    }
    createRequest(req: express.Request, res: express.Response){
        res.send("CREATE")
    }
    deleteRequest(req: express.Request, res: express.Response){
        res.send("DELETE")
    }
}

export default RequestFromController;