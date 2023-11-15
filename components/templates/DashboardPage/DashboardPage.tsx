import styles from '@/styles/dashboard/index.module.scss'

const DashboardPage = () => {
  console.log('')

  return (
    <section className={styles.dashboard}>
      <div className={`container ${styles.dashboard__container}`}>
        <div className={styles.dashboard__brands}>
          <span>Слайдер</span>
        </div>
      </div>
    </section>
  )
}

export default DashboardPage
