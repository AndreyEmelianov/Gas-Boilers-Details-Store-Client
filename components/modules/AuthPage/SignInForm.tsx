import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { useState } from 'react'

import PasswordInput from '@/components/elements/AuthPage/PasswordInput'
import NameInput from '@/components/elements/AuthPage/NameInput'
import { IInputs } from '@/types/auth'
import { signInFx } from '@/api/auth/auth'

import styles from '@/styles/auth/index.module.scss'
import spinnerStyles from '@/styles/spinner/index.module.scss'

const SignInForm = () => {
  const [spinner, setSpinner] = useState(false)

  const {
    register,
    formState: { errors },
    handleSubmit,
    resetField,
  } = useForm<IInputs>()

  const onSubmit = async (data: IInputs) => {
    try {
      setSpinner(true)
      await signInFx({
        url: '/users/login',
        username: data.name,
        password: data.password,
      })

      resetField('name')
      resetField('password')
    } catch (err) {
      toast.error((err as Error).message)
    } finally {
      setSpinner(false)
    }
  }

  return (
    <form className={`${styles.form}`} onSubmit={handleSubmit(onSubmit)}>
      <h2 className={`${styles.form_title} ${styles.title}`}>Войти на сайт</h2>
      <NameInput register={register} errors={errors} />
      <PasswordInput register={register} errors={errors} />
      <button
        className={`${styles.form__button} ${styles.button} ${styles.submit}`}
      >
        {spinner ? <div className={spinnerStyles.spinner} /> : 'ВОЙТИ'}
      </button>
    </form>
  )
}

export default SignInForm
