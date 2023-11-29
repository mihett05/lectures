import React from 'react';

import Katex from './Katex';
import { CurrentFile } from '../../lib/current-file';
import Pdf from './Pdf';

interface LoaderProps {
  file: CurrentFile;
}

const getExtenstion = (file: CurrentFile) => {
  switch (file.ext) {
    case 'md':
      return <Katex file={file} />;
    case 'pdf':
      return <Pdf file={file} />;
    default:
      return <h1>Неизвестный вид файла</h1>;
  }
};

function Loader({ file }: LoaderProps) {
  return getExtenstion(file);
}

export default Loader;
