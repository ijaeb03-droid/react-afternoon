
import { useState } from 'react'
import UserMenu from '../components/UserMenu'

function History() {
  // localStorage의 추천 기록 가져오기
  const [history, setHistory] = useState(
    JSON.parse(localStorage.getItem('history')) || []
  )

  // 전체 기록 삭제
  const clearHistory = () => {
    localStorage.removeItem('history')
    setHistory([])
  }

  return (
    <main className="page">
      <section className="container">
        <UserMenu />

        <h1>추천 기록</h1>

        {
          history.length === 0
            ? <p>추천 기록이 없습니다.</p>
            :
            history.map((item, index) => (
              <div
                className="history-item"
                key={index}
              >
                <h3>
                  {index + 1}.{' '}
                  {item.category}
                </h3>

                <p>
                  예산 : {' '}
                  {item.budget}원
                </p>

                <p>
                  사용 목적 : {' '}
                  {item.purpose}
                </p>

                <p>
                  선호 조건 : {' '}
                  {item.preference}
                </p>

                <p>
                  추천 시간 : {' '}
                  {item.date}
                </p>
              </div>
            ))
        }

        {
          history.length > 0 && (
            <button
              className="delete-button"
              onClick={clearHistory}
            >
              전체 기록 삭제
            </button>
          )
        }
      </section>
    </main>
  )
}

export default History
