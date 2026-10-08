
import { Navigate, useNavigate } from 'react-router-dom'

function UserPoint() {
  const navigate = useNavigate()

  const isLogin = localStorage.getItem('isLogin')
  const role = localStorage.getItem('role')

  if (isLogin !== 'true' || role !== 'user') {
    return <Navigate to="/" replace />
  }

  const points = [
    { id: 1, title: '가입 축하 포인트', point: 10000 },
    { id: 2, title: '상품 구매', point: 2000 },
    { id: 3, title: '후기 작성', point: 500 }
  ]

  const totalPoint = points.reduce(
    (sum, item) => sum + item.point, 0
  )

  const handleLogout = () => {
    localStorage.removeItem('isLogin')
    localStorage.removeItem('role')
    navigate('/')
  }

  return (
    <main className="user-page">
      <h1>나의 포인트</h1>

      <h2>{totalPoint.toLocaleString()} P</h2>

      <h3>포인트 내역</h3>

      {points.map((item) => (
        <div key={item.id}>
          <span>{item.title}</span>{' '}
          <strong>
            {item.point > 0
              ? `+${item.point.toLocaleString()} P`
              : `${item.point.toLocaleString()} P`}
          </strong>
        </div>
      ))}

      <br />
      <button onClick={handleLogout}>로그아웃</button>
    </main>
  )
}

export default UserPoint
