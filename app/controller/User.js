'use strict';

import UserModel from "../model/UserModel.js";
import UserDao from "../dao/UserDao.js";
import View from "../view/View.js";

export default class User {
    constructor(req, res) {
        this.req = req;
        this.res = res;
        this.dao = new UserDao();
    }

    getAction() {
        return new Promise((resolve, reject)=> {
            //resolve(this.dao.getAllUser());
            console.log('test');
        });
    }

    postAction() {
        return new Promise((resolve, reject)=> {
        });
    }

    putAction() {
        return new Promise((resolve, reject)=> {
        });
    }

    deleteAction() {
        return new Promise((resolve, reject)=> {
        });
    }

    callView(data) {
        return new Promise((resolve, reject)=> {
            resolve(new View(data, 200));
        });
    }

    callRes(view) {
        this.res.status(view.res.status).send(view.res);
    }
}