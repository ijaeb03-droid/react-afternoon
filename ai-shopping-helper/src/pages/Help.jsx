
import UserMenu from '../components/UserMenu'

function Help() {
    return (
        <main className="page">
            <section className="container">
                <UserMenu />
                <h1>사용 방법</h1>

                <div className="info-box">
                    <p>1. AI 추천 메뉴를 선택합니다.</p>
                    <p>2. 예산과 카테고리를 입력합니다.</p>
                    <p>3. 사용 목적과 선호 조건을 입력합니다.</p>
                    <p>4. AI 추천받기 버튼을 클릭합니다.</p>
                    <p>5. 추천 결과를 확인합니다.</p>
                </div>

                <h2>HTTP 오류 안내</h2>

                <div className="error-box">
                    <p>
                        <strong>200 OK</strong>
                        {' '}
                        → 정상 처리
                    </p>

                    <p>
                        <strong>400 Bad Request</strong>
                        {' '}
                        → 잘못된 요청
                    </p>

                    <p>
                        <strong>404 Not Found</strong>
                        {' '}
                        → 요청한 주소가 없음
                    </p>

                    <p>
                        <strong>500 Internal Server Error</strong>
                        {' '}
                        → 서버 내부 오류
                    </p>

                    <p>
                        <strong>503 Service Unavailable</strong>
                        {' '}
                        → 서버가 일시적으로 요청을 처리할 수 없음
                    </p>
                </div>
            </section>
        </main>
    )
}

export default Help
