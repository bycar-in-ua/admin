export default function useClipboard() {
  const getImage = (e) => {
    const item = Array.from(e.clipboardData.items).find((x) =>
      /^image\//.test(x.type)
    );
    if (item) {
      return item.getAsFile();
    }
    return false;
  };

  return { getImage };
}
