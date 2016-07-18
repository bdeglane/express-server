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

import Dispatcher from "../router/Dispatcher.js";
import Route from "../router/Route.js";
import View from "../view/View.js";

import config from "../../conf/config.json";
import privateRoutes from "../router/config/routes.json";
import publicRoutes from "../router/config/routesPublic.json";

export default class Server {

    constructor() {
        this.app = express();
        process.env.PORT = config[process.env.NODE_ENV].app.port;
        // this.view = new View();
        // console.log(this.view);
    }

    /**
     * Create a generic router
     */
    addRouter() {
        let dispatcher = new Dispatcher();
        dispatcher.buildRouter(privateRoutes);
        let router = Route.getRouter();
        this.app.use("/api/v1", router);
    }

    /**
     * All specific middleware Express need to work
     */
    addMiddleware() {
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({extended: true}));
        this.app.use(compression());

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


        /**
         * Jwt auth midlleware
         */
        this.app.use(function (req, res, next) {
            // get the user token
            let token = req.body.token || req.query.token || req.headers['x-access-token'];
            // if the token exist in header
            if (token) {
                // verify if it's a valid token
                jwt.verify(token, config[process.env.NODE_ENV].app.secret, (err, decoded) => {
                    // if the token is incorrect
                    if (err) {
                        // return an error
                        return res.status(401).json(new View({
                            success: false,
                            message: 'Failed to authenticate token.'
                        }, 401));
                    } else {
                        // if everything is good, save to request for use in other routes
                        req.decoded = decoded;
                        next();
                    }
                });
            } else {
                return res.status(401).json(new View({
                    success: false,
                    message: 'no token'
                }, 401));
            }
        });
    }

    /**
     * to infinity and beyond
     */
    start() {
        this.addMiddleware();
        this.addRouter();
        http.createServer(this.app).listen(process.env.PORT, function () {
            console.info("server started on localhost", "port", process.env.PORT);
        });
    }
}