import { useStore } from 'effector-react'
import { useForm } from 'react-hook-form'
import { MutableRefObject, useRef, useState } from 'react'
import emailjs from '@emailjs/browser'
import { toast } from 'react-toastify'

import { $mode } from '@/context/mode'
import NameInput from './NameInput'
import PhoneInput from './PhoneInput'
import EmailInput from './EmailInput'
import MessageInput from './MessageInput'
import { FeedbackInputs } from '@/types/feedbackForm'

import styles from '@/styles/feedbackForm/index.module.scss'
import spinnerStyles from '@/styles/spinner/index.module.scss'

const FeedbackForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FeedbackInputs>()

  const formRef = useRef() as MutableRefObject<HTMLFormElement>
  const [spinner, setSpinner] = useState(false)

  const mode = useStore($mode)
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''

  const submitForm = () => {
    setSpinner(true)
    emailjs
      .sendForm(
        'service_u1zyvlc',
        'template_45kqwap',
        formRef.current,
        'pByf0zpPevbqkzTNS'
      )
      .then((result) => {
        setSpinner(false)
        toast.success(`Сообщение успешно отправленно! ${result.text}`)
      })
      .catch((error) => {
        setSpinner(false)
        toast.error(`Что-то пошло не так... ${error.text}`)
      })

    formRef.current.reset
  }

  return (
    <div className={`${styles.feedback_form} ${darkModeClass}`}>
      <h3 className={`${styles.feedback_form__title} ${darkModeClass}`}>
        Форма обратной связи
      </h3>

      <form
        ref={formRef}
        className={styles.feedback_form__form}
        onSubmit={handleSubmit(submitForm)}
      >
        <NameInput
          register={register}
          errors={errors}
          darkModeClass={darkModeClass}
        />
        <PhoneInput
          register={register}
          errors={errors}
          darkModeClass={darkModeClass}
        />
        <EmailInput
          register={register}
          errors={errors}
          darkModeClass={darkModeClass}
        />
        <MessageInput
          register={register}
          errors={errors}
          darkModeClass={darkModeClass}
        />
        <div className={styles.feedback_form__form__btn}>
          <button>
            {spinner ? (
              <span
                className={spinnerStyles.spinner}
                style={{ top: 6, left: '47%' }}
              />
            ) : (
              'Отправить сообщение'
            )}
          </button>
        </div>
      </form>
    </div>
  )
}
export default FeedbackForm
