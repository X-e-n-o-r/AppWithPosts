import { useState , useMemo, useEffect } from 'react'
import './App.css'
import PostForm from './Components/PostForm'
import PostItem from './Components/PostItem'
import PostList from './Components/PostList'
import PostFilter from './Components/PostFilter'
import MyModal from './Components/MyModal/MyModal'
import { usePosts } from './Components/Hooks/usePosts'
import PostService from './API/PostService'
import Loader from './Loader/Loader'
import { useFetching } from './Components/Hooks/useFetching'
import { getPageCount, getPagesArray } from './Components/utils/pages'

function App() {
  const [posts, setPosts] = useState([])
  const [filter, setFilter] = useState({ sort: '', query: ''})
  const [modal, setModal] = useState(false)
  const [totalPages, setTotalPages] = useState(0)
  const [limit, setLimit] = useState(10)
  const [page, setPage] = useState(1)
  const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query)
  let pagesArray = getPagesArray(totalPages)
  const [fetchPosts, isPostLoading, postError] = useFetching(async () => {
    const response = await PostService.getAll(limit, page);
    setPosts(response.data)
    const totalCount = response.headers['x-total-count']
    setTotalPages(getPageCount(totalCount, limit));
  })
  const createPost = (newPost) => {
    setPosts([...posts, newPost])
    setModal(false)
  }

  useEffect(() => {
    fetchPosts()
  }, [page])

  const removePost = (post) => {
    setPosts(posts.filter(p => p.id !== post.id ))
  }

  const changePage = (page) => {
    setPage(page)
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
      {postError &&
        <h1>error ${postError}</h1>}
      {isPostLoading
        ? <div style={{display: 'flex', justifyContent:'center', marginTop: '150px'}}><Loader /></div>
        : <PostList remove={removePost} posts={sortedAndSearchedPosts} title="Post list"/>
      }
      {pagesArray.map(p => 
        <button onClick={() => changePage(p)}
                key={p} 
                className={page === p ? 'pageCurrent pageButton' : 'pageButton'}>{p}</button>
      )}
    </div>
  )
}

export default App
