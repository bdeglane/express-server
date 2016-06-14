"use strict";

import Log from "./middleware/Log.js";

let singleton = Symbol();
let singletonEnforcer = Symbol();

/**
 * @class Middleware
 *
 * La class Middleware permet d'attacher des médiateurs sur une route express.
 * Cette classe est un singleton.
 */
export default class Middleware {
    /**
     *
     * @param enforcer symbol
     */
    constructor(enforcer) {
        if (enforcer != singletonEnforcer) throw "Classe déjà instanciée, singleton rulez";
    }

    /**
     *
     * @returns {*}
     */
    static getInstance() {
        if (!this[singleton]) {
            this[singleton] = new Middleware(singletonEnforcer);
            this[singleton].stack = [];
            this[singleton].stock();
        }
        return this[singleton];
    }

    /**
     * stack the middleware for each route
     */
    stock() {
        this.add(Log.getInstance(), "register");
    }

    /**
     *
     * @param object
     * @param middleware
     */
    add(object, middleware) {
        this.stack.push({object: object, middleware: middleware});
    }

    /**
     * When a route is called, all middleware that are stock for this route are called
     *
     * @param req
     * @param res
     */
    build(req, res) {
        for (let ii in this.stack) {
            this.call(this.stack[ii].object, this.stack[ii].middleware, req, res);
        }
    }

    /**
     * run a
     *
     * @param object
     * @param callback
     * @param req
     * @param res
     */
    call(object, callback, req, res) {
        object[callback](req, res);
    }
}