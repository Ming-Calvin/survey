class StorageCache {
  constructor(local = true) {
    this.storage = local ? localStorage : sessionStorage;
  }
  get(key) {
    let value = this.storage.getItem(key);
    if (value) return JSON.parse(value);
  }
  set(key, value) {
    value && this.storage.setItem(key, JSON.stringify(value));
  }
  remove(key) {
    this.storage.removeItem(key);
  }
  clear() {
    this.storage.clear();
  }
}

const local = new StorageCache();
const session = new StorageCache(false);

export { local, session };
