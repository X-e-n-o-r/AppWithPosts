import { useState , useMemo } from 'react'
import './App.css'
import MySelect from './Components/MySelect'
import PostForm from './Components/PostForm'
import PostItem from './Components/PostItem'
import PostList from './Components/PostList'
import PostFilter from './Components/PostFilter'
import MyModal from './Components/MyModal/MyModal'
import { usePosts } from './Components/Hooks/usePosts'

function App() {
  const [posts, setPosts] = useState([])

  const [filter, setFilter] = useState({
    sort: '', query: ''
  })

  const [modal, setModal] = useState(false)

  const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query)

  const createPost = (newPost) => {
    setPosts([...posts, newPost])
    setModal(false)
  }

  const removePost = (post) => {
    setPosts(posts.filter(p => p.id !== post.id ))
  }

  return (
    <div className="App">
      <button className='createButton' onClick={() => {
        setModal(true)
      }}>
        Create post
      </button>
      <MyModal visible={modal} setVisible={setModal}>
        <PostForm create={createPost} />
      </MyModal>
      <PostFilter filter={filter}
                  setFilter={setFilter}/>
      <PostList remove={removePost} posts={sortedAndSearchedPosts} title="Post list 1"/>
    </div>
  )
}

export default App
