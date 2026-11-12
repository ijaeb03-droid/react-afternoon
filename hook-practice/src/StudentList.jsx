
function StudentList({ students }) {
  // 화면 출력
  return (
    <section className="student-list">
      {/*
        students.map() → students 배열의 데이터를 하나씩 반복해서 화면에 출력.
        student → 현재 처리하고 있는 학생 한 명의 정보
      */}

      {students.map((student) => (
        <article
          className="student-card"
          key={student.id}
        >
          {/* 학생 이름 */}
          <h3>{student.name}</h3>

          {/* 학생 전공 */}
          <p>전공 : {student.major}</p>

          {/* 학생 점수 */}
          <p>점수 : {student.score}점</p>
        </article>
      ))}
    </section>
  )
}

export default StudentList
