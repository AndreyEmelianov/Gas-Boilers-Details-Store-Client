import { createEffect } from 'effector-next'

import axiosInstance from '../axiosClient'
import { IAddToCartFx, IUpdateCartItemFx } from '@/types/shopping-cart'

export const getCartItemsFx = createEffect(async (url: string) => {
  const { data } = await axiosInstance.get(url)

  return data
})

export const addToCartFx = createEffect(
  async ({ url, username, productId }: IAddToCartFx) => {
    const { data } = await axiosInstance.post(url, { username, productId })

    return data
  }
)

export const updateCartItemFx = createEffect(
  async ({ url, payload }: IUpdateCartItemFx) => {
    const { data } = await axiosInstance.patch(url, payload)

    return data
  }
)

export const removeItemFromCartFx = createEffect(async (url: string) => {
  await axiosInstance.delete(url)
})
