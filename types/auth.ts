import { FieldErrors, UseFormRegister } from 'react-hook-form'

export interface IInputs {
  name: string
  email: string
  password: string
}
export interface IAuthPageNameInputProps {
  register: UseFormRegister<IInputs>
  errors: FieldErrors<IInputs>
}
