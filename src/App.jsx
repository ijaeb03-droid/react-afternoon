
import { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import './App.css'

// 분리한 컴포넌트 불러오기
import PointForm from './PointForm.jsx'
import UserList from './UserList.jsx'
import PointGraph from './PointGraph.jsx'
import PointHistory from './PointHistory.jsx'

function App() {
  const navigate = useNavigate()

  // 1. 사용자 데이터
  const [users, setUsers] = useState([
    { id: 1, name: '홍길동', point: 8500 },
    { id: 2, name: '김철수', point: 12000 },
    { id: 3, name: '이영희', point: 5500 }
  ])

  // 2. 그래프 표시 여부
  const [showGraph, setShowGraph] = useState(false)

  // 3. 포인트 관리 입력값
  const [selectedId, setSelectedId] = useState('1')
  const [pointType, setPointType] = useState('add')
  const [amount, setAmount] = useState('')
  const [message, setMessage] = useState('')

  // 포인트 변경 이력
  const [history, setHistory] = useState([])

  // 4. 로그인 정보 확인
  const isLogin = localStorage.getItem('isLogin')
  const role = localStorage.getItem('role')

  // 5. 관리자 접근 권한 확인
  if (isLogin !== 'true' || role !== 'admin') {
    return <Navigate to="/" replace />
  }

  // 6. 가장 높은 포인트 계산
  const points = users.map((user) => user.point)
  const maxPoint = Math.max(
    Math.max.apply(null, points), 1
  )

  // 7. 포인트 지급 / 차감 함수
  const handlePointUpdate = () => {
    const pointValue = Number(amount)
    const userId = Number(selectedId)

    // 포인트 입력값 확인
    if (amount === '' || pointValue <= 0) {
      setMessage('1 이상의 포인트를 입력하세요.')
      return
    }

    // 현재 선택한 사용자 찾기
    const selectedUser = users.find(
      (user) => user.id === userId
    )

    // 사용자를 찾지 못한 경우
    if (!selectedUser) {
      setMessage('사용자를 찾을 수 없습니다.')
      return
    }

    // 보유 포인트보다 많이 차감하는지 확인
    if (
      pointType === 'subtract' &&
      pointValue > selectedUser.point
    ) {
      setMessage('현재 보유 포인트보다 많이 차감할 수 없습니다.')
      return
    }

    // 사용자 포인트 변경
    const updatedUsers = users.map((user) => {
      // 선택한 사용자가 아니면 기존 정보 유지
      if (user.id !== userId) {
        return user
      }

      let newPoint

      if (pointType === 'add') {
        // 포인트 적립
        newPoint = user.point + pointValue
      } else {
        // 포인트 차감
        newPoint = user.point - pointValue
      }

      // 변경된 사용자 객체 생성
      const updatedUser = Object.assign(
        {}, user, { point: newPoint }
      )

      return updatedUser
    })

    // 변경된 사용자 데이터 저장
    setUsers(updatedUsers)

    // 포인트 변경 이력 생성
    const newHistory = {
      id: Date.now(),
      name: selectedUser.name,
      type: pointType,
      point: pointValue
    }

    // 새로운 이력을 기존 이력 앞에 추가
    const updatedHistory = [newHistory].concat(history)

    // 변경된 이력 저장
    setHistory(updatedHistory)

    // 처리 완료 메시지
    setMessage('포인트가 정상적으로 반영되었습니다.')

    // 입력창 초기화
    setAmount('')
  }

  // 8. 로그아웃 함수
  const handleLogout = () => {
    localStorage.removeItem('isLogin')
    localStorage.removeItem('role')
    navigate('/')
  }

  // 9. 화면 출력
  return (
    <main className="admin-page">
      <h1>관리자 포인트 관리</h1>

      {/* 포인트 지급 / 차감 */}
      <PointForm
        users={users}
        selectedId={selectedId}
        setSelectedId={setSelectedId}
        pointType={pointType}
        setPointType={setPointType}
        amount={amount}
        setAmount={setAmount}
        message={message}
        handlePointUpdate={handlePointUpdate}
      />

      {/* 사용자 목록 */}
      <UserList users={users} />

      {/* 그래프 / 로그아웃 버튼 */}
      <div className="button-area">
        <button
          onClick={() => setShowGraph(!showGraph)}
        >
          {showGraph ? '그래프 닫기' : '그래프 보기'}
        </button>

        <button onClick={handleLogout}>
          로그아웃
        </button>
      </div>

      {/* 사용자별 포인트 그래프 */}
      {showGraph && (
        <PointGraph
          users={users}
          maxPoint={maxPoint}
        />
      )}

      {/* 포인트 변경 이력 */}
      <PointHistory history={history} />
    </main>
  )
}

export default App
