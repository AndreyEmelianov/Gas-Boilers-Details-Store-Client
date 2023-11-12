import { IAuthPageInputProps } from '@/types/auth'

import styles from '@/styles/auth/index.module.scss'

const EmailInput = ({ register, errors }: IAuthPageInputProps) => (
  <label className={styles.form__label}>
    <input
      {...register('email', {
        required: 'Введите E-mail',
        pattern: {
          value: /\S+@\S+\.\S+/,
          message: 'Неверный E-mail!',
        },
      })}
      className={styles.form__input}
      type="email"
      placeholder="E-mail"
    />
    {errors.email && (
      <span className={styles.error_alert}>{errors.email?.message}</span>
    )}
  </label>
)

export default EmailInput
