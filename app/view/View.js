"use strict";

export default class View {
    /**
     *
     * @param ressource
     */
    constructor(ressource) {
        this.ressource = ressource;
        this.res = {};
        // this.res = {
        //     status: status,
        //     data: data || {}
        // };
        // return this.res;
        return this;
    }

    /**
     *
     * @param data
     * @returns {View}
     */
    setData(data) {
        this.res.data = data || {};
        return this;
    }

    /**
     *
     * @param status
     * @returns {View}
     */
    setStatus(status) {
        this.res.status = status;
        return this;
    }

    /**
     *
     * @param data
     * @returns {*}
     */
    build(data) {
        // for (let key in data) {
        //     this.res[key] = data[key];
        // }
        // console.log(this);
        // return this.res;
    }
}