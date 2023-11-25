/* eslint-disable @next/next/no-img-element */
import { useState } from 'react'
import { useStore } from 'effector-react'
import Link from 'next/link'

import { $mode } from '@/context/mode'
import { IShoppingCartItem } from '@/types/shopping-cart'
import { formatPrice } from '@/utils/common'
import { removeItemFromCart } from '@/utils/shopping-cart'
import DeleteSvg from '@/components/elements/DeleteSvg/DeleteSvg'

import styles from '@/styles/cartPopup/index.module.scss'
import spinnerStyles from '@/styles/spinner/index.module.scss'

const CartPopupItem = ({ item }: { item: IShoppingCartItem }) => {
  const [spinner, setSpinner] = useState(false)

  const mode = useStore($mode)
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''
  const spinnerDarkModeClass =
    mode === 'dark' ? `${spinnerStyles.dark_mode}` : ''

  const deleteCartItem = () => removeItemFromCart(item.productId, setSpinner)

  return (
    <li className={styles.cart__popup__list__item}>
      <div className={styles.cart__popup__list__item__top}>
        <div className={styles.cart__popup__list__item__img}>
          <img src={item.image} alt={item.product_name} />
        </div>
        <Link href={`/catalog/${item.productId}`} passHref legacyBehavior>
          <a
            className={`${styles.cart__popup__list__item__text} ${darkModeClass}`}
          >
            <span>
              {item.product_name.replace('.', '')}, {item.parts_manufacturer},{' '}
              {item.boiler_manufacturer}
            </span>
          </a>
        </Link>
        <button onClick={deleteCartItem}>
          <span>
            {spinner ? (
              <span
                className={`${spinnerStyles.spinner} ${spinnerDarkModeClass}`}
                style={{ top: 0, left: 0, width: 20, height: 20 }}
              />
            ) : (
              <DeleteSvg />
            )}
          </span>
        </button>
      </div>

      <div className={styles.cart__popup__list__item__bottom}>
        {item.in_stock === 0 ? (
          <span className={styles.cart__popup__list__item__empty}>
            Нет в наличии
          </span>
        ) : (
          <div>счётчик</div>
        )}

        <span
          className={`${styles.cart__popup__list__item__price} ${darkModeClass}`}
        >
          {formatPrice(item.product_price)} P
        </span>
      </div>
    </li>
  )
}

export default CartPopupItem
