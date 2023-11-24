import { useEffect, useState } from 'react'
import { useStore } from 'effector-react'
import { toast } from 'react-toastify'
import { useRouter } from 'next/router'

import { useMediaQuery } from '@/hooks/useMediaQuery'
import CatalogFiltersDesktop from './CatalogFiltersDesktop'
import { ICatalogFiltersProps } from '@/types/catalog'
import {
  $boilerManufacturers,
  $partsManufacturers,
  setBoilerManufacturersFromQuery,
  setFilteredBoilerParts,
  setPartsManufacturersFromQuery,
} from '@/context/boilerParts'
import { getBoilerPartsFx } from '@/api/boilerParts/boilerParts'
import { getQueryParamOnFirstRender } from '@/utils/common'

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

  useEffect(() => {
    applyFiltersFromQuery()
  }, [])

  const applyFiltersFromQuery = async () => {
    try {
      const priceFromQueryValue = getQueryParamOnFirstRender(
        'priceFrom',
        router
      )
      const priceToQueryValue = getQueryParamOnFirstRender('priceTo', router)
      const boilerQueryValue = JSON.parse(
        decodeURIComponent(
          getQueryParamOnFirstRender('boiler', router) as string
        )
      )
      const partsQueryValue = JSON.parse(
        decodeURIComponent(
          getQueryParamOnFirstRender('parts', router) as string
        )
      )

      const isValidBoilerQuery =
        Array.isArray(boilerQueryValue) && !!boilerQueryValue?.length
      const isValidPartsQuery =
        Array.isArray(partsQueryValue) && !!partsQueryValue?.length

      const boilerQuery = `&boiler=${getQueryParamOnFirstRender(
        'boiler',
        router
      )}`
      const partsQuery = `&parts=${getQueryParamOnFirstRender('parts', router)}`
      const priceQuery = `&priceFrom=${priceFromQueryValue}&priceTo=${priceToQueryValue}`

      if (
        isValidBoilerQuery &&
        isValidPartsQuery &&
        priceFromQueryValue &&
        priceToQueryValue
      ) {
        updateParamsAndFiltersFromQuery(() => {
          updatePriceFromQuery(+priceFromQueryValue, +priceToQueryValue)
          setBoilerManufacturersFromQuery(boilerQueryValue)
          setPartsManufacturersFromQuery(partsQueryValue)
        }, `${currentPage}${priceQuery}${boilerQuery}${partsQuery}`)
        return
      }

      if (priceFromQueryValue && priceToQueryValue) {
        updateParamsAndFiltersFromQuery(() => {
          updatePriceFromQuery(+priceFromQueryValue, +priceToQueryValue)
        }, `${currentPage}${priceQuery}`)
      }

      if (isValidBoilerQuery && isValidPartsQuery) {
        updateParamsAndFiltersFromQuery(() => {
          setIsFilterInQuery(true)
          setBoilerManufacturersFromQuery(boilerQueryValue)
          setPartsManufacturersFromQuery(partsQueryValue)
        }, `${currentPage}${boilerQuery}${partsQuery}`)
        return
      }

      if (isValidBoilerQuery) {
        updateParamsAndFiltersFromQuery(() => {
          setIsFilterInQuery(true)
          setBoilerManufacturersFromQuery(boilerQueryValue)
        }, `${currentPage}${boilerQuery}`)
      }

      if (isValidPartsQuery) {
        updateParamsAndFiltersFromQuery(() => {
          setIsFilterInQuery(true)
          setPartsManufacturersFromQuery(partsQueryValue)
        }, `${currentPage}${partsQuery}`)
      }

      if (isValidPartsQuery && priceFromQueryValue && priceToQueryValue) {
        updateParamsAndFiltersFromQuery(() => {
          updatePriceFromQuery(+priceFromQueryValue, +priceToQueryValue)
          setPartsManufacturersFromQuery(partsQueryValue)
        }, `${currentPage}${priceQuery}${partsQuery}`)
      }

      if (isValidBoilerQuery && priceFromQueryValue && priceToQueryValue) {
        updateParamsAndFiltersFromQuery(() => {
          updatePriceFromQuery(+priceFromQueryValue, +priceToQueryValue)
          setBoilerManufacturersFromQuery(boilerQueryValue)
        }, `${currentPage}${priceQuery}${boilerQuery}`)
      }
    } catch (err) {
      toast.error((err as Error).message)
    }
  }

  const updatePriceFromQuery = (priceFrom: number, priceTo: number) => {
    setIsFilterInQuery(true)
    setPriceRange([+priceFrom, +priceTo])
    setIsPriceRangeChanged(true)
  }

  const updateParamsAndFiltersFromQuery = async (
    callback: VoidFunction,
    path: string
  ) => {
    callback()

    const data = await getBoilerPartsFx(`/boiler-parts?limit=20&offset=${path}`)

    setFilteredBoilerParts(data)
  }

  async function updateParamsAndFilters<T>(updateParams: T, path: string) {
    const params = router.query

    delete params.boiler
    delete params.parts
    delete params.priceFrom
    delete params.priceTo

    router.push(
      {
        query: {
          ...params,
          ...updateParams,
        },
      },
      undefined,
      { shallow: true }
    )

    const data = await getBoilerPartsFx(`/boiler-parts?limit=20&offset=${path}`)

    setFilteredBoilerParts(data)
  }

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
        updateParamsAndFilters(
          {
            boiler: encodedBoilerQuery,
            parts: encodedPartsQuery,
            priceFrom,
            priceTo,
            offset: initialPage + 1,
          },
          `${initialPage}${priceQuery}${boilerQuery}${partsQuery}`
        )
        // router.push(
        //   {
        //     query: {
        //       ...router.query,
        //       boiler: encodedBoilerQuery,
        //       parts: encodedPartsQuery,
        //       priceFrom,
        //       priceTo,
        //       offset: initialPage + 1,
        //     },
        //   },
        //   undefined,
        //   { shallow: true }
        // )

        // const data = await getBoilerPartsFx(
        //   `/boiler-parts?limit=20&offset=${initialPage}${priceQuery}${boilerQuery}${partsQuery}`
        // )

        // setFilteredBoilerParts(data)

        return
      }

      if (isPriceRangeChanged) {
        updateParamsAndFilters(
          {
            priceFrom,
            priceTo,
            offset: initialPage + 1,
          },
          `${initialPage}${priceQuery}`
        )
        // router.push(
        //   {
        //     query: {
        //       ...router.query,
        //       priceFrom,
        //       priceTo,
        //       offset: initialPage + 1,
        //     },
        //   },
        //   undefined,
        //   { shallow: true }
        // )
        // const data = await getBoilerPartsFx(
        //   `/boiler-parts?limit=20&offset=${initialPage}${priceQuery}`
        // )

        // setFilteredBoilerParts(data)
      }

      if (boilersCheckedTitles.length && partsCheckedTitles.length) {
        updateParamsAndFilters(
          {
            boiler: encodedBoilerQuery,
            parts: encodedPartsQuery,
            offset: initialPage + 1,
          },
          `${initialPage}${boilerQuery}${partsQuery}`
        )
        // router.push(
        //   {
        //     query: {
        //       ...router.query,
        //       boiler: encodedBoilerQuery,
        //       parts: encodedPartsQuery,
        //       offset: initialPage + 1,
        //     },
        //   },
        //   undefined,
        //   { shallow: true }
        // )
        // const data = await getBoilerPartsFx(
        //   `/boiler-parts?limit=20&offset=${initialPage}${boilerQuery}${partsQuery}`
        // )

        // setFilteredBoilerParts(data)
        return
      }

      if (boilersCheckedTitles.length) {
        updateParamsAndFilters(
          {
            boiler: encodedBoilerQuery,
            offset: initialPage + 1,
          },
          `${initialPage}${boilerQuery}`
        )
        // router.push(
        //   {
        //     query: {
        //       ...router.query,
        //       boiler: encodedBoilerQuery,
        //       offset: initialPage + 1,
        //     },
        //   },
        //   undefined,
        //   { shallow: true }
        // )
        // const data = await getBoilerPartsFx(
        //   `/boiler-parts?limit=20&offset=${initialPage}${boilerQuery}`
        // )

        // setFilteredBoilerParts(data)
      }

      if (partsCheckedTitles.length) {
        updateParamsAndFilters(
          {
            parts: encodedPartsQuery,
            offset: initialPage + 1,
          },
          `${initialPage}${partsQuery}`
        )
        // router.push(
        //   {
        //     query: {
        //       ...router.query,
        //       parts: encodedPartsQuery,
        //       offset: initialPage + 1,
        //     },
        //   },
        //   undefined,
        //   { shallow: true }
        // )
        // const data = await getBoilerPartsFx(
        //   `/boiler-parts?limit=20&offset=${initialPage}${partsQuery}`
        // )

        // setFilteredBoilerParts(data)
      }

      if (boilersCheckedTitles.length && isPriceRangeChanged) {
        updateParamsAndFilters(
          {
            priceFrom,
            priceTo,
            boiler: encodedBoilerQuery,
            offset: initialPage + 1,
          },
          `${initialPage}${boilerQuery}${priceQuery}`
        )
        // router.push(
        //   {
        //     query: {
        //       ...router.query,
        //       priceFrom,
        //       priceTo,
        //       boiler: encodedBoilerQuery,
        //       offset: initialPage + 1,
        //     },
        //   },
        //   undefined,
        //   { shallow: true }
        // )
        // const data = await getBoilerPartsFx(
        //   `/boiler-parts?limit=20&offset=${initialPage}${boilerQuery}${priceQuery}`
        // )

        // setFilteredBoilerParts(data)
      }

      if (partsCheckedTitles.length && isPriceRangeChanged) {
        updateParamsAndFilters(
          {
            priceFrom,
            priceTo,
            parts: encodedPartsQuery,
            offset: initialPage + 1,
          },
          `${initialPage}${partsQuery}${priceQuery}`
        )
        // router.push(
        //   {
        //     query: {
        //       ...router.query,
        //       priceFrom,
        //       priceTo,
        //       parts: encodedPartsQuery,
        //       offset: initialPage + 1,
        //     },
        //   },
        //   undefined,
        //   { shallow: true }
        // )
        // const data = await getBoilerPartsFx(
        //   `/boiler-parts?limit=20&offset=${initialPage}${partsQuery}${priceQuery}`
        // )

        // setFilteredBoilerParts(data)
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
