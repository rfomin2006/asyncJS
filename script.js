const result = document.getElementById("result");
const quickBtn = document.getElementById("quick");
const slowBtn = document.getElementById("slow");

const worker = new Worker("fib_worker.js");

/* cacher */
function createCachedFn(originalFn) {
    const cache = new Map();

    return function(...args) {
        const cacheKey = JSON.stringify(args);

        if (cache.has(cacheKey)) {
            console.log("Result fetched from cache");
            return cache.get(cacheKey);
        }

        const result = originalFn(...args);
        cache.set(cacheKey, result);
        console.log("Result calculeted and cached");

        return result;
    }
}

const getFiboNum = (n) => {
    return new Promise(resolve => {
        worker.postMessage(n);
        worker.onmessage = (event) => {
            resolve(event.data);
        }
    })
}

const cachedFib = createCachedFn(getFiboNum);

quickBtn.addEventListener("click", () => {
    const message = document.createElement("div");
    message.innerHTML = "Quick";
    result.appendChild(message);
})

slowBtn.addEventListener("click", async () => {
    const fibo = await cachedFib(42);

    const block = document.createElement("div");
    block.style.backgroundColor = "yellowgreen";
    block.innerHTML = fibo;
    result.appendChild(block);
})