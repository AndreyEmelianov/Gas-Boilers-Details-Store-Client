import { toast } from 'react-toastify'

import {
  addToCartFx,
  removeItemFromCartFx,
  updateCartItemFx,
} from '@/api/shopping-cart/shopping-cart'
import {
  removeShoppingCartItem,
  updateCartItemTotalPrice,
  updateShoppingCart,
} from '@/context/shopping-cart'

export const toggleCartItem = async (
  username: string,
  productId: number,
  isInCart: boolean
) => {
  try {
    if (isInCart) {
      await removeItemFromCartFx(`/shopping-cart/product/${productId}`)
      removeShoppingCartItem(productId)
      return
    }

    const data = await addToCartFx({
      url: `/shopping-cart/add`,
      username,
      productId,
    })

    updateShoppingCart(data)
  } catch (err) {
    toast.error((err as Error).message)
  }
}

export const removeItemFromCart = async (productId: number) => {
  try {
    await removeItemFromCartFx(`/shopping-cart/product/${productId}`)
    removeShoppingCartItem(productId)
  } catch (err) {
    toast.error((err as Error).message)
  }
}

export const updateTotalPrice = async (
  total_price: number,
  productId: number
) => {
  const data = await updateCartItemFx({
    url: `shopping-cart/total-price/${productId}`,
    payload: { total_price },
  })

  updateCartItemTotalPrice({ productId, total_price: data.total_price })
}
