
import { createContext, useState } from 'react'

// 컴포넌트 간 theme 공유를 위한 공용 Context 생성
export const ThemeContext = createContext()

// 하위 컴포넌트(children)에 ThemeContext의 theme 값과 전달 함수를 제공하는 Provider
export function ThemeProvider({ children }) {
  // 현재 테마 상태(기본값 'light') 및 테마 변경 함수(setTheme)
  const [theme, setTheme] = useState('light')

  // 현재 테마를 토글('light' ↔ 'dark')하는 함수
  const toggleTheme = () => {
    if (theme === 'light') {
      setTheme('dark')
    } else {
      setTheme('light')
    }
  }

  // Context 값 제공
  return (
    <ThemeContext.Provider
      value={{ theme, toggleTheme }}
    >
      {/* ThemeProvider 안에 들어온 컴포넌트를 화면에 표시합니다. */}
      {children}
    </ThemeContext.Provider>
  )
}
