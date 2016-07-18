"use strict";

export default class View {
    /**
     *
     * @param data
     * @param status
     * @returns {{}}
     */
    constructor(data, status) {
        return this.build(data, status);
    }

    /**
     *
     * @param data
     * @param status
     * @returns {{}}
     */
    build(data, status) {

        this.res = {};

        if (status) this.res.status = status;

        for (let key in data) {
            this.res[key] = data[key];
        }

        return this.res;
    }
}