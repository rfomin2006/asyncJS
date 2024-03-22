function fib(n) {
    if(n <= 1) {
        return n;
    } else {
        return fib(n-1) + fib(n-2);
    }
}

onmessage = function(evt) {
    const result = fib(evt.data);
    postMessage(result);
}