import { useMediaQuery } from '@/hooks/useMediaQuery'

const CatalogFilters = () => {
  const isMobile820 = useMediaQuery(820)

  return <>{isMobile820 ? <div>моб</div> : <div>деск</div>}</>
}
export default CatalogFilters
