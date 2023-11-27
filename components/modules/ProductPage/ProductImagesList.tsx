/* eslint-disable @next/next/no-img-element */
import { useStore } from 'effector-react'
import { useState } from 'react'

import { $boilerPart } from '@/context/boilerPart'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import ProductImagesItem from './ProductImagesItem'
import ProductSlider from './ProductSlider'

import styles from '@/styles/product/index.module.scss'

const ProductImagesList = () => {
  const [currentImageSrc, setCurrentImageSrc] = useState('')

  const boilerPart = useStore($boilerPart)
  const images = boilerPart.images
    ? (JSON.parse(boilerPart.images) as string[])
    : []

  const isMobile850 = useMediaQuery(850)

  return (
    <div className={styles.part__images}>
      {isMobile850 ? (
        <ProductSlider images={images} />
      ) : (
        <>
          <div className={styles.part__images__main}>
            <img
              src={currentImageSrc || images[0]}
              alt={boilerPart.product_name}
            />
          </div>
          <ul className={styles.part__images__list}>
            {images.map((item, index) => (
              <ProductImagesItem
                key={index}
                alt={`image-${index + 1}`}
                src={item}
                callback={setCurrentImageSrc}
              />
            ))}
          </ul>
        </>
      )}
    </div>
  )
}
export default ProductImagesList
