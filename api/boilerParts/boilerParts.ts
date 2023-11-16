import { createEffect } from 'effector-next'
import axiosInstance from '../axiosClient'

export const getNewProductOrBestsellersFx = createEffect(
  async (url: string) => {
    const { data } = await axiosInstance.get(url)

    return data
  }
)
