import type { CurrentFile } from './current-file';

export const loadFile = async (folder: string, file: string): Promise<CurrentFile> => {
  const text = await (await fetch(`/${folder}/${file}.md`)).text();
  return {
    folder,
    file,
    text,
  };
};
