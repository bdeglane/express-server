import View from "../view/View.js";
/**
 * specific controller only return data
 * parent controller create the view
 */
export default class BaseController {
    /**
     *
     * @param req
     * @param res
     * @param ressource
     */
    constructor(ressource, req, res) {
        this.req = req;
        this.res = res;
        this.ressource = ressource;
        this.view = new View(ressource);
    }

    /**
     *
     * @param data
     * @param status
     */
    callView(data, status) {
        // return new Promise((resolve, reject)=> {
        this.view.setData(data).setStatus(status);
        // resolve(this.view);
        // });
    }

    /**
     * Send the response to the client
     */
    callRes() {
        this.res.status(this.view.res.status).send(this.view.res);
    }
}