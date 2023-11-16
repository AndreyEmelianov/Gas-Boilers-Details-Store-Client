import { getNewProductOrBestsellersFx } from '@/api/boilerParts/boilerParts'
import BrandsSlider from '@/components/modules/DashboardPage/BrandsSlider'
import DashboardSlider from '@/components/modules/DashboardPage/DashboardSlider'
import { $mode } from '@/context/mode'

import styles from '@/styles/dashboard/index.module.scss'
import { IBoilerParts } from '@/types/boilerParts'
import { useStore } from 'effector-react'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

const DashboardPage = () => {
  const [newProducts, setNewProducts] = useState<IBoilerParts>(
    {} as IBoilerParts
  )
  const [bestsellers, setBestsellers] = useState<IBoilerParts>(
    {} as IBoilerParts
  )
  const [spinner, setSpinner] = useState<boolean>(false)

  const mode = useStore($mode)
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''

  useEffect(() => {
    loadBoilerParts()
  }, [])

  const loadBoilerParts = async () => {
    try {
      setSpinner(true)
      const bestsellers = await getNewProductOrBestsellersFx(
        '/boiler-parts/bestsellers'
      )
      const newProducts = await getNewProductOrBestsellersFx(
        '/boiler-parts/new-products'
      )

      setBestsellers(bestsellers)
      setNewProducts(newProducts)
    } catch (err) {
      toast.error((err as Error).message)
    } finally {
      setSpinner(false)
    }
  }

  return (
    <section className={styles.dashboard}>
      <div className={`container ${styles.dashboard__container}`}>
        <div className={styles.dashboard__brands}>
          <BrandsSlider />
        </div>
        <h2 className={`${styles.dashboard__title} ${darkModeClass}`}>
          Детали для газовых котлов
        </h2>

        <div className={styles.dashboard__parts}>
          <h3 className={`${styles.dashboard__parts__title} ${darkModeClass}`}>
            Хиты продаж
          </h3>
          <DashboardSlider items={bestsellers.rows || []} spinner={spinner} />
        </div>
      </div>
    </section>
  )
}

export default DashboardPage
