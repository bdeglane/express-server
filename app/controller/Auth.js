import BaseController from './BaseController.js';


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
            //
            // 2. check username and passsord
            resolve({dump: 'ok'});
        });
    }
}
