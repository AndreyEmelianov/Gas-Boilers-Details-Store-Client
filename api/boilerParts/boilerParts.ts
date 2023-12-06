import { createEffect } from 'effector-next'
import { toast } from 'react-toastify'

import axiosInstance from '../axiosClient'

export const getNewProductOrBestsellersFx = createEffect(
  async (url: string) => {
    const { data } = await axiosInstance.get(url)

    return data
  }
)

export const getBoilerPartsFx = createEffect(async (url: string) => {
  const { data } = await axiosInstance.get(url)

  return data
})

export const getBoilerPartFx = createEffect(async (url: string) => {
  const { data } = await axiosInstance.get(url)

  return data
})

export const searchPartsFx = createEffect(
  async ({ url, search }: { url: string; search: string }) => {
    const { data } = await axiosInstance.post(url, { search })

    return data.rows
  }
)

export const getPartByNameFx = createEffect(
  async ({ url, name }: { url: string; name: string }) => {
    try {
      const { data } = await axiosInstance.post(url, { name })
      return data
    } catch (err) {
      toast.error((err as Error).message)
    }
  }
)
