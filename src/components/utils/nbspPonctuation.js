export default function nbspPonctuation(inputText) {
  const regex = /\s+([.,;:!?])/g;
  if (typeof inputText !== "string") {
    if (inputText == null) return "";
    return "";
  }
  return inputText.replace(regex, "&nbsp;$1");
}
