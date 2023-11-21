import { createDomain } from 'effector-next'

import { IBoilerParts } from '@/types/boilerParts'

const boilerParts = createDomain()

export const setBoilerParts = boilerParts.createEvent<IBoilerParts>()

export const setBoilerPartsCheapFirst = boilerParts.createEvent()
export const setBoilerPartsExpensiveFirst = boilerParts.createEvent()
export const setBoilerPartsByPopularity = boilerParts.createEvent()

export const $boilerParts = boilerParts
  .createStore<IBoilerParts>({} as IBoilerParts)
  .on(setBoilerParts, (_, parts) => parts)
  .on(setBoilerPartsCheapFirst, (state) => ({
    ...state,
    rows: state.rows.sort((a, b) => a.product_price - b.product_price),
  }))
  .on(setBoilerPartsExpensiveFirst, (state) => ({
    ...state,
    rows: state.rows.sort((a, b) => b.product_price - a.product_price),
  }))
  .on(setBoilerPartsByPopularity, (state) => ({
    ...state,
    rows: state.rows.sort(
      (a, b) => b.popularity_product - a.popularity_product
    ),
  }))
