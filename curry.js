// curry.js --- simulated currying in javascript
// (c) 2011 Ji Han
// freely distributable under the BSD license

// example: 
// var add = curry(function(x,y,z,w){return x+y+z+w});
// console.log(add(1)(2)(3)(4));

function curry(f){
	var xs = Array.prototype.slice.call(arguments, 1);
	return function(){
		var ys = xs.concat(Array.prototype.slice.call(arguments));
		return (ys.length < f.length) ? curry.apply(this, [f].concat(ys)) : f.apply(this, ys)
	}
}

