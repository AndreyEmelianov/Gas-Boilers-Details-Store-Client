import Head from 'next/head'

import Layout from '@/components/layout/Layout'

function Dashboard() {
  return (
    <>
      <Head>
        <title>Boilers House</title>
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
      <Layout>
        <main>
          <h1>dashboard</h1>
          <div className="overlay" />
        </main>
      </Layout>
    </>
  )
}

export default Dashboard
