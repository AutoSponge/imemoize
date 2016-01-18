'use strict';

exports.__esModule = true;

var _immutable = require('immutable');

exports.default = function (fn) {
  var cache = {};
  var cacheKey = (0, _immutable.List)();
  return function () {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var hashCode = cacheKey.push.apply(cacheKey, [this].concat(args)).hashCode();
    if (!cache[hashCode]) {
      cache[hashCode] = fn.apply(this, args);
    }
    return cache[hashCode];
  };
};