/* eslint-disable indent */
/* eslint-disable @next/next/no-img-element */
import { useEffect } from 'react'
import { useStore } from 'effector-react'
import Slider from 'react-slick'
import Link from 'next/link'

import { $mode } from '@/context/mode'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { IDashboardSliderProps } from '@/types/dashboard'
import { formatPrice } from '@/utils/common'

import styles from '@/styles/dashboard/index.module.scss'
import skeletonStyles from '@/styles/skeleton/index.module.scss'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

const DashboardSlider = ({
  items,
  spinner,
  goToPartPage,
}: IDashboardSliderProps) => {
  const isMedia1366 = useMediaQuery(1366)
  const isMedia800 = useMediaQuery(800)
  const isMedia768 = useMediaQuery(768)
  const isMedia560 = useMediaQuery(560)
  const mode = useStore($mode)
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''

  useEffect(() => {
    const slider = document.querySelectorAll(`.${styles.dashboard__slider}`)

    slider.forEach((item) => {
      const sliderList = item.querySelector('.slick-list') as HTMLElement

      sliderList.style.height = isMedia560 ? '276px' : '390px'
      sliderList.style.padding = '0 5px'
      sliderList.style.marginRight = isMedia560
        ? '-8px'
        : isMedia800
        ? '-15px'
        : '0'
    })
  }, [isMedia560, isMedia800])

  const sliderSettings = {
    dots: false,
    infinite: true,
    variableWidth: true,
    autoplay: true,
    speed: 500,
    arrows: false,
    slidesToScroll: isMedia768 ? 1 : 2,
  }

  const width = {
    width: isMedia1366 ? (isMedia800 ? (isMedia560 ? 160 : 252) : 317) : 344,
  }

  return (
    <Slider {...sliderSettings} className={styles.dashboard__slider}>
      {spinner ? (
        [...Array(8)].map((_, index) => (
          <div
            key={index}
            className={`${skeletonStyles.skeleton__item} ${
              mode === 'dark' ? `${skeletonStyles.dark_mode}` : ''
            }`}
            style={width}
          >
            <div className={skeletonStyles.skeleton__item__light} />
          </div>
        ))
      ) : items.length ? (
        items.map((item) => (
          <div
            key={item.id}
            style={width}
            className={`${styles.dashboard__slide} ${darkModeClass}`}
          >
            <img src={JSON.parse(item.images)[0]} alt={item.product_name} />
            <div className={`${styles.dashboard__slide__inner}`}>
              <Link
                href={goToPartPage ? `/catalog/${item.id}` : '/catalog'}
                passHref
                legacyBehavior
              >
                <a>
                  <h3 className={`${styles.dashboard__slide__title}`}>
                    {item.product_name}
                  </h3>
                </a>
              </Link>
              <span className={`${styles.dashboard__slide__code}`}>
                Артикул: {item.vendor_code}
              </span>
              <span className={`${styles.dashboard__slide__price}`}>
                {formatPrice(item.product_price)} P
              </span>
            </div>
          </div>
        ))
      ) : (
        <span>Список товаров пуст ...</span>
      )}
    </Slider>
  )
}
export default DashboardSlider
