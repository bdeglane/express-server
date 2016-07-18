"use strict";

export default class View {
    /**
     *
     * @param data
     * @param status
     * @returns {{}}
     */
    constructor(data, status) {
        this.res = {
            status: status,
            data: data || {}
        };
        return this.res;
    }

    /**
     *
     * @param data
     * @returns {*}
     */
    build(data) {
        for (let key in data) {
            this.res[key] = data[key];
        }
        console.log(this);
        return this.res;
    }
}