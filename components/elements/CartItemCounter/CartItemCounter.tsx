import { useStore } from 'effector-react'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

import { $mode } from '@/context/mode'
import { ICartItemCounterProps } from '@/types/shopping-cart'
import { updateCartItemFx } from '@/api/shopping-cart/shopping-cart'
import { updateCartItemCount } from '@/context/shopping-cart'
import MinusSvg from '../MinusSvg/MinusSvg'
import PlusSvg from '../PlusSvg/PlusSvg'

import styles from '@/styles/cartPopup/index.module.scss'
import spinnerStyles from '@/styles/spinner/index.module.scss'

const CartItemCounter = ({
  totalCount,
  productId,
  initialCount,
  increasePrice,
  decreasePrice,
}: ICartItemCounterProps) => {
  const [spinner, setSpinner] = useState(false)
  const [count, setCount] = useState(initialCount)
  const [disableIncrease, setDisableIncrease] = useState(false)
  const [disableDecrease, setDisableDecrease] = useState(false)

  const mode = useStore($mode)
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''
  const spinnerDarkModeClass =
    mode === 'dark' ? '' : `${spinnerStyles.dark_mode}`

  useEffect(() => {
    if (count === 1) {
      setDisableDecrease(true)
    }

    if (count === totalCount) {
      setDisableIncrease(true)
    }
  }, [count, totalCount])

  const increaseCount = async () => {
    try {
      setSpinner(true)
      increasePrice()
      setDisableDecrease(false)
      setCount(count + 1)

      const data = await updateCartItemFx({
        url: `/shopping-cart/count/${productId}`,
        payload: { count: count + 1 },
      })

      updateCartItemCount({ productId, count: data.count })
    } catch (err) {
      toast.error((err as Error).message)
    } finally {
      setSpinner(false)
    }
  }

  const decreaseCount = async () => {
    try {
      setSpinner(true)
      decreasePrice()
      setDisableIncrease(false)
      setCount(count - 1)

      const data = await updateCartItemFx({
        url: `/shopping-cart/count/${productId}`,
        payload: { count: count - 1 },
      })

      updateCartItemCount({ productId, count: data.count })
    } catch (err) {
      toast.error((err as Error).message)
    } finally {
      setSpinner(false)
    }
  }

  return (
    <div
      className={`${styles.cart__popup__list__item__counter} ${darkModeClass}`}
    >
      <button disabled={disableDecrease} onClick={decreaseCount}>
        <MinusSvg />
      </button>
      <span>
        {spinner ? (
          <span
            className={`${spinnerStyles.spinner} ${spinnerDarkModeClass}`}
            style={{ top: 4, left: 33, width: 20, height: 20 }}
          />
        ) : (
          count
        )}
      </span>
      <button disabled={disableIncrease} onClick={increaseCount}>
        <PlusSvg />
      </button>
    </div>
  )
}
export default CartItemCounter
