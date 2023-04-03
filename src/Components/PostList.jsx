import React from 'react'
import PostItem from './PostItem'

export default function PostList({posts, title, remove}) {

  if (!posts.length) {
    return (<h1>No posts found</h1>)
  }

  return (
    <>
        <h1>{title}</h1>
        {posts.map((post, index) =>
        <PostItem remove={remove} number={index + 1} post={post} key={post.id}/>)}
    </>
  )
}
