import * as express from "express"
import {json, urlencoded} from "body-parser"
import * as cors from "cors"
import * as helmet from "helmet"

import Routers from "./routers/MainRouter"

const app = express();


app.use(cors());
app.use(json());
app.use(helmet());
app.use(urlencoded({ extended: false }));

Routers(app);

export default app;