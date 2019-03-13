var e,r=(e=require("escape-string-regexp"))&&"object"==typeof e&&"default"in e?e.default:e;module.exports=function(e,n){void 0===e&&(e=""),void 0===n&&(n=[]);var t=r(e),i=new RegExp(t.split(/(\.|)/).filter(function(e){return e.length}).join("(.*)")+".*");return n.reduce(function(e,r){var n=i.exec(r);return n&&e.push({match:r,rank:n.index}),e},[])};
//# sourceMappingURL=fuzzy-finder.js.map
