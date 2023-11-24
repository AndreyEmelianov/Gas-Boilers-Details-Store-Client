import { useStore } from 'effector-react'

import { $mode } from '@/context/mode'
import { IFiltersMobilePopupTopProps } from '@/types/catalog'

import styles from '@/styles/catalog/index.module.scss'

const FiltersMobilePopupTop = ({
  title,
  resetButtonText,
  resetFilters,
  resetFilterButtonDisabled,
  closePopup,
}: IFiltersMobilePopupTopProps) => {
  const mode = useStore($mode)
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''
  return (
    <div className={`${styles.catalog__bottom__filters__top} ${darkModeClass}`}>
      <button
        className={`${styles.catalog__bottom__filters__title} ${darkModeClass}`}
        onClick={closePopup}
      >
        {title}
      </button>
      <button
        className={`${styles.catalog__bottom__filters__reset}`}
        onClick={resetFilters}
        disabled={resetFilterButtonDisabled}
      >
        {resetButtonText}
      </button>
    </div>
  )
}
export default FiltersMobilePopupTop
