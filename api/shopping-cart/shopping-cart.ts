import { createEffect } from 'effector-next'

import axiosInstance from '../axiosClient'
import { IAddToCartFx } from '@/types/shopping-cart'

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

export const removeItemFromCartFx = createEffect(async (url: string) => {
  await axiosInstance.delete(url)
})
