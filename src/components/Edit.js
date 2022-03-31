import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { supabase } from '../lib/api'
import Editor from './Editor'

export default function Edit({ isDark }) {
  const [title, setTitle] = useState('Loading ...')
  const [content, setContent] = useState('Loading ...')
  const { id } = useParams()
  const navigate = useNavigate()

  // Load post
  useEffect(() => {
    fetchPost(id).catch(console.error)
  }, [id])

  const fetchPost = async (id) => {
    let { data: posts, error } = await supabase
      .from('posts')
      .select('*')
      .eq('id', id)

    if (error) {
      console.log('error', error)
      return
    }

    setTitle(posts[0].title)
    setContent(posts[0].content)
  }

  const handlePublishClick = async () => {
    console.log({ title, content })
    const { error } = await supabase
      .from('posts')
      .update({ title, content })
      .eq('id', id)

    if (error) {
      console.log('error', error)
      return
    }

    navigate('/')
  }

  return (
    <Editor
      isDark={isDark}
      title={title}
      onChangeTitle={setTitle}
      content={content}
      onChangeContent={setContent}
      handlePublishClick={handlePublishClick}
    />
  )
}
