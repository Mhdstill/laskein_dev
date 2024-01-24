import Dashboard from 'components/pages/dashboard/Dashboard';
import type { NextPage } from 'next';
import Head from 'next/head';
import MainLayout from '../layouts/main';

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>LasKein</title>
        <meta name="description" content="Laskein project" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
      </Head>
      <MainLayout>
        <Dashboard />
      </MainLayout>
    </>
  );
};

export default Home;
