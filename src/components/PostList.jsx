export default function PostList({ posts }) {
  return (
    <>
      {posts.map((post) => (
        <article key={post.url}>
          <a href={post.url}>
            <h2>{post.frontmatter.heroTitle}</h2>
          </a>
        </article>
      ))}
    </>
  );
}
