import { useState } from 'react'

import { useMediaQuery } from '@/hooks/useMediaQuery'
import CatalogFiltersDesktop from './CatalogFiltersDesktop'
import { ICatalogFiltersProps } from '@/types/catalog'

const CatalogFilters = ({
  priceRange,
  setPriceRange,
  setIsPriceRangeChanged,
  resetFilterButtonDisabled,
}: ICatalogFiltersProps) => {
  const [spinner, setSpinner] = useState(false)

  const isMobile820 = useMediaQuery(820)

  return (
    <>
      {isMobile820 ? (
        <div>моб</div>
      ) : (
        <CatalogFiltersDesktop
          priceRange={priceRange}
          setPriceRange={setPriceRange}
          setIsPriceRangeChanged={setIsPriceRangeChanged}
          resetFilterButtonDisabled={resetFilterButtonDisabled}
          spinner={spinner}
        />
      )}
    </>
  )
}
export default CatalogFilters
