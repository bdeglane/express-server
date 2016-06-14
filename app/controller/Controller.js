"use strict";

import Default from "./Default.js";
import User from "./User.js";

export default class Controller {

    constructor(ressource, req, res) {
        this.method = req.method;
        this.ressource = ressource;
        this.callRessourceController(ressource, req, res);
    }

    callRessourceController(ressource, req, res) {
        switch (ressource) {
            case "user":
                this.controller = new User(req, res);
                break;
            default:
                this.controller = new Default(req, res);
                break;
        }
    }

    response() {
        let func = this.method.toLowerCase() + "Action" || "defaultAction";
        this.controller[func]()
            .then(this.controller.callView)
            .then(this.controller.callRes.bind(this.controller))
            .catch(console.log);
    }
}