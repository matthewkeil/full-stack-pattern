function breakOnSeparator(separator: string, segments: string[]): string[] {
  let broken: string[] = [];
  const regexp = new RegExp(separator);
  for (const segment of segments) {
    regexp.test(segment) ? broken.push(...segment.split(separator)) : broken.push(segment);
  }
  return broken;
}
function segmentString(str: string): string[] {
  const separators = ['-', '_', '\\s'];
  // remove characters that aren't AWS allowed in naming
  const sanitized = str.replace(/[!@#$%^&*]/g, '');
  // break camelCase into camel-Case
  let separated = [sanitized.replace(/([a-z0-9])([A-Z])/g, '$1-$2')];
  for (const separator of separators) {
    separated = breakOnSeparator(separator, separated);
  }
  return separated;
}
function capitalize(segment: string): string {
  return segment[0].toUpperCase() + segment.slice(1);
}
function lowercaseFirstLetter(segment: string): string {
  return segment[0].toLowerCase() + segment.slice(1);
}
function toKebab(str: string): string {
  return segmentString(str).join('-').toLowerCase();
}
function toPascal(str: string): string {
  return segmentString(str).map(capitalize).join('');
}
function toCamel(str: string): string {
  return lowercaseFirstLetter(toPascal(str));
}
export { capitalize, toKebab, toCamel, toPascal };
