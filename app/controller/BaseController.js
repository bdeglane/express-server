import View from "../view/View.js";

export default class BaseController {
    /**
     *
     * @param req
     * @param res
     * @param ressource
     */
    constructor(req, res, ressource) {
        this.req = req;
        this.res = res;
        this.ressource = ressource;
    }

    /**
     *
     * @param data
     * @returns {Promise}
     */
    callView(data) {
        return new Promise((resolve, reject)=> {
            let view = new View(data, 200);
            resolve(view);
        });
    }

    /**
     * Send the response to the client
     *
     * @param view
     */
    callRes(view) {
        this.res.status(view.status).send(view);
    }
}