import axios from 'axios';
import { GetStaticProps } from 'next';
import Head from 'next/head';
import { Inter } from 'next/font/google';
import { FC } from 'react';
import { Menu, Sections } from '@/components';
import { PagePage, PagesPage } from '@/types';

const inter = Inter({ subsets: ['latin'] });

interface HomeProps {
  pagesData: PagesPage[];
  currentPage: PagesPage;
  currentPageData: PagePage;
}

const Home: FC<HomeProps> = ({ pagesData, currentPage, currentPageData }) => {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={inter.className}>
        <Menu pagesData={pagesData} currentPage={currentPage} />
        <Sections pageData={currentPageData} />
      </div>
    </>
  );
};

export default Home;

const { NEXT_PUBLIC_API_URL, API_LOGIN, API_PASSWORD } = process.env;

export const getStaticProps: GetStaticProps = async () => {
  if (!API_LOGIN || !API_PASSWORD) {
    throw new Error('No login credentials for API');
  }

  // I don't add try catch here, if there is problem with getting data for CMS, it is good to break pipeline and stop building process
  // Based on this data can easily created pages using getStaticPaths
  const { data: pagesData } = await axios.get<PagesPage[]>(
    `${NEXT_PUBLIC_API_URL}/pages`,
    {
      auth: {
        username: API_LOGIN,
        password: API_PASSWORD,
      },
    }
  );

  if (!pagesData) {
    throw new Error(`Can't get correct pages data from api`);
  }

  // AS requested in this task, this time only home page should be build,
  // but in future all pages should be build using getStaticPaths, in getStaticPath, when using getStaticPaths
  // and injecting paths to next.js could also match page id with path
  // but because this functionality is not needed now, can just hardcode it :P
  const currentPath = '/';

  const currentPage = pagesData.find(({ url }) => url === currentPath);

  if (!currentPage) {
    throw new Error(`Can't find current page in api response`);
  }

  // Finally get all data needed to use for current page
  const { data: currentPageData } = await axios.get<PagePage>(
    `${NEXT_PUBLIC_API_URL}/page/${currentPage.id}`,
    {
      auth: {
        username: API_LOGIN,
        password: API_PASSWORD,
      },
    }
  );

  if (!currentPageData) {
    throw new Error(`Can't get correct page data from api`);
  }

  return { props: { pagesData, currentPage, currentPageData } };
};
