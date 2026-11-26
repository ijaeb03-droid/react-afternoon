
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Login() {
  // 페이지 이동 기능
  const navigate = useNavigate()

  // 아이디 입력값
  const [userId, setUserId] = useState('')

  // 비밀번호 입력값
  const [password, setPassword] = useState('')

  const login = () => {
    // 입력값 확인
    if (userId === '' || password === '') {
      alert('아이디와 비밀번호를 입력해주세요.')
      return
    }

    // 로그인 상태 저장
    localStorage.setItem('isLogin', 'true')

    // 사용자 역할 저장
    localStorage.setItem('role', 'user')

    // 사용자 이름 저장
    localStorage.setItem('userName', userId)

    navigate('/user')
  }

  return (
    <main className="page">
      <section className="login-box">
        <h1>AI 쇼핑 도우미</h1>
        <h2>사용자 로그인</h2>

        <label>아이디</label>
        <input
          type="text"
          placeholder="아이디 입력"
          value={userId}
          onChange={(e) =>
            setUserId(e.target.value)
          }
        />

        <label>비밀번호</label>
        <input
          type="password"
          placeholder="비밀번호 입력"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
        />

        <button onClick={login}>로그인</button>
      </section>
    </main>
  )
}

export default Login
