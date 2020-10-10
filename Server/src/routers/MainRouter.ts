import * as express from "express"
import {UserRouter, RequestFormRouter} from "./"

const Routers = (app : express.Application)  => {

    app.use(UserRouter());
    app.use(RequestFormRouter());
}

export default Routers;