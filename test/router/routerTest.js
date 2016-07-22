var chai = require('chai');
var assert = require('chai').assert;
var should = require('chai').should;
var expect = require('Chai').expect;
var request = require('request');
var config = require('../../conf/config.json');

module.exports.default = function () {
    /*
     var server = require('../../dist/server');

     describe('router', function () {
     describe('/get user', function () {

     var url = 'http://localhost:' + config['development'].app.port;

     it('it should respond 401', function (done) {
     request.get(url + '/api/v1/user', function (err, res, body) {
     expect(res.statusCode).to.equal(401);
     expect(res.body).to.equal('{"data":{"success":false,"message":"no token"},"status":401}');
     done();
     });
     });

     it('it should get a token', function (done) {
     request.post(url + '/auth', {form: {login: 'admin', password: 'admin'}}, function (err, res, body) {
     expect(res.statusCode).to.equal(200);
     var resBody = JSON.parse(JSON.stringify(res.body));
     done();

     it('it should get an array of user', function (done) {
     request.get({
     url: url + '/api/v1/user',
     headers: {
     'x-access-token': resBody
     }
     }, function (err, res, body) {
     expect(res.statusCode).to.equal(200);
     console.log(res.body);
     done();
     });
     });
     });
     });
     });
     });
     */
};
