
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'

// ThemeContext.jsx 파일에서 만든 ThemeProvider를 가져옴
// ThemeProvider의 역할 : App 아래 컴포넌트가 theme값을 함께 사용할 수 있도록 값을 제공
import { ThemeProvider } from './ThemeContext.jsx'

createRoot(
  document.getElementById('root')
).render(
  <StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </StrictMode>
)
