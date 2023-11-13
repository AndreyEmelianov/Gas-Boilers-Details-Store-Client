import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

import NameInput from '@/components/elements/AuthPage/NameInput'
import EmailInput from '@/components/elements/AuthPage/EmailInput'
import PasswordInput from '@/components/elements/AuthPage/PasswordInput'
import { IInputs } from '@/types/auth'
import { signUpFx } from '@/api/auth/auth'

import styles from '@/styles/auth/index.module.scss'

const SignUpForm = ({ switchForm }: { switchForm: () => void }) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    resetField,
  } = useForm<IInputs>()

  const onSubmit = async (data: IInputs) => {
    try {
      const userData = await signUpFx({
        url: '/users/signup',
        username: data.name,
        email: data.email,
        password: data.password,
      })

      resetField('email')
      resetField('name')
      resetField('password')
      switchForm()
    } catch (err) {
      toast.error((err as Error).message)
    }
  }

  return (
    <form className={`${styles.form}`} onSubmit={handleSubmit(onSubmit)}>
      <h2 className={`${styles.form_title} ${styles.title}`}>
        Создать аккаунт
      </h2>
      <NameInput register={register} errors={errors} />
      <EmailInput register={register} errors={errors} />
      <PasswordInput register={register} errors={errors} />
      <button
        className={`${styles.form__button} ${styles.button} ${styles.submit}`}
      >
        РЕГИСТРАЦИЯ
      </button>
    </form>
  )
}

export default SignUpForm
