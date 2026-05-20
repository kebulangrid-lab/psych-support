class DataCache {
  private cache: Record<string, any> = {};

  get(key: string): any {
    return this.cache[key];
  }

  set(key: string, data: any): void {
    this.cache[key] = data;
  }

  clear(key?: string): void {
    if (key) {
      delete this.cache[key];
    } else {
      this.cache = {};
    }
  }
}

export const dataCache = new DataCache();
