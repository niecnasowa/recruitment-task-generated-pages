import { SectionType } from './Section';

export interface PagesPage {
  url: string;
  id: string;
}

export interface PagePageSection {
  type: SectionType;
  text: string | undefined;
  img: string | undefined;
  author: string | undefined;
}

export interface PagePage {
  url: string;
  id: string;
  sections: PagePageSection[];
}
