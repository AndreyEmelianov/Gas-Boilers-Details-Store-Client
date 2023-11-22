import { Event } from 'effector-next'

export interface IManufacturersBlockProps {
  title: string
}

export interface IQueryParams {
  offset: string
  first: string
  boiler: string
  parts: string
  priceFrom: string
  priceTo: string
}

export interface IFilterCheckboxItem {
  title: string
  checked: boolean
  event: Event<IFilterCheckboxItem>
  id?: string
}

export interface IFilterManufacturerAccordionProps {
  manufacturersList: IFilterCheckboxItem[]
  title: string | false
  setManufacturer: Event<IFilterCheckboxItem[]>
  updateManufacturer: Event<IFilterCheckboxItem>
}
