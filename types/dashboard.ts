import { IBoilerPart } from './boilerParts'

export interface IDashboardSliderProps {
  items: IBoilerPart[]
  spinner: boolean
  goToPartPage?: boolean
}

export interface ICartAlertProps {
  count: number
  closeAlert: VoidFunction
}
