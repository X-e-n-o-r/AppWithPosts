import React, { useState }  from 'react'

export default function PostForm({create}) {
const [post, setPost] = useState({
    title: '',
    body: ''
  })

const addNewPost = (e) => {
    e.preventDefault()
    const newPost = {
        ...post, id: Date.now()
    }
    create(newPost)
    setPost({
      title: '',
      body: '',
    })
  }
  return (
    <>
      <form>
        <input
          type='text'
          placeholder='Title'
          onChange={e => setPost({...post, title: e.target.value})}
          value={post.title}
           />
        <input 
          type='text'
          placeholder='Post'
          onChange={e => setPost({...post, body: e.target.value})}
          value={post.body}/>
        <button onClick={addNewPost} className='add-btn' >Add</button>
      </form>
    </>
  )
}
