
const cr = require('cache-register');
const _ = require('lodash');
const {BaseStorage} = cr.storage;

class RedisStorage extends BaseStorage {
  constructor({redis, ttl}) {
    super();
    this.redis = redis;
    this.ttl = ttl;
  }

  /*async*/ get(key) {
    return new Promise((resolve, reject)=> {
      this.redis.get(key, function(err, data) {
        if(err) {
          return reject(err);
        }

        try {
          return resolve(JSON.parse(data));
        } catch(err2) {
          return reject(err2);
        }
      });
    });
  }

  /*async*/ set(key, value) {
    return new Promise((resolve, reject)=> {
      const d = {value};

      // FYI: The "PX" argument should only be passed to Redis
      //      when a ttl has been specified.  Hence, args magic.
      const args = [key, JSON.stringify(d)];
      if(typeof(this.ttl) === 'number') {
        args.push("PX", this.ttl);
      } else if(_.isFunction(this.ttl)) {
        args.push("PX", this.ttl());
      }

      this.redis.set(...args, function(err, data) {
        return (err) ? reject(err) : resolve(d);
      });
    });
  }

  /*async*/ delete(key) {
    return new Promise((resolve, reject)=> {
      this.redis.del(key, function(err, data) {
        return (err) ? reject(err) : resolve(data);
      });
    });
  }
}

module.exports = exports = RedisStorage;
