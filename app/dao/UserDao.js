"use strict";

import Dao from "./Dao.js";

export default class UserDao {
    constructor() {
        this.dao = Dao.getInstance();
    }

    getAllUser() {
        return this.dao.connect('SELECT NOW() AS "theTime"')
            .catch(console.log);
    }
}