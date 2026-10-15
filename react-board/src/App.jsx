
import { useEffect, useState } from 'react'
import PostList from './PostList.jsx'
import './App.css'

function App() {
  // 게시글 데이터 저장
  const [posts, setPosts] = useState([])

  // 데이터 로딩 상태
  const [loading, setLoading] = useState(true)

  // 검색어 저장
  const [search, setSearch] = useState('')

  // API 데이터 요청
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then((response) => response.json())
      .then((data) => {
        setPosts(data)
        setLoading(false)
      })
      .catch((error) => {
        console.error('데이터를 가져오는 중 오류 발생:', error)
        setLoading(false)
      })
  }, [])

  // 검색 필터링
  const filteredPosts = posts.filter((post) =>
    post.title
      .toLowerCase()
      .includes(search.toLowerCase())
  )

  // 로딩 화면
  if (loading) {
    return (
      <main className="page">
        <p>불러오는 중...</p>
      </main>
    )
  }

  return (
    <main className="page">
      <h1>React 게시판</h1>

      {/* 게시글 검색창 */}
      <div className="search-area">
        <input
          type="text"
          placeholder="게시글 제목 검색"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* 검색 결과 개수 */}
      <p className="search-count">
        검색 결과: {filteredPosts.length}개
      </p>

      {/* 게시글 목록 출력 */}
      <PostList posts={filteredPosts} />

      {/* 검색 결과가 없을 때 */}
      {filteredPosts.length === 0 && (
        <p className="no-result">
          검색 결과가 없습니다.
        </p>
      )}
    </main>
  )
}

export default App
