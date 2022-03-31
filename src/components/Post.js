import { Link } from 'react-router-dom'
import { marked } from 'marked'

export default function Post({ post, deletePost }) {
  return (
    <article key={post.id} className="mb-20 max-w-3xl group">
      <header className="mb-2">
        <Link
          className="mr-2 text-xs underline opacity-0 group-hover:opacity-100 hover:text-gray-500"
          to={`/edit/${post.id}`}
          title="Edit"
        >
          Edit
        </Link>
        <button
          onClick={() => {
            deletePost(post.id)
          }}
          className="text-xs text-red-500 underline opacity-0 group-hover:opacity-100 hover:text-red-400"
          title="Delete"
        >
          Delete
        </button>
        <h2 className="text-2xl mt-3 mr-5">{post.title}</h2>
      </header>
      <div
        className="post-content"
        dangerouslySetInnerHTML={{ __html: marked.parse(post.content) }}
      />
    </article>
  )
}
