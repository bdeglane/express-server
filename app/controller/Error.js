"use strict";

import BaseController from "./BaseController.js";
import View from "../view/View.js";

export default class Error extends BaseController {
    constructor(req, res) {
        super('error', req, res);
    }

    errorAction() {
        return new Promise((resolve, reject)=> {
            resolve({msg: 'internal server error'});
        });
    }
}
