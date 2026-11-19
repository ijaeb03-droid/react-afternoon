
import { useState } from 'react'
import './App.css'

function App() {
  // 사용자가 입력하는 상품 추천 조건
  const [budget, setBudget] = useState('') // 예산
  const [category, setCategory] = useState('운동화') // 카테고리
  const [purpose, setPurpose] = useState('') // 사용 목적
  const [preference, setPreference] = useState('') // 선호 조건

  // AI가 생성한 추천 결과
  const [answer, setAnswer] = useState('')

  // AI 추천 요청 함수
  const recommendProduct = async () => {
    try {
      // React에서 Node.js 서버로 상품 조건 전달
      const response = await fetch('http://localhost:3000/api/recommend', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          budget,
          category,
          purpose,
          preference
        })
      })

      // 서버에서 보낸 JSON 응답 가져오기
      const data = await response.json()

      // 서버에서 오류가 발생한 경우
      if (!response.ok) {
        setAnswer(data.error)
        return
      }

      // Gemini가 만든 답변을 화면에 표시
      setAnswer(data.answer)

    } catch (error) {
      console.error(error)
      setAnswer('서버 연결 중 오류가 발생했습니다.')
    }
  }

  return (
    <main className="page">
      <section className="container">

        {/* 제목 영역 */}
        <header className="header">
          <h1>AI 쇼핑 추천 도우미</h1>
          <p>
            원하는 조건을 입력하면
            AI가 적합한 상품을 추천합니다.
          </p>
        </header>

        {/* 추천 조건 입력 영역 */}
        <section className="search-box">
          <h2>상품 추천 조건</h2>

          {/* 예산 */}
          <label>예산</label>
          <input
            type="number"
            placeholder="예: 100000"
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
          />

          {/* 카테고리 */}
          <label>카테고리</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="운동화">운동화</option>
            <option value="가방">가방</option>
            <option value="노트북">노트북</option>
            <option value="이어폰">이어폰</option>
          </select>

          {/* 사용 목적 */}
          <label>사용 목적</label>
          <input
            type="text"
            placeholder="예: 운동, 출퇴근, 공부"
            value={purpose}
            onChange={(e) => setPurpose(e.target.value)}
          />

          {/* 선호 조건 */}
          <label>선호 조건</label>
          <textarea
            placeholder="예: 가볍고 디자인이 심플한 제품"
            value={preference}
            onChange={(e) => setPreference(e.target.value)}
          ></textarea>

          {/* 추천 버튼 */}
          <button onClick={recommendProduct}>
            AI 추천받기
          </button>
        </section>

        {/* 추천 결과 영역 */}
        <section className="result-box">
          <h2>AI 추천 결과</h2>
          <p>
            {
              answer === ''
                ? '아직 추천 결과가 없습니다.'
                : answer
            }
          </p>
        </section>

      </section>
    </main>
  )
}

export default App
