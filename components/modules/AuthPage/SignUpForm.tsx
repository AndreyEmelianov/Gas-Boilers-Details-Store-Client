import { useForm } from 'react-hook-form'

import NameInput from '@/components/elements/AuthPage/NameInput'
import { IInputs } from '@/types/auth'

import styles from '@/styles/auth/index.module.scss'

const SignUpForm = ({ switchForm }: { switchForm: () => void }) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<IInputs>()

  const onSubmit = (data: IInputs) => {
    console.log(data)
    switchForm()
  }

  return (
    <form className={`${styles.form}`} onSubmit={handleSubmit(onSubmit)}>
      <h2 className={`${styles.form_title} ${styles.title}`}>
        Создать аккаунт
      </h2>
      <NameInput register={register} errors={errors} />
      <input className={styles.form__input} type="text" placeholder="Email" />
      <input
        className={styles.form__input}
        type="password"
        placeholder="Password"
      />
      <button
        className={`${styles.form__button} ${styles.button} ${styles.submit}`}
      >
        SIGN UP
      </button>
    </form>
  )
}

export default SignUpForm
