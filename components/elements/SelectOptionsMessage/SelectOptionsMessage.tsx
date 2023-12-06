import { GroupBase, NoticeProps, components } from 'react-select'

import { ISelectOption } from '@/types/common'

import spinnerStyles from '@/styles/spinner/index.module.scss'

export const NoOptionsMessage = (
  props: NoticeProps<ISelectOption, boolean, GroupBase<ISelectOption>>
) => (
  <components.NoOptionsMessage {...props}>
    <span>Ничего не найдено...</span>
  </components.NoOptionsMessage>
)

export const NoOptionsSpinner = (
  props: NoticeProps<ISelectOption, boolean, GroupBase<ISelectOption>>
) => (
  <components.NoOptionsMessage {...props}>
    <span
      className={spinnerStyles.spinner}
      style={{ top: 5, left: '48%', width: 25, height: 25 }}
    />
  </components.NoOptionsMessage>
)
