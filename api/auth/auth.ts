import { createEffect } from 'effector-next'
import { toast } from 'react-toastify'

import { ISignInFxProps, ISignUpFxProps } from '@/types/auth'
import axiosInstance from '../axiosClient'

export const signUpFx = createEffect(
  async ({ url, username, email, password }: ISignUpFxProps) => {
    const { data } = await axiosInstance.post(url, {
      username,
      email,
      password,
    })

    if (data.warningMessage) {
      toast.warning(data.warningMessage)
      return
    }

    toast.success('Регистрация прошла успешно!')

    return data
  }
)

export const signInFx = createEffect(
  async ({ url, username, password }: ISignInFxProps) => {
    const { data } = await axiosInstance.post(url, {
      username,
      password,
    })
    toast.success('Вход выполнен успешно!')

    return data
  }
)
