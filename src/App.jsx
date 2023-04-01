import { useState , useMemo } from 'react'
import './App.css'
import MySelect from './Components/MySelect'
import PostForm from './Components/PostForm'
import PostItem from './Components/PostItem'
import PostList from './Components/PostList'
import PostFilter from './Components/PostFilter'

function App() {
  const [posts, setPosts] = useState([
  ])

  const [filter, setFilter] = useState({
    sort: '', query: ''
  })

  const sortedPosts = useMemo(() => {
    console.log('rerendered')
    if (filter.sort) {
      return [...posts].sort((a,b) => a[filter.sort].localeCompare(b[filter.sort]))
    }
    return posts;
  }, [filter.sort, posts])

  const sortedAndSearchedPosts = useMemo(() => {
    return sortedPosts.filter(post => post.title.toLowerCase().includes(filter.query.toLowerCase()))
  }, [filter.query, sortedPosts])

  const createPost = (newPost) => {
    setPosts([...posts, newPost])
  }

  const removePost = (post) => {
    setPosts(posts.filter(p => p.id !== post.id ))
  }

  return (
    <div className="App">
      <PostForm create={createPost} />
      <PostFilter filter={filter}
                  setFilter={setFilter}/>
      {sortedAndSearchedPosts.length
        ? <PostList remove={removePost} posts={sortedAndSearchedPosts} title="Post list 1"/>
        : <h1>Posts not found</h1> }
    </div>
  )
}

export default App
