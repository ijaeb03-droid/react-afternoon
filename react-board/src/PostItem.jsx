
function PostItem({ post }) {
  return (
    <article className="post-card">
      <span className="post-number">
        게시글 {post.id}
      </span>

      <h2>{post.title}</h2>
      <p>{post.body}</p>
    </article>
  )
}

export default PostItem
