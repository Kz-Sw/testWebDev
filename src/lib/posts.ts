export function getAllPosts() {
  const modules = import.meta.glob('../content/posts/*.mdx', { eager: true });
  const posts = Object.values(modules) as any[];

  return posts.sort((a, b) => {
    const dateA = new Date(a.frontmatter?.pubDate || 0).getTime();
    const dateB = new Date(b.frontmatter?.pubDate || 0).getTime();
    return dateB - dateA; // newest first
  });
}

export function getPostsByCategory(category: string) {
  return getAllPosts().filter(
    (p: any) => p.frontmatter?.category === category
  );
}
