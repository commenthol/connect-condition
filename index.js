/**
 * @module connect-condition
 * @copyright 2015 commenthol@gmail.com
 * @license MIT
 */

'use strict'

/**
 * conditional middleware
 *
 * if `condition` returns true, then `middleware_true` is processed. Otherwise it's `middleware_false`.
 *
 * @example
 * require('http').createServer(
 *   condition(
 *     function (req, res) { // condition
 *       if (~req.url.indexOf('json')) {
 *         return true
 *       }
 *     },
 *     function (req, res, next) { // middleware which is choosen on condition == true
 *       res.setHeader('Content', 'application/json')
 *       res.end('{ "text": "as json" }\n')
 *     },
 *     function (req, res, next) { // middleware which is choosen on condition == false
 *       res.end('just text\n')
 *     }
 *   )
 * ).listen(3000)
 *
 * @param {Function} condition - `function (req, res)`
 * @param {Function} middleware_true  - `function (req, res, next)` middleware executed if `condition` returns true
 * @param {Function} [middleware_false] - `function (req, res, next)` middleware executed if `condition` returns false
 * @return {Function} `function (req, res, next)`
 */
module.exports = function (condition, middleware_true, middleware_false) {
  if (!middleware_false) {
    middleware_false = noop
  }

  var middleware = function (req, res, next) {
    if (condition(req, res)) {
      return middleware_true(req, res, next)
    } else {
      return middleware_false(req, res, next)
    }
  }

  return middleware
}

function noop (req, res, next) {
  next && next()
}

