import content from './visas.json';

export interface VisaRate {
  amount: number;
  label?: string;
}

interface ChecklistSection {
  title: string;
  docs?: string[];
  profiles?: Record<string, string[]>;
}

interface VisaGuide {
  name: string;
  aliases?: string;
  type: string;
  intro: string;
  rates: VisaRate[];
  rateCaption?: string;
  rateNote?: string;
  timing?: string;
  sections: ChecklistSection[];
  sources: { label: string; url: string }[];
  related?: string[];
}

export const guides: Record<string, VisaGuide> = content;
export const reviewDate = '2026-11-23';
export const reviewLabel = '23 November 2026';
