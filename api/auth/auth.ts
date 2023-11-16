import { createEffect } from 'effector-next'
import { toast } from 'react-toastify'

import { ISignInFxProps, ISignUpFxProps } from '@/types/auth'
import axiosInstance from '../axiosClient'
import { AxiosError } from 'axios'
import { HTTPStatus } from '@/constants'

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

export const checkUserAuthFx = createEffect(async (url: string) => {
  try {
    const { data } = await axiosInstance.get(url)

    return data
  } catch (err) {
    const axiosError = err as AxiosError

    if (axiosError.response) {
      if (axiosError.response.status === HTTPStatus.FORBIDDEN) {
        return false
      }
    }

    toast.error((err as Error).message)
  }
})
