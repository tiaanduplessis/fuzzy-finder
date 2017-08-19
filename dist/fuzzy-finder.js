(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.fuzzyFinder = factory());
}(this, (function () { 'use strict';

var matchOperatorsRe = /[|\\{}()[\]^$+*?.]/g;

var index = function (str) {
	if (typeof str !== 'string') {
		throw new TypeError('Expected a string');
	}

	return str.replace(matchOperatorsRe, '\\$&');
};

var fuzzyFinder = function (str, args) {
  if ( str === void 0 ) str = '';
  if ( args === void 0 ) args = [];

  var escaped = index(str);
  var regex = new RegExp(((escaped.split('').join('(.*)')) + ".*"));
  var length = str.length;

  return args.reduce(function (acc, possibleMatch) {
    var result = regex.exec(possibleMatch);

    if (result) {
      acc.push({
        match: possibleMatch,
        rank: result.index
      });
    }
    return acc
  }, [])
};

return fuzzyFinder;

})));
