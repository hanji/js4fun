/// js4fun --- functional javascript (for fun)
/// (c) Copyright Ji Han 2012

(function (){
js4fun = this.js4fun || {};

js4fun.reduce = function (f, a, l){
    var r = a;
    for (var i = 0; i < l.length; ++i){ r = f(r, l[i]) }
    return r;
}

js4fun.id = function(x){ return x }
js4fun.flip = function (f){ return function(x, y){ return f(y, x) }}
js4fun.compose2 = function (f, g){ return function(){ return f(g.apply(this, Array.prototype.slice.call(arguments))) }}
js4fun.compose = function() { return js4fun.reduce(compose2, js4fun.id, Array.prototype.slice.call(arguments)) }

// e.g. var add4 = function(x,y,z,w){return x+y+z+w}
// curry_n(add4,4)(1)(2)(3)(4) => add4(1,2,3,4)
// the version with n is for functions without proper length property
js4fun.curry_n = function (n, f){
    var curry = function (f){
        var xs = Array.prototype.slice.call(arguments, 1);
        return (xs.length < n) ?
            function (){ return curry.apply(this, [f].concat(xs.concat(Array.prototype.slice.call(arguments)))) }
            : f.apply(this, xs);
    }
    return curry(f);
}

// curry(add4)(1)(2)(3)(4) => add4(1,2,3,4)
js4fun.curry = function (f){
    var xs = Array.prototype.slice.call(arguments, 1);
    return (xs.length < f.length) ?
        function (){ return js4fun.curry.apply(this, [f].concat(xs.concat(Array.prototype.slice.call(arguments)))) }
        : f.apply(this, xs);
}

// partial(add4,this,1,2)(3,4) => add4(1,2,3,4)
js4fun.partial = function (fn, thisArg, argArray){
    var xs = Array.prototype.slice.call(arguments, 2);
    return function (){ return fn.apply(thisArg, xs.concat(Array.prototype.slice.call(arguments))) }
}

// placeholders for unbound parameters
_1 = js4fun._1 = function (args){ return args[0] };
_2 = js4fun._2 = function (args){ return args[1] };
_3 = js4fun._3 = function (args){ return args[2] };
_4 = js4fun._4 = function (args){ return args[3] };
_5 = js4fun._5 = function (args){ return args[4] };
_6 = js4fun._6 = function (args){ return args[5] };
_7 = js4fun._7 = function (args){ return args[6] };
_8 = js4fun._8 = function (args){ return args[7] };
_9 = js4fun._9 = function (args){ return args[8] };
js4fun._ = [ js4fun._1, js4fun._2, js4fun._3, js4fun._4, js4fun._5, js4fun._6, js4fun._7, js4fun._8, js4fun._9 ];

js4fun._bind = function(xs, ys){
    var zs = Array.prototype.slice.call(xs);
    for (var i = 0; i < zs.length; ++i){ if (js4fun._.indexOf(zs[i]) !== -1) zs[i] = zs[i](ys) }
    return zs;
}

// bind(f,a,_2,c,_1)(d,b) => f(a,b,c,d)
// bind(function(x,y,z,w){return ''+x+y+z+w},'x','x',_1,_1)('o') => 'xxoo'
js4fun.bind = function (f){
    var xs = Array.prototype.slice.call(arguments, 1);
    return function(){
        var ys = Array.prototype.slice.call(arguments);
        return f.apply(this, js4fun._bind(xs, ys));
    }
}

// call js4fun.intruisive() to import
js4fun.intruisive = function (){
    Function.prototype.curry = function (thisArg, argArray){
        var fn = this;
        var xs = Array.prototype.slice.call(arguments, 1);
        return (xs.length < fn.length) ?
            function (){ return Function.prototype.curry.apply(fn, [thisArg].concat(xs.concat(Array.prototype.slice.call(arguments)))) }
            : fn.apply(thisArg, xs);
    }
}

})();