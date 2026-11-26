
import { useState } from 'react'
import UserMenu from '../components/UserMenu'

function Shopping() {
  // 예산
  const [budget, setBudget] = useState(
    localStorage.getItem('defaultBudget') || ''
  )

  // 카테고리
  const [category, setCategory] = useState(
    localStorage.getItem('defaultCategory') || '운동화'
  )

  // 사용 목적
  const [purpose, setPurpose] = useState('')

  // 선호 조건
  const [preference, setPreference] = useState(
    localStorage.getItem('defaultPreference') || ''
  )

  // AI 결과
  const [answer, setAnswer] = useState('')

  // AI 추천 함수
  const recommendProduct = async () => {
    // 입력값 확인
    if (budget === '' || purpose === '') {
      setAnswer('예산과 사용 목적을 입력해주세요.')
      return
    }

    try {
      // Node.js 서버에 요청
      const response = await fetch(
        'http://localhost:3000/api/recommend',
        {
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
        }
      )

      // 서버 응답 JSON으로 변환
      const data = await response.json()

      // 오류가 발생한 경우
      if (!response.ok) {
        setAnswer(data.error)
        return
      }

      // 정상 추천 결과 저장
      setAnswer(data.answer)

      // 기존 추천 기록 가져오기
      const oldHistory = JSON.parse(
        localStorage.getItem('history')
      ) || []

      // 새로운 추천 기록
      const newHistory = {
        category: category,
        budget: budget,
        purpose: purpose,
        preference: preference,
        answer: data.answer,
        date: new Date().toLocaleString()
      }

      // 기존 기록 + 새 기록
      const updatedHistory = [
        ...oldHistory,
        newHistory
      ]

      // localStorage 저장
      localStorage.setItem(
        'history',
        JSON.stringify(updatedHistory)
      )

    } catch (error) {
      console.error(error)
      setAnswer('서버 연결 중 오류가 발생했습니다.')
    }
  }

  return (
    <main className="page">
      <section className="container">
        <UserMenu />

        <h1>AI 쇼핑 추천</h1>

        <div className="form-box">
          <label>예산</label>
          <input
            type="number"
            placeholder="예: 100000"
            value={budget}
            onChange={(e) =>
              setBudget(e.target.value)
            }
          />

          <label>카테고리</label>
          <select
            value={category}
            onChange={(e) =>
              setCategory(e.target.value)
            }
          >
            <option value="운동화">운동화</option>
            <option value="노트북">노트북</option>
            <option value="이어폰">이어폰</option>
            <option value="가방">가방</option>
          </select>

          <label>사용 목적</label>
          <input
            type="text"
            placeholder="예: 러닝, 공부, 출퇴근"
            value={purpose}
            onChange={(e) =>
              setPurpose(e.target.value)
            }
          />

          <label>선호 조건</label>
          <textarea
            placeholder="예: 가볍고 디자인이 심플한 제품"
            value={preference}
            onChange={(e) =>
              setPreference(e.target.value)
            }
          />

          <button onClick={recommendProduct}>
            AI 추천받기
          </button>
        </div>

        <section className="result-box">
          <h2>AI 추천 결과</h2>

          <p className="answer-text">
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

export default Shopping
