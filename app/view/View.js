"use strict";

export default class View {
	constructor(data, status, success) {
		this.build(data, status, success);
	}

	build(data, status, success) {
		this.res = {
			data: data,
			success: success,
			status: status
		}
	}
}