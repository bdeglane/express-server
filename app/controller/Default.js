"use strict";

import View from "../view/View.js";

export default class Default {
    constructor(req, res) {
        this.req = req;
        this.res = res;
    }

    defaultAction() {
        return new Promise((resolve, reject)=> {
            resolve(new View("my api"))
        });
    }

    callView() {
        return new Promise((resolve, reject)=> {
            resolve(new View("not found", 404));
        });
    }

    callRes(view) {
        this.res.status(view.res.status).send(view.res);
    }

    call() {
        this.callView()
            .then(this.callRes.bind(this))
            .catch(console.log);
    }
}