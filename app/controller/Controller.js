"use strict";

import Default from "./Default.js";
import User from "./User.js";
import Auth from "./Auth.js";

export default class Controller {

    constructor(ressource, req, res) {
        this.method = req.method;
        this.ressource = ressource;
        this.callRessourceController(ressource, req, res);
    }

    // todo loop on config file
    callRessourceController(ressource, req, res) {
        switch (ressource) {
            case "user":
                this.controller = new User(req, res);
                break;
            case "auth":
                this.controller = new Auth(req, res);
                break;
            default:
                this.controller = new Default(req, res);
                break;
        }
    }

    // todo create function for
    response() {
        // call correct action method
        let func = this.method.toLowerCase() + "Action" || "defaultAction";

        // call controller action method
        // call the data
        this.controller[func]()
        // then call the view
            .then(this.controller.callView)
            // then send the response
            .then((res) => {
                this.controller.callRes(res);
            })
            .catch(console.log);
    }
}