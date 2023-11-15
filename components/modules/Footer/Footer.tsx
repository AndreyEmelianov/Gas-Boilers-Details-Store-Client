import FooterLogo from './FooterLogo'
import styles from '@/styles/footer/index.module.scss'
import OnlineStoreContent from './OnlineStoreContent'
import ContentOfCompany from './ContentOfCompany'
import MarkerSvg from '@/components/elements/MarkerSvg/MarkerSvg'
import Link from 'next/link'
import PhoneSvg from '@/components/elements/PhoneSvg/PhoneSvg'
import MailSvg from '@/components/elements/MailSvg/MailSvg'

const Footer = () => {
  console.log('')
  return (
    <footer className={styles.footer}>
      <div className={styles.footer__container}>
        <div className={styles.footer__top}>
          <FooterLogo />
          <div className={styles.footer__inner}>
            <div className={styles.footer__top__item}>
              <h3 className={styles.footer__top__item__title}>
                Интернет-магазин
              </h3>
              <OnlineStoreContent />
            </div>
            <div className={styles.footer__top__item}>
              <h3 className={styles.footer__top__item__title}>Компания</h3>
              <ContentOfCompany />
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
        </div>
        <div className={styles.footer__bottom} />
      </div>
    </footer>
  )
}

export default Footer
