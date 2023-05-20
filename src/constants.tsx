export type Tutor = {
  name: string;
  voice: string;
  ssmlGender: string;
  languageName: string;
};

export const TUTORS = [
  {
    name: 'Emily',
    voice: 'en-US',
    ssmlGender: 'FEMALE',
    languageName: 'en-US-Studio-O',
  },
  {
    name: 'Beatrice',
    voice: 'it-IT',
    ssmlGender: 'FEMALE',
    languageName: 'it-IT-Wavenet-B',
  },
  {
    name: 'Chloé',
    voice: 'fr-FR',
    ssmlGender: 'FEMALE',
    languageName: 'fr-FR-Standard-A',
  },
  {
    name: 'LingLing',
    voide: 'cmn-CN',
    ssmlGender: 'FEMALE',
    languageName: 'cmn-CN-Standard-D',
  },
];

export const LANGUAGE_MAP: Record<string, string> = {
  'en-US': 'American English',
  'it-IT': 'Italian',
  'fr-FR': 'French',
  'cmn-CN': 'Chinese (Mandarin)',
};
