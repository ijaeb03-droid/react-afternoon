
import UserMenu from '../components/UserMenu'

function About() {
    return (
        <main className="page">
            <section className="container">
                <UserMenu />
                <h1>AI 쇼핑 서비스 소개</h1>

                <div className="info-box">
                    <p>
                        AI 쇼핑 도우미는
                        사용자가 입력한 예산,
                        카테고리, 사용 목적과
                        선호 조건을 이용하여
                        상품을 추천하는 서비스입니다.
                    </p>

                    <h2>주요 기능</h2>

                    <p>AI 상품 추천</p>
                    <p>추천 기록 저장</p>
                    <p>관심 상품 관리</p>
                    <p>상품 가격 비교</p>
                    <p>사용자 선호 조건 저장</p>
                </div>
            </section>
        </main>
    )
}

export default About
