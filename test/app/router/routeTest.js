let chai = require('chai');
let assert = require('chai').assert;
let should = require('chai').should;
let expect = require('Chai').expect;
let path = require('path');

import events from "events";
import express from 'express';

module.exports.default = function () {

    let Route = require(path.join(__dirname, '../../../app/router/', 'Route.js')).default;


    describe('correct Route', function () {

        let route = new Route('test');

        describe('constructor', function () {
            it('have correct value', function () {
                assert.equal(route.controller, 'test');
                assert.isObject(route.eventEmitter);
                assert.instanceOf(route.eventEmitter, events.EventEmitter);
            });
        });
        describe('create route', function () {
            it('should create a get route', function () {
                route.createRoute({uri: '/test', method: 'get'});
            });
            it('should create a post route', function () {
                route.createRoute({uri: '/test', method: 'post'});
            });
            it('should create a put route', function () {
                route.createRoute({uri: '/test', method: 'put'});
            });
            it('should create a delete route', function () {
                route.createRoute({uri: '/test', method: 'delete'});
            });
            it('should contain 4 route \'/test\'', function () {
                let router = Route.getRouter();
                router.stack.map(function (item) {
                    assert.isObject(item);
                });
            });
        });
        describe('getRouter', function () {
            it('have correct value', function () {
                let router = Route.getRouter();
                assert.isFunction(router);
            });
        });
    });
};