import Head from 'next/head'

import AuthPage from '@/components/templates/AuthPage/AuthPage'
import useRedirectByUserCheck from '@/hooks/useRedirectByUserCheck'

function Auth() {
  const { shouldLoadContent } = useRedirectByUserCheck(true)
  return (
    <>
      <Head>
        <title>Boilers House | {shouldLoadContent ? 'Авторизация' : ''}</title>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/img/logo-fav.png"
        />
      </Head>
      {shouldLoadContent && <AuthPage />}
    </>
  )
}

export default Auth
