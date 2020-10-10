import * as express from "express"
import {Sequelize} from "sequelize"
import * as dotenv from 'dotenv'
import {readFileSync as read} from  "fs"
import * as http from "http"
import * as https from "https"

import app from './App'

dotenv.config();
const port: string = process.env.PORT;

let server: any;

if (process.env.DEV === "true") {
    server = http.createServer({}, app);
} else {
    const privateKey : string = read(process.env.SERVER_HTTPS_PRIVATE_KEY, 'utf8');
    const certificate : string = read(process.env.SERVER_HTTPS_CERTIFICATE, 'utf8');
    const chainLines : Array<string> = read(process.env.SERVER_HTTPS_CHAIN_LINES, 'utf8').split("\n");
    let cert : Array<string>;
    let ca : Array<string>;
    chainLines.forEach((line) => {
        cert.push(line);
        if (line.match(/-END CERTIFICATE-/)) {
            ca.push(cert.join("\n"));
            cert = [];
        }
    });
    type OptionsHttpsServerType = {
        key : string,
        cert : string,
        ca : Array<string>
    }
    const options : OptionsHttpsServerType  = {
        key: privateKey,
        cert: certificate,
        ca: ca
    }
    server = https.createServer(options, app);

}
const sequelize = new Sequelize("VTBHack", "postgres", "29012001", {
    dialect: "postgres",
    host: "localhost",
    logging: false,
    define: {
        timestamps: false
    }
});
server.listen(port, () => {
    console.log('We are live on ' + port + ' Date ' + new Date());
});  
