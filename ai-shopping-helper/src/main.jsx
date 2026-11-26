
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// React Router 기능 가져오기
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import './App.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* React에서 URL 이동 기능을 사용하도록 설정 */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
)
