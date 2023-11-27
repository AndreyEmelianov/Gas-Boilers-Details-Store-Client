import { useStore } from 'effector-react'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

import { $mode } from '@/context/mode'
import { $boilerPart } from '@/context/boilerPart'
import ProductImagesList from '@/components/modules/ProductPage/ProductImagesList'
import { formatPrice } from '@/utils/common'
import { $shoppingCart } from '@/context/shopping-cart'
import CartHoverCheckedSvg from '@/components/elements/CartHoverCheckedSvg/CartHoverCheckedSvg'
import CartHoverSvg from '@/components/elements/CartHoverSvg/CartHoverSvg'
import { toggleCartItem } from '@/utils/shopping-cart'
import { $user } from '@/context/user'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import ProductTabs from '@/components/modules/ProductPage/ProductTabs'
import DashboardSlider from '@/components/modules/DashboardPage/DashboardSlider'
import { getBoilerPartsFx } from '@/api/boilerParts/boilerParts'
import ProductAccordion from '@/components/modules/ProductPage/ProductAccordion'
import {
  $boilerParts,
  setBoilerParts,
  setBoilerPartsByPopularity,
} from '@/context/boilerParts'

import styles from '@/styles/product/index.module.scss'
import spinnerStyles from '@/styles/spinner/index.module.scss'

const ProductPage = () => {
  const [spinnerSlider, setSpinnerSlider] = useState(false)
  const [spinnerToggleCart, setSpinnerToggleCart] = useState(false)

  const boilerParts = useStore($boilerParts)
  const boilerPart = useStore($boilerPart)
  const cartItems = useStore($shoppingCart)
  const user = useStore($user)

  const isInCart = cartItems.some((item) => item.productId === boilerPart.id)
  const isMobile850 = useMediaQuery(850)

  const mode = useStore($mode)
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''

  useEffect(() => {
    loadBoilerPart()
  }, [])

  const loadBoilerPart = async () => {
    try {
      setSpinnerSlider(true)
      const data = await getBoilerPartsFx(`/boiler-parts?limit=20&offset=0`)

      setBoilerParts(data)
      setBoilerPartsByPopularity()
    } catch (err) {
      toast.error((err as Error).message)
    } finally {
      setTimeout(() => setSpinnerSlider(false), 1000)
    }
  }

  const toggleToCart = () =>
    toggleCartItem(user.username, boilerPart.id, isInCart, setSpinnerToggleCart)

  return (
    <section>
      <div className="container">
        <div className={`${styles.part__top} ${darkModeClass}`}>
          <h2 className={`${styles.part__title} ${darkModeClass}`}>
            {boilerPart.product_name}
          </h2>
          <div className={styles.part__inner}>
            <ProductImagesList />

            <div className={styles.part__info}>
              <span className={`${styles.part__info__price} ${darkModeClass}`}>
                {formatPrice(boilerPart.product_price || 0)} P
              </span>
              <span className={`${styles.part__info__stock}`}>
                {boilerPart.in_stock > 0 ? (
                  <span className={`${styles.part__info__stock__success}`}>
                    Есть на складе
                  </span>
                ) : (
                  <span className={`${styles.part__info__not}`}>
                    Нет в наличии
                  </span>
                )}
              </span>
              <span className={`${styles.part__info__code}`}>
                Артикул: {boilerPart.vendor_code}
              </span>
              <button
                className={`${styles.part__info__btn} ${
                  isInCart ? styles.in_cart : ''
                }`}
                onClick={toggleToCart}
              >
                {spinnerToggleCart ? (
                  <span
                    className={spinnerStyles.spinner}
                    style={{ top: 10, left: '45%' }}
                  />
                ) : (
                  <>
                    <span>
                      {isInCart ? <CartHoverCheckedSvg /> : <CartHoverSvg />}
                    </span>
                    {isInCart ? (
                      <span>Добавленно в корзину</span>
                    ) : (
                      <span>Положить в корзину</span>
                    )}
                  </>
                )}
              </button>

              {!isMobile850 && <ProductTabs />}
            </div>
          </div>
        </div>

        {isMobile850 && (
          <div className={styles.part__accordion}>
            <div className={styles.part__accordion__inner}>
              <ProductAccordion title="Описание">
                <div
                  className={`${styles.part__accordion__content} ${darkModeClass}`}
                >
                  <h3
                    className={`${styles.part__tabs__content__title} ${darkModeClass}`}
                  >
                    {boilerPart.product_name}
                  </h3>
                  <p
                    className={`${styles.part__tabs__content__text} ${darkModeClass}`}
                  >
                    {boilerPart.product_description}
                  </p>
                </div>
              </ProductAccordion>
            </div>
            <ProductAccordion title="Совместимость">
              <div
                className={`${styles.part__accordion__content} ${darkModeClass}`}
              >
                <p
                  className={`${styles.part__tabs__content__text} ${darkModeClass}`}
                >
                  {boilerPart.compatibility}
                </p>
              </div>
            </ProductAccordion>
          </div>
        )}

        <div className={`${styles.part__bottom} `}>
          <h2 className={`${styles.part__title} ${darkModeClass}`}>
            Вам понравится
          </h2>
          <DashboardSlider
            goToPartPage
            spinner={spinnerSlider}
            items={boilerParts.rows || []}
          />
        </div>
      </div>
    </section>
  )
}
export default ProductPage
