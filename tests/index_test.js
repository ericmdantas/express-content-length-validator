"use strict";

var _validator = require('../index');
var expect = require('chai').expect;

var ERROR_MESSAGE_DEFAULT = "Invalid payload; too big.";

describe('validator', function()
{
    describe('validateMax - default length 999', function()
    {
        it('should call next - no content-length', function()
        {
            var _called = false;
            var _endCalled = false;
            var _req = {headers: {}};
            var _res = {status: function(){ expect(arguments[0]).to.equal(400); return {json: function(error){_endCalled = true; expect(error.message).to.equal(ERROR_MESSAGE_DEFAULT)}}}};
            var _next = function(){_called = true;};

            _validator.validateMax()(_req, _res, _next);

            expect(_called).to.be.true;
            expect(_endCalled).to.be.false;
        })

        it('should not call next - length is bigger than what was expected', function()
        {
            var _called = false;
            var _endCalled = false;
            var _req = {headers: {'content-length': '1000'}};
            var _res = {status: function(){ expect(arguments[0]).to.equal(400); return {json: function(error){_endCalled = true; expect(error.message).to.equal(ERROR_MESSAGE_DEFAULT)}}}};
            var _next = function(){_called = true;};

            _validator.validateMax()(_req, _res, _next);

            expect(_called).to.be.false;
            expect(_endCalled).to.be.true;
        })

        it('should call next correctly', function()
        {
            var _called = false;
            var _endCalled = false;
            var _req = {headers: {'content-length': '999'}};
            var _res = {status: function(){ expect(arguments[0]).to.equal(400); return {json: function(error){_endCalled = true; expect(error.message).to.equal(ERROR_MESSAGE_DEFAULT)}}}};
            var _next = function(){_called = true;};

            _validator.validateMax()(_req, _res, _next);

            expect(_called).to.be.true;
            expect(_endCalled).to.be.false;
        })
    })

    describe('validateMax - specific content length', function()
    {
        it('should call next - no content-length', function()
        {
            var _called = false;
            var _endCalled = false;
            var _req = {headers: {}};
            var _res = {status: function(){ expect(arguments[0]).to.equal(400); return {json: function(error){_endCalled = true; expect(error.message).to.equal(ERROR_MESSAGE_DEFAULT)}}}};
            var _next = function(){_called = true;};

            _validator.validateMax(100)(_req, _res, _next);

            expect(_called).to.be.true;
            expect(_endCalled).to.be.false;
        })

        it('should not call next, content-length bigger than expected', function()
        {
            var _called = false;
            var _endCalled = false;
            var _req = {headers: {'content-length': '101'}};
            var _res = {status: function(){ expect(arguments[0]).to.equal(400); return {json: function(error){_endCalled = true; expect(error.message).to.equal(ERROR_MESSAGE_DEFAULT)}}}};
            var _next = function(){_called = true;};

            _validator.validateMax({max: 100})(_req, _res, _next);

            expect(_called).to.be.false;
            expect(_endCalled).to.be.true;
        })

        it('should call next correctly', function()
        {
            var _called = false;
            var _endCalled = false;
            var _req = {headers: {'content-length': '99'}};
            var _res = {status: function(){ expect(arguments[0]).to.equal(400); return {json: function(error){_endCalled = true; expect(error.message).to.equal(ERROR_MESSAGE_DEFAULT)}}}};
            var _next = function(){_called = true;};

            _validator.validateMax({max: 100})(_req, _res, _next);

            expect(_called).to.be.true;
            expect(_endCalled).to.be.false;
        })
    })

    describe('status', function()
    {
        it('should call the status with the correct status', function()
        {
            var _called = false;
            var _endCalled = false;
            var _req = {headers: {'content-length': '101'}};
            var _res = {status: function(){ expect(arguments[0]).to.equal(500); return {json: function(error){_endCalled = true; expect(error.message).to.equal(ERROR_MESSAGE_DEFAULT)}}}};
            var _next = function(){_called = true;};

            _validator.validateMax({max: 100, status: 500})(_req, _res, _next);

            expect(_called).to.be.false;
            expect(_endCalled).to.be.true;
        })
    })

    describe('message', function()
    {
        it('should call the json with the correct message', function()
        {
            var _called = false;
            var _endCalled = false;
            var _req = {headers: {'content-length': '101'}};
            var _res = {status: function(){ expect(arguments[0]).to.equal(500); return {json: function(error){_endCalled = true; expect(error.message).to.equal("stop it :(")}}}};
            var _next = function(){_called = true;};

            _validator.validateMax({max: 100, status: 500, message: "stop it :("})(_req, _res, _next);

            expect(_called).to.be.false;
            expect(_endCalled).to.be.true;
        })
    })
})