import { IAuthPageInputProps } from '@/types/auth'

import styles from '@/styles/auth/index.module.scss'

const NameInput = ({ register, errors }: IAuthPageInputProps) => {
  console.log('')
  return (
    <label className={styles.form__label}>
      <input
        {...register('name', {
          required: 'Введите имя',
          minLength: 2,
          maxLength: 16,
          pattern: {
            value: /^[а-яА-Яa-zA-ZёЁ]*$/,
            message: 'Недопустимые символы!',
          },
        })}
        className={styles.form__input}
        type="text"
        placeholder="Name"
      />
      {errors.name && (
        <span className={styles.error_alert}>{errors.name?.message}</span>
      )}
      {errors.name && errors.name.type === 'minLength' && (
        <span className={styles.error_alert}>Введите не менее 2 символов</span>
      )}
      {errors.name && errors.name.type === 'maxLength' && (
        <span className={styles.error_alert}>Не более 16 символов</span>
      )}
    </label>
  )
}

export default NameInput
