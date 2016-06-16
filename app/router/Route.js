"use strict";

import Controller from "../controller/Controller.js";
import express from "express";
import events from "events";

import Log from "./middleware/Log.js";
import Authenticate from "./middleware/Authenticate.js";

let router = express.Router();

export default class Route {

    /**
     *
     * @param controller string
     */
    constructor(controller) {
        this.controller = controller;
        this.eventEmitter = new events.EventEmitter();
        this.stackMiddleware();
    }

    /**
     *
     */
    stackMiddleware() {
        this.eventEmitter.on('error', (err)=> console.log('oops'));
        this.eventEmitter.on('callMiddleware', ({req, res, next})=> Log.inConsole(req, next));
        this.eventEmitter.on('callMiddleware', ({req, res, next}) => Authenticate.authMiddleware(req, res, next));
    }

    /**
     *
     * @param route string
     */
    createRoute(route) {
        router[route.method](route.uri, (req, res, next) => {
            // first : call the middleware for a route
            this.callMiddleware(req, res, next);
        }, (req, res, next) => {
            // then call the controller
            this.callController(req, res);
        });
    }

    /**
     *
     * @param req
     * @param res
     * @param next
     */
    callMiddleware(req, res, next) {
        this.eventEmitter.emit('callMiddleware', {req: req, res: res, next: next});
    }

    /**
     *
     * @param req
     * @param res
     */
    callController(req, res) {
        let ressourceController = new Controller(this.controller, req, res);
        ressourceController.response();
    }

    /**
     *
     * @returns {*}
     */
    static getRouter() {
        return router;
    }
}