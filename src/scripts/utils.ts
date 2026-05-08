export function toKanjiDigits(num: number): string {
  const map = "〇一二三四五六七八九";
  return num.toString().replace(/\d/g, (d: string) => map[parseInt(d)]);
}

export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')       // Replace spaces with -
    .replace(/[^\w-]+/g, '');   // Remove all non-word chars
}

export function formatDate(date: string): string {
  return new Date(date).toLocaleDateString('ja-JP', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

export function buildSlug(post: any) {
  const { number, enTitle } = post.frontmatter;

  const slugBase = enTitle ? slugify(enTitle) : "untitled";
  const paddedNum = number ? String(number).padStart(3, "0") : null;

  return paddedNum ? `${paddedNum}-${slugBase}` : slugBase;
}