"use strict";

import Default from "./Default.js";
import User from "./User.js";
import Auth from "./Auth.js";
import Error from "./Error.js";

export default class Controller {

    constructor(ressource, req, res) {
        this.method = req.method;
        this.ressource = ressource;
        this.error = new Error(req, res);
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
        let func = this.method.toLowerCase() + "Action";

        // call controller action method
        // call the data
        // gestion d'un controller inconnu
        if (typeof this.controller[func] === 'function') {
            this.controller[func]()
            // then call the view
                .then((data) => this.controller.callView(data, 200))
                // then send the response
                .then(() => this.controller.callRes())
                .catch(console.log);
        } else {
            this.error.errorAction()
                .then((data)=> this.error.callView(data, 500))
                .then(()=> this.error.callRes())
                .catch(console.log);
        }
    }
}