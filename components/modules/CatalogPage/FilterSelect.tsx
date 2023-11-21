/* eslint-disable indent */
import Select from 'react-select'
import { useStore } from 'effector-react'
import { useEffect, useState } from 'react'

import { $mode } from '@/context/mode'
import { ISelectOption, SelectOptionType } from '@/types/common'
import { createSelectOption } from '@/utils/common'
import { categoriesOptions } from '@/utils/selectContents'
import {
  $boilerParts,
  setBoilerPartsByPopularity,
  setBoilerPartsCheapFirst,
  setBoilerPartsExpensiveFirst,
} from '@/context/boilerParts'

import {
  controlStyles,
  menuStyles,
  selectStyles,
} from '@/styles/catalog/select'
import { optionStyles } from '@/styles/searchInput'
import { useRouter } from 'next/router'
const FilterSelect = () => {
  const [categoryOption, setCategoryOption] = useState<SelectOptionType>(null)

  const boilerParts = useStore($boilerParts)
  const mode = useStore($mode)
  const router = useRouter()

  useEffect(() => {
    if (boilerParts.rows) {
      switch (router.query.first) {
        case 'cheap':
          updateCategoryOption('Сначала дешёвые')
          setBoilerPartsCheapFirst()
          break
        case 'expensive':
          updateCategoryOption('Сначала дорогие')
          setBoilerPartsExpensiveFirst()
          break
        case 'popular':
          updateCategoryOption('По популярности')
          setBoilerPartsByPopularity()
          break
        default:
          updateCategoryOption('Сначала дешёвые')
          setBoilerPartsCheapFirst()
          break
      }
    }
  }, [boilerParts.rows, router.query.first])

  const updateCategoryOption = (value: string) =>
    setCategoryOption({ value, label: value })

  const updateRoteParam = (first: string) =>
    router.push(
      {
        query: {
          ...router.query,
          first,
        },
      },
      undefined,
      { shallow: true }
    )

  const handleSortOptionChange = (selectedOption: SelectOptionType) => {
    setCategoryOption(selectedOption)

    switch ((selectedOption as ISelectOption).value) {
      case 'Сначала дешёвые':
        setBoilerPartsCheapFirst()
        updateRoteParam('cheap')
        break
      case 'Сначала дорогие':
        setBoilerPartsExpensiveFirst()
        updateRoteParam('expensive')
        break
      case 'По популярности':
        setBoilerPartsByPopularity()
        updateRoteParam('popular')
        break
      default:
        break
    }
  }

  return (
    <Select
      placeholder="Я ищу..."
      value={categoryOption || createSelectOption('Сначала дешёвые')}
      onChange={handleSortOptionChange}
      styles={{
        ...selectStyles,
        control: (defaultStyles) => ({
          ...controlStyles(defaultStyles, mode),
        }),
        input: (defaultStyles) => ({
          ...defaultStyles,
          color: mode === 'dark' ? '#f2f2f2' : '#222222',
        }),
        menu: (defaultStyles) => ({
          ...defaultStyles,
          ...menuStyles(defaultStyles, mode),
        }),
        option: (defaultStyles, state) => ({
          ...optionStyles(defaultStyles, state, mode),
        }),
      }}
      options={categoriesOptions}
      isSearchable={false}
    />
  )
}
export default FilterSelect
