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
			this.buildRoute(routes[resource], resource);
		}
	}

	/**
	 *
	 * @param routes array
	 * @param controller string
	 */
	buildRoute(routes, controller) {
		for (let route in routes) {
			this.createRoute(routes[route], controller);
			//((route, controller)=> {
			//	let appRoute = new Route(controller);
			//	appRoute.createRoute(route);
			//})(routes[route], controller);
		}
	}

	/**
	 *
	 * @param route string
	 * @param controller string
	 */
	createRoute(route, controller) {
		let appRoute = new Route(controller);
		appRoute.createRoute(route);
	}
}