"use strict";

import BaseDao from "./BaseDao.js";
import UserModel from "../model/UserModel.js";

export default class UserDao extends BaseDao {
    constructor() {
        super();
    }

    getAllUser() {
        return new Promise((resolve, reject)=> {
            this.dao.connect('SELECT NOW() AS "theTime"')
                .then((models)=> {
                    let datas = [{
                        id: 1,
                        name: 'toto'
                    }, {
                        id: 2,
                        name: 'toto'
                    }, {
                        id: 3,
                        name: 'toto'
                    }, {
                        id: 4,
                        name: 'toto'
                    }];
                    this.generateModels(UserModel, datas, resolve);
                })
                .catch(reject);
        });
    }

    /**
     *
     * @param id
     * @returns {Promise}
     */
    getUserById(id) {
        return new Promise((resolve, reject)=> {
            this.dao.connect('SELECT NOW() AS "theTime"')
                .then((models)=> {
                    let data = {
                        id: id,
                        name: 'name ' + id
                    };
                    this.generateModel(UserModel, data, resolve);
                })
                .catch(reject);
        });
    }

    /**
     *
     * @param login
     * @returns {Promise}
     */
    getUserByLogin(login) {
        return new Promise((resolve, reject)=> {
            this.dao.connect('SELECT NOW() AS "theTime"')
                .then((models)=> {
                    resolve({
                        id: login,
                        name: 'name ' + login
                    });
                })
                .catch(reject);
        });
    }
}