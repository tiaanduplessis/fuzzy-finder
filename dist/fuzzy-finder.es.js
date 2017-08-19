import escape from 'escape-string-regexp';

var fuzzyFinder = function (str, args) {
  if ( str === void 0 ) str = '';
  if ( args === void 0 ) args = [];

  var escaped = escape(str);
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

export default fuzzyFinder;
