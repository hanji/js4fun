function fib(n){
	function tailFib(n,x,y){
		if(n==0){return x}else{return tailFib(n-1,y,x+y)}
	}
	return tailFib(n,0,1)
}
