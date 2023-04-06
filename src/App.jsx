import { useState , useMemo, useEffect } from 'react'
import './App.css'
import MySelect from './Components/MySelect'
import PostForm from './Components/PostForm'
import PostItem from './Components/PostItem'
import PostList from './Components/PostList'
import PostFilter from './Components/PostFilter'
import MyModal from './Components/MyModal/MyModal'
import { usePosts } from './Components/Hooks/usePosts'
import axios from 'axios'
import PostService from './API/PostService'
import Loader from './Loader/Loader'

function App() {
  const [posts, setPosts] = useState([])
  const [filter, setFilter] = useState({ sort: '', query: ''})
  const [modal, setModal] = useState(false)
  const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query)
  const [isPostLoading, setIsPostLoading] = useState(false)

  const createPost = (newPost) => {
    setPosts([...posts, newPost])
    setModal(false)
  }

  useEffect(() => {
    fetchPost()
  }, [filter])
  
  async function fetchPost() {
    setIsPostLoading(true);
    setTimeout(async () => {
      const posts = await PostService.getAll();
      setPosts(posts)
      setIsPostLoading(false);
    }, 1000)
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
      {isPostLoading
        ? <div style={{display: 'flex', justifyContent:'center', marginTop: '150px'}}><Loader /></div>
        : <PostList remove={removePost} posts={sortedAndSearchedPosts} title="Post list"/>
      } 
    </div>
  )
}

export default App
