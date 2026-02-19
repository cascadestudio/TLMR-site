/**
 * Resolve a Sanity reference ID against a Map, with fallbacks for
 * ID format mismatches between portable text _ref values and document _id values.
 *
 * Handles:
 * - "drafts." prefix (Sanity draft documents)
 * - Leading "-" prefix (Gatsby ID transformation)
 *
 * @param {Map} map - A Map keyed by document _id
 * @param {string} ref - The _ref value to look up
 * @returns {*} The resolved value from the map, or undefined
 */
const resolveSanityRef = (map, ref) => {
  if (!map || !ref) return undefined;

  let result = map.get(ref);
  if (result) return result;

  if (ref.startsWith("-")) {
    result = map.get(ref.substring(1));
    if (result) return result;
  }

  if (ref.startsWith("drafts.")) {
    result = map.get(ref.replace("drafts.", ""));
    if (result) return result;
  }

  if (!ref.startsWith("drafts.")) {
    result = map.get(`drafts.${ref}`);
    if (result) return result;
  }

  return undefined;
};

export default resolveSanityRef;
