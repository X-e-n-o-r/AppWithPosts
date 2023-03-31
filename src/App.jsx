import { useState } from 'react'
import './App.css'
import MySelect from './Components/MySelect'
import PostForm from './Components/PostForm'
import PostItem from './Components/PostItem'
import PostList from './Components/PostList'

function App() {
  const [posts, setPosts] = useState([
    {id: 1, title: 'c', body: 's'},
    {id: 2, title: 'a', body: 'r'},
    {id: 3, title: 'b', body: 'e'}
  ])

  const [selectedSort, setSelectedSort] = useState()
  const createPost = (newPost) => {
    setPosts([...posts, newPost])
  }

  const removePost = (post) => {
    setPosts(posts.filter(p => p.id !== post.id ))
  }

  const sortPosts = (sort) => {
    setSelectedSort(sort);
    setPosts([...posts].sort((a,b) => a[sort].localeCompare(b[sort])))
  }

  return (
    <div className="App">
      <PostForm create={createPost} />
      <MySelect 
        defaultValue='Sort by'
        options={[
          {value:'title', name:'By title'},
          {value:'body', name:'By description'}
        ]}
        value={selectedSort}
        onChange={sortPosts} />
      {posts.length
        ? <PostList remove={removePost} posts={posts} title="Post list 1"/>
        : <h1>There is no posts</h1> }
    </div>
  )
}

export default App
