
import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { GoogleGenAI } from '@google/genai'

dotenv.config() // .env 파일의 환경변수를 읽어옴
const app = express() // Express 서버 생성
const PORT = 3000 // 서버 포트 번호

app.use(cors()) // React에서 서버로 요청할 수 있도록 허용
app.use(express.json()) // React가 보낸 JSON 데이터를 읽을 수 있도록 설정

// Gemini 객체 생성 .env 파일에 저장한 API Key를 사용합니다.
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY
})

// 서버가 정상적으로 실행되는지 확인
app.get('/', (req, res) => {
  res.send('Gemini 서버 정상 실행')
})

// React에서 상품 추천 요청을 받는 주소
app.post('/api/recommend', async (req, res) => {
  // React에서 보낸 값 가져오기
  const { budget, category, purpose, preference } = req.body

  console.log('예산 :', budget)
  console.log('카테고리 :', category)
  console.log('사용 목적 :', purpose)
  console.log('선호 조건 :', preference)

  try {
    // Gemini에게 전달할 질문 만들기
    const prompt = `다음 조건에 맞는 상품을 추천해주세요.

    예산: ${budget}원
    카테고리: ${category}
    사용 목적: ${purpose}
    선호 조건: ${preference}

    추천 상품 3개와 각각의 추천 이유를
    쉽게 설명해주세요.
    `

    // Gemini API 호출
    const response = await ai.models.generateContent({
      model: 'gemini-3.5-flash-lite',
      contents: prompt
    })

    // Gemini의 답변을 React로 전달
    res.json({ answer: response.text })
  } catch (error) {
    console.error(error)
    res.status(500).json({
      error: 'Gemini API 호출 중 오류가 발생했습니다.'
    })
  }
})

app.listen(PORT, () => {
  console.log(`Gemini 서버 실행 : http://localhost:${PORT}`)
})
