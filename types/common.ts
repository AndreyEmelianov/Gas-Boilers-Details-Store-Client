import { MultiValue, SingleValue } from 'react-select'

export interface IWrapperComponentProps {
  open: boolean
  setOpen: (arg0: boolean) => void
}

export interface ISelectOption {
  value: string | number
  label: string | number
}

export type SelectOptionType =
  | MultiValue<ISelectOption>
  | SingleValue<ISelectOption>
  | null

export interface IAccordion {
  children: React.ReactNode
  title: string | false
  titleClass: string
  openArrowClass?: string
  isMobileForFilters?: boolean
  hideArrowClass?: string
  boxShadowStyle?: string
  callback?: (arg0: boolean) => void
}

export interface ILayoutProps {
  children: React.ReactNode
}

export interface IGeolocation {
  latitude: number
  longitude: number
}

export interface ICrumbProps {
  text: string
  href: string
  last: boolean
  textGenerator: () => string
}
