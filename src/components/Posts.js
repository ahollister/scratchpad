import { useState, useEffect } from 'react'
import { supabase } from '../lib/api'
import { search } from 'fast-fuzzy'
import Post from './Post'

export default function Posts() {
  const [posts, setPosts] = useState([])
  const [results, setResults] = useState([])

  useEffect(() => {
    fetchPosts().catch(console.error)
  }, [])

  const fetchPosts = async () => {
    let { data: posts, error } = await supabase
      .from('posts')
      .select('*')
      .order('id', { ascending: false })

    if (error) {
      console.log('error', error)
      return
    }

    setPosts(posts)
    setResults(posts)
  }

  const deletePost = async (id) => {
    const { error } = await supabase.from('posts').delete().eq('id', id)

    if (error) {
      console.log('error', error)
      return
    }

    fetchPosts().catch(console.error)
  }

  // On input change, run fuzzy search on results.
  const handleChange = (e) => {
    const keySelectors = (post) => {
      return [post.title, post.content]
    }

    const options = {
      keySelector: (obj) => keySelectors(obj),
      returnMatchData: true,
    }
    let matches = search(e.target.value, posts, options)
      .filter((post) => post.score > 0.8)
      .map((post) => post.item)

    // Show all if input empty.
    if (e.target.value === '') {
      matches = posts
    }

    setResults(matches)
  }

  const Posts = () =>
    results.map((post) => (
      <Post key={post.id} post={post} deletePost={deletePost} />
    ))

  return (
    <>
      <input
        key="input"
        type="text"
        onChange={(e) => handleChange(e)}
        placeholder="Search..."
        className="mb-10 focus:outline-none border border-orange-100 bg-orange-50 dark:border-zinc-700 dark:bg-zinc-800 py-2 px-4 rounded-md"
      />
      <Posts />
    </>
  )
}
