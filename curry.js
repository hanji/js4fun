// curry.js --- simulated currying in javascript
// (c) 2011 Ji Han
// freely distributable under the BSD license

// example: 
// var add = curry(function(x,y,z,w){return x+y+z+w});
// console.log(add(1)(2)(3)(4));

var curry = function (f){
    var xs = Array.prototype.slice.call(arguments, 1);
    return (xs.length < f.length) ?
        function (){ return curry.apply(this, [f].concat(xs.concat(Array.prototype.slice.call(arguments)))) }
        : f.apply(this, xs);
}
