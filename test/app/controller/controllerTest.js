let chai = require('chai');
let assert = require('chai').assert;
let should = require('chai').should;
let expect = require('Chai').expect;
let path = require('path');

module.exports.default = function () {

    let Controller = require(path.join(__dirname, '../../../app/controller/', 'Controller.js')).default;
    let Default = require(path.join(__dirname, '../../../app/controller/', 'Default.js')).default;
    let Error = require(path.join(__dirname, '../../../app/controller/', 'Error.js')).default;

    let req = {method: 'get'};
    let res;

    describe('correct controller', function () {

        let controller = new Controller('test', req, res);

        describe('constructor', function () {
            it('have correct value', function () {
                assert.equal(controller.ressource, 'test');
            });
        });
        describe('callRessourceController', function () {
            it('have Default class instance', function () {
                assert.isObject(controller.controller);
                assert.instanceOf(controller.controller, Default);
                assert.isObject(controller.error);
                assert.instanceOf(controller.error, Error);
            });
        });
    });

    describe('incorrect controller', function () {

        let controller = new Controller(Controller, req, res);

        describe('constructor', function () {
            it('have incorrect value', function () {
                assert.isObject(controller.controller);
            });
        });
        describe('callRessourceController', function () {
            it('have Default class instance', function () {
                assert.isObject(controller.controller);
                assert.instanceOf(controller.controller, Default);
            });
        });
    });
};