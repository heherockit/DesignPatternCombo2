import CacheManager from "./CacheManager";

class LocalStorageCacheManager extends CacheManager {
    constructor() {
        super();

        //make this sealed
        if(this.new !== LocalStorageCacheManager) {
            throw new TypeError("This is a sealed class. Subclassing is not allowed.");
        }
    }
}

const localStorageCacheManager = new LocalStorageCacheManager();
export default localStorageCacheManager;
