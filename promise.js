const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'

// 手写Promsie
class MyPromsie {
    // Promise状态
    #status = 'pending';
    // Promise结果
    #result = undefined;
    // Promise回调
    #handlers = [];
    constructor(executor) {
        const resolve = (result) => {
            this.#changeStatus(FULFILLED, result)
        }
        const reject = (reason) => {
            this.#changeStatus(REJECTED, reason)
        }
        try {
            executor(resolve, reject)
        } catch (error) {
            reject(error)
        }

    }

    // 改变状态
    #changeStatus(status, result) {
        if (this.#status !== PENDING) return
        this.#status = status
        this.#result = result
        this.#run()
    }

    // then方法
    then(onFulfilled, onRejected) {
        return new MyPromsie((resolve, reject) => {
            this.#handlers.push({
                onFulfilled,
                onRejected,
                resolve,
                reject
            })
            this.#run()
        })
    }

    // 微队列
    #runMicroTask(callback) {
        setTimeout(callback, 0)
    }

    // 执行第一个回调
    #runOne(callback, resolve, reject) {
        this.#runMicroTask(() => {
            if (typeof callback !== 'function') {
                const settled = this.#status === FULFILLED ? resolve : reject
                settled(this.#result)
                return
            }
            try {
                const data = callback(this.#result)
                if (this.#isPromise(data)) {
                    data.then(resolve, reject)
                    return
                }
                resolve(data)
            } catch (error) {
                reject(error)
            }
        })
    }

    // 执行回调
    #run() {
        if (this.#status === PENDING) return
        while (this.#handlers.length) {
            const { onFulfilled, onRejected, resolve, reject } = this.#handlers.shift()
            if (this.#status === FULFILLED) {
                this.#runOne(onFulfilled, resolve, reject)
            } else {
                this.#runOne(onRejected, resolve, reject)
            }
        }
    }

    // 判断是否是Promise
    #isPromise(value) {
        return false
    }
}

const Promsie = new MyPromsie((resolve, reject) => {
    setTimeout(() => {
        resolve('success')
        reject('error')
    }, 1000)
})


Promsie.then(null, (err) => {
    console.log(`Promise err1: ${err}`);
    return `err1-${err}`
}
).then((data) => {
    console.log(`Promise data: ${data}`, 'data');
})

Promsie.then((res) => {
    console.log(`Promise res2: ${res}`);
    return 'res2-1'
}, (err) => {
    console.log(`Promise err2: ${err}`);
    return 'err2-1'
}).then((data) => {
    console.log(`Promise res2-1: ${data}`, 'data');
})

Promsie.then((res) => {
    console.log(`Promise res3: ${res}`);
})

Promsie.then((res) => {
    console.log(`Promise res4: ${res}`);
}, (err) => {
    console.log(`Promise err4: ${err}`);
})


const P = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('success')
        reject('error')
    }, 1000)
})

P.then(null, (err) => { }).then((data) => { console.log(data + `138`); })

setTimeout(() => {
    console.log('setTimeout');
}, 1000)