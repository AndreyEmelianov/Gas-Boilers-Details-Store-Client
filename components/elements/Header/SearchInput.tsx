import { useStore } from 'effector-react'
import { useState } from 'react'
import Select from 'react-select'

import { SelectOptionType } from '@/types/common'
import { $mode } from '@/context/mode'

import {
  controlStyles,
  menuControlStyles,
  optionStyles,
  searchInputStyles,
} from '@/styles/searchInput'

const SearchInput = () => {
  const [searchOption, setSearchOption] = useState<SelectOptionType>(null)

  const mode = useStore($mode)

  const handleSearchOptionChange = (selectedOption: SelectOptionType) => {
    setSearchOption(selectedOption)
  }

  return (
    <Select
      placeholder="Я ищу..."
      value={searchOption}
      onChange={handleSearchOptionChange}
      styles={{
        ...searchInputStyles,
        control: (defaultStyles) => ({
          ...controlStyles(defaultStyles, mode),
        }),
        input: (defaultStyles) => ({
          ...defaultStyles,
          color: mode === 'dark' ? '#f2f2f2' : '#222222',
        }),
        menu: (defaultStyles) => ({
          ...defaultStyles,
          ...menuControlStyles(defaultStyles, mode),
        }),
        option: (defaultStyles, state) => ({
          ...optionStyles(defaultStyles, state, mode),
        }),
      }}
      isClearable={true}
      openMenuOnClick={false}
      options={[1, 4, 8, 9, 7, 11, 12, 13, 14, 155, 22, 2131, 1231].map(
        (item) => ({
          value: item,
          label: item,
        })
      )}
    />
  )
}

export default SearchInput
