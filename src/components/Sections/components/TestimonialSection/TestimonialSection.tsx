import Image from 'next/image';
import { FC } from 'react';
import styles from './TestimonialSection.module.scss';
import { SectionProps } from '../types';
import quotationMark from './quotation-mark.svg';

export const TestimonialSection: FC<SectionProps> = ({ sectionData }) => {
  const { author, text } = sectionData;

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <Image
          className={styles.quotationMark}
          src={quotationMark}
          width={40}
          height={40}
          alt="Quotation Mark"
        />
        <div className={styles.text}>{text}</div>
        <div className={styles.author}>{author}</div>
      </div>
    </div>
  );
};
