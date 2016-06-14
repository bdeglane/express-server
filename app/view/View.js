"use strict";

export default class View {
    constructor(data,status) {
        this.build(data,status);
    }

    build(data,status) {
        this.res = {
            data: data,
            status: status
        }
    }
}