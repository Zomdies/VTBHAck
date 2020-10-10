import * as express from "express"
import {UserRouter, RequestFormRouter} from "./"

const Routers = (app : express.Application, bruteforce : any)  => {

    app.use(UserRouter(bruteforce));
    app.use(RequestFormRouter());
}

export default Routers;