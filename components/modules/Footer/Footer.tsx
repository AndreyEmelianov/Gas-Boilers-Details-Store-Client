/* eslint-disable @next/next/no-img-element */
import Link from 'next/link'

import OnlineStoreContent from './OnlineStoreContent'
import ContentOfCompany from './ContentOfCompany'
import Accordion from '@/components/elements/Accordion/Accordion'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import FooterLogo from './FooterLogo'
import MailSvg from '@/components/elements/MailSvg/MailSvg'
import PhoneSvg from '@/components/elements/PhoneSvg/PhoneSvg'
import MarkerSvg from '@/components/elements/MarkerSvg/MarkerSvg'

import styles from '@/styles/footer/index.module.scss'

const Footer = () => {
  const isMedia750 = useMediaQuery(750)
  const isMedia500 = useMediaQuery(500)

  return (
    <footer className={styles.footer}>
      <div className={styles.footer__container}>
        <div className={styles.footer__top}>
          {!isMedia750 && <FooterLogo />}
          <div className={styles.footer__top__inner}>
            <div className={styles.footer__top__item}>
              {!isMedia500 && (
                <>
                  <h3 className={styles.footer__top__item__title}>
                    Интернет-магазин
                  </h3>
                  <OnlineStoreContent />
                </>
              )}
              {isMedia500 && (
                <Accordion
                  title="Интернет-магазин"
                  titleClass={styles.footer__top__item__title}
                  openArrowClass={styles.open}
                >
                  <OnlineStoreContent />
                  <div style={{ height: '17px' }} />
                </Accordion>
              )}
            </div>
            <div className={styles.footer__top__item}>
              {!isMedia500 && (
                <>
                  <h3 className={styles.footer__top__item__title}>Компания</h3>
                  <ContentOfCompany />
                </>
              )}
              {isMedia500 && (
                <Accordion
                  title="Компания"
                  titleClass={styles.footer__top__item__title}
                  openArrowClass={styles.open}
                >
                  <ContentOfCompany />
                  <div style={{ height: '17px' }} />
                </Accordion>
              )}
            </div>
          </div>
          <div className={styles.footer__top__item}>
            <h3 className={styles.footer__top__item__title}>Контакты</h3>
            <ul
              className={`${styles.footer__top__item__list} ${styles.footer__top__item__contacts}`}
            >
              <li className={`${styles.footer__top__item__list__item}`}>
                <Link href="/contacts" passHref legacyBehavior>
                  <a
                    className={`${styles.footer__top__item__list__item__link}`}
                  >
                    <span>Наш адрес:</span>
                    <span>г. Москва, ул. ... д....</span>
                    <span>
                      <MarkerSvg />
                    </span>
                  </a>
                </Link>
              </li>
              <li className={`${styles.footer__top__item__list__item}`}>
                <a
                  href="mailto:info@gasboilers.com.ru"
                  className={`${styles.footer__top__item__list__item__link}`}
                >
                  <span>E-mail:</span>
                  <span>info@gasboilers.com.ru</span>
                  <span>
                    <MailSvg />
                  </span>
                </a>
              </li>
              <li className={`${styles.footer__top__item__list__item}`}>
                <a
                  href="tel:+789053333333"
                  className={`${styles.footer__top__item__list__item__link}`}
                >
                  <span>Наш контактный телефон:</span>
                  <span>+7(8905) 333-33-33</span>
                  <span>
                    <PhoneSvg />
                  </span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className={styles.footer__bottom}>
          <div className={styles.footer__bottom__block}>
            <div className={styles.footer__bottom__block__left}>
              <h3 className={styles.footer__bottom__block__title}>
                Мы принимаем к оплате:
              </h3>
              <ul className={styles.footer__bottom__block__pay}>
                <li className={styles.footer__bottom__block__pay__item}>
                  <img src="/img/gpay.png" alt="google-pay" />
                </li>
                <li className={styles.footer__bottom__block__pay__item}>
                  <img src="/img/pay.png" alt="apple-pay" />
                </li>
                <li className={styles.footer__bottom__block__pay__item}>
                  <img src="/img/visa.png" alt="visa card" />
                </li>
                <li className={styles.footer__bottom__block__pay__item}>
                  <img src="/img/master-card.png" alt="master card" />
                </li>
              </ul>
            </div>

            <div className={styles.footer__bottom__block__right}>
              <h3 className={styles.footer__bottom__block__title}>
                Наши соцсети:
              </h3>
              <ul className={styles.footer__bottom__block__social}>
                <li className={styles.footer__bottom__block__social__item}>
                  <a
                    className={styles.footer__bottom__block__social__item_vk}
                    href="#"
                  />
                </li>
                <li className={styles.footer__bottom__block__social__item}>
                  <a
                    className={styles.footer__bottom__block__social__item_fb}
                    href="#"
                  />
                </li>
                <li className={styles.footer__bottom__block__social__item}>
                  <a
                    className={styles.footer__bottom__block__social__item_inst}
                    href="#"
                  />
                </li>
                <li className={styles.footer__bottom__block__social__item}>
                  <a
                    className={styles.footer__bottom__block__social__item_ytb}
                    href="#"
                  />
                </li>
              </ul>
            </div>
          </div>
          {isMedia750 && <FooterLogo />}
          <div className={styles.footer__bottom__block}>
            <p className={styles.footer__bottom__block__copyright}>
              © «Детали для газовых котлов» 2023
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
