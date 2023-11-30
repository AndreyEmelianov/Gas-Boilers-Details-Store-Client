import { createEffect } from 'effector-next'

import axiosInstance from '../axiosClient'
import { ICheckPayFx, IMakePayFx } from '@/types/order'

export const makePaymentFx = createEffect(
  async ({ url, amount }: IMakePayFx) => {
    const { data } = await axiosInstance.post(url, { amount })

    return data
  }
)

export const checkPaymentFx = createEffect(
  async ({ url, paymentId }: ICheckPayFx) => {
    const { data } = await axiosInstance.post(url, { paymentId })

    return data
  }
)
