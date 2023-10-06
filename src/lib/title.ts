import type { CurrentFile } from './current-file';

const FOLDERS_TRANSLATIONS = {
  angem: 'Аналитическая геометрия',
  dm: 'Дискретная математика',
  history: 'История',
  matan: 'Матанализ',
};

const parseDate = (fileName: string) => {
  const [month, day] = fileName.split('_').map((v) => parseInt(v.trim()));
  return `${String(day).padStart(2, '0')}.${String(month).padStart(2, '0')}`;
};

export const makeTitleFromFile = (file: CurrentFile) =>
  `${
    (FOLDERS_TRANSLATIONS[file.folder as keyof typeof FOLDERS_TRANSLATIONS] as string) || 'Неизвестные предмет'
  } ${parseDate(file.file)}`;
