
import { useState } from 'react'
import UserMenu from '../components/UserMenu'

function Settings() {
    // 기본 예산
    const [budget, setBudget] = useState(
        localStorage.getItem('defaultBudget') || ''
    )

    // 기본 카테고리
    const [category, setCategory] = useState(
        localStorage.getItem('defaultCategory') || '운동화'
    )

    // 기본 선호 조건
    const [preference, setPreference] = useState(
        localStorage.getItem('defaultPreference') || ''
    )

    // 설정 저장
    const saveSettings = () => {
        localStorage.setItem('defaultBudget', budget)
        localStorage.setItem('defaultCategory', category)
        localStorage.setItem('defaultPreference', preference)

        alert('사용자 설정이 저장되었습니다.')
    }

    return (
        <main className="page">
            <section className="container">
                <UserMenu />
                <h1>사용자 선호 설정</h1>

                <div className="form-box">
                    <label>기본 예산</label>
                    <input type="number" placeholder="예: 100000"
                        value={budget} onChange={(e) =>
                            setBudget(e.target.value)} />

                    <label>기본 카테고리</label>
                    <select value={category} onChange={(e) =>
                        setCategory(e.target.value)}>
                        <option value="운동화">운동화</option>
                        <option value="노트북">노트북</option>
                        <option value="이어폰">이어폰</option>
                        <option value="가방">가방</option>
                    </select>

                    <label>선호 조건</label>
                    <textarea placeholder="예: 가볍고 디자인이 심플한 제품"
                        value={preference} onChange={(e) =>
                            setPreference(e.target.value)} />

                    <button onClick={saveSettings}>
                        설정 저장
                    </button>
                </div>
            </section>
        </main>
    )
}

export default Settings
