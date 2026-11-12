
import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { GoogleGenAI } from '@google/genai'

// .env 파일에 저장한 환경 변수 불러오기
dotenv.config()

const app = express()
const PORT = 3000

app.use(cors())
app.use(express.json())

// Gemini API 키 확인
if (!process.env.GEMINI_API_KEY) {
  console.error('GEMINI_API_KEY가 설정되지 않았습니다.')
  process.exit(1)
}

// Gemini 클라이언트 생성
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY
})

// 서버 정상 실행 확인
app.get('/', (req, res) => {
  res.send('Gemini AI 서버 정상 실행')
})

// React에서 전달받은 질문 처리
app.post('/api/ask', async (req, res) => {
  const { question } = req.body

  if (typeof question !== 'string' || !question.trim()) {
    return res.status(400).json({
      error: '질문을 입력해주세요.'
    })
  }

  console.log('React에서 받은 질문 :', question)

  try {
    // Gemini API에 질문 전달
    const response = await ai.models.generateContent({
      model: 'gemini-3.5-flash-lite',
      contents: question,
      config: {
        systemInstruction:
          '당신은 대학생을 위한 AI 학습 도우미입니다. React와 프론트엔드 프로그래밍을 초보자도 이해할 수 있도록 쉽고 정확하게 한국어로 설명하세요.'
      }
    })

    // Gemini 답변을 React로 전송
    res.json({
      answer: response.text || 'AI 답변을 받지 못했습니다.'
    })

  } catch (error) {
    console.error('Gemini API 오류:', error.status, error.message)

    const status = error.status === 429 ? 429 : 500

    res.status(status).json({
      error: status === 429
        ? 'Gemini API 사용량 한도에 도달했습니다.'
        : 'Gemini AI 답변 생성 중 오류가 발생했습니다.'
    })
  }
})

// 서버 실행
app.listen(PORT, () => {
  console.log(`Gemini AI 서버 실행 : http://localhost:${PORT}`)
})
