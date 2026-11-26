
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'

// 각 페이지 가져오기
import Login from './pages/Login.jsx'
import UserMain from './pages/UserMain.jsx'
import Shopping from './pages/Shopping.jsx'
import History from './pages/History.jsx'
import MyPage from './pages/MyPage.jsx'
import Favorites from './pages/Favorites.jsx'
import Compare from './pages/Compare.jsx'
import Settings from './pages/Settings.jsx'
import Help from './pages/Help.jsx'
import About from './pages/About.jsx'

function App() {
  useLocation()

  // localStorage에서 로그인 상태 가져오기
  const isLogin = localStorage.getItem('isLogin')
  // 사용자의 역할 가져오기
  const role = localStorage.getItem('role')

  return (
    <Routes>
      {/* 로그인 화면 */}
      <Route
        path="/"
        element={<Login />}
      />

      {/* 사용자 메인 */}
      <Route
        path="/user"
        element={
          isLogin === 'true' &&
          role === 'user'
            ? <UserMain /> : <Navigate to="/" />
        }
      />

      {/* AI 쇼핑 추천 */}
      <Route
        path="/shopping"
        element={
          isLogin === 'true'
            ? <Shopping /> : <Navigate to="/" />
        }
      />

      {/* 추천 기록 */}
      <Route
        path="/history"
        element={
          isLogin === 'true'
            ? <History /> : <Navigate to="/" />
        }
      />

      {/* 마이페이지 */}
      <Route
        path="/mypage"
        element={
          isLogin === 'true'
            ? <MyPage /> : <Navigate to="/" />
        }
      />

      {/* 관심 상품 */}
      <Route
        path="/favorites"
        element={
          isLogin === 'true'
            ? <Favorites /> : <Navigate to="/" />
        }
      />

      {/* 상품 비교 */}
      <Route
        path="/compare"
        element={
          isLogin === 'true'
            ? <Compare /> : <Navigate to="/" />
        }
      />

      {/* 사용자 설정 */}
      <Route
        path="/settings"
        element={
          isLogin === 'true'
            ? <Settings /> : <Navigate to="/" />
        }
      />

      {/* 도움말 */}
      <Route
        path="/help"
        element={
          isLogin === 'true'
            ? <Help /> : <Navigate to="/" />
        }
      />

      {/* 서비스 소개 */}
      <Route
        path="/about"
        element={
          isLogin === 'true'
            ? <About /> : <Navigate to="/" />
        }
      />
    </Routes>
  )
}

export default App
