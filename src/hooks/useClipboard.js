export default function useClipboard() {
  /**
   * @param {Event} e
   * @returns {File | Boolean}
   */
  const getImage = (e) => {
    const item = Array.from(e.clipboardData.items).find((x) =>
      /^image\//.test(x.type)
    );
    if (item) {
      return item.getAsFile();
    }
    return false;
  };

  /**
   * @param {Event} e
   * @returns {File[] | Boolean}
   */
  const getImages = (e) => {
    const items = Array.from(e.clipboardData.items).filter((x) =>
      /^image\//.test(x.type)
    );
    if (items) {
      return items.map((x) => x.getAsFile());
    }
    return false;
  };

  return { getImage, getImages };
}
