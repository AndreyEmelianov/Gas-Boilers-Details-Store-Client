/* eslint-disable max-len */
import { createEffect } from 'effector-next'

import { IGeolocation } from '@/types/common'
import axiosInstance from '../axiosClient'

export const getGeolocationFx = createEffect(
  async ({ latitude, longitude }: IGeolocation) => {
    const data = await axiosInstance.get(
      `https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&lang=ru&apiKey=${process.env.NEXT_PUBLIC_GEOAPI_KEY}`,
      { withCredentials: false }
    )

    return data
  }
)
