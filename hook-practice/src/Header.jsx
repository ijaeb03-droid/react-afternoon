
import { useContext } from 'react'
import { ThemeContext } from './ThemeContext.jsx'

function Header() {
  // useContext를 통해 ThemeContext에서 현재 테마(theme)와 테마 변경 함수(toggleTheme)를 가져옴.
  const { theme, toggleTheme } = useContext(ThemeContext)

  // 화면 출력
  return (
    <header className="header">
      {/* 화면 제목 */}
      <h1>학생 검색 시스템</h1>

      {/* 테마 변경 버튼 */}
      <button onClick={toggleTheme}>
        {/*
          theme 값이 light이면 버튼에 "다크모드"를 표시.
          theme 값이 dark이면 버튼에 "라이트모드"를 표시.
        */}
        {theme === 'light' ? '다크모드' : '라이트모드'}
      </button>
    </header>
  )
}

export default Header

