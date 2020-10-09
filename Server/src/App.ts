import * as express from "express"
import {json, urlencoded} from "body-parser"
import * as cors from "cors"
import { sendMessage200 } from "./helpers/response";

import {imageFilter} from "./core/Multer/fileFilter"
import {createUpload} from "./core/Multer/multer"

const upload = createUpload("public/uploads", imageFilter);

const app = express();

app.use('/uploads/',express.static("public/uploads"));

app.use(cors());
app.use(json());
app.use(urlencoded({ extended: false }));


app.get('/hi',  upload.single('Image') ,(req : express.Request ,res : express.Response ,next :express.NextFunction)=>{
    
    console.log(req.file)
    sendMessage200(res,10,"Hello world",);

})

export default app;