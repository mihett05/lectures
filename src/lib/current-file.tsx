import React, { createContext, useState } from 'react';

export interface CurrentFile {
  folder: string;
  file: string;
  text: string;
  ext: string;
}

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
