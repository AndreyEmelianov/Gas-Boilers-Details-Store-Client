import { useStore } from 'effector-react'
import Link from 'next/link'

import { $mode } from '@/context/mode'
import { ICartAlertProps } from '@/types/dashboard'
import { formatPrice } from '@/utils/common'
import { $totalPrice } from '@/context/shopping-cart'

import styles from '@/styles/dashboard/index.module.scss'

const CartAlert = ({ count, closeAlert }: ICartAlertProps) => {
  const totalPrice = useStore($totalPrice)

  const mode = useStore($mode)
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''

  const showCountMessage = (count: string) => {
    if (count.endsWith('1')) {
      return 'Товар'
    }

    if (count.endsWith('2') || count.endsWith('3' || count.endsWith('4'))) {
      return 'Товара'
    }

    return 'Товаров'
  }

  return (
    <>
      <div className={`${styles.dashboard__alert__left} ${darkModeClass}`}>
        <span>
          {showCountMessage(`${count.toString()}`)} в корзине: {count}
        </span>
        <span>На сумму: {formatPrice(totalPrice)} P</span>
      </div>
      <div className={styles.dashboard__alert__right}>
        <Link href="/order" legacyBehavior passHref>
          <a className={styles.dashboard__alert__btn_cart}>Перейти в корзину</a>
        </Link>
        <Link href="/order" legacyBehavior passHref>
          <a className={styles.dashboard__alert__btn_order}>Оформить заказ</a>
        </Link>
      </div>
      <button
        className={styles.dashboard__alert__btn_close}
        onClick={closeAlert}
      />
    </>
  )
}
export default CartAlert
