
import UserMenu from '../components/UserMenu'

function MyPage() {
  // 사용자 이름
  const userName = localStorage.getItem('userName')

  // 로그인 상태
  const isLogin = localStorage.getItem('isLogin')

  // 추천 기록
  const history = JSON.parse(
    localStorage.getItem('history')
  ) || []

  // 가장 최근 추천 기록
  const lastItem = history.length > 0
    ? history[history.length - 1]
    : null

  return (
    <main className="page">
      <section className="container">
        <UserMenu />

        <h1>마이페이지</h1>

        <div className="info-box">
          <p>
            <strong>사용자 :</strong>
            {' '}
            {userName}
          </p>

          <p>
            <strong>로그인 상태 :</strong>
            {' '}
            {
              isLogin === 'true'
                ? '로그인 중' : '로그아웃'
            }
          </p>

          <p>
            <strong>총 추천 횟수 :</strong>
            {' '}
            {history.length}회
          </p>
        </div>

        <h2>최근 추천 요약</h2>

        {
          lastItem
            ?
            <div className="history-item">
              <p>
                카테고리 :
                {' '}
                {lastItem.category}
              </p>

              <p>
                예산 :
                {' '}
                {lastItem.budget}원
              </p>

              <p>
                사용 목적 :
                {' '}
                {lastItem.purpose}
              </p>
            </div>
            :
            <p>아직 추천 기록이 없습니다.</p>
        }
      </section>
    </main>
  )
}

export default MyPage
