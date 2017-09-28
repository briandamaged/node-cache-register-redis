# cache-register-redis #

Redis storage for [cache-register](https://www.npmjs.com/package/cache-register)

## Installation ##

```shell
npm install --save cache-register-redis
```

## Usage ##

### Too-Quick Example ###

```javascript
async slowFunction(x, y) {
  /* some async operation that takes 5 seconds */
}


const Redis = require('redis');

const { CacheRegister } = require('cache-register');
const RedisStorage = require('cache-register-redis');


const redisStorage = new RedisStorage({
  redis: Redis.createClient(),
  ttl:   5000,    // 5000ms
});

const cachedFunction = CacheRegister({
  storage: redisStorage,
  valueFunc: slowFunction,
});
```
