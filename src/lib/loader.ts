import type { CurrentFile } from './current-file';

type ParsedUrl = {
  folder: string;
  file: string;
  ext: string;
};

export const parseUrl = ({ folder, filename }: { folder: string; filename: string }): ParsedUrl => {
  const parts = filename.split('_');
  return {
    folder: folder,
    file: parts.slice(0, parts.length - 1).join('_'),
    ext: parts[parts.length - 1],
  };
};

export const loadFile = async ({
  folder,
  file,
  ext,
  dontLoad,
}: ParsedUrl & { dontLoad?: boolean }): Promise<CurrentFile> => {
  if (dontLoad) {
    return {
      folder,
      file,
      text: '',
      ext,
    };
  }
  const text = await (await fetch(`/${folder}/${file}.${ext}`)).text();
  return {
    folder,
    file,
    text,
    ext,
  };
};
