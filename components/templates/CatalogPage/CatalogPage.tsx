import { useStore } from 'effector-react'
import { toast } from 'react-toastify'
import { useEffect, useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import ReactPaginate from 'react-paginate'
import { useRouter } from 'next/router'

import ManufacturersBlock from '@/components/modules/CatalogPage/ManufacturersBlock'
import FilterSelect from '@/components/modules/CatalogPage/FilterSelect'
import {
  $boilerManufacturers,
  $boilerParts,
  $filteredBoilerParts,
  $partsManufacturers,
  setBoilerManufacturers,
  setBoilerParts,
  setPartsManufacturers,
  updateBoilerManufacturer,
  updatePartsManufacturer,
} from '@/context/boilerParts'
import { $mode } from '@/context/mode'
import { getBoilerPartsFx } from '@/api/boilerParts/boilerParts'
import CatalogItem from '@/components/modules/CatalogPage/CatalogItem'
import { IQueryParams } from '@/types/catalog'
import { IBoilerParts } from '@/types/boilerParts'
import CatalogFilters from '@/components/modules/CatalogPage/CatalogFilters'

import styles from '@/styles/catalog/index.module.scss'
import skeletonStyles from '@/styles/skeleton/index.module.scss'

const CatalogPage = ({ query }: { query: IQueryParams }) => {
  const [priceRange, setPriceRange] = useState([1000, 10000])
  const [isFilterInQuery, setIsFilterInQuery] = useState(false)
  const [isPriceRangeChanged, setIsPriceRangeChanged] = useState(false)
  const [spinner, setSpinner] = useState(false)

  const router = useRouter()

  const boilerParts = useStore($boilerParts)
  const boilerManufacturers = useStore($boilerManufacturers)
  const partsManufacturers = useStore($partsManufacturers)
  const filteredBoilerParts = useStore($filteredBoilerParts)

  const isAnyBoilerManufacturerChecked = boilerManufacturers.some(
    (item) => item.checked
  )
  const isAnyPartsManufacturerChecked = partsManufacturers.some(
    (item) => item.checked
  )
  const resetFilterButtonDisabled = !(
    isPriceRangeChanged ||
    isAnyBoilerManufacturerChecked ||
    isAnyPartsManufacturerChecked
  )

  const pagesCount = Math.ceil(boilerParts.count / 20)
  const isValidOffset =
    query.offset && !isNaN(+query.offset) && +query.offset > 0
  const [currentPage, setCurrentPage] = useState(
    isValidOffset ? +query.offset - 1 : 0
  )

  const mode = useStore($mode)
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''

  useEffect(() => {
    loadBoilerParts()
  }, [filteredBoilerParts, isFilterInQuery])

  console.log(boilerParts.rows)

  const loadBoilerParts = async () => {
    try {
      setSpinner(true)
      const data = await getBoilerPartsFx('/boiler-parts?limit=20&offset=0')

      if (!isValidOffset) {
        router.replace({
          query: {
            offset: 1,
          },
        })

        resetPagination(data)
        return
      }

      if (isValidOffset) {
        if (+query.offset > Math.ceil(data.count / 20)) {
          router.push(
            {
              query: {
                ...query,
                offset: 1,
              },
            },
            undefined,
            { shallow: true }
          )

          setCurrentPage(0)
          setBoilerParts(isFilterInQuery ? filteredBoilerParts : data)
          return
        }
        const offset = +query.offset - 1
        const result = await getBoilerPartsFx(
          `/boiler-parts?limit=20&offset=${offset}`
        )

        setCurrentPage(offset)
        setBoilerParts(isFilterInQuery ? filteredBoilerParts : result)
        return
      }

      setCurrentPage(0)
      setBoilerParts(isFilterInQuery ? filteredBoilerParts : data)
    } catch (err) {
      toast.error((err as Error).message)
    } finally {
      setSpinner(false)
    }
  }

  const resetPagination = (data: IBoilerParts) => {
    setCurrentPage(0)
    setBoilerParts(data)
  }

  const handlePageChange = async ({ selected }: { selected: number }) => {
    try {
      const data = await getBoilerPartsFx('/boiler-parts?limit=20&offset=0')
      if (selected > pagesCount) {
        resetPagination(data)
        return
      }

      if (isValidOffset && +query.offset > Math.ceil(data.count / 20)) {
        resetPagination(data)
        return
      }

      const result = await getBoilerPartsFx(
        `/boiler-parts?limit=20&offset=${selected}`
      )

      router.push(
        {
          query: {
            ...router.query,
            offset: selected + 1,
          },
        },
        undefined,
        { shallow: true }
      )

      setCurrentPage(selected)
      setBoilerParts(result)
    } catch (err) {}
  }

  const resetFilters = async () => {
    try {
      const data = await getBoilerPartsFx('/boiler-parts?limit=20&offset=0')

      setBoilerManufacturers(
        boilerManufacturers.map((item) => ({ ...item, checked: false }))
      )

      setPartsManufacturers(
        partsManufacturers.map((item) => ({ ...item, checked: false }))
      )

      setBoilerParts(data)
      setPriceRange([1000, 10000])
      setIsPriceRangeChanged(false)
    } catch (err) {
      toast.error((err as Error).message)
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
            {isAnyBoilerManufacturerChecked && (
              <ManufacturersBlock
                title="Производитель котлов:"
                event={updateBoilerManufacturer}
                manufacturersList={boilerManufacturers}
              />
            )}
          </AnimatePresence>
          <AnimatePresence>
            {isAnyPartsManufacturerChecked && (
              <ManufacturersBlock
                title="Производитель запчастей:"
                event={updatePartsManufacturer}
                manufacturersList={partsManufacturers}
              />
            )}
          </AnimatePresence>
          <div className={styles.catalog__top__inner}>
            <button
              className={`${styles.catalog__top__reset} ${darkModeClass}`}
              disabled={resetFilterButtonDisabled}
              onClick={resetFilters}
            >
              Сбросить фильтры
            </button>
            <FilterSelect />
          </div>
        </div>

        <div className={`${styles.catalog__bottom} ${darkModeClass}`}>
          <div className={`${styles.catalog__bottom__inner} `}>
            <CatalogFilters
              priceRange={priceRange}
              setPriceRange={setPriceRange}
              setIsPriceRangeChanged={setIsPriceRangeChanged}
              resetFilterButtonDisabled={resetFilterButtonDisabled}
              resetFilters={resetFilters}
              isPriceRangeChanged={isPriceRangeChanged}
              currentPage={currentPage}
              setIsFilterInQuery={setIsFilterInQuery}
            />

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

          <ReactPaginate
            containerClassName={styles.catalog__bottom__list}
            pageClassName={styles.catalog__bottom__list__item}
            pageLinkClassName={styles.catalog__bottom__list__item__link}
            previousClassName={styles.catalog__bottom__list__prev}
            nextClassName={styles.catalog__bottom__list__next}
            breakClassName={styles.catalog__bottom__list__break}
            breakLinkClassName={`${styles.catalog__bottom__list__break__link} ${darkModeClass}`}
            breakLabel="..."
            pageCount={pagesCount}
            forcePage={currentPage}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </section>
  )
}
export default CatalogPage
