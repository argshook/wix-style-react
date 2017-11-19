// promisify : Function -> List arguments -> Promise
module.exports = fn =>
  (...args) =>
    new Promise((resolve, reject) =>
      fn(
        ...args,
        (err, payload) => err ? reject(err) : resolve(payload)
      )
    );
