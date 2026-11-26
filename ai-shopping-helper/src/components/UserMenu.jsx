
import { useNavigate } from 'react-router-dom'

function UserMenu() {
  const navigate = useNavigate()

  const logout = () => { // 로그아웃
    // 로그인 상태 삭제
    localStorage.removeItem('isLogin')

    // 사용자 역할 삭제
    localStorage.removeItem('role')

    navigate('/')
  }

  return (
    <nav className="user-menu">
      <button onClick={() =>
        navigate('/user')
      }>
        홈
      </button>

      <button onClick={() =>
        navigate('/shopping')
      }>
        AI 추천
      </button>

      <button onClick={() =>
        navigate('/history')
      }>
        추천 기록
      </button>

      <button onClick={() =>
        navigate('/favorites')
      }>
        찜 목록
      </button>

      <button onClick={() =>
        navigate('/compare')
      }>
        상품 비교
      </button>

      <button onClick={() =>
        navigate('/mypage')
      }>
        마이페이지
      </button>

      <button onClick={() =>
        navigate('/settings')
      }>
        설정
      </button>

      <button onClick={() =>
        navigate('/help')
      }>
        도움말
      </button>

      <button onClick={() =>
        navigate('/about')
      }>
        서비스 소개
      </button>

      <button
        className="logout-button"
        onClick={logout}
      >
        로그아웃
      </button>
    </nav>
  )
}

export default UserMenu
