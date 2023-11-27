/* eslint-disable @next/next/no-img-element */
import Slider from 'react-slick'

import { useMediaQuery } from '@/hooks/useMediaQuery'

import styles from '@/styles/product/index.module.scss'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

const ProductSlider = ({ images }: { images: string[] }) => {
  const isMobile700 = useMediaQuery(700)
  const isMobile530 = useMediaQuery(530)

  const sliderSettings = {
    dots: false,
    infinite: true,
    variableWidth: true,
    autoplay: true,
    speed: 500,
    arrows: false,
    slidesToScroll: 1,
  }

  return (
    <Slider {...sliderSettings} className={styles.part__slider}>
      {images.map((src, index) => (
        <div
          key={index}
          className={styles.part__slide}
          style={{ width: isMobile530 ? 228 : isMobile700 ? 350 : 593 }}
        >
          <img src={src} alt={`image-${index + 1}`} />
        </div>
      ))}
    </Slider>
  )
}
export default ProductSlider
