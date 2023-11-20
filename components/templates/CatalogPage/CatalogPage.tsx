import { useStore } from 'effector-react'
import { toast } from 'react-toastify'
import { useEffect, useState } from 'react'
import { AnimatePresence } from 'framer-motion'

import ManufacturersBlock from '@/components/modules/CatalogPage/ManufacturersBlock'
import FilterSelect from '@/components/modules/CatalogPage/FilterSelect'
import { $boilerParts, setBoilerParts } from '@/context/boilerParts'
import { $mode } from '@/context/mode'
import { getBoilerPartsFx } from '@/api/boilerParts/boilerParts'

import styles from '@/styles/catalog/index.module.scss'
import skeletonStyles from '@/styles/skeleton/index.module.scss'
import CatalogItem from '@/components/modules/CatalogPage/CatalogItem'

const CatalogPage = () => {
  const [spinner, setSpinner] = useState(false)

  const boilerParts = useStore($boilerParts)
  const mode = useStore($mode)
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''

  useEffect(() => {
    loadBoilerParts()
  }, [])

  const loadBoilerParts = async () => {
    try {
      setSpinner(true)
      const data = await getBoilerPartsFx('/boiler-parts?limit=20&offset=0')

      setBoilerParts(data)
    } catch (err) {
      toast.error((err as Error).message)
    } finally {
      setSpinner(false)
    }
  }

  return (
    <section className={styles.catalog}>
      <div className={`container ${styles.catalog__container}`}>
        <h2 className={`${styles.catalog__title} ${darkModeClass}`}>
          Каталог товаров
        </h2>
        <div className={`${styles.catalog__top} ${darkModeClass}`}>
          <AnimatePresence>
            {false && <ManufacturersBlock title="Производитель котлов:" />}
          </AnimatePresence>
          <AnimatePresence>
            {false && <ManufacturersBlock title="Производитель запчастей:" />}
          </AnimatePresence>
          <div className={styles.catalog__top__inner}>
            <button
              className={`${styles.catalog__top__reset} ${darkModeClass}`}
              disabled
            >
              Сбросить фильтры
            </button>
            <FilterSelect />
          </div>
        </div>

        <div className={`${styles.catalog__bottom} ${darkModeClass}`}>
          <div className={`${styles.catalog__bottom__inner} `}>
            <div>Filters</div>

            {spinner ? (
              <ul className={skeletonStyles.skeleton}>
                {Array.from(new Array(8)).map((_, i) => (
                  <li
                    key={i}
                    className={`${skeletonStyles.skeleton__item} ${
                      mode === 'dark' ? `${skeletonStyles.dark_mode}` : ''
                    }`}
                  >
                    <div className={skeletonStyles.skeleton__item__light} />
                  </li>
                ))}
              </ul>
            ) : (
              <ul className={`${styles.catalog__list} `}>
                {boilerParts.rows?.length ? (
                  boilerParts.rows.map((item) => (
                    <CatalogItem item={item} key={item.id} />
                  ))
                ) : (
                  <span>Список товаров пуст...</span>
                )}
              </ul>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
export default CatalogPage
