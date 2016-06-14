"use strict";

import chalk from "chalk";

export default class Log {

	constructor() {
	}

	/**
	 *
	 * @param req object
	 */
	static inConsole(req) {
		if (process.env.NODE_ENV === "development") {
			console.log(chalk.green("\n[Url]"), chalk.green(req.method + " " + req.protocol + "://" + req.headers['x-forwarded-server'] + req.originalUrl)/*(new Date()),req.headers['user-agent'],req.headers['host'],req.headers['x-forwarded-for'],req.secure*/);
			console.log(chalk.green(" |__"), chalk.yellow("[date] "), (new Date()), req.headers['user-agent'], req.headers['host'], req.headers['x-forwarded-for'], req.secure);
			console.log(chalk.green(" |__"), chalk.yellow("[user-agent] "), (req.headers['user-agent']));
			console.log(chalk.green(" |__"), chalk.yellow("[host] "), (req.headers['host']));
			console.log(chalk.green(" |__"), chalk.yellow("[ip] "), (req.headers['x-forwarded-for']));
			console.log(chalk.green(" |__"), chalk.yellow("[secure] "), (req.secure));
			console.log("\n");
		}
	}
}