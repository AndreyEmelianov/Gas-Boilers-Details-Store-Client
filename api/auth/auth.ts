import { createEffect } from 'effector-next'
import { toast } from 'react-toastify'

import { ISignUpFxProps } from '@/types/auth'
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

    return data
  }
)
