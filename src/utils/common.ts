export function toParams(obj?: object) {
  return "?" + new URLSearchParams(obj as URLSearchParams).toString();
}
