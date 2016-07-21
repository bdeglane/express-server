'use strict';

import Dao from "./Dao.js";

/**
 *
 */
export default class BaseDao {
    constructor() {
        this.dao = Dao.getInstance();
    }

    /**
     *
     * @param model
     * @param data
     */
    buildModel(model, data) {
        return new model(data);
    }

    /**
     *
     * @param model object
     * @param data object
     * @param callback function
     */
    generateModel(model, data, callback) {
        callback(this.buildModel(model, data));
    }

    /**
     *
     * @param model object
     * @param datas object
     * @param callback function
     */
    generateModels(model, datas, callback) {
        let response = [];
        for (let data in datas) {
            response.push(this.buildModel(model, datas[data]));
        }
        callback(response);
    }
}