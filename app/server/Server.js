"use strict";

import express from "express";
import http from "http"
import bodyParser from "body-parser";
import fs from "fs";
import path from "path";
import morgan from "morgan";
import FileStreamRotator from "file-stream-rotator";
import compression from "compression";
import jwt from "jsonwebtoken";
import cors from "cors";

import Dispatcher from "../router/Dispatcher.js";
import Route from "../router/Route.js";
import View from "../view/View.js";
import Authenticate from "../router/middleware/Authenticate.js";

import config from "../../conf/config.json";
import privateRoutes from "../router/config/routes.json";
import publicRoutes from "../router/config/routesPublic.json";

export default class Server {

    constructor() {
        this.app = express();
        process.env.PORT = config[process.env.NODE_ENV].app.port;
    }

    addRouter() {
        this.addPublicRouter();
        this.addPrivateRouter();
    }

    addPublicRouter() {
        let dispatcher = new Dispatcher();
        // build router
        dispatcher.buildRouter(publicRoutes);
        // get the router
        let router = Route.getRouter();
        // and give it to express
        this.app.use(router);
    }

    addPrivateRouter() {
        let dispatcher = new Dispatcher();
        // build router
        dispatcher.buildRouter(privateRoutes);
        // get the router
        let router = Route.getRouter();
        // add auth middleware
        router.use(Authenticate.authMiddleware);
        // and give it to express
        this.app.use("/api/v1", router);
    }

    /**
     * All specific middleware Express need to work
     */
    addMiddleware() {
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({extended: true}));
        this.app.use(compression());
        this.app.use(cors());

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
     * to infinity and beyond
     * @returns {function}
     */
    start() {
        this.addMiddleware();
        this.addRouter();

        return http.createServer(this.app).listen(process.env.PORT, function () {
            console.info("server started on localhost", "port", process.env.PORT);
        });
    }
}