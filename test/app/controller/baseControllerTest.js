let chai = require('chai');
let assert = require('chai').assert;
let should = require('chai').should;
let expect = require('Chai').expect;
let path = require('path');

module.exports.default = function () {

    let BaseController = require(path.join(__dirname, '../../../app/controller/', 'BaseController.js')).default;
    let View = require(path.join(__dirname, '../../../app/view/', 'View.js')).default;

    let req = {method: 'get'};
    let res;

    describe('correct baseController', function () {

        let baseController = new BaseController('test', req, res);

        describe('constructor', function () {
            it('have correct value', function () {
                assert.equal(baseController.ressource, 'test');
                assert.isObject(baseController.view);
                assert.instanceOf(baseController.view, View);
            });
        });
        describe('callView', function () {
            it('set correctly the view', function () {

                let data = {data: 'dump'};
                baseController.callView(data, 200);

                assert.equal(baseController.view.res.data, data);
                assert.equal(baseController.view.res.status, 200);
            });
        });
    });
};