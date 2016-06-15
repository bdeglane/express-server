"use strict";

import Route from "./Route.js";

export default class Dispatcher {
    /**
     * Simple json file containing all ressources routes
     *
     * @param routes object
     */
    buildRouter(routes) {
        for (let resource in routes) {
            this.buildRoute(routes[resource], resource, (route, controller)=> {
                let appRoute = new Route(controller);
                appRoute.createRoute(route);
            });
        }
    }

    /**
     *
     * @param routes string
     * @param controller string
     * @param callback function
     */
    buildRoute(routes, controller, callback) {
        for (let route in routes) {
            callback(routes[route], controller);
        }
    }
}