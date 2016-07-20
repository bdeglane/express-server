"use strict";

import Default from "./Default.js";
import User from "./User.js";

export default class Controller {

	/**
	 *
	 * @param resource string
	 * @param req
	 * @param res
	 * @param next
	 */
	constructor(resource, req, res, next) {
		this.method = req.method;
		this.resource = resource;
		this.next = next;
		this.callRessourceController(resource, req, res);
	}

	// todo loop on config file
	callRessourceController(resource, req, res) {
		switch (resource) {
			case "user":
				this.controller = new User(req, res);
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
			.then(this.controller.callRes.bind(this.controller))
			// todo log error
			.catch(console.log);
	}
}