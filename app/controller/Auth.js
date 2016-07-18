import BaseController from './BaseController.js';
import jwt from 'jsonwebtoken';
import config from '../../conf/config.json';

export default class Auth extends BaseController {
    /**
     *
     * @param req
     * @param res
     */
    constructor(req, res) {
        super(req, res, 'auth')
    }

    postAction() {
        return new Promise((resolve, reject)=> {
            // 1. get the user in database
            // 2. check username and passsord
            // 3. if not true => error
            // 4. if true =>

            let token = jwt.sign({user: 'test', id: 'test'}, config[process.env.NODE_ENV].app.token.secret, {
                expiresIn: config[process.env.NODE_ENV].app.token.expire
            });

            resolve({token: token});
        });
    }
}
