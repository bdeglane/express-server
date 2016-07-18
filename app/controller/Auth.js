import View from "../view/View.js";

export default class Auth {
    constructor(req, res) {
        this.req = req;
        this.res = res;
    }

    postAction() {
        return new Promise((resolve, reject)=> {
            resolve({dump: 'ok'});
        });
    }

    /**
     *
     * @param data
     * @returns {Promise}
     */
    callView(data) {
        return new Promise((resolve, reject)=> {
            resolve(new View(data, 200));
        });
    }

    /**
     *
     * @param view
     */
    callRes(view) {
        this.res.status(view.status).send(view);
    }
}
