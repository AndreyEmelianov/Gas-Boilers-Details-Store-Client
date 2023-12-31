/* eslint-disable @next/next/no-img-element */
import { useState } from 'react'
import { useStore } from 'effector-react'
import { motion } from 'framer-motion'

import { $mode } from '@/context/mode'
import { $boilerPart } from '@/context/boilerPart'

import styles from '@/styles/product/index.module.scss'

const ProductTabs = () => {
  const [showDescription, setShowDescription] = useState(true)
  const [showCompatibility, setShowCompatibility] = useState(false)

  const boilerPart = useStore($boilerPart)
  const mode = useStore($mode)
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''

  const handleShowDescription = () => {
    setShowDescription(true)
    setShowCompatibility(false)
  }

  const handleShowCompatibility = () => {
    setShowDescription(false)
    setShowCompatibility(true)
  }

  return (
    <div className={`${styles.part__tabs}`}>
      <div className={`${styles.part__tabs__controls} ${darkModeClass}`}>
        <button
          className={showDescription ? styles.active : ''}
          onClick={handleShowDescription}
        >
          Описание
        </button>
        <button
          className={showCompatibility ? styles.active : ''}
          onClick={handleShowCompatibility}
        >
          Совместимость
        </button>
        {showDescription && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={styles.part__tabs__content}
          >
            <h3
              className={`${styles.part__tabs__content__title} ${darkModeClass}`}
            >
              {boilerPart.product_name}
            </h3>
            <p
              className={`${styles.part__tabs__content__text} ${darkModeClass}`}
            >
              {boilerPart.product_description}
            </p>
          </motion.div>
        )}

        {showCompatibility && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={styles.part__tabs__content}
          >
            <p
              className={`${styles.part__tabs__content__text} ${darkModeClass}`}
            >
              {boilerPart.compatibility}
            </p>
          </motion.div>
        )}
      </div>
    </div>
  )
}
export default ProductTabs
