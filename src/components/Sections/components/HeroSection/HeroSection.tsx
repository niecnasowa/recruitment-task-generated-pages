import { FC } from 'react';
import styles from './HeroSection.module.scss';
import { SectionProps } from '../types';

export const HeroSection: FC<SectionProps> = ({ sectionData }) => {
  const { img, text } = sectionData;

  return (
    <div className={styles.container}>
      <div className={styles.text}>{text}</div>
      <div
        className={styles.image}
        style={{ backgroundImage: `url("${img}")` }}
      />
    </div>
  );
};
