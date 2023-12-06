import Head from 'next/head'

import Layout from '@/components/layout/Layout'
import DashboardPage from '@/components/templates/DashboardPage/DashboardPage'
import useRedirectByUserCheck from '@/hooks/useRedirectByUserCheck'
import Breadcrumbs from '@/components/modules/Breadcrumbs/Breadcrumbs'

function Dashboard() {
  const { shouldLoadContent } = useRedirectByUserCheck()

  const getDefaultTextGenerator = () => ''
  const getTextGenerator = () => ''

  return (
    <>
      <Head>
        <title>Boilers House | {shouldLoadContent ? 'Главная' : ''}</title>
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
      {shouldLoadContent && (
        <Layout>
          <main>
            <Breadcrumbs
              getDefaultTextGenerator={getDefaultTextGenerator}
              getTextGenerator={getTextGenerator}
            />
            <DashboardPage />
            <div className="overlay" />
          </main>
        </Layout>
      )}
    </>
  )
}

export default Dashboard
