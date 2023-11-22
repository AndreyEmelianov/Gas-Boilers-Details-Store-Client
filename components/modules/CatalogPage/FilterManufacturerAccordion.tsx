import { useStore } from 'effector-react'

import { $mode } from '@/context/mode'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { IFilterManufacturerAccordionProps } from '@/types/catalog'
import Accordion from '@/components/elements/Accordion/Accordion'
import FilterCheckboxItem from './FilterCheckboxItem'

import styles from '@/styles/catalog/index.module.scss'

const FilterManufacturerAccordion = ({
  manufacturersList,
  title,
  setManufacturer,
  updateManufacturer,
}: IFilterManufacturerAccordionProps) => {
  const isMobile820 = useMediaQuery(820)
  const mode = useStore($mode)
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''

  const chooseAllManufacturers = () =>
    setManufacturer(
      manufacturersList.map((manufacturer) => ({
        ...manufacturer,
        checked: true,
      }))
    )

  return (
    <Accordion
      title={title}
      titleClass={`${styles.filters__manufacturer__btn} ${darkModeClass}`}
      openArrowClass={styles.open}
      isMobileForFilters={isMobile820}
      hideArrowClass={isMobile820 ? styles.hide_arrow : ''}
    >
      <div className={`${styles.filters__manufacturer__inner}`}>
        <button
          className={`${styles.filters__manufacturer__select_all}`}
          onClick={chooseAllManufacturers}
        >
          Выбрать все
        </button>
        <ul className={`${styles.filters__manufacturer__list}`}>
          {manufacturersList.map((manufacturer) => (
            <FilterCheckboxItem
              key={manufacturer.id}
              title={manufacturer.title}
              checked={manufacturer.checked}
              event={updateManufacturer}
            />
          ))}
        </ul>
        <div style={{ height: '24px' }} />
      </div>
    </Accordion>
  )
}
export default FilterManufacturerAccordion
