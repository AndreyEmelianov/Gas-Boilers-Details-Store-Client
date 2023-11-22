import { useStore } from 'effector-react'

import { $mode } from '@/context/mode'

const CatalogFiltersDesktop = () => {
  const mode = useStore($mode)
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''

  return <div>CatalogFiltersDesktop</div>
}
export default CatalogFiltersDesktop
