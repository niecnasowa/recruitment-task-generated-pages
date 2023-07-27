import { SectionType } from '@/types';
import { PagePage } from '@/types/Api';
import { FC } from 'react';
import {
  HeroSection,
  TestimonialSection,
  NewsletterSection,
  AuthorSection,
} from './components';

type SectionComponent = {
  [key in SectionType]: FC;
};

const SECTION_COMPONENT: SectionComponent = {
  hero: HeroSection,
  testimonial: TestimonialSection,
  newsletter: NewsletterSection,
  author: AuthorSection,
};

interface SectionsProps {
  pageData: PagePage;
}

export const Sections: FC<SectionsProps> = ({ pageData }) => {
  const { sections } = pageData;

  return (
    <>
      {sections.map((section) => {
        const { type } = section;
        const SectionComponent = SECTION_COMPONENT[type];

        return <SectionComponent key={type} sectionData={section} />;
      })}
    </>
  );
};
