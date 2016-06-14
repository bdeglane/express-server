"use strict";

import express from "express";
import http from "http"
import bodyParser from "body-parser";
import fs from "fs";
import path from "path";
import morgan from "morgan";
import FileStreamRotator from "file-stream-rotator";

import Dispatcher from "../router/Dispatcher.js";
import Route from "../router/Route.js";

import config from "../../conf/config.json";
import routes from "../router/routes.json";

export default class Server {

    constructor() {
        this.app = express();
        process.env.PORT = config[process.env.NODE_ENV].app.port;
    }

    /**
     * Create a generic router
     */
    addRouter() {
        let dispatcher = new Dispatcher();
        dispatcher.buildRouter(routes);
        this.app.use("/api/v1", Route.getRouter());

        // todo implement jwt
        //this.app.use("/api/v1", ()=> {
        //
        //});
    }

    /**
     * All specific middleware Express need to work
     */
    addMiddleware() {
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({extended: true}));

        /*
         * Morgan logger
         * daily file contain all routes queried
         *
         */
        this.app.enable("trust proxy");
        let logDirectory = path.resolve('log');
        fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);
        let accessLogStream = FileStreamRotator.getStream({
            date_format: 'YYYY-MM-DD',
            filename: logDirectory + '/api-access-%DATE%.log',
            frequency: 'weekly',
            verbose: false
        });
        this.app.use(morgan('[:date[clf]] [:req[x-forwarded-for]] [:req[x-forwarded-server]] :remote-user ":method :url"  :status :response-time ms :res[content-length] ":user-agent"', {stream: accessLogStream}));
    }

    /**
     * to infinty and beyond
     */
    start() {
        this.addMiddleware();
        this.addRouter();
        http.createServer(this.app).listen(process.env.PORT, function () {
            console.info("server started on localhost", "port", process.env.PORT);
        });
    }
}