export function readingTime(htmlOrText: string, wpm = 200): string {
  // strip HTML tags if present
  const text = htmlOrText.replace(/<[^>]+>/g, " ");
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  const mins = Math.max(1, Math.ceil(words / wpm));
  return `${mins} min read`;
}
