
import { useState, useMemo, useCallback, useContext } from 'react'
import './App.css'

// Header : 화면 위쪽 영역
// StudentList : 학생 목록을 출력하는 영역
import Header from './Header.jsx'
import StudentList from './StudentList.jsx'

// main.jsx에서 ThemeProvider로 App을 감쌌기 때문에
// useContext를 이용해서 ThemeContext의 값을 가져옴.
import { ThemeContext } from './ThemeContext.jsx'

// 학생 데이터
const students = [
  { id: 1, name: '김민수', major: '멀티미디어', score: 85 },
  { id: 2, name: '이영희', major: '컴퓨터공학', score: 92 },
  { id: 3, name: '박지훈', major: '멀티미디어', score: 76 },
  { id: 4, name: '최유진', major: '컴퓨터공학', score: 88 },
  { id: 5, name: '정현우', major: '멀티미디어', score: 95 }
]

function App() {
  // search: 검색어 상태 (기본값 '') 및 변경 함수(setSearch)
  const [search, setSearch] = useState('')

  // ThemeContext의 theme 값에 따라 동적으로 CSS 클래스를 변경
  const { theme } = useContext(ThemeContext)

  // [search] 변경 시에만 이름 검색 결과를 재계산(useMemo)합니다.
  const filteredStudents = useMemo(() => {
    return students.filter((student) => student.name.includes(search))
  }, [search])

  // [filteredStudents] 변경 시에만 평균 점수를 재계산(useMemo)
  const averageScore = useMemo(() => {
    if (filteredStudents.length === 0) {
      return 0 // 검색 결과가 없으면 0을 반환
    }

    // 학생들의 점수를 모두 더합니다.
    const total = filteredStudents.reduce((sum, student) =>
      sum + student.score, 0
    )

    // 총점을 학생 수로 나누어 평균 점수를 계산합니다.
    return Math.round(total / filteredStudents.length)
  }, [filteredStudents])

  // 검색어를 빈 문자열로 초기화하는 함수 (최초 1회만 생성 후 재사용)
  const clearSearch = useCallback(() => {
    setSearch('')
  }, [])

  return (
    // theme 값('light'/'dark')에 따라 main 요소를 해당 테마 클래스로 동적 변경합니다.
    <main
      className={
        theme === 'light' ? 'page light' : 'page dark'
      }
    >
      <Header>{/* Header 영역 <Header /> 로도 사용 가능*/}</Header>

      {/* 검색 영역 */}
      <section className="search-box">
        <label>학생 이름 검색</label>
        <div className="search-row">
          <input
            type="text"
            placeholder="학생 이름 입력"
            value={search}
            // 사용자가 입력할 때마다 search 값을 변경
            onChange={(e) => setSearch(e.target.value)}
          />
          <button onClick={clearSearch}>검색 초기화</button>
        </div>

        <p className="search-result">
          검색 결과 {filteredStudents.length}명 · 평균 점수 {averageScore}점
        </p>
      </section>

      {/* 검색된 학생 목록(filteredStudents)을 StudentList 컴포넌트에 props로 전달합니다. */}
      <StudentList students={filteredStudents} />
    </main>
  )
}

export default App
