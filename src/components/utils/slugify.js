const slugify = (text) =>
  text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // remove accents (é → e)
    .replace(/[^a-z0-9]+/g, "-") // replace non-alphanumeric with dashes
    .replace(/(^-|-$)/g, ""); // trim leading/trailing dashes

export default slugify;
