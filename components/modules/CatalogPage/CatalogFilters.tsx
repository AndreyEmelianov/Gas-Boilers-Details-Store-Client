import { useState } from 'react'
import { useStore } from 'effector-react'
import { toast } from 'react-toastify'
import { useRouter } from 'next/router'

import { useMediaQuery } from '@/hooks/useMediaQuery'
import CatalogFiltersDesktop from './CatalogFiltersDesktop'
import { ICatalogFiltersProps } from '@/types/catalog'
import {
  $boilerManufacturers,
  $partsManufacturers,
  setFilteredBoilerParts,
} from '@/context/boilerParts'
import { getBoilerPartsFx } from '@/api/boilerParts/boilerParts'

const CatalogFilters = ({
  priceRange,
  setPriceRange,
  setIsPriceRangeChanged,
  resetFilterButtonDisabled,
  resetFilters,
  isPriceRangeChanged,
  currentPage,
  setIsFilterInQuery,
}: ICatalogFiltersProps) => {
  const [spinner, setSpinner] = useState(false)

  const isMobile820 = useMediaQuery(820)
  const router = useRouter()

  const boilerManufacturers = useStore($boilerManufacturers)
  const partsManufacturers = useStore($partsManufacturers)

  const applyFilters = async () => {
    setIsFilterInQuery(true)
    try {
      setSpinner(true)
      const priceFrom = Math.ceil(priceRange[0])
      const priceTo = Math.ceil(priceRange[1])
      const priceQuery = isPriceRangeChanged
        ? `&priceFrom=${priceFrom}&priceTo=${priceTo}`
        : ''

      const boilersCheckedTitles = boilerManufacturers
        .filter((item) => item.checked)
        .map((item) => item.title)
      const partsCheckedTitles = partsManufacturers
        .filter((item) => item.checked)
        .map((item) => item.title)

      const encodedBoilerQuery = encodeURIComponent(
        JSON.stringify(boilersCheckedTitles)
      )
      const encodedPartsQuery = encodeURIComponent(
        JSON.stringify(partsCheckedTitles)
      )

      const boilerQuery = `&boiler=${encodedBoilerQuery}`
      const partsQuery = `&parts=${encodedPartsQuery}`

      const initialPage = currentPage > 0 ? 0 : currentPage

      if (
        boilersCheckedTitles.length &&
        partsCheckedTitles.length &&
        isPriceRangeChanged
      ) {
        router.push(
          {
            query: {
              ...router.query,
              boiler: encodedBoilerQuery,
              parts: encodedPartsQuery,
              priceFrom,
              priceTo,
              offset: initialPage + 1,
            },
          },
          undefined,
          { shallow: true }
        )

        const data = await getBoilerPartsFx(
          `/boiler-parts?limit=20&offset=${initialPage}${priceQuery}${boilerQuery}${partsQuery}`
        )

        setFilteredBoilerParts(data)

        return
      }

      if (isPriceRangeChanged) {
        router.push(
          {
            query: {
              ...router.query,
              priceFrom,
              priceTo,
              offset: initialPage + 1,
            },
          },
          undefined,
          { shallow: true }
        )
        const data = await getBoilerPartsFx(
          `/boiler-parts?limit=20&offset=${initialPage}${priceQuery}`
        )

        setFilteredBoilerParts(data)
      }

      if (boilersCheckedTitles.length && partsCheckedTitles.length) {
        router.push(
          {
            query: {
              ...router.query,
              boiler: encodedBoilerQuery,
              parts: encodedPartsQuery,
              offset: initialPage + 1,
            },
          },
          undefined,
          { shallow: true }
        )
        const data = await getBoilerPartsFx(
          `/boiler-parts?limit=20&offset=${initialPage}${boilerQuery}${partsQuery}`
        )

        setFilteredBoilerParts(data)
        return
      }

      if (boilersCheckedTitles.length) {
        router.push(
          {
            query: {
              ...router.query,
              boiler: encodedBoilerQuery,
              offset: initialPage + 1,
            },
          },
          undefined,
          { shallow: true }
        )
        const data = await getBoilerPartsFx(
          `/boiler-parts?limit=20&offset=${initialPage}${boilerQuery}`
        )

        setFilteredBoilerParts(data)
      }

      if (partsCheckedTitles.length) {
        router.push(
          {
            query: {
              ...router.query,
              parts: encodedPartsQuery,
              offset: initialPage + 1,
            },
          },
          undefined,
          { shallow: true }
        )
        const data = await getBoilerPartsFx(
          `/boiler-parts?limit=20&offset=${initialPage}${partsQuery}`
        )

        setFilteredBoilerParts(data)
      }

      if (boilersCheckedTitles.length && isPriceRangeChanged) {
        router.push(
          {
            query: {
              ...router.query,
              priceFrom,
              priceTo,
              boilers: encodedBoilerQuery,
              offset: initialPage + 1,
            },
          },
          undefined,
          { shallow: true }
        )
        const data = await getBoilerPartsFx(
          `/boiler-parts?limit=20&offset=${initialPage}${boilerQuery}${priceQuery}`
        )

        setFilteredBoilerParts(data)
      }

      if (partsCheckedTitles.length && isPriceRangeChanged) {
        router.push(
          {
            query: {
              ...router.query,
              priceFrom,
              priceTo,
              parts: encodedPartsQuery,
              offset: initialPage + 1,
            },
          },
          undefined,
          { shallow: true }
        )
        const data = await getBoilerPartsFx(
          `/boiler-parts?limit=20&offset=${initialPage}${partsQuery}${priceQuery}`
        )

        setFilteredBoilerParts(data)
      }
    } catch (err) {
      toast.error((err as Error).message)
    } finally {
      setSpinner(false)
    }
  }

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
          resetFilters={resetFilters}
          applyFilters={applyFilters}
        />
      )}
    </>
  )
}
export default CatalogFilters
