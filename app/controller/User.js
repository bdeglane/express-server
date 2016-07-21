'use strict';
import BaseController from "./BaseController.js";
import UserModel from "../model/UserModel.js";
import UserDao from "../dao/UserDao.js";

export default class User extends BaseController {
	/**
	 *
	 * @param req
	 * @param res
	 */
	constructor(req, res) {
		super(req, res, 'user');
		this.dao = new UserDao();
		this.model = new UserModel();
	}

	getAction() {
		return new Promise((resolve, reject)=> {
			// instance du modele
			resolve(this.dao.getAllUser());
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
}