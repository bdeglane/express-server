"use strict";

import config from "../../conf/config.json";
import pg from "pg";
pg.defaults.poolSize = 25;

/**
 * singleton class Dao
 *
 * Specific dao used for postgre sql database
 *
 */
export default class Dao {

	static singleton = Symbol();
	static singletonEnforcer = Symbol();

	constructor(enforcer) {
		if (enforcer != Dao.singletonEnforcer) throw "class already exist! exit";
	}

	/**
	 * Create instace if not exist and return it
	 * @returns Dao
	 */
	static getInstance() {
		if (!this[Dao.singleton]) {
			// on ajoute dans une propriété singleton de la classe Dao une instance de symbol.
			// cette propriété contient une isntance unique de la class Dao
			this[Dao.singleton] = new Dao(Dao.singletonEnforcer);
			this[Dao.singleton]['config'] = config[process.env.NODE_ENV].database;
			//this.pool = this[singleton].connect();
		}
		return this[Dao.singleton];
	}

	/**
	 *
	 * @returns {Promise}
	 */
	connect(query) {
		let conn = "postgres://" + this.config.user + ":" + this.config.password + "@" + this.config.host + "/" + this.config.database;

		return new Promise((resolve, reject)=> {
			// todo test to delete
			resolve({query: query, status: 'ok'});
			// pg.connect(conn, (err, client, done)=> {
			//     if (err) reject(err);
			//     else {
			//         client.query(query, (err, res)=> {
			//             if (err) reject(err);
			//             else {
			//                 done();
			//                 resolve(res.rows[0].theTime);
			//             }
			//         });
			//         //resolve({client, query: query, done: done});
			//     }
			// });
		});
	}
}