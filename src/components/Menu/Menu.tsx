import { PagesPage } from '@/types';
import Image from 'next/image';
import { FC } from 'react';
import logo from './logo.svg';
import styles from './Menu.module.scss';

interface PageTitle {
  [key: string]: string;
}

const PAGE_TITLE: PageTitle = {
  '/': 'Home',
  '/solutions': 'Solutions',
  '/about': 'About',
};

const getPageTitle = (url: string) => {
  return PAGE_TITLE[url] || PAGE_TITLE['/'];
};

interface MenuProps {
  pagesData: PagesPage[];
  currentPage: PagesPage;
}

// Could also add highlighting about current page
export const Menu: FC<MenuProps> = ({ pagesData, currentPage }) => {
  return (
    <nav className={styles.navigation}>
      <div className={styles.logoButtonsColumn}>
        <Image
          className={styles.logo}
          src={logo}
          width={90}
          height={32}
          alt="Logo breally"
        />
        <ul className={styles.menuItems}>
          {pagesData.map(({ id, url }) => (
            <li key={id}>
              <a href={url} className={styles.menuItem}>
                {getPageTitle(url)}
              </a>
            </li>
          ))}
        </ul>
      </div>

      <a href="#" className={styles.contact}>
        Contact us
      </a>
    </nav>
  );
};
