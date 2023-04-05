import React from 'react'
import PostItem from './PostItem'
import { TransitionGroup, CSSTransition } from 'react-transition-group'

export default function PostList({posts, title, remove}) {

  if (!posts.length) {
    return (<h1>No posts found</h1>)
  }

  return (
    <>
        <h1>{title}</h1>
        <TransitionGroup>
          {posts.map((post, index) =>
            <CSSTransition
              key={post.id}
              timeout={500}
              classNames="post"
            >
              <PostItem remove={remove} number={index + 1} post={post} />
            </CSSTransition>
          )}
        </TransitionGroup>
    </>
  )
};
