import { createEffect } from 'effector-next'

import axiosInstance from '../axiosClient'
import { ICheckPayFx, IMakePayFx } from '@/types/order'

export const makePaymentFx = createEffect(
  async ({ url, amount, description }: IMakePayFx) => {
    const { data } = await axiosInstance.post(url, { amount, description })

    return data
  }
)

export const checkPaymentFx = createEffect(
  async ({ url, paymentId }: ICheckPayFx) => {
    const { data } = await axiosInstance.post(url, { paymentId })

    return data
  }
)
