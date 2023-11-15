/* eslint-disable @next/next/no-img-element */
import { useEffect } from 'react'
import { useStore } from 'effector-react'
import Slider from 'react-slick'

import { useMediaQuery } from '@/hooks/useMediaQuery'
import { $mode } from '@/context/mode'

import styles from '@/styles/dashboard/index.module.scss'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

const BrandsSlider = () => {
  const isMedia768 = useMediaQuery(768)
  const mode = useStore($mode)
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''

  const brands = [
    {
      id: 1,
      img: 'img/brand-1.png',
      alt: 'Arderia brand',
    },
    {
      id: 2,
      img: 'img/brand-2.svg',
      alt: 'BaltGaz brand',
    },
    {
      id: 3,
      img: 'img/brand-3.png',
      alt: 'Buderus brand',
    },
    {
      id: 4,
      img: 'img/brand-4.png',
      alt: 'Bosch brand',
    },
    {
      id: 5,
      img: 'img/brand-5.png',
      alt: 'Duca brand',
    },
    {
      id: 6,
      img: 'img/brand-6.png',
      alt: 'Wilo brand',
    },
    {
      id: 7,
      img: 'img/brand-7.png',
      alt: 'Fime brand',
    },
    {
      id: 8,
      img: 'img/brand-8.png',
      alt: 'Sit brand',
    },
    {
      id: 9,
      img: 'img/brand-9.png',
      alt: 'Dixis brand',
    },
    {
      id: 10,
      img: 'img/brand-10.png',
      alt: 'Esbe brand',
    },
    {
      id: 11,
      img: 'img/brand-11.png',
      alt: 'Honeywell brand',
    },
    {
      id: 12,
      img: 'img/brand-12.png',
      alt: 'Swep brand',
    },
  ]

  useEffect(() => {
    const slider = document.querySelector(
      `.${styles.dashboard__brands__slider}`
    )
    const sliderList = slider?.querySelector('.slick-list') as HTMLElement

    sliderList.style.height = isMedia768 ? '60px' : '80px'
  }, [isMedia768])

  const sliderSettings = {
    dots: false,
    infinite: true,
    slidesToScroll: 1,
    variableWidth: true,
    autoplay: true,
    speed: 500,
  }

  return (
    <Slider {...sliderSettings} className={styles.dashboard__brands__slider}>
      {brands.map((brand) => (
        <div
          key={brand.id}
          className={`${styles.dashboard__brands__slide} ${darkModeClass}`}
          style={{ width: isMedia768 ? '124px' : '180px' }}
        >
          <img src={brand.img} alt={brand.alt} />
        </div>
      ))}
    </Slider>
  )
}
export default BrandsSlider
