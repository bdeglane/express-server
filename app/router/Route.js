"use strict";

import Middleware from "./Middleware.js";
import Controller from "../controller/Controller.js";
import express from "express";

let router = express.Router();

export default class Route {

    /**
     *
     * @param controller string
     */
    constructor(controller) {
        this.controller = controller;
        this.middleware = Middleware.getInstance();
    }

    /**
     *
     * @param route string
     */
    createRoute(route) {
        router[route.method](route.uri, (req, res, next) => {
            // first : call the middleware for a route
            this.callMiddleware(req, res);
            next();
        }, (req, res, next) => {
            // then call the controller
            this.callController(req, res);
        });
    }

    /**
     *
     * @param req
     * @param res
     */
    callMiddleware(req, res) {
        this.middleware.build(req, res);
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