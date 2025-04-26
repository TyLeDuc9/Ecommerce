export const toSlug = (str) =>
    str
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/đ/g, "d")
      .replace(/Đ/g, "d")
      .replace(/[^a-zA-Z0-9\s]/g, "")
      .trim()
      .toLowerCase()
      .replace(/\s+/g, "-");
  