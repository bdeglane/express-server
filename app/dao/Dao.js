"use strict";

import config from "../../conf/config.json";
import pg from "pg";
pg.defaults.poolSize = 25;

let singleton = Symbol();
let singletonEnforcer = Symbol();

/**
 * singleton class Dao
 *
 * Specific dao used for postgre sql database
 *
 */
export default class Dao {
    constructor(enforcer) {
        if (enforcer != singletonEnforcer) throw "class already exist! exit";
    }

    /**
     * Create instace if not exist and return it
     * @returns Dao
     */
    static getInstance() {
        if (!this[singleton]) {
            // on ajoute dans une propriété singleton de la classe Dao une instance de symbol.
            // cette propriété contient une isntance unique de la class Dao
            this[singleton] = new Dao(singletonEnforcer);
            this[singleton]['config'] = config[process.env.NODE_ENV].database;
            //this.pool = this[singleton].connect();
        }
        return this[singleton];
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