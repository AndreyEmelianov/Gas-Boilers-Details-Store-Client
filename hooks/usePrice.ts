import { useStore } from 'effector-react'
import { useState, useEffect } from 'react'

import { removeItemFromCartFx } from '@/api/shopping-cart/shopping-cart'
import { updateTotalPrice, removeItemFromCart } from '@/utils/shopping-cart'

const usePrice = (count: number, productId: number, initialPrice: number) => {
  const spinner = useStore(removeItemFromCartFx.pending)
  const [price, setPrice] = useState(initialPrice)

  useEffect(() => {
    setPrice(price * count)
  }, [])

  useEffect(() => {
    updateTotalPrice(price, productId)
  }, [price])

  const increasePrice = () => setPrice(price + initialPrice)
  const decreasePrice = () => setPrice(price - initialPrice)

  const deleteCartItem = () => removeItemFromCart(productId)

  return {
    price,
    spinner,
    increasePrice,
    decreasePrice,
    deleteCartItem,
  }
}
export default usePrice
