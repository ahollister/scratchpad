import { useState } from 'react'
import Editor from './Editor'
import { supabase } from '../lib/api'
import { useNavigate } from 'react-router-dom'

export default function New({ isDark }) {
  const [title, setTitle] = useState('My new title')
  const [content, setContent] = useState('My new post content')
  const navigate = useNavigate()

  const handlePublishClick = async () => {
    const { error } = await supabase.from('posts').insert([{ title, content }])

    if (error) {
      console.log(error)
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
