
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Login() {
  const navigate = useNavigate()

  // 로그인할 수 있는 사용자 목록
  const users = [
    { email: 'user@school.ac.kr', password: '1234', role: 'user' },
    { email: 'admin@school.ac.kr', password: '1234', role: 'admin' }
  ]

  // 입력값 저장
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')

  // 로그인 처리
  const handleLogin = (e) => {
    e.preventDefault()

    const loginUser = users.find((user) =>
      user.email === email && user.password === password
    )

    if (!loginUser) {
      setMessage('이메일 또는 비밀번호가 일치하지 않습니다.')
      return
    }

    // 로그인 상태 저장
    localStorage.setItem('isLogin', 'true')
    localStorage.setItem('role', loginUser.role)

    // 역할에 따라 페이지 이동
    if (loginUser.role === 'admin') {
      navigate('/admin')
    } else {
      navigate('/user')
    }
  }

  return (
    <main className="login-page">
      <section className="login-card">
        <h1>포인트 시스템 로그인</h1>

        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="이메일"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="비밀번호"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit">로그인</button>
        </form>

        {message && <p>{message}</p>}

        <hr />

        <p>
          일반 사용자
          <br />
          user@school.ac.kr / 1234
        </p>

        <p>
          관리자
          <br />
          admin@school.ac.kr / 1234
        </p>
      </section>
    </main>
  )
}

export default Login
