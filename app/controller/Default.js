"use strict";

import BaseController from "./BaseController.js";
import View from "../view/View.js";

export default class Default extends BaseController {
    constructor(req, res) {
        super(req, res, 'default');
    }

    defaultAction() {
        return new Promise((resolve, reject)=> {
            resolve(new View("my api"))
        });
    }

    errorAction() {
        return new Promise((resolve, reject)=> {
            resolve({})
        });
    }
}