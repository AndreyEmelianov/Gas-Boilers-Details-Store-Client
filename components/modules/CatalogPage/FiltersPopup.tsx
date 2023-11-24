import { useStore } from 'effector-react'

import { $mode } from '@/context/mode'
import { IFiltersPopupProps } from '@/types/catalog'
import FiltersMobilePopupTop from './FiltersMobilePopupTop'
import FilterManufacturerAccordion from './FilterManufacturerAccordion'

import styles from '@/styles/catalog/index.module.scss'

const FiltersPopup = ({
  resetFilterButtonDisabled,
  resetAllManufacturers,
  handleClosePopup,
  updateManufacturer,
  setManufacturer,
  applyFilters,
  openPopup,
  title,
  manufacturersList,
}: IFiltersPopupProps) => {
  const mode = useStore($mode)
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''
  return (
    <div
      className={`${styles.filters__popup} ${darkModeClass} ${
        openPopup ? styles.open : ''
      }`}
    >
      <div className={styles.filters__popup__inner}>
        <FiltersMobilePopupTop
          resetButtonText="Сбросить"
          title={title as string}
          resetFilterButtonDisabled={resetFilterButtonDisabled}
          resetFilters={resetAllManufacturers}
          closePopup={handleClosePopup}
        />
        <FilterManufacturerAccordion
          title={false}
          manufacturersList={manufacturersList}
          updateManufacturer={updateManufacturer}
          setManufacturer={setManufacturer}
        />
      </div>

      <div className={styles.filters__actions}>
        <button
          className={styles.filters__actions__show}
          style={{ marginBottom: 12 }}
          disabled={resetFilterButtonDisabled}
          onClick={applyFilters}
        >
          Показать
        </button>
        <button
          className={styles.filters__actions__reset}
          onClick={handleClosePopup}
        >
          Назад
        </button>
      </div>
    </div>
  )
}
export default FiltersPopup
