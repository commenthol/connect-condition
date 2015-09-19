/* global describe, it */

'use strict'

var assert = require('assert')
var chain = require('connect-chain-if')
var condition = require('../')

var mw = {
  first: function (req, res, next) {
    req.first = 1
    next && next()
  },
  last: function (req, res, next) {
    req.last = 1
    next && next()
  },
  true: function (req, res, next) {
    req.test = true
    next()
  },
  false: function (req, res, next) {
    req.test = false
    next()
  }
}

describe('condition', function () {
  it('always true', function (done) {
    var req = {}
    var res = {}
    var exp = { first: 1, test: true, last: 1 }

    function cond () {
      return true
    }

    chain([
      mw.first,
      condition(cond, mw.true, mw.false),
      mw.last
    ])(req, res, function () {
      assert.deepEqual(req, exp)
      done()
    })
  })

  it('always false', function (done) {
    var req = {}
    var res = {}
    var exp = { first: 1, test: false, last: 1 }

    function cond () {
      return false
    }

    chain([
      mw.first,
      condition(cond, mw.true, mw.false),
      mw.last
    ])(req, res, function () {
      assert.deepEqual(req, exp)
      done()
    })
  })

  it('evaluating to true', function (done) {
    var req = {}
    var res = {}
    var exp = { first: 1, test: true, last: 1 }

    function cond (req, res) {
      if (req.first) return true
    }

    chain([
      mw.first,
      condition(cond, mw.true, mw.false),
      mw.last
    ])(req, res, function () {
      assert.deepEqual(req, exp)
      done()
    })
  })

  it('evaluating to false', function (done) {
    var req = {}
    var res = {}
    var exp = { first: 1, test: false, last: 1 }

    function cond (req, res) {
      if (!req.first) return true
    }

    chain([
      mw.first,
      condition(cond, mw.true, mw.false),
      mw.last
    ])(req, res, function () {
      assert.deepEqual(req, exp)
      done()
    })
  })

  it('false middleware missing', function (done) {
    var req = {}
    var res = {}
    var exp = { first: 1, last: 1 }

    function cond () {
      return false
    }

    chain([
      mw.first,
      condition(cond, mw.true),
      mw.last
    ])(req, res, function () {
      assert.deepEqual(req, exp)
      done()
    })
  })
})
