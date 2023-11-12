import styles from '@/styles/auth/index.module.scss'

const AuthPage = () => {
  console.log('')
  return (
    <div className={styles.main}>
      <div
        className={`${styles.container} ${styles.a_container}`}
        id="a-container"
      >
        <form className={`${styles.form}`}>
          <h2 className={`${styles.form_title} ${styles.title}`}>
            Create Account
          </h2>
          <input
            className={styles.form__input}
            type="text"
            placeholder="Name"
          />
          <input
            className={styles.form__input}
            type="text"
            placeholder="Email"
          />
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
      </div>
      <div
        className={`${styles.container} ${styles.b_container}`}
        id="b-container"
      >
        <form className={styles.form}>
          <h2 className={`${styles.form_title} ${styles.title}`}>
            Sign in to Website
          </h2>

          <input
            className={styles.form__input}
            type="text"
            placeholder="Email"
          />
          <input
            className={styles.form__input}
            type="password"
            placeholder="Password"
          />
          <button
            className={`${styles.form__button} ${styles.button} ${styles.submit}`}
          >
            SIGN IN
          </button>
        </form>
      </div>
      <div className={styles.switch} id="switch-cnt">
        <div className={styles.switch__circle} />
        <div
          className={`${styles.switch__circle} ${styles.switch__circle_t}`}
        />
        <div className={styles.switch__container} id="switch-c1">
          <h2 className={`${styles.switch__title} ${styles.title}`}>
            Welcome Back !
          </h2>
          <p className={`${styles.switch__description} ${styles.description}`}>
            To keep connected with us please login with your personal info
          </p>
          <button
            className={`${styles.switch__button} ${styles.button} ${styles.switch_btn}`}
          >
            SIGN IN
          </button>
        </div>
        <div
          className={`${styles.switch__container} ${styles.is_hidden}`}
          id="switch-c2"
        >
          <h2 className={`${styles.switch__title} ${styles.title}`}>
            Hello Friend !
          </h2>
          <p className={`${styles.switch__description} ${styles.description}`}>
            Enter your personal details and start journey with us
          </p>
          <button
            className={`${styles.switch__button} ${styles.button} ${styles.switch_btn}`}
          >
            SIGN UP
          </button>
        </div>
      </div>
    </div>
  )
}

export default AuthPage
