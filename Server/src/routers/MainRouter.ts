import * as express from "express"
import {UserRouter} from "./"

const Routers = (app : express.Application)  => {

    app.use(UserRouter());

}

export default Routers;