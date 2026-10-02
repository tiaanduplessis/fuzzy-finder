import e from"escape-string-regexp";var r=function(r,t){if(void 0===r&&(r=""),void 0===t&&(t=[]),"string"!=typeof r)throw new TypeError("Expected a string");var n=r.split("").map(e),i=new RegExp(n.join("(.*)")+".*");return t.reduce(function(e,r){var t=i.exec(r);return t&&e.push({match:r,rank:t.index}),e},[])};export{r as default};
//# sourceMappingURL=fuzzy-finder.m.js.map
