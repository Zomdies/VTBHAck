import * as express from "express"
import { json, urlencoded } from "body-parser"
import * as cors from "cors"
import * as helmet from "helmet"
import * as compression from 'compression'
import * as passport from "passport"

import { dbConfig } from './models'
import usePassport from './middelwares/passport'
import Routers from "./routers/MainRouter"

dbConfig
    .authenticate()
    // .sync({force : true})
    .then(() => console.log("connected to db"))
    .catch((err) => {
        console.log(err);
        throw "error";
    });

const app = express();

app.use(passport.initialize());
usePassport(passport);

if (process.env.DEV === "true") {
    app.use(cors());
} else {
    app.use(helmet());
    app.use(compression());
}

app.use(json());
app.use(urlencoded({ extended: false, limit: "5m" }));

Routers(app);

export default app;