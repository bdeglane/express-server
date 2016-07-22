'use strict';

import BaseController from './BaseController.js';
import Authenticate from '../router/middleware/Authenticate.js';

export default class Auth extends BaseController {
    /**
     *
     * @param req
     * @param res
     */
    constructor(req, res) {
        super('auth', req, res);
        this.auth = new Authenticate();
    }

    postAction() {
        return new Promise((resolve, reject) => {
                // 1. get the user in database
                // 2. check username and passsord
                // 3. if not true => error
                // 4. if true =>

                let login = this.req.body.login;
                let password = this.req.body.password;

                if (login === 'admin' && password === 'admin') {
                    let token = this.auth.getToken({user: 'test', id: 'test'});
                    resolve({token: token});
                } else {
                    resolve({token: false});
                }
            }
        );
    }
}
