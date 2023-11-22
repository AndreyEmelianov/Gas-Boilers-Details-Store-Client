import { useMediaQuery } from '@/hooks/useMediaQuery'
import CatalogFiltersDesktop from './CatalogFiltersDesktop'

const CatalogFilters = () => {
  const isMobile820 = useMediaQuery(820)

  return <>{isMobile820 ? <div>моб</div> : <CatalogFiltersDesktop />}</>
}
export default CatalogFilters
