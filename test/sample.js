'use strict'

var http = require('http')
var condition = require('..')

/**
 * starts a server with a condition middleware
 *
 * use
 *
 *    curl http://localhost:3000
 *
 * and
 *
 *    curl http://localhost:3000/?json
 *
 */
http.createServer(
  condition(
    function (req, res) { // condition
      if (~req.url.indexOf('json')) {
        return true
      }
    },
    function (req, res, next) { // middleware which is choosen on condition == true
      res.setHeader('Content', 'application/json')
      res.end('{ "text": "as json" }\n')
    },
    function (req, res, next) { // middleware which is choosen on condition == false
      res.end('just text\n')
    }
  )
).listen(3000)

console.log('\n' +
  'test with:\n' +
  '    curl http://localhost:3000\n' +
  'and\n' +
  '    curl http://localhost:3000/json\n'
)
