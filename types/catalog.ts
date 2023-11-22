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
  id?: string
}
