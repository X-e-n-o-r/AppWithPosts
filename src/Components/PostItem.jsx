import React from 'react'

export default function PostItem(props) {
  return (
  <div className='post'>
    <div className='post-content'>
      <strong>{props.post.id}. {props.post.title}</strong>
      <div>
        {props.post.body}
      </div>
    </div>
    <div className="post-btns">
      <button onClick={() => props.remove(props.post)}>Delete</button>
    </div>
  </div>
  )
}
