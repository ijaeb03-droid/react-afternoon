

import { useState } from 'react'
import ReactMarkdown from 'react-markdown'
import './App.css'


function App() {
  // 사용자가 입력한 질문
  const [question, setQuestion] = useState('')
  // AI 답변을 저장할 상태
  const [answer, setAnswer] = useState('')
  // AI가 답변 중인지 확인하는 상태
  const [loading, setLoading] = useState(false)

  // AI 질문 처리 함수
  const askAI = async () => {
    // 질문이 비어 있으면 실행하지 않음
    if (question.trim() === '') {
      alert('질문을 입력해주세요.')
      return
    }

    setLoading(true) // AI 답변 시작
    setAnswer('') // 기존 답변 초기화

    try {
      // Node.js 서버에 질문 전달
      // await는 JavaScript에서 작업이 끝날 때까지 기다린 후 결과를 가져오는 키워드
      const response = await fetch('http://localhost:3000/api/ask', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          question: question
        })
      })

      
      const data = await response.json()

      if (!response.ok) {
        setAnswer(data.error || '서버에서 오류가 발생했습니다.')
        return
      }

      setAnswer(data.answer)

    } catch (error) {
      console.error(error)
      setAnswer('서버 연결 중 오류가 발생했습니다.')
    } finally {
      setLoading(false) // 답변 처리 종료
    }
  }

  // 질문 초기화
  const clearQuestion = () => {
    setQuestion('')
    setAnswer('')
  }

  return (
    // 화면 출력
    <main className="page">
      <section className="container">
        {/* 제목 영역 */}
        <header className="header">
          <h1>AI 학생 학습 도우미</h1>
          <p>
            React 수업에서 궁금한 내용을
            AI에게 질문해 보세요.
          </p>
        </header>

        {/* 질문 입력 영역 */}
        <section className="question-box">
          <h2>질문 입력</h2>
          <textarea
            placeholder="예 : useMemo와 useCallback의 차이를 쉽게 설명해주세요."
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          >
          </textarea>

          <div className="button-box">
            <button onClick={askAI} disabled={loading}>
              {loading ? 'AI가 답변 중...' : 'AI에게 질문하기'}
            </button>

            <button onClick={clearQuestion}>
              초기화
            </button>
          </div>
        </section>

       
        {/* 답변 영역 */}
        <section className="answer-box">
          <h2>AI 답변</h2>

          {loading ? (
            <p>AI가 답변을 생성하고 있습니다.</p>
          ) : answer === '' ? (
            <p>아직 질문하지 않았습니다.</p>
          ) : (
            <div className="markdown-answer">
              <ReactMarkdown>
                {answer}
              </ReactMarkdown>
            </div>
          )}
        </section>

      </section>
    </main>
  )
}

export default App
