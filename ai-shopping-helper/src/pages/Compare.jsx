
import { useState } from 'react'
import UserMenu from '../components/UserMenu'

function Compare() {
    // 상품 1
    const [product1, setProduct1] = useState('')
    const [price1, setPrice1] = useState('')

    // 상품 2
    const [product2, setProduct2] = useState('')
    const [price2, setPrice2] = useState('')

    return (
        <main className="page">
            <section className="container">
                <UserMenu />
                <h1>추천 상품 비교</h1>

                <div className="compare-area">
                    <div className="compare-card">
                        <h2>상품 1</h2>

                        <input type="text" placeholder="상품명"
                            value={product1} onChange={(e) =>
                                setProduct1(e.target.value)} />

                        <input type="number" placeholder="가격"
                            value={price1} onChange={(e) =>
                                setPrice1(e.target.value)} />
                    </div>

                    <div className="compare-card">
                        <h2>상품 2</h2>

                        <input type="text" placeholder="상품명"
                            value={product2} onChange={(e) =>
                                setProduct2(e.target.value)} />

                        <input type="number" placeholder="가격"
                            value={price2} onChange={(e) =>
                                setPrice2(e.target.value)} />
                    </div>
                </div>

                <section className="result-box">
                    <h2>비교 결과</h2>
                    {
                        price1 !== '' && price2 !== ''
                            ?
                            <p>
                                {
                                    Number(price1) < Number(price2)
                                        ? `${product1}이(가) 더 저렴합니다.`
                                        : Number(price1) > Number(price2)
                                            ? `${product2}이(가) 더 저렴합니다.`
                                            : '두 상품의 가격이 같습니다.'
                                }
                            </p>
                            :
                            <p>두 상품의 가격을 입력해주세요.</p>
                    }
                </section>
            </section>
        </main>
    )
}

export default Compare
