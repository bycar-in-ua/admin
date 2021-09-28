export class useMemory {
  constructor(memoryType = "local") {
    switch (memoryType) {
      case "session":
        this.memory = sessionStorage;
        break;
      default:
        this.memory = localStorage;
        break;
    }
  }

  get(key, defaultVal) {
    const result = this.memory.getItem(key);
    if (result) {
      return result;
    }
    return defaultVal;
  }

  set(key, val) {
    this.memory.setItem(key, val);
  }
}

export default useMemory;
