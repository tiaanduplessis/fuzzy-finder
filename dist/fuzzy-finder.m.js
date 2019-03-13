import e from"escape-string-regexp";export default function(r,n){void 0===r&&(r=""),void 0===n&&(n=[]);var t=e(r),i=new RegExp(t.split(/(\.|)/).filter(function(e){return e.length}).join("(.*)")+".*");return n.reduce(function(e,r){var n=i.exec(r);return n&&e.push({match:r,rank:n.index}),e},[])}
//# sourceMappingURL=fuzzy-finder.m.js.map
