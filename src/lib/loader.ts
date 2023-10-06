import type { CurrentFile } from './current-file';

export const loadFile = async (folder: string, file: string): Promise<CurrentFile> => {
  const filePath = (await import(/* @vite-ignore */ `/${folder}/${file}.md`)).default;
  const text = await (await fetch(filePath)).text();
  return {
    folder,
    file,
    text,
  };
};
