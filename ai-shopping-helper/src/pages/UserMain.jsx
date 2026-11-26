
import UserMenu from '../components/UserMenu'

function UserMain() {
  // 사용자 이름
  const userName = localStorage.getItem('userName')

  // 추천 기록 가져오기
  const history = JSON.parse(
    localStorage.getItem('history')
  ) || []

  // 찜 목록 가져오기
  const favorites = JSON.parse(
    localStorage.getItem('favorites')
  ) || []

  return (
    <main className="page">
      <section className="container">
        <UserMenu />

        <h1>사용자 메인</h1>
        <h2>{userName}님 환영합니다.</h2>

        <div className="summary-area">
          <div className="summary-card">
            <h3>로그인 상태</h3>
            <p>로그인 중</p>
          </div>

          <div className="summary-card">
            <h3>추천 횟수</h3>
            <p>{history.length}회</p>
          </div>

          <div className="summary-card">
            <h3>관심 상품</h3>
            <p>{favorites.length}개</p>
          </div>
        </div>
      </section>
    </main>
  )
}

export default UserMain
