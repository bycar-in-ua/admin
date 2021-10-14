export function useMemory(memoryType) {
  let memory = undefined;
  switch (memoryType) {
    case "session":
      memory = sessionStorage;
      break;
    default:
      memory = localStorage;
      break;
  }

  const get = (key, defaultVal) => {
    const result = memory.getItem(key);
    if (result) {
      return result;
    }
    return defaultVal;
  };

  const set = (key, val) => {
    memory.setItem(key, val);
  };

  return {
    get,
    set,
  };
}

export default useMemory;
