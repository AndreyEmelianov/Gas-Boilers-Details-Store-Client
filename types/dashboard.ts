import { IBoilerPart } from './boilerParts'

export interface IDashboardSliderProps {
  items: IBoilerPart[]
  spinner: boolean
  goToPartPage?: boolean
}
