import React, { createContext, useState } from 'react';

export interface CurrentFile {
  folder: string;
  file: string;
  text: string;
}

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

interface ICurrentFileContext {
  file: CurrentFile | null;
  setFile(file: CurrentFile): void;
}

export const CurrentFilexContext = createContext<ICurrentFileContext>({
  file: null,
  // eslint-disable-next-line
  setFile: (_file) => {},
});

interface CurrentFileProviderProps {
  children: React.ReactNode;
}

function CurrentFileProvider({ children }: CurrentFileProviderProps) {
  const [file, setFile] = useState<CurrentFile | null>(null);
  return (
    <CurrentFilexContext.Provider
      value={{
        file,
        setFile,
      }}
    >
      {children}
    </CurrentFilexContext.Provider>
  );
}

export default CurrentFileProvider;
