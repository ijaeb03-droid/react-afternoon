
import { useState } from 'react'
import UserMenu from '../components/UserMenu'

function Favorites() {
  // 입력할 상품명
  const [product, setProduct] = useState('')

  // 기존 찜 목록
  const [favorites, setFavorites] = useState(
    JSON.parse(localStorage.getItem('favorites')) || []
  )

  // 관심 상품 추가
  const addFavorite = () => {
    if (product === '') {
      alert('상품명을 입력해주세요.')
      return
    }

    const newList = [
      ...favorites,
      product
    ]

    setFavorites(newList)
    localStorage.setItem(
      'favorites',
      JSON.stringify(newList)
    )
    setProduct('')
  }

  // 특정 상품 삭제
  const removeFavorite = (index) => {
    const newList = favorites.filter(
      (item, i) => i !== index
    )

    setFavorites(newList)
    localStorage.setItem(
      'favorites',
      JSON.stringify(newList)
    )
  }

  return (
    <main className="page">
      <section className="container">
        <UserMenu />

        <h1>관심 상품 / 찜 목록</h1>

        <div className="form-box">
          <input
            type="text"
            placeholder="상품명을 입력하세요."
            value={product}
            onChange={(e) =>
              setProduct(e.target.value)
            }
          />

          <button onClick={addFavorite}>
            찜하기
          </button>
        </div>

        <div className="list-box">
          {
            favorites.length === 0
              ?
              <p>찜한 상품이 없습니다.</p>
              :
              favorites.map((item, index) => (
                <div
                  className="favorite-item"
                  key={index}
                >
                  <span>♥ {item}</span>

                  <button onClick={() =>
                    removeFavorite(index)
                  }>
                    삭제
                  </button>
                </div>
              ))
          }
        </div>
      </section>
    </main>
  )
}

export default Favorites
