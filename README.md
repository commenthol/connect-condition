# connect-condition

> middleware to conditionally select middlewares

![NPM version](https://badge.fury.io/js/connect-condition.svg)
[![Build Status](https://secure.travis-ci.org/commenthol/connect-condition.svg?branch=master)](https://travis-ci.org/commenthol/connect-condition)

## Table of Contents

<!-- !toc (minlevel=2 omit="Table of Contents") -->

* [Description](#description)
* [Contribution and License Agreement](#contribution-and-license-agreement)
* [License](#license)

<!-- toc! -->

## Description

Use conditional middlewares within [connect][] or [express][].

If `condition` returns true, then `middleware_true` is processed. Otherwise it's `middleware_false`.

**Returns**: <code>function</code> - `function (req, res, next)`

| Param | Type | Description |
| --- | --- | --- |
| condition | <code>function</code> | `function (req, res)` |
| middleware_true | <code>function</code> | `function (req, res, next)` middleware executed if `condition` returns true |
| [middleware_false] | <code>function</code> | `function (req, res, next)` middleware executed if `condition` returns false |

**Example**
```js
require('http').createServer(
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
```

## Contribution and License Agreement

If you contribute code to this project, you are implicitly allowing your
code to be distributed under the MIT license. You are also implicitly
verifying that all code is your original work or correctly attributed
with the source of its origin and licence.

## License

Copyright (c) 2015 commenthol (MIT License)

See [LICENSE][] for more info.

[LICENSE]: ./LICENSE
[connect]: https://github.com/senchalabs/connect#readme
[express]: http://expressjs.com/




