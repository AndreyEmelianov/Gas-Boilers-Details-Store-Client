import Select from 'react-select'
import { useStore } from 'effector-react'
import { useState } from 'react'

import { $mode } from '@/context/mode'
import { SelectOptionType } from '@/types/common'
import { createSelectOption } from '@/utils/common'

import {
  controlStyles,
  menuStyles,
  selectStyles,
} from '@/styles/catalog/select'
import { optionStyles } from '@/styles/searchInput'
import { categoriesOptions } from '@/utils/selectContents'

const FilterSelect = () => {
  const [categoryOption, setCategoryOption] = useState<SelectOptionType>(null)

  const mode = useStore($mode)

  const handleSearchOptionChange = (selectedOption: SelectOptionType) => {
    setCategoryOption(selectedOption)
  }

  return (
    <Select
      placeholder="Я ищу..."
      value={categoryOption || createSelectOption('Сначала дешёвые')}
      onChange={handleSearchOptionChange}
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
