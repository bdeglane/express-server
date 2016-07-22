let chai = require('chai');
let assert = require('chai').assert;
let should = require('chai').should;
let expect = require('Chai').expect;
let path = require('path');

module.exports.default = function () {

    let Route = require(path.join(__dirname, '../../../app/router/', 'Route.js')).default;


    describe('correct Route', function () {

        let route = new Route('test');

        describe('constructor', function () {
            it('have correct value', function () {
                assert.equal(route.controller, 'test');
            });
        });
        describe('test', function () {
            it('test', function () {
            });
        });
    });

};