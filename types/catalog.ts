import { Event } from 'effector-next'

export interface IManufacturersBlockProps {
  title: string
  event: Event<IFilterCheckboxItem>
  manufacturersList: IFilterCheckboxItem[]
}

export interface IManufacturersBlockItemProps {
  item: IFilterCheckboxItem
  event: Event<IFilterCheckboxItem>
}

export interface IQueryParams {
  offset: string
  first: string
  boiler: string
  parts: string
  priceFrom: string
  priceTo: string
  productId: string
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

interface ICatalogBaseTypes {
  priceRange: number[]
  setPriceRange: (arg0: number[]) => void
  setIsPriceRangeChanged: (arg0: boolean) => void
}

interface ICatalogFiltersBaseTypes {
  resetFilterButtonDisabled: boolean
  resetFilters: VoidFunction
}

export interface ICatalogFiltersProps
  extends ICatalogBaseTypes,
    ICatalogFiltersBaseTypes {
  isPriceRangeChanged: boolean
  currentPage: number
  filtersMobileOpen: boolean
  setIsFilterInQuery: (arg0: boolean) => void
  closePopup: VoidFunction
}

export type IPriceRangeProps = ICatalogBaseTypes

export interface ICatalogFiltersDesktopProps
  extends ICatalogBaseTypes,
    ICatalogFiltersBaseTypes {
  spinner: boolean
  applyFilters: VoidFunction
}
export interface ICatalogFiltersMobileProps
  extends ICatalogBaseTypes,
    ICatalogFiltersBaseTypes {
  spinner: boolean
  filtersMobileOpen: boolean
  applyFilters: VoidFunction
  closePopup: VoidFunction
}
export interface IFiltersMobilePopupTopProps {
  resetButtonText: string
  title: string
  resetFilterButtonDisabled: boolean
  resetFilters: VoidFunction
  closePopup: VoidFunction
}

export interface IFiltersPopupProps extends IFilterManufacturerAccordionProps {
  resetFilterButtonDisabled: boolean
  resetAllManufacturers: VoidFunction
  handleClosePopup: VoidFunction
  applyFilters: VoidFunction
  openPopup: boolean
}
