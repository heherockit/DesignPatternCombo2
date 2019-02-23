import memoryCacheManager from '../cache/MemoryCacheManager';
import circuitBreaker from '../circuitBreaker/CircuitBreaker';

export default class ServiceBase {
  interval = 5; //interval to retry in seconds

  retry = (promiseAction, tryCount = 5) => {
    return new Promise((resolve, reject) => {
      promiseAction().then(resolve)
        .catch(err => {
          if (tryCount > 0) {
            setTimeout(() => {
              this.retry(promiseAction, tryCount - 1).then(resolve);
            }, this.interval * 1000);
          }
          else 
            reject(err);
        });
    }).catch(e => {console.log(e);});
  }

  useCircuitBreaker = (key) => promiseAction => {
    return circuitBreaker.execute(key, promiseAction);
  }

  applyMemoryCache = (key, absoluteExpireTime, slidingExpireTimeInMinute, removeCallback) => promiseAction => {
    const cacheItem = memoryCacheManager.get(key);
    if (cacheItem) {
      return new Promise((resolve, reject) => resolve(cacheItem));
    }

    return promiseAction().then(data => {
      memoryCacheManager.add(key, data, absoluteExpireTime, slidingExpireTimeInMinute, removeCallback);
      return data;
    });
  }

  applySessionStorageCache = (key, absoluteExpireTime, slidingExpireTimeInMinute, removeCallback) => promiseAction => {

  }

  applyLocalStorageCache = (key, absoluteExpireTime, slidingExpireTimeInMinute, removeCallback) => promiseAction => {

  }

  //query is a function to query data from indexedDb,
  //by default, it get an item by key which is the first prop of params object
  useIndexedDB = (promis
    , isExpired = data => true
    , fallback = this.applyMemoryCache()) => {

    try {
      // DO QUERY
    } catch (e) {
      fallback(promis);
    }
  }
}
