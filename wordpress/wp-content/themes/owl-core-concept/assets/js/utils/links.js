export function normalizeUrl(url) {
  if (!url) {
    return '';
  }

  const value = url.trim();

  if (
    value.startsWith('/') ||
    value.startsWith('#') ||
    value.startsWith('http://') ||
    value.startsWith('https://') ||
    value.startsWith('mailto:') ||
    value.startsWith('tel:')
  ) {
    return value;
  }

  return `https://${value}`;
}
